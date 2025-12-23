import { describe, it, expect } from 'vitest';
import { generateWebsite, ALLOWED_WEBSITE_TYPES } from '@/lib/generator';

describe('Generator', () => {
  it('should generate HTML with business name', () => {
    const html = generateWebsite('Test Co', 'portfolio', 'A test description');
    expect(html).toContain('Test Co');
    expect(html).toContain('portfolio');
    expect(html).toContain('<!DOCTYPE html>');
  });

  it('should use default business type if not provided', () => {
    const html = generateWebsite('Test Co', '', 'desc');
    expect(html).toContain('Welcome to our business');
  });

  it('should include required HTML elements', () => {
    const html = generateWebsite('Test', 'saas', '');
    expect(html).toContain('<title>Test</title>');
    expect(html).toContain('Professional Service');
    expect(html).toContain('Get Started Today');
  });

  it('should handle special characters in business name', () => {
    const html = generateWebsite('Test & Co', 'restaurant', '');
    expect(html).toContain('Test & Co');
  });

  it('should generate valid HTML structure', () => {
    const html = generateWebsite('Test', 'ecommerce', '');
    expect(html.startsWith('<!DOCTYPE html>')).toBe(true);
    expect(html).toContain('<html lang="en">');
    expect(html).toContain('</html>');
  });
});