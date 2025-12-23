const ALLOWED_WEBSITE_TYPES = ['portfolio', 'saas', 'restaurant', 'ecommerce'];

export function generateWebsite(businessName: string, websiteType: string, _prompt: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
    }
    .header h1 { font-size: 3rem; margin-bottom: 1rem; }
    .header p { font-size: 1.25rem; opacity: 0.9; }
    .container { max-width: 1200px; margin: 0 auto; padding: 4rem 2rem; }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 3rem 0;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    .card:hover { transform: translateY(-5px); }
    .card h3 { color: #667eea; margin-bottom: 1rem; }
    .cta {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 50px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: transform 0.3s;
    }
    .cta:hover { transform: scale(1.05); }
    .footer {
      background: #333;
      color: white;
      text-align: center;
      padding: 2rem;
      margin-top: 4rem;
    }
  </style>
</head>
<body>
  <header class="header">
    <h1>${businessName}</h1>
    <p>Welcome to our ${websiteType || 'business'}</p>
  </header>

  <div class="container">
    <h2 style="text-align: center; margin-bottom: 3rem;">What We Offer</h2>
    <div class="features">
      <div class="card">
        <h3>Professional Service</h3>
        <p>Expert solutions tailored to your needs with attention to detail and quality.</p>
      </div>
      <div class="card">
        <h3>Quality Assurance</h3>
        <p>Uncompromising quality in everything we do, backed by years of experience.</p>
      </div>
      <div class="card">
        <h3>Customer Support</h3>
        <p>24/7 dedicated support for your peace of mind and success.</p>
      </div>
    </div>

    <div style="text-align: center; margin-top: 4rem;">
      <button class="cta" onclick="alert('Contact us at: contact@${businessName.toLowerCase().replace(/\\s+/g, '')}.com')">
        Get Started Today
      </button>
    </div>
  </div>

  <footer class="footer">
    <p>&copy; 2025 ${businessName}. All rights reserved.</p>
  </footer>
</body>
</html>`;
}

export { ALLOWED_WEBSITE_TYPES };