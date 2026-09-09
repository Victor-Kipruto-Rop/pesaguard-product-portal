import { renderNavbar } from '../components/navigation/navbar.js';
import { renderFooter } from '../components/shell/footer.js';
import { initCommandPalette } from '../components/navigation/command-palette.js';

// Route Handlers
import { renderHomePage } from '../pages/home/index.js';
import { renderPlatformPage } from '../pages/platform/index.js';
import { renderCapabilitiesPage } from '../pages/capabilities/index.js';
import { renderReconciliationPage } from '../pages/reconciliation/index.js';
import { renderAnomalyPage } from '../pages/anomaly-detection/index.js';
import { renderLifecyclePage } from '../pages/transaction-lifecycle/index.js';
import { renderIntegrationsPage } from '../pages/integrations/index.js';
import { renderMpesaPage } from '../pages/integrations/mpesa.js';
import { renderArchitecturePage } from '../pages/architecture/index.js';
import { renderDemoPage } from '../pages/demo/index.js';
import { renderSimulatorPage } from '../pages/simulator/index.js';
import { renderStatusPage } from '../pages/status/index.js';
import { renderNotFoundPage } from '../pages/404/index.js';

const routes = {
  '/': renderHomePage,
  '/platform': renderPlatformPage,
  '/capabilities': renderCapabilitiesPage,
  '/reconciliation': renderReconciliationPage,
  '/anomaly-detection': renderAnomalyPage,
  '/transaction-lifecycle': renderLifecyclePage,
  '/integrations': renderIntegrationsPage,
  '/integrations/mpesa': renderMpesaPage,
  '/architecture': renderArchitecturePage,
  '/demo': renderDemoPage,
  '/simulator': renderSimulatorPage,
  '/status': renderStatusPage
};

class Router {
  constructor() {
    this.mainContent = document.getElementById('main-content');
    window.addEventListener('popstate', () => this.handleRoute());
    document.addEventListener('click', (e) => this.handleLinkClick(e));
  }

  handleLinkClick(e) {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/')) {
      e.preventDefault();
      this.navigate(href);
    }
  }

  navigate(path) {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      this.handleRoute();
    }
  }

  async handleRoute() {
    const path = window.location.pathname;
    const renderFn = routes[path] || renderNotFoundPage;
    
    // Clear current DOM
    this.mainContent.innerHTML = '';
    window.scrollTo(0, 0);

    // Render Target Page
    await renderFn(this.mainContent);
    
    // Announce to Screen Readers
    const pageTitle = document.title;
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.className = 'sr-only';
    announcement.textContent = `Navigated to ${pageTitle}`;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  }
}

// System Bootstrapping
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar(document.getElementById('site-header'));
  renderFooter(document.getElementById('site-footer'));
  initCommandPalette(document.getElementById('command-palette-container'));
  
  const router = new Router();
  router.handleRoute();
});
