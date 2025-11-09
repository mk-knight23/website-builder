'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Settings, 
  Brain, 
  Lightbulb, 
  Sparkles,
  Zap,
  Target,
  Users,
  Code,
  Palette,
  Wrench,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  X,
  Minimize2,
  Maximize2,
  MessageSquare,
  Cpu,
  Activity,
  Clock,
  Layers
} from 'lucide-react';
import { useProjectManager, GenerationSession } from '@/hooks/useProjectManager';
import toast from 'react-hot-toast';

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  isMinimized?: boolean;
  className?: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentType?: 'planner' | 'designer' | 'builder' | 'integrator' | 'testing';
  isThinking?: boolean;
  suggestions?: string[];
  attachments?: {
    type: 'screenshot' | 'code' | 'design' | 'plan';
    url: string;
    name: string;
  }[];
}

interface AgentStatus {
  type: 'planner' | 'designer' | 'builder' | 'integrator' | 'testing';
  name: string;
  status: 'idle' | 'thinking' | 'working' | 'completed' | 'error';
  progress: number;
  currentTask: string;
  estimatedTime: number;
  icon: any;
  color: string;
}

export default function AIAssistant({ isOpen, onToggle, isMinimized = false, className = '' }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hi! I\'m your AI assistant ✨ I can help you build amazing websites with autonomous planning and multi-agent coordination. What would you like to create today?',
      timestamp: new Date(),
      agentType: 'planner',
      suggestions: [
        'Build a SaaS landing page',
        'Create an e-commerce site', 
        'Design a portfolio website',
        'Upload a screenshot to recreate',
        'Start a collaborative project'
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeSession, setActiveSession] = useState<GenerationSession | null>(null);
  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { generateWebsiteAI, uploadScreenshot, generationSession, isGenerating } = useProjectManager();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update agent statuses when generation session changes
  useEffect(() => {
    if (generationSession) {
      setActiveSession(generationSession);
      updateAgentStatuses(generationSession);
    }
  }, [generationSession]);

  const updateAgentStatuses = (session: GenerationSession) => {
    const agents: AgentStatus[] = [
      {
        type: 'planner',
        name: 'Architecture Planner',
        status: getAgentStatus(session, 'planner'),
        progress: getAgentProgress(session, 'planner'),
        currentTask: 'Analyzing requirements...',
        estimatedTime: 30,
        icon: Brain,
        color: 'from-blue-500 to-purple-500'
      },
      {
        type: 'designer',
        name: 'Visual Designer',
        status: getAgentStatus(session, 'designer'),
        progress: getAgentProgress(session, 'designer'),
        currentTask: 'Creating visual designs...',
        estimatedTime: 45,
        icon: Palette,
        color: 'from-pink-500 to-rose-500'
      },
      {
        type: 'builder',
        name: 'Code Builder',
        status: getAgentStatus(session, 'builder'),
        progress: getAgentProgress(session, 'builder'),
        currentTask: 'Building components...',
        estimatedTime: 60,
        icon: Code,
        color: 'from-green-500 to-emerald-500'
      },
      {
        type: 'integrator',
        name: 'Integration Specialist',
        status: getAgentStatus(session, 'integrator'),
        progress: getAgentProgress(session, 'integrator'),
        currentTask: 'Integrating features...',
        estimatedTime: 30,
        icon: Wrench,
        color: 'from-orange-500 to-amber-500'
      },
      {
        type: 'testing',
        name: 'Quality Assurance',
        status: getAgentStatus(session, 'testing'),
        progress: getAgentProgress(session, 'testing'),
        currentTask: 'Running tests...',
        estimatedTime: 20,
        icon: CheckCircle,
        color: 'from-cyan-500 to-teal-500'
      }
    ];

    setAgentStatuses(agents);
  };

  const getAgentStatus = (session: GenerationSession, agentType: string) => {
    if (session.current_agent === agentType && session.status === 'active') {
      return 'working';
    }
    
    const plan = session.agent_plans.find(p => p.agent_type === agentType);
    if (plan) {
      switch (plan.status) {
        case 'completed': return 'completed';
        case 'executing': return 'working';
        case 'failed': return 'error';
        default: return 'idle';
      }
    }
    
    return 'idle';
  };

  const getAgentProgress = (session: GenerationSession, agentType: string) => {
    if (session.current_agent === agentType) {
      return session.progress;
    }
    
    const plan = session.agent_plans.find(p => p.agent_type === agentType);
    return plan?.progress || 0;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Analyze user intent and provide intelligent response
      const response = await processUserInput(inputValue);
      
      setIsTyping(false);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        agentType: response.primaryAgent,
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Handle specific actions
      if (response.action) {
        await handleAction(response.action, inputValue);
      }

    } catch (error) {
      setIsTyping(false);
      console.error('Error processing message:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const processUserInput = async (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Intent recognition
    if (lowerInput.includes('build') || lowerInput.includes('create') || lowerInput.includes('generate')) {
      return {
        content: 'I\'ll help you build a website! Let me start the autonomous planning process. First, I need to understand your requirements better. What type of website do you want to create?',
        primaryAgent: 'planner' as const,
        suggestions: [
          'SaaS landing page for my startup',
          'E-commerce store for my products',
          'Portfolio to showcase my work',
          'Restaurant website with online menu',
          'Corporate site for my company'
        ],
        action: { type: 'website_generation', phase: 'planning' }
      };
    }
    
    if (lowerInput.includes('screenshot') || lowerInput.includes('image') || lowerInput.includes('recreate')) {
      return {
        content: 'Perfect! I can analyze screenshots and recreate websites from them. This is a powerful feature inspired by v0.app. Please upload your screenshot and I\'ll detect components and generate a similar design.',
        primaryAgent: 'designer' as const,
        suggestions: [
          'Upload website screenshot',
          'Recreate mobile design',
          'Analyze layout structure',
          'Extract color scheme',
          'Generate similar components'
        ],
        action: { type: 'screenshot_upload' }
      };
    }
    
    if (lowerInput.includes('collaborat') || lowerInput.includes('team') || lowerInput.includes('multiplayer')) {
      return {
        content: 'Great! I can set up real-time collaboration for your project. This includes live cursors, shared editing, and team workspaces inspired by Bolt.new\'s collaborative features.',
        primaryAgent: 'integrator' as const,
        suggestions: [
          'Create team workspace',
          'Invite collaborators',
          'Enable live editing',
          'Set up permissions',
          'Share project link'
        ],
        action: { type: 'collaboration_setup' }
      };
    }
    
    if (lowerInput.includes('improve') || lowerInput.includes('optimize') || lowerInput.includes('enhance')) {
      return {
        content: 'I can help optimize and enhance your existing website! I\'ll run automated analysis and suggest improvements for performance, accessibility, and user experience.',
        primaryAgent: 'testing' as const,
        suggestions: [
          'Optimize performance',
          'Improve accessibility',
          'Enhance SEO',
          'Mobile responsiveness',
          'Security audit'
        ],
        action: { type: 'optimization' }
      };
    }

    // Default intelligent response
    return {
      content: 'I understand you want to work on your website! I can help with autonomous planning, visual design, code generation, and optimization. What specific aspect would you like to focus on?',
      primaryAgent: 'planner' as const,
      suggestions: [
        'Generate new website',
        'Upload screenshot to recreate',
        'Optimize existing project',
        'Set up team collaboration',
        'Get design recommendations'
      ]
    };
  };

  const handleAction = async (action: any, userInput: string) => {
    switch (action.type) {
      case 'website_generation':
        // Extract project details from user input
        const projectDetails = extractProjectDetails(userInput);
        if (projectDetails) {
          const loadingMessage: ChatMessage = {
            id: 'loading-' + Date.now(),
            type: 'system',
            content: 'Starting autonomous website generation with multi-agent coordination...',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, loadingMessage]);

          try {
            await generateWebsiteAI(
              projectDetails.businessName,
              projectDetails.websiteType,
              projectDetails.prompt
            );
            
            // Remove loading message
            setMessages(prev => prev.filter(m => m.id !== loadingMessage.id));
            
          } catch (error) {
            setMessages(prev => prev.filter(m => m.id !== loadingMessage.id));
            toast.error('Failed to start website generation');
          }
        }
        break;

      case 'screenshot_upload':
        // This would trigger file upload UI
        const uploadPrompt: ChatMessage = {
          id: 'upload-prompt',
          type: 'system',
          content: 'Please upload a screenshot to analyze. Supported formats: PNG, JPG, WebP. I\'ll detect components and recreate the design.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, uploadPrompt]);
        break;

      case 'collaboration_setup':
        // Handle collaboration setup
        const collabMessage: ChatMessage = {
          id: 'collab-setup',
          type: 'system',
          content: 'Setting up team collaboration features. Creating workspace and enabling real-time editing...',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, collabMessage]);
        break;

      default:
        break;
    }
  };

  const extractProjectDetails = (input: string) => {
    // Simple extraction logic - in production, this would be more sophisticated
    const businessName = input.match(/for\s+([A-Za-z\s]+?)(?:\s|$|\.|\,)/)?.[1]?.trim() || 'My Business';
    const websiteType = input.includes('saas') ? 'saas' :
                       input.includes('ecommerce') || input.includes('shop') ? 'ecommerce' :
                       input.includes('portfolio') ? 'portfolio' :
                       input.includes('restaurant') ? 'restaurant' :
                       input.includes('corporate') ? 'business' : 'modern';
    
    return {
      businessName,
      websiteType,
      prompt: input
    };
  };

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    // Voice recognition logic would go here
    setIsListening(true);
    toast.success('Voice input started - say your request');
    
    setTimeout(() => {
      setIsListening(false);
      toast.dismiss();
    }, 3000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  if (!isOpen) {
    return (
      <motion.div
        className={`fixed bottom-6 right-6 z-50 ${className}`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.button
          onClick={onToggle}
          className="w-16 h-16 bg-gradient-sky rounded-2xl flex items-center justify-center shadow-glow-sky cursor-pointer border border-sky-300/30 backdrop-blur-sm"
          whileHover={{
            scale: 1.1,
            rotate: 5,
            boxShadow: "0 0 30px rgba(14, 165, 233, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Bot className="h-8 w-8 text-white drop-shadow-sm" />
          </motion.div>
          
          {/* Active indicator */}
          {(isGenerating || activeSession) && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>
        
        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-sky-400/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`fixed bottom-6 right-6 z-50 ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 100 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Card className="w-96 h-[600px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-sky-200/50 dark:border-slate-700/50 shadow-glow-sky overflow-hidden">
        
        {/* Header */}
        <CardHeader className="pb-3 border-b border-sky-200/30 dark:border-slate-700/30 bg-gradient-sky/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-gradient-sky rounded-xl flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(14, 165, 233, 0.3)',
                    '0 0 30px rgba(14, 165, 233, 0.6)',
                    '0 0 20px rgba(14, 165, 233, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bot className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  AI Assistant
                </CardTitle>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isGenerating ? 'Generating website...' : 'Autonomous planning enabled'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onToggle}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Agent Status Bar */}
        {activeSession && (
          <div className="px-4 py-2 bg-sky-50/50 dark:bg-sky-900/20 border-b border-sky-200/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-sky-700 dark:text-sky-300">
                Multi-Agent Coordination
              </span>
              <Badge variant="secondary" className="text-xs">
                {activeSession.progress}% Complete
              </Badge>
            </div>
            
            <div className="space-y-1">
              {agentStatuses.map((agent) => {
                const Icon = agent.icon;
                return (
                  <div key={agent.type} className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${
                      agent.status === 'completed' ? 'bg-green-500' :
                      agent.status === 'working' ? 'bg-yellow-500' :
                      agent.status === 'error' ? 'bg-red-500' : 'bg-gray-300'
                    }`} />
                    <Icon className="h-3 w-3" />
                    <span className="text-slate-600 dark:text-slate-300">
                      {agent.name}
                    </span>
                    {agent.status === 'working' && (
                      <div className="flex-1 mx-2">
                        <Progress value={agent.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${
                  message.type === 'user' 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                } rounded-2xl px-4 py-3`}>
                  
                  {/* Agent Type Badge */}
                  {message.agentType && (
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {message.agentType}
                      </Badge>
                    </div>
                  )}
                  
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  
                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs opacity-70">Try asking:</p>
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="w-full text-left text-xs h-auto p-2 justify-start"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-xs opacity-50 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="h-4 w-4 text-sky-500" />
                  </motion.div>
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-sky-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ 
                          duration: 0.6, 
                          repeat: Infinity, 
                          delay: i * 0.2 
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input Area */}
        <div className="p-4 border-t border-sky-200/30 dark:border-slate-700/30">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Describe your vision..."
                className="pr-12 border-sky-200/50 focus:border-sky-500"
                disabled={isGenerating}
              />
              
              {/* Voice input button */}
              <Button
                variant="ghost"
                size="sm"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                  isListening ? 'text-red-500' : 'text-slate-500'
                }`}
                onClick={handleVoiceInput}
                disabled={isGenerating}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isGenerating}
              className="bg-sky-500 hover:bg-sky-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}