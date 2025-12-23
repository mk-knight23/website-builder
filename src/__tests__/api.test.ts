import { describe, it, expect } from 'vitest';

describe('API Generate Route', () => {
  it('should validate required fields', async () => {
    const res = await fetch('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    expect(res.status).toBe(400);
  });

  it('should reject oversized prompts', async () => {
    const res = await fetch('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'a'.repeat(1001) })
    });
    expect(res.status).toBe(400);
  });

  it('should generate website with valid input', async () => {
    const res = await fetch('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessName: 'Test Co',
        websiteType: 'portfolio',
        prompt: 'A simple portfolio website'
      })
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.html).toContain('Test Co');
  });
});
