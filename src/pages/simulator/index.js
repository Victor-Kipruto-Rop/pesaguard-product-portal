import scenarioData from '../../data/demo/scenario-data.json';

export async function renderSimulatorPage(container) {
  document.title = "Transaction Scenario Simulator | PesaGuard Product Portal";

  const root = document.createElement('div');
  root.className = 'pg-container pg-section';
  root.innerHTML = `
    <div class="pg-section-header">
      <h1 class="pg-heading-1">Payment Anomaly & Edge-Case Simulator</h1>
      <p class="pg-lead">Execute deterministic execution scenarios to observe how PesaGuard handles exceptions and anomalies.</p>
    </div>
    
    <div class="pg-simulator-grid">
      <div class="pg-sim-controls">
        <label for="scenario-select" class="pg-label">Select Simulation Scenario:</label>
        <select id="scenario-select" class="pg-select">
          <option value="SUCCESS_PAYMENT">Standard Successful Reconciliation</option>
          <option value="AMOUNT_MISMATCH">Amount Variance (Partner Mismatch)</option>
          <option value="DUPLICATE_RECEIPT">Duplicate M-Pesa Receipt ID</option>
          <option value="DELAYED_CALLBACK">High-Latency Webhook Callback</option>
        </select>
        <button id="run-sim-btn" class="pg-btn-primary" style="margin-top: 1rem; width: 100%;">Run Simulation</button>
      </div>

      <div id="sim-output-terminal" class="pg-terminal">
        <div class="pg-terminal-header">
          <span class="pg-terminal-dot"></span>
          <span class="pg-terminal-dot"></span>
          <span class="pg-terminal-dot"></span>
          <span class="pg-terminal-title">PesaGuard Execution Stream Log</span>
        </div>
        <pre id="terminal-body" class="pg-terminal-body"><code>// Ready to initiate execution simulation...</code></pre>
      </div>
    </div>
  `;

  container.appendChild(root);

  const select = root.querySelector('#scenario-select');
  const btn = root.querySelector('#run-sim-btn');
  const terminal = root.querySelector('#terminal-body');

  btn.addEventListener('click', () => {
    const key = select.value;
    const selected = scenarioData[key];
    
    terminal.textContent = `[INFO] Initializing Scenario Engine: ${key}...\n`;
    
    let delay = 300;
    selected.events.forEach((evt, i) => {
      setTimeout(() => {
        terminal.textContent += `[${evt.timestamp}] [${evt.component}] ${evt.level}: ${evt.message}\n`;
        terminal.scrollTop = terminal.scrollHeight;
      }, delay * (i + 1));
    });
  });
}
