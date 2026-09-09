export function renderArchitectureExplorer(container, data) {
  container.innerHTML = `
    <div class="pg-arch-layout">
      <div class="pg-arch-canvas-container">
        <svg id="arch-svg" class="pg-arch-svg" viewBox="0 0 800 400">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#2ECC87" />
            </marker>
          </defs>
          <!-- Dynamic Connections -->
          <g id="arch-edges"></g>
          <!-- Dynamic Nodes -->
          <g id="arch-nodes"></g>
        </svg>
      </div>
      <div id="arch-inspector" class="pg-arch-inspector">
        <div class="pg-inspector-placeholder">
          <p>Click on any node in the topology diagram to inspect its pipeline mechanics, failure vectors, and database persistence controls.</p>
        </div>
      </div>
    </div>
  `;

  const nodeGroup = container.querySelector('#arch-nodes');
  const edgeGroup = container.querySelector('#arch-edges');
  const inspector = container.querySelector('#arch-inspector');

  // Node Positions Matrix
  const nodeCoords = {
    'source-mpesa': { x: 50, y: 200 },
    'ingest-webhook': { x: 180, y: 200 },
    'bus-kafka': { x: 320, y: 200 },
    'proc-normalizer': { x: 460, y: 200 },
    'db-cassandra': { x: 620, y: 100 },
    'db-postgres': { x: 620, y: 300 },
    'engine-recon': { x: 740, y: 300 }
  };

  // Render Connections
  data.edges.forEach(edge => {
    const from = nodeCoords[edge.from];
    const to = nodeCoords[edge.to];
    if (from && to) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${from.x + 40} ${from.y} L ${to.x - 40} ${to.y}`);
      path.setAttribute('stroke', 'rgba(46, 204, 135, 0.4)');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('marker-end', 'url(#arrow)');
      edgeGroup.appendChild(path);
    }
  });

  // Render Nodes
  data.nodes.forEach(node => {
    const coord = nodeCoords[node.id];
    if (!coord) return;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${coord.x}, ${coord.y})`);
    g.setAttribute('class', 'pg-arch-node-group');
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', `Node: ${node.label}`);

    g.innerHTML = `
      <rect x="-40" y="-20" width="80" height="40" rx="6" class="pg-arch-node-rect" />
      <text x="0" y="4" class="pg-arch-node-text" text-anchor="middle">${node.label.split(' ')[0]}</text>
    `;

    g.addEventListener('click', () => selectNode(node));
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter') selectNode(node); });

    nodeGroup.appendChild(g);
  });

  function selectNode(node) {
    inspector.innerHTML = `
      <div class="pg-inspector-content">
        <span class="pg-badge-prod">${node.layer}</span>
        <h3 class="pg-heading-3">${node.label}</h3>
        <p><strong>System Status:</strong> <span class="pg-text-accent">${node.status}</span></p>
        <hr class="pg-divider" />
        <h4>Operational Responsibilities:</h4>
        <p>Processes isolated transactions with strict schema isolation, transforming incoming binary/JSON frames into structured domain model metrics.</p>
        <div class="pg-callout pg-callout-info">
          <strong>Security Control:</strong> Encrypted payload in-transit using TLS 1.3 and stored with AES-256 field-level encryption.
        </div>
      </div>
    `;
  }
}
