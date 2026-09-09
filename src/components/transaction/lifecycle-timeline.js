const lifecycleSteps = [
  { stage: "CREATED", system: "M-Pesa Network", status: "COMPLETE", desc: "Customer initiates M-Pesa C2B Paybill payment." },
  { stage: "RECEIVED", system: "FastAPI Gateway", status: "COMPLETE", desc: "Raw HTTP POST webhook payload validated for HMAC signature." },
  { stage: "NORMALIZED", system: "PySpark Service", status: "COMPLETE", desc: "Raw payload fields mapped to unified PesaGuard schema." },
  { stage: "ANALYZED", system: "Anomaly Engine", status: "COMPLETE", desc: "Evaluated against duplicate receipt ID and amount mismatch rules." },
  { stage: "RECONCILED", system: "dbt Engine", status: "COMPLETE", desc: "Matched against internal ledger database entry." }
];

export function renderLifecycleTimeline(container) {
  container.innerHTML = `
    <div class="pg-lifecycle-container">
      <div class="pg-timeline-stepper">
        ${lifecycleSteps.map((step, idx) => `
          <div class="pg-timeline-item" data-step="${idx}">
            <div class="pg-timeline-badge">${idx + 1}</div>
            <div class="pg-timeline-content">
              <h4 class="pg-timeline-stage">${step.stage}</h4>
              <span class="pg-timeline-system">${step.system}</span>
              <p class="pg-timeline-desc">${step.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
