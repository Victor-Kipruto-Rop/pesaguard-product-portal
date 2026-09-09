export function renderCapabilityCard(capability) {
  const card = document.createElement('article');
  card.className = 'pg-card pg-capability-card';
  
  const isProd = capability.status === 'Production';
  
  card.innerHTML = `
    <div class="pg-card-header">
      <span class="pg-card-category">${capability.category}</span>
      <span class="${isProd ? 'pg-badge-prod' : 'pg-badge-planned'}">${capability.status}</span>
    </div>
    <h3 class="pg-card-title">${capability.name}</h3>
    <p class="pg-card-desc">${capability.description}</p>
    <div class="pg-card-specs">
      <h4>Technical Parameters:</h4>
      <ul>
        ${Object.entries(capability.technicalSpecs).map(([k, v]) => `
          <li><strong>${k}:</strong> ${Array.isArray(v) ? v.join(', ') : v}</li>
        `).join('')}
      </ul>
    </div>
  `;
  
  return card;
}
