export function renderHeroBanner(container) {
  container.innerHTML = `
    <div class="pg-hero">
      <div class="pg-container">
        <div class="pg-hero-content">
          <span class="pg-hero-badge">Enterprise Payment Infrastructure</span>
          <h1 class="pg-hero-title">From Payment Event to <span class="pg-text-accent">Operational Truth</span>.</h1>
          <p class="pg-hero-description">
            PesaGuard provides high-throughput transaction normalization, streaming anomaly detection, and automated dual-ledger reconciliation for mobile money networks and commercial banking interfaces.
          </p>
          <div class="pg-hero-cta-group">
            <a href="/demo" class="pg-btn-primary">Launch Interactive Demo</a>
            <a href="/architecture" class="pg-btn-outline">Explore Architecture Topology</a>
          </div>
        </div>
      </div>
    </div>
  `;
}
