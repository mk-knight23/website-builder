import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function POST(request: NextRequest) {
  try {
    const { prompt, businessName, websiteType, model = 'microsoft/wizardlm-2-8x22b:free' } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Enhanced system prompt for website generation
    const systemPrompt = `You are an expert web developer and designer. Generate complete, production-ready website code based on the user's requirements. 

For the website, provide:
1. Complete HTML structure
2. Modern CSS styling with responsive design
3. Interactive JavaScript functionality
4. Clean, semantic code structure
5. SEO-optimized markup
6. Accessibility features

Output format:
- HTML: Complete HTML file with embedded CSS and JavaScript
- CSS: Modern styling with animations and responsive design
- Components: Any additional React/Next.js components if requested

Make the code production-ready, visually appealing, and fully functional.`;

    const userPrompt = `Generate a ${websiteType || 'modern, responsive'} website for ${businessName || 'a business'}. 

Requirements: ${prompt}

Create a complete, working website that can be saved and deployed immediately. Include all necessary HTML, CSS, and JavaScript for a fully functional site.`;

    const requestBody = {
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4000
    };

    // For demo purposes, simulate the API call with enhanced template responses
    // In production, you would make the actual OpenRouter API call
    const simulatedResponse = generateWebsiteContent(businessName, websiteType, prompt);
    
    return NextResponse.json({
      success: true,
      html: simulatedResponse.html,
      css: simulatedResponse.css,
      components: simulatedResponse.components,
      businessName,
      websiteType,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate website content' },
      { status: 500 }
    );
  }
}

function generateWebsiteContent(businessName: string, websiteType: string, prompt: string) {
  const business = businessName || 'Amazing Business';
  const industry = websiteType || 'business';
  
  // Generate contextual content based on business type
  const content = {
    hero: {
      headline: `Welcome to ${business}`,
      subheadline: 'Where Innovation Meets Excellence',
      cta: 'Get Started Today'
    },
    features: [
      { title: 'Professional Service', description: 'Expert solutions tailored to your needs' },
      { title: 'Quality Assurance', description: 'Uncompromising quality in everything we do' },
      { title: 'Customer Support', description: '24/7 dedicated support for your peace of mind' },
      { title: 'Fast Delivery', description: 'Quick turnaround without compromising quality' }
    ],
    about: `At ${business}, we are committed to delivering exceptional results that exceed expectations. Our team combines expertise, innovation, and passion to create solutions that drive success.`,
    contact: {
      email: `contact@${business.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: '+1 (555) 123-4567',
      address: '123 Business Street, City, State 12345'
    }
  };

  return {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${business} - ${content.hero.headline}</title>
    <meta name="description" content="${content.hero.subheadline} - Professional services that exceed expectations">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>${generateCSS()}</style>
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="nav-brand">
                <h1>${business}</h1>
            </div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <button class="menu-toggle" onclick="toggleMenu()">☰</button>
        </nav>
    </header>

    <main>
        <section id="home" class="hero">
            <div class="hero-content">
                <h1 class="hero-title">${content.hero.headline}</h1>
                <p class="hero-subtitle">${content.hero.subheadline}</p>
                <button class="cta-button">${content.hero.cta}</button>
            </div>
            <div class="hero-visual">
                <div class="floating-shapes">
                    <div class="shape shape-1"></div>
                    <div class="shape shape-2"></div>
                    <div class="shape shape-3"></div>
                </div>
            </div>
        </section>

        <section id="about" class="about">
            <div class="container">
                <h2>About Us</h2>
                <p>${content.about}</p>
            </div>
        </section>

        <section id="services" class="features">
            <div class="container">
                <h2>Our Features</h2>
                <div class="features-grid">
                    ${content.features.map((feature, index) => `
                        <div class="feature-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                            <div class="feature-icon">
                                <div class="icon-placeholder"></div>
                            </div>
                            <h3>${feature.title}</h3>
                            <p>${feature.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section id="contact" class="contact">
            <div class="container">
                <h2>Get In Touch</h2>
                <div class="contact-content">
                    <div class="contact-info">
                        <div class="contact-item">
                            <h4>Email</h4>
                            <p>${content.contact.email}</p>
                        </div>
                        <div class="contact-item">
                            <h4>Phone</h4>
                            <p>${content.contact.phone}</p>
                        </div>
                        <div class="contact-item">
                            <h4>Address</h4>
                            <p>${content.contact.address}</p>
                        </div>
                    </div>
                    <form class="contact-form">
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="Your Email" required>
                        <textarea placeholder="Your Message" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 ${business}. All rights reserved.</p>
        </div>
    </footer>

    <script>${generateJavaScript()}</script>
</body>
</html>`,
    css: generateCSS(),
    components: []
  };
}

function generateCSS() {
  return `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        line-height: 1.6;
        color: #333;
        background: #fff;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    /* Header & Navigation */
    .header {
        position: fixed;
        top: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid #eee;
        z-index: 1000;
        transition: all 0.3s ease;
    }

    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .nav-brand h1 {
        font-size: 1.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .nav-menu {
        display: flex;
        list-style: none;
        gap: 2rem;
    }

    .nav-menu a {
        text-decoration: none;
        color: #333;
        font-weight: 500;
        transition: color 0.3s ease;
        position: relative;
    }

    .nav-menu a:hover {
        color: #667eea;
    }

    .nav-menu a::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -5px;
        left: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        transition: width 0.3s ease;
    }

    .nav-menu a:hover::after {
        width: 100%;
    }

    .menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
    }

    /* Hero Section */
    .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        position: relative;
        overflow: hidden;
    }

    .hero-content {
        flex: 1;
        max-width: 600px;
        padding: 2rem;
        animation: slideInLeft 1s ease-out;
    }

    .hero-title {
        font-size: 3.5rem;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hero-subtitle {
        font-size: 1.25rem;
        color: #666;
        margin-bottom: 2rem;
        animation: slideInLeft 1s ease-out 0.2s both;
    }

    .cta-button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        animation: slideInLeft 1s ease-out 0.4s both;
    }

    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }

    .hero-visual {
        flex: 1;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .floating-shapes {
        position: relative;
        width: 400px;
        height: 400px;
    }

    .shape {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        opacity: 0.1;
        animation: float 6s ease-in-out infinite;
    }

    .shape-1 {
        width: 100px;
        height: 100px;
        top: 20%;
        left: 20%;
        animation-delay: 0s;
    }

    .shape-2 {
        width: 150px;
        height: 150px;
        top: 50%;
        right: 20%;
        animation-delay: 2s;
    }

    .shape-3 {
        width: 80px;
        height: 80px;
        bottom: 20%;
        left: 50%;
        animation-delay: 4s;
    }

    /* Features Section */
    .features {
        padding: 5rem 0;
        background: #fff;
    }

    .features h2 {
        text-align: center;
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 3rem;
        color: #333;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .feature-card {
        background: white;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        text-align: center;
    }

    .feature-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    }

    .feature-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        margin: 0 auto 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon-placeholder {
        width: 40px;
        height: 40px;
        background: white;
        border-radius: 50%;
    }

    .feature-card h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #333;
    }

    .feature-card p {
        color: #666;
        line-height: 1.6;
    }

    /* About Section */
    .about {
        padding: 5rem 0;
        background: #f8f9fa;
    }

    .about h2 {
        text-align: center;
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 2rem;
        color: #333;
    }

    .about p {
        text-align: center;
        font-size: 1.1rem;
        line-height: 1.8;
        color: #666;
        max-width: 800px;
        margin: 0 auto;
    }

    /* Contact Section */
    .contact {
        padding: 5rem 0;
        background: #fff;
    }

    .contact h2 {
        text-align: center;
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 3rem;
        color: #333;
    }

    .contact-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        max-width: 1000px;
        margin: 0 auto;
    }

    .contact-item {
        margin-bottom: 2rem;
    }

    .contact-item h4 {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #333;
    }

    .contact-item p {
        color: #666;
    }

    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .contact-form input,
    .contact-form textarea {
        padding: 1rem;
        border: 2px solid #eee;
        border-radius: 10px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }

    .contact-form input:focus,
    .contact-form textarea:focus {
        outline: none;
        border-color: #667eea;
    }

    .contact-form button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .contact-form button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }

    /* Footer */
    .footer {
        background: #333;
        color: white;
        padding: 2rem 0;
        text-align: center;
    }

    /* Animations */
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .menu-toggle {
            display: block;
        }
        
        .hero {
            flex-direction: column;
            text-align: center;
            padding: 2rem 1rem;
        }
        
        .hero-title {
            font-size: 2.5rem;
        }
        
        .hero-content {
            padding: 1rem;
        }
        
        .floating-shapes {
            width: 300px;
            height: 300px;
        }
        
        .contact-content {
            grid-template-columns: 1fr;
        }
        
        .features-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 480px) {
        .hero-title {
            font-size: 2rem;
        }
        
        .hero-subtitle {
            font-size: 1.1rem;
        }
        
        .container {
            padding: 0 15px;
        }
    }
  `;
}

function generateJavaScript() {
  return `
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    function toggleMenu() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
    }

    // Add scroll effect to header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Form submission
    document.querySelector('.contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    });

    // CTA button click
    document.querySelector('.cta-button').addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
  `;
}
