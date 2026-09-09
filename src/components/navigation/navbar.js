import { store } from '../../state/store.js';

export function renderNavbar(container) {
  const currentPath = window.location.pathname;
  
  container.innerHTML = `
    <nav class="pg-navbar" aria-label="Main Navigation">
      <div class="pg-container pg-navbar-inner">
        <a href="/" class="pg-brand" aria-label="PesaGuard Home">
          <svg class="pg-logo-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L4 7V15C4 22.38 9.12 29.1 16 30C22.88 29.1 28 22.38 28 15V7L16 2Z" fill="url(#pg-shield-grad)" stroke="#2ECC87" stroke-width="1.5"/>
            <text x="16" y="20" font-family="var(--pg-font-sans)" font-weight="900" font-size="11" fill="#F4F8F6" text-anchor="middle">PG</text>
            <defs>
              <linearGradient id="pg-shield-grad" x1="4" y1="2" x2="28" y2="30">
                <stop offset="0%" stop-color="#124A3B"/>
                <stop offset="100%" stop-color="#0B2E24"/>
              </linearGradient>
            </defs>
          </svg>
          <span class="pg-wordmark">PesaGuard <span class="pg-portal-tag">PORTAL</span></span>
        </a>

        <ul class="pg-nav-links">
          <li><a href="/platform" class="${currentPath === '/platform' ? 'active' : ''}">Platform</a></li>
          <li><a href="/capabilities" class="${currentPath === '/capabilities' ? 'active' : ''}">Capabilities</a></li>
          <li><a href="/reconciliation" class="${currentPath === '/reconciliation' ? 'active' : ''}">Reconciliation</a></li>
          <li><a href="/anomaly-detection" class="${currentPath === '/anomaly-detection' ? 'active' : ''}">Anomalies</a></li>
          <li><a href="/integrations" class="${currentPath === '/integrations' ? 'active' : ''}">Integrations</a></li>
          <li><a href="/architecture" class="${currentPath === '/architecture' ? 'active' : ''}">Architecture</a></li>
          <li><a href="/demo" class="${currentPath === '/demo' ? 'active' : ''}">Interactive Demo</a></li>
        </ul>

        <div class="pg-navbar-actions">
          <button id="mode-toggle" class="pg-btn-secondary" aria-label="Toggle Executive or Technical Mode">
            Mode: <span id="mode-label">Technical</span>
          </button>
          <button id="cmd-k-trigger" class="pg-btn-icon" aria-label="Open Command Palette (Cmd+K)">
            <kbd>⌘K</kbd>
          </button>
        </div>
      </div>
    </nav>
  `;

  // Toggle state
  const modeBtn = container.querySelector('#mode-toggle');
  const modeLabel = container.querySelector('#mode-label');
  
  modeBtn.addEventListener('click', () => {
    const current = store.getState().mode;
    const next = current === 'technical' ? 'executive' : 'technical';
    store.setState({ mode: next });
    modeLabel.textContent = next.charAt(0).toUpperCase() + next.slice(1);
    document.body.setAttribute('data-mode', next);
  });
}
