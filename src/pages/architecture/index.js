import systemTopology from '../../data/architecture/system.json';
import { renderArchitectureExplorer } from '../../components/architecture/architecture-explorer.js';

export async function renderArchitecturePage(container) {
  document.title = "System Architecture | PesaGuard Product Portal";

  const section = document.createElement('div');
  section.className = 'pg-container pg-section';
  section.innerHTML = `
    <div class="pg-section-header">
      <h1 class="pg-heading-1">PesaGuard Technical Topology</h1>
      <p class="pg-lead">Interactive data stream inspection from raw gateway callback ingress to persistent analytical ledger write.</p>
    </div>
    <div id="architecture-explorer-root"></div>
  `;

  container.appendChild(section);
  renderArchitectureExplorer(container.querySelector('#architecture-explorer-root'), systemTopology);
}
