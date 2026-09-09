class CentralStore {
  constructor() {
    this.state = {
      mode: 'technical', // 'executive' | 'technical'
      theme: 'dark',
      activeSimulationScenario: 'SUCCESS_PAYMENT',
      searchQuery: '',
      liveSystemHealth: 'OPERATIONAL'
    };
    this.listeners = new Set();
  }

  getState() {
    return { ...this.state };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const store = new CentralStore();
