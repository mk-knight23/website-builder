// OpenRouter API Service Configuration
export interface OpenRouterModel {
  id: string;
  name: string;
  description: string;
  context_length: number;
  pricing: {
    prompt: number;
    completion: number;
  };
  top_provider: {
    max_completion_tokens: number;
  };
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  model: string;
  messages: ChatMessage[];
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: ChatMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Free models available on OpenRouter
export const FREE_MODELS: OpenRouterModel[] = [
  {
    id: 'microsoft/wizardlm-2-8x22b:free',
    name: 'WizardLM-2 8x22B',
    description: 'Advanced reasoning model with 8x22B parameters',
    context_length: 65536,
    pricing: { prompt: 0, completion: 0 },
    top_provider: { max_completion_tokens: 8000 }
  },
  {
    id: 'meta-llama/llama-3.2-3b-instruct:free',
    name: 'Llama 3.2 3B Instruct',
    description: 'Fast and efficient instruction following model',
    context_length: 128000,
    pricing: { prompt: 0, completion: 0 },
    top_provider: { max_completion_tokens: 8000 }
  },
  {
    id: 'google/gemma-2-9b-it:free',
    name: 'Gemma 2 9B IT',
    description: 'Google\'s instruction tuned model for various tasks',
    context_length: 8192,
    pricing: { prompt: 0, completion: 0 },
    top_provider: { max_completion_tokens: 4000 }
  },
  {
    id: 'qwen/qwen-2.5-7b-instruct:free',
    name: 'Qwen 2.5 7B Instruct',
    description: 'Alibaba\'s multilingual instruction model',
    context_length: 32768,
    pricing: { prompt: 0, completion: 0 },
    top_provider: { max_completion_tokens: 8000 }
  }
];

export const DEFAULT_MODEL = 'microsoft/wizardlm-2-8x22b:free';
