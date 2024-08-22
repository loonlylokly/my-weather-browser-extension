interface UpdatePendingMessage {
  type: 'wait_update';
  path: string;
}
interface UpdateRequestMessage {
  type: 'do_update';
}
interface UpdateCompleteMessage {
  type: 'done_update';
}
interface BuildCompletionMessage {
  type: 'build_complete';
}
interface ForceReloadMessage {
  type: 'force_reload';
}

export type SerializedMessage = string;
export type WebSocketMessage =
  | UpdateCompleteMessage
  | UpdateRequestMessage
  | UpdatePendingMessage
  | BuildCompletionMessage
  | ForceReloadMessage;

export default class MessageInterpreter {
  private constructor() {}

  static send(message: WebSocketMessage): SerializedMessage {
    return JSON.stringify(message);
  }
  static receive(serializedMessage: SerializedMessage): WebSocketMessage {
    return JSON.parse(serializedMessage);
  }
}
