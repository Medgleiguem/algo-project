const API_BASE_URL = 'http://localhost:5000/api';

export const ApiService = {
  async addRandomPackages(count = 1) {
    const response = await fetch(`${API_BASE_URL}/packages/random`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count })
    });
    if (!response.ok) throw new Error('Failed to add packages');
    return response.json();
  },

  async getQueue() {
    const response = await fetch(`${API_BASE_URL}/queue`);
    if (!response.ok) throw new Error('Failed to fetch queue');
    return response.json();
  },

  async getStack() {
    const response = await fetch(`${API_BASE_URL}/stack`);
    if (!response.ok) throw new Error('Failed to fetch stack');
    return response.json();
  },

  async processPackage() {
    const response = await fetch(`${API_BASE_URL}/queue/process`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to process package');
    return response.json();
  },

  async unloadPackage() {
    const response = await fetch(`${API_BASE_URL}/stack/unload`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to unload package');
    return response.json();
  },

  async sortQueue(algorithm) {
    const response = await fetch(`${API_BASE_URL}/queue/sort`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ algorithm })
    });
    if (!response.ok) throw new Error('Failed to sort queue');
    return response.json();
  },

  async sortStack(algorithm) {
    const response = await fetch(`${API_BASE_URL}/stack/sort`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ algorithm })
    });
    if (!response.ok) throw new Error('Failed to sort stack');
    return response.json();
  },

  async compareAlgorithms() {
    const response = await fetch(`${API_BASE_URL}/compare`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to compare algorithms');
    return response.json();
  },

  async getStats() {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  async resetSystem() {
    const response = await fetch(`${API_BASE_URL}/reset`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to reset system');
    return response.json();
  }
};