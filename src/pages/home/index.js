import { renderHeroBanner } from '../../components/hero/hero-banner.js';
import { renderCapabilityCard } from '../../components/cards/capability-card.js';
import capabilitiesData from '../../data/product/capabilities.json';

export async function renderHomePage(container) {
  document.title = "PesaGuard Product Portal | Payment Event to Operational Truth";

  const pageEl = document.createElement('div');
  pageEl.className = 'pg-page-home';

  // Render Hero
  const heroSection = document.createElement('section');
  renderHeroBanner(heroSection);
  pageEl.appendChild(heroSection);

  // Overview Section
  const bodySection = document.createElement('section');
  bodySection.className = 'pg-container pg-section';
  bodySection.innerHTML = `
    <div class="pg-section-header">
      <h2 class="pg-heading-2">System Capabilities Overview</h2>
      <p class="pg-lead">Engineered to bridge raw callback webhooks with undeniable financial ledger truth.</p>
    </div>
    <div id="capability-grid" class="pg-grid-2"></div>
  `;
  
  pageEl.appendChild(bodySection);
  container.appendChild(pageEl);

  // Hydrate Capabilities
  const grid = container.querySelector('#capability-grid');
  capabilitiesData.forEach(cap => {
    grid.appendChild(renderCapabilityCard(cap));
  });
}
