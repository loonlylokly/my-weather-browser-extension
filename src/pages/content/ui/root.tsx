import { createRoot } from 'react-dom/client';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';

import App from '@/pages/content/ui/app';
import injectedStyle from '@/pages/content/ui/index.css?inline';
refreshOnUpdate('pages/content');

const mainSection = document.getElementById('overflow');

function onRemove(element: HTMLElement | null, onDetachCallback: () => void) {
  const observer = new MutationObserver(() => {
    if (!document.contains(element)) {
      observer.disconnect();
      onDetachCallback();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

const insertCards = () => {
  const cards = document.querySelectorAll('.item-info');

  cards.forEach((card) => {
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

    card?.insertBefore(root, card.firstChild);
  });
};

insertCards();

onRemove(mainSection, () => setTimeout(insertCards, 3000));

/**
 *
 * In the firefox environment, the adoptedStyleSheets bug may prevent contentStyle from being applied properly.
 * Please refer to the PR link above and go back to the contentStyle.css implementation, or raise a PR if you have a better way to improve it.
 */
