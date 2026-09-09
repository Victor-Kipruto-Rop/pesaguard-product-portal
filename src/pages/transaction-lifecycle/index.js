import { renderLifecycleTimeline } from '../../components/transaction/lifecycle-timeline.js';

export async function renderLifecyclePage(container) {
  document.title = "Transaction Lifecycle | PesaGuard Product Portal";

  const root = document.createElement('div');
  root.className = 'pg-container pg-section';
  root.innerHTML = `
    <div class="pg-section-header">
      <h1 class="pg-heading-1">Transaction State Propagation</h1>
      <p class="pg-lead">Track state transitions from external HTTP callback triggers down to final batch settlement validation.</p>
    </div>
    <div id="lifecycle-timeline-root"></div>
  `;

  container.appendChild(root);
  renderLifecycleTimeline(root.querySelector('#lifecycle-timeline-root'));
}
