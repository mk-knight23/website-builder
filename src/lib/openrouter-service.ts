import { ChatRequest, ChatResponse, ChatMessage, DEFAULT_MODEL } from './openrouter';

class OpenRouterService {
  private readonly baseURL = 'https://openrouter.ai/api/v1';
  private readonly apiKey: string | undefined;

  constructor() {
    // In a real application, this would come from environment variables
    this.apiKey = process.env.OPENROUTER_API_KEY;
  }

  // Get available models (for UI display)
  getAvailableModels() {
    return [
      {
        id: 'microsoft/wizardlm-2-8x22b:free',
        name: 'WizardLM-2 8x22B',
        description: 'Advanced reasoning model with 8x22B parameters',
        context_length: 65536,
        pricing: { prompt: 0, completion: 0 }
      },
      {
        id: 'meta-llama/llama-3.2-3b-instruct:free',
        name: 'Llama 3.2 3B Instruct',
        description: 'Fast and efficient instruction following model',
        context_length: 128000,
        pricing: { prompt: 0, completion: 0 }
      },
      {
        id: 'google/gemma-2-9b-it:free',
        name: 'Gemma 2 9B IT',
        description: 'Google\'s instruction tuned model for various tasks',
        context_length: 8192,
        pricing: { prompt: 0, completion: 0 }
      },
      {
        id: 'qwen/qwen-2.5-7b-instruct:free',
        name: 'Qwen 2.5 7B Instruct',
        description: 'Alibaba\'s multilingual instruction model',
        context_length: 32768,
        pricing: { prompt: 0, completion: 0 }
      }
    ];
  }

  // Generate content for website sections
  async generateContent(prompt: string, model: string = DEFAULT_MODEL): Promise<string> {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are an expert web designer and content creator. Generate high-quality, engaging content for websites. Focus on clarity, persuasion, and user engagement.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    return this.chat(messages, model);
  }

  // Generate SEO meta descriptions
  async generateMetaDescription(content: string, model: string = DEFAULT_MODEL): Promise<string> {
    const prompt = `Generate a compelling SEO meta description (150-160 characters) for this website content: ${content}`;
    
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are an SEO expert. Create meta descriptions that are compelling, include relevant keywords, and encourage clicks.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    return this.chat(messages, model);
  }

  // Generate website copy and slogans
  async generateCopy(type: 'headline' | 'slogan' | 'about' | 'features', business: string, model: string = DEFAULT_MODEL): Promise<string> {
    const prompts = {
      headline: `Create an attention-grabbing headline for ${business}`,
      slogan: `Create a memorable slogan for ${business}`,
      about: `Write a compelling about section for ${business}`,
      features: `Generate a list of key features for ${business}`
    };

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are a professional copywriter. Create engaging, persuasive content that converts visitors into customers.'
      },
      {
        role: 'user',
        content: prompts[type]
      }
    ];

    return this.chat(messages, model);
  }

  // Chat completion method
  private async chat(messages: ChatMessage[], model: string): Promise<string> {
    // For demo purposes, we'll simulate the API call
    // In production, you would make an actual HTTP request
    try {
      // Simulated response for demo
      const responses = {
        'headline': 'Welcome to Amazing Business - Where Innovation Meets Excellence',
        'slogan': 'Empowering Your Success, One Solution at a Time',
        'about': 'We are a forward-thinking company dedicated to delivering exceptional solutions that transform businesses and enhance lives. With cutting-edge technology and a passion for innovation, we help our clients achieve their goals and exceed expectations.',
        'features': '• 24/7 Customer Support\n• Advanced Analytics Dashboard\n• Mobile-First Design\n• SEO Optimized\n• Real-time Collaboration\n• Cloud-based Security\n• API Integration Ready\n• Customizable Templates'
      };

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      // Return a simulated response
      return responses.headline || 'Generated content will appear here...';
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw new Error('Failed to generate content');
    }
  }

  // Real API method (for production use)
  private async makeRequest(request: ChatRequest): Promise<ChatResponse> {
    if (!this.apiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Website Builder'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const openRouterService = new OpenRouterService();
