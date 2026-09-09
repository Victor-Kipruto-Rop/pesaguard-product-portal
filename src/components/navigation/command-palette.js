export function initCommandPalette(container) {
  container.innerHTML = `
    <div id="pg-cmd-overlay" class="pg-cmd-overlay" hidden>
      <div class="pg-cmd-dialog" role="dialog" aria-modal="true" aria-label="Command Palette">
        <div class="pg-cmd-header">
          <input type="text" id="cmd-input" placeholder="Search documentation, capabilities, architecture..." aria-label="Search prompt" />
        </div>
        <div id="cmd-results" class="pg-cmd-results">
          <div class="pg-cmd-group-label">Quick Links</div>
          <a href="/reconciliation" class="pg-cmd-item">Reconciliation Engine Docs</a>
          <a href="/integrations/mpesa" class="pg-cmd-item">M-Pesa Daraja Integration Spec</a>
          <a href="/architecture" class="pg-cmd-item">System Topology SVG Explorer</a>
          <a href="/simulator" class="pg-cmd-item">Transaction Scenario Simulator</a>
        </div>
      </div>
    </div>
  `;

  const overlay = container.querySelector('#pg-cmd-overlay');
  const input = container.querySelector('#cmd-input');

  const togglePalette = (show) => {
    overlay.hidden = !show;
    if (show) input.focus();
  };

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      togglePalette(overlay.hidden);
    }
    if (e.key === 'Escape' && !overlay.hidden) {
      togglePalette(false);
    }
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) togglePalette(false);
  });
}
