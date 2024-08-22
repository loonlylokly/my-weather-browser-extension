import { createRoot } from 'react-dom/client';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';

import injectedStyle from '@/pages/content/ui/index.css?inline';

import App from './app';

refreshOnUpdate('pages/content');

const root = document.createElement('div');
root.className = 'chrome-extension-boilerplate-react-vite-content-view-root';
root.style.float = 'right';

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

/** Inject styles into shadow dom */
const styleElement = document.createElement('style');
styleElement.innerHTML = injectedStyle;
shadowRoot.appendChild(styleElement);
createRoot(rootIntoShadow).render(<App />);
