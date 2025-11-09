'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Sparkles, 
  Layout, 
  Palette, 
  Code, 
  Eye, 
  Zap, 
  Star,
  TrendingUp,
  Users,
  User,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Download,
  Share2,
  Heart,
  Play,
  ArrowRight,
  Settings,
  Moon,
  Sun,
  Menu,
  X,
  Search,
  Bell,
  Plus,
  Activity,
  Layers,
  FileText,
  Image,
  MousePointer,
  Lightbulb,
  Rocket,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Bot,
  ChevronRight,
  Grid3X3,
  Laptop,
  Cpu,
  Check,
  Sliders,
  Wrench,
  ChevronDown,
  ExternalLink,
  Copy,
  Save,
  RefreshCw,
  Brain,
  Upload,
  Camera,
  Users2,
  Webhook,
  Shield,
  Clock,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';

import AIAssistant from '@/components/ai-assistant';
import ScreenshotUploader from '@/components/screenshot-uploader';
import VisualCanvas from '@/components/visual-canvas';
import ModernTemplateGallery from '@/components/modern-template-gallery';
import ModernCodeViewer from '@/components/modern-code-viewer';
import { useProjectManager, GenerationSession, ScreenshotAnalysis } from '@/hooks/useProjectManager';
import toast from 'react-hot-toast';

// Enhanced hero tagline as requested
const HERO_TAGLINE = "Build your dream website in minutes with AI ✨";
const CHAT_PLACEHOLDER = "Describe your vision...";
const GENERATE_CTA = "Generate Website";

export default function WebsiteBuilderPro() {
  // Core state management
  const [activeSection, setActiveSection] = useState('builder');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [activeTab, setActiveTab] = useState('preview');
  
  // AI-powered features state
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isScreenshotUploaderOpen, setIsScreenshotUploaderOpen] = useState(false);
  const [isVisualCanvasOpen, setIsVisualCanvasOpen] = useState(false);
  const [screenshotAnalysis, setScreenshotAnalysis] = useState<ScreenshotAnalysis | null>(null);
  const [agentModeEnabled, setAgentModeEnabled] = useState(false);
  const [collaborationMode, setCollaborationMode] = useState(false);
  const [showImportScreenshot, setShowImportScreenshot] = useState(false);
  
  // Project and generation state
  const [businessName, setBusinessName] = useState('');
  const [websiteType, setWebsiteType] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [currentProject, setCurrentProject] = useState<any>(null);
  
  // Token system
  const [tokenBalance, setTokenBalance] = useState(150000);
  const [usedTokens, setUsedTokens] = useState(0);
  
  // Enhanced hooks
  const { 
    generateWebsiteAI, 
    uploadScreenshot, 
    generationSession, 
    isGenerating: isAIGenerating, 
    user, 
    projects 
  } = useProjectManager();

  // Enhanced project creation with AI planning
  const handleEnhancedGenerate = async () => {
    if (!businessName || !websiteType || !userPrompt) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (tokenBalance < 1000) {
      toast.error('Insufficient tokens for generation');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setAgentModeEnabled(true);

    try {
      const result = await generateWebsiteAI(
        businessName,
        websiteType, 
        userPrompt,
        {
          useScreenshot: !!screenshotAnalysis,
          screenshotAnalysis: screenshotAnalysis || undefined,
          agentMode: agentModeEnabled,
          collaborative: collaborationMode
        }
      );

      if (result) {
        setCurrentProject(result);
        setUsedTokens(prev => prev + result.token_cost);
        setTokenBalance(prev => prev - result.token_cost);
        toast.success('Website generated with AI! 🎉');
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Failed to generate website');
    } finally {
      setIsGenerating(false);
      setAgentModeEnabled(false);
    }
  };

  // Screenshot upload and analysis
  const handleScreenshotUpload = async (analysis: ScreenshotAnalysis) => {
    setScreenshotAnalysis(analysis);
    setIsScreenshotUploaderOpen(false);
    toast.success('Screenshot analyzed! Components detected.');
    
    // Pre-fill the prompt with analysis insights
    const analysisPrompt = `Create a website similar to the uploaded screenshot. Detected ${analysis.components_detected.length} components including ${analysis.components_detected.map(c => c.type).join(', ')}. Use colors: ${analysis.color_palette.join(', ')}`;
    
    if (!userPrompt) {
      setUserPrompt(analysisPrompt);
    }
  };

  // Enhanced templates with screenshot import
  const templates = [
    {
      id: 1,
      name: 'Creative Portfolio',
      category: 'Portfolio',
      emoji: '🎨',
      downloads: '1.2k',
      rating: 4.9,
      gradient: 'from-sky-500 to-blue-600',
      aiPrompt: 'Create a stunning creative portfolio with modern design, smooth animations, and mobile-first responsive layout. Include sections for projects, about, and contact with professional typography.',
      features: ['Responsive Design', 'Dark Mode', 'Animation', 'SEO Optimized', 'Contact Form']
    },
    {
      id: 2,
      name: 'SaaS Startup',
      category: 'Business',
      emoji: '🚀',
      downloads: '2.1k',
      rating: 4.8,
      gradient: 'from-blue-500 to-sky-600',
      aiPrompt: 'Build a modern SaaS landing page with feature highlights, pricing tables, testimonials, and conversion-focused design. Include analytics integration and lead capture forms.',
      features: ['Pricing Tables', 'Feature Comparison', 'Lead Forms', 'Analytics', 'A/B Testing']
    },
    {
      id: 3,
      name: 'Restaurant',
      category: 'Food',
      emoji: '🍕',
      downloads: '890',
      rating: 4.7,
      gradient: 'from-cyan-500 to-blue-500',
      aiPrompt: 'Design an elegant restaurant website with online menu, reservation system, location map, and online ordering. Include image galleries and customer reviews.',
      features: ['Online Menu', 'Reservations', 'Online Ordering', 'Location Map', 'Reviews']
    },
    {
      id: 4,
      name: 'E-commerce',
      category: 'Shop',
      emoji: '🛍️',
      downloads: '1.8k',
      rating: 4.9,
      gradient: 'from-sky-600 to-cyan-600',
      aiPrompt: 'Create a complete e-commerce solution with product catalog, shopping cart, checkout, payment integration, and admin dashboard. Include product search and filtering.',
      features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Admin Panel', 'Inventory']
    }
  ];

  // Dynamic stats with real-time updates
  const stats = [
    {
      icon: Globe,
      label: 'Websites Created',
      value: (12847 + projects.length * 3).toLocaleString(),
      change: '+24%',
      color: 'text-sky-600',
      bgColor: 'bg-sky-100/50',
      borderColor: 'border-sky-200/50'
    },
    {
      icon: Users,
      label: 'Active Users',
      value: (3421 + projects.filter(p => p.is_collaborative).length * 2).toLocaleString(),
      change: '+18%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100/50',
      borderColor: 'border-blue-200/50'
    },
    {
      icon: TrendingUp,
      label: 'Success Rate',
      value: '98.5%',
      change: '+2%',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100/50',
      borderColor: 'border-cyan-200/50'
    },
    {
      icon: Activity,
      label: 'Uptime',
      value: '99.9%',
      change: '0%',
      color: 'text-sky-700',
      bgColor: 'bg-sky-100/50',
      borderColor: 'border-sky-200/50',
      status: 'operational'
    }
  ];

  // Agent coordination status
  const getAgentStatus = () => {
    if (!generationSession) return null;
    
    const agentNames = {
      planner: 'Architecture Planner',
      designer: 'Visual Designer', 
      builder: 'Code Builder',
      integrator: 'Integration Specialist',
      testing: 'Quality Assurance'
    };
    
    const currentAgent = agentNames[generationSession.current_agent as keyof typeof agentNames];
    
    return {
      current: currentAgent,
      progress: generationSession.progress,
      message: generationSession.current_message,
      status: generationSession.status
    };
  };

  // Template selection with screenshot import
  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setUserPrompt(template.aiPrompt);
    setBusinessName(`${template.name} Project`);
    setWebsiteType(template.category.toLowerCase());
    toast.success(`Template "${template.name}" selected!`);
  };

  // Import screenshot for template
  const handleImportScreenshot = (templateId: number) => {
    setIsScreenshotUploaderOpen(true);
    setShowImportScreenshot(true);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'dark' : ''}`}>
      {/* Enhanced Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-sky-100 via-sky-50 to-blue-100 dark:from-slate-900 dark:via-sky-950 dark:to-slate-900" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(14,165,233,0.2),rgba(30,58,138,0.1),rgba(255,255,255,0))]" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_20%,rgba(14,165,233,0.1),rgba(255,255,255,0))]" />
      
      {/* Main Layout */}
      <div className="relative z-10 flex min-h-screen">
        
        {/* Enhanced Sidebar */}
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: sidebarOpen ? 0 : -320, opacity: sidebarOpen ? 1 : 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed lg:relative z-30 w-80 h-screen bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border-r border-sky-300/30 dark:border-slate-700/30 shadow-glow-sky overflow-y-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Enhanced Header */}
          <div className="p-6 border-b border-sky-300/30 dark:border-slate-700/30 bg-gradient-sky-futuristic shadow-glow-futuristic">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-lg"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(14, 165, 233, 0.3)',
                    '0 0 30px rgba(14, 165, 233, 0.5)',
                    '0 0 20px rgba(14, 165, 233, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-2xl">🌐</span>
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white drop-shadow-sm">
                  <span className="bg-gradient-to-r from-white to-sky-100 bg-clip-text text-transparent">
                    Website Builder Pro
                  </span>
                </h1>
                <p className="text-sm text-white/80">AI-Powered Creation</p>
              </div>
            </motion.div>
          </div>

          {/* AI Agent Status */}
          {agentModeEnabled && (
            <div className="p-4 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border-b border-sky-200/30">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-sky-600" />
                <span className="text-sm font-medium text-sky-800 dark:text-sky-200">Agent Mode Active</span>
              </div>
              {getAgentStatus() && (
                <div className="space-y-2">
                  <p className="text-xs text-sky-700 dark:text-sky-300">
                    {getAgentStatus()?.current}: {getAgentStatus()?.message}
                  </p>
                  <Progress value={getAgentStatus()?.progress || 0} className="h-1" />
                </div>
              )}
            </div>
          )}

          {/* Enhanced Project Setup */}
          <div className="p-6">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {/* Business Name */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-2 border-sky-200/60 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-sky-300">
                  <AccordionItem value="business-name" className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Globe className="h-4 w-4 text-white" />
                        </motion.div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Business Name</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3">
                      <Input
                        placeholder="e.g., Nova Studio"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="border-sky-200/60 focus:border-sky-500 bg-white/70 dark:bg-slate-700/70 rounded-lg focus:shadow-glow"
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              </motion.div>

              {/* Enhanced Website Type with Screenshot Import */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-2 border-blue-200/60 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-blue-300">
                  <AccordionItem value="website-type" className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-8 h-8 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Layout className="h-4 w-4 text-white" />
                        </motion.div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Website Type</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 space-y-3">
                      <Select value={websiteType} onValueChange={setWebsiteType}>
                        <SelectTrigger className="border-blue-200/60 focus:border-sky-500 bg-white/70 dark:bg-slate-700/70 rounded-lg focus:shadow-glow">
                          <SelectValue placeholder="Select website type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="portfolio">🎨 Creative Portfolio</SelectItem>
                          <SelectItem value="saas">🚀 SaaS Startup</SelectItem>
                          <SelectItem value="restaurant">🍕 Restaurant</SelectItem>
                          <SelectItem value="ecommerce">🛍️ E-commerce</SelectItem>
                          <SelectItem value="blog">📝 Blog</SelectItem>
                          <SelectItem value="business">💼 Business</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {/* Screenshot Import per v0.app */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsScreenshotUploaderOpen(true)}
                        className="w-full border-dashed border-sky-300 hover:border-sky-400"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Import Screenshot
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              </motion.div>

              {/* Enhanced AI Model Selection */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-2 border-cyan-200/60 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-cyan-300">
                  <AccordionItem value="ai-model" className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 15 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Bot className="h-4 w-4 text-white" />
                        </motion.div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">AI Assistant</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Agent Mode</span>
                          <Button
                            variant={agentModeEnabled ? "default" : "outline"}
                            size="sm"
                            onClick={() => setAgentModeEnabled(!agentModeEnabled)}
                          >
                            {agentModeEnabled ? 'On' : 'Off'}
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Collaboration</span>
                          <Button
                            variant={collaborationMode ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCollaborationMode(!collaborationMode)}
                          >
                            {collaborationMode ? 'Active' : 'Inactive'}
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAIAssistantOpen(true)}
                        className="w-full"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Open AI Assistant
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              </motion.div>

              {/* Enhanced Description with Chat Input */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-2 border-sky-200/60 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-sky-300">
                  <AccordionItem value="description" className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-8 h-8 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FileText className="h-4 w-4 text-white" />
                        </motion.div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Vision</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3">
                      <Textarea
                        rows={3}
                        placeholder={CHAT_PLACEHOLDER}
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        className="border-sky-200/60 focus:border-sky-500 bg-white/70 dark:bg-slate-700/70 rounded-lg resize-none focus:shadow-glow"
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              </motion.div>
            </Accordion>
          </div>

          {/* Enhanced Templates Section with Screenshot Import */}
          <div className="px-6 pb-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-sky-500" />
                Popular Templates
              </h3>
              <div className="space-y-3">
                {templates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ x: 4, scale: 1.02 }}
                    className="cursor-pointer"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="border border-sky-200/40 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                      <div className={`h-16 bg-gradient-to-r ${template.gradient} flex items-center justify-center relative`}>
                        <motion.span
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          transition={{ duration: 0.3 }}
                        >
                          {template.emoji}
                        </motion.span>
                        
                        {/* Screenshot Import Button per Template */}
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImportScreenshot(template.id);
                          }}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                        >
                          <Camera className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-sm text-slate-800 dark:text-slate-200">{template.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{template.category}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Star className="h-3 w-3" />
                            {template.rating}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleTemplateSelect(template)}
                            className="h-6 px-2 text-xs"
                          >
                            Use
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Token Management */}
          <div className="px-6 pb-6">
            <Card className="border-2 border-sky-200/60 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Token Balance</span>
                  <Badge className="bg-sky-100 text-sky-700">
                    {tokenBalance.toLocaleString()} / day
                  </Badge>
                </div>
                <Progress value={(tokenBalance / 150000) * 100} className="h-2 mb-2" />
                <p className="text-xs text-slate-500">
                  {usedTokens.toLocaleString()} tokens used today
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-h-screen">
          
          {/* Enhanced Top Navigation */}
          <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-sky-200/50 dark:border-slate-700/50 shadow-lg">
            <div className="flex items-center justify-between px-6 py-4">
              
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden hover:bg-sky-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
                
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-lg">🌐</div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-slate-500 dark:text-slate-400">Builder</span>
                      <ChevronRight className="h-3 w-3 text-slate-400" />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">AI-Powered</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Right Section */}
              <div className="flex items-center gap-3">
                {/* Agent Status Indicator */}
                {agentModeEnabled && (
                  <Badge className="bg-gradient-to-r from-sky-500 to-blue-500 text-white">
                    <Brain className="h-3 w-3 mr-1" />
                    Agent Mode
                  </Badge>
                )}
                
                <Button variant="ghost" size="sm" className="hover:bg-sky-100 dark:hover:bg-slate-800 rounded-xl">
                  <Sliders className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-sky-100 dark:hover:bg-slate-800 rounded-xl">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsDark(!isDark)}
                  className="hover:bg-sky-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white shadow-lg rounded-xl">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </div>
            </div>
          </header>

          {/* Enhanced Main Content */}
          <div className="flex-1 flex gap-6 p-6 overflow-auto">
            
            {/* Enhanced Left Side - Hero Section */}
            <div className="flex-1 space-y-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <motion.h1
                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-sky-500 via-blue-500 to-sky-600 bg-clip-text text-transparent mb-6"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    {HERO_TAGLINE}
                  </motion.h1>
                  <motion.p
                    className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {userPrompt || "Describe your vision. Our AI crafts your design, layout, and code — instantly."}
                  </motion.p>
                </motion.div>
                
                {/* Enhanced CTA Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handleEnhancedGenerate}
                      disabled={isGenerating || isAIGenerating}
                      className="relative bg-gradient-sky hover:shadow-glow-sky text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transition-all duration-300 group overflow-hidden border-0"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        animate={isGenerating ? { x: ['-100%', '200%'] } : {}}
                        transition={{ duration: 2, repeat: isGenerating ? Infinity : 0, ease: "easeInOut" }}
                      />
                      {isGenerating || isAIGenerating ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                          />
                          Generating Magic...
                        </>
                      ) : (
                        <>
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Zap className="h-5 w-5 mr-3" />
                          </motion.div>
                          {GENERATE_CTA}
                          <motion.div
                            className="ml-3"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ArrowRight className="h-5 w-5 inline" />
                          </motion.div>
                        </>
                      )}
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => setIsVisualCanvasOpen(true)}
                      className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-sky-300/50 hover:bg-sky-50/50 dark:hover:bg-sky-900/20 transition-all duration-300 hover:border-sky-400 hover:shadow-glow"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Palette className="h-5 w-5 mr-3" />
                      </motion.div>
                      Visual Editor
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Enhanced AI Checklist */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400"
                >
                  {[
                    'AI-powered generation',
                    'Multi-agent coordination',
                    'Screenshot-to-code',
                    'Real-time collaboration',
                    'Visual drag-drop editing',
                    'One-click deployment'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(14, 165, 233, 0.15)"
                      }}
                      className="flex items-center gap-2 bg-white/40 dark:bg-slate-800/40 px-3 py-2 rounded-lg backdrop-blur-sm border border-sky-200/30"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 500 }}
                      >
                        <CheckCircle2 className="h-4 w-4 text-sky-500" />
                      </motion.div>
                      {item}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Enhanced Generation Progress */}
                {(isGenerating || isAIGenerating) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto"
                  >
                    <Card className="border-2 border-sky-200 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl shadow-glow-sky">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <motion.div
                            className="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg flex items-center justify-center"
                            animate={{
                              boxShadow: [
                                '0 0 20px rgba(14, 165, 233, 0.4)',
                                '0 0 30px rgba(14, 165, 233, 0.6)',
                                '0 0 20px rgba(14, 165, 233, 0.4)'
                              ]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <Brain className="h-4 w-4 text-white" />
                            </motion.div>
                          </motion.div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {generationSession?.current_message || 'AI is crafting your website...'}
                          </span>
                        </div>
                        <Progress value={generationSession?.progress || generationProgress} className="h-2" />
                        <motion.p
                          className="text-sm text-slate-600 dark:text-slate-400 mt-2"
                          key={generationSession?.progress || generationProgress}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {Math.round(generationSession?.progress || generationProgress)}% complete
                        </motion.p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>

              {/* Enhanced Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Brain,
                    title: 'AI Agent Mode',
                    description: 'Autonomous planning with multi-agent coordination',
                    gradient: 'from-purple-400 to-pink-500'
                  },
                  {
                    icon: Camera,
                    title: 'Screenshot-to-Code',
                    description: 'Upload images and recreate them as websites',
                    gradient: 'from-cyan-400 to-blue-500'
                  },
                  {
                    icon: Users2,
                    title: 'Real-time Collaboration',
                    description: 'Work together with live cursors and shared editing',
                    gradient: 'from-green-400 to-emerald-500'
                  },
                  {
                    icon: Palette,
                    title: 'Visual Canvas',
                    description: 'Figma-like drag-drop interface for components',
                    gradient: 'from-orange-400 to-red-500'
                  },
                  {
                    icon: Zap,
                    title: 'Lightning Fast',
                    description: 'Generate complete websites in minutes',
                    gradient: 'from-yellow-400 to-orange-500'
                  },
                  {
                    icon: Shield,
                    title: 'Production Ready',
                    description: 'Secure, optimized, and deployment-ready code',
                    gradient: 'from-sky-400 to-blue-500'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(14, 165, 233, 0.2)"
                    }}
                    className="group cursor-pointer"
                  >
                    <Card className="h-full border-2 border-sky-200/30 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl hover:shadow-glow-sky transition-all duration-500 group-hover:border-opacity-70">
                      <CardContent className="p-6 text-center">
                        <motion.div
                          className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                          animate={{
                            y: [0, -5, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        >
                          <feature.icon className="h-8 w-8 text-white drop-shadow-sm" />
                        </motion.div>
                        <motion.h3
                          className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          {feature.title}
                        </motion.h3>
                        <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Analytics Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 15px 30px rgba(14, 165, 233, 0.2)"
                    }}
                  >
                    <Card className={`border-2 ${stat.borderColor} bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl hover:shadow-glow-sky transition-all duration-500 shadow-lg`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center border border-white/20`}
                            whileHover={{
                              scale: 1.1,
                              rotate: 10
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                          </motion.div>
                          {stat.status === 'operational' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 1.5 + index * 0.1, type: "spring", stiffness: 300 }}
                            >
                              <Badge className="text-green-600 bg-green-100/80 font-medium">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Live
                              </Badge>
                            </motion.div>
                          )}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.5 + index * 0.1, type: "spring", stiffness: 300 }}
                          >
                            <Badge variant="secondary" className="text-green-600 bg-green-100/80 font-medium">
                              {stat.change}
                            </Badge>
                          </motion.div>
                        </div>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.3 + index * 0.1 }}
                        >
                          <motion.p
                            className="text-2xl font-bold text-slate-900 dark:text-white"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {stat.value}
                          </motion.p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Enhanced Right Panel - Live Preview with Tabs */}
            <div className="w-96 space-y-4">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <Card className="border border-sky-200/30 bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl shadow-glow-sky">
                  <div className="flex items-center justify-between p-4 border-b border-sky-200/30">
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Eye className="h-4 w-4 text-sky-600" />
                      </motion.div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Live Preview</span>
                    </motion.div>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-3 bg-sky-100/30 dark:bg-slate-700/30 backdrop-blur-sm">
                        <TabsTrigger
                          value="preview"
                          className="data-[state=active]:bg-sky-500 data-[state=active]:text-white text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </TabsTrigger>
                        <TabsTrigger
                          value="canvas"
                          className="data-[state=active]:bg-sky-500 data-[state=active]:text-white text-xs"
                        >
                          <Palette className="h-3 w-3 mr-1" />
                          Canvas
                        </TabsTrigger>
                        <TabsTrigger
                          value="code"
                          className="data-[state=active]:bg-sky-500 data-[state=active]:text-white text-xs"
                        >
                          <Code className="h-3 w-3 mr-1" />
                          Code
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="p-4">
                    {/* Enhanced Device Switcher */}
                    <motion.div
                      className="flex items-center justify-center gap-2 mb-4"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.7 }}
                    >
                      {[
                        { mode: 'desktop', icon: Monitor, label: 'Desktop' },
                        { mode: 'tablet', icon: Tablet, label: 'Tablet' },
                        { mode: 'mobile', icon: Smartphone, label: 'Mobile' },
                      ].map((option) => (
                        <motion.div key={option.mode} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant={activeDevice === option.mode ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveDevice(option.mode)}
                            className={`px-3 py-1.5 text-xs rounded-lg transition-all duration-300 ${
                              activeDevice === option.mode
                                ? 'bg-sky-500 text-white shadow-glow'
                                : 'border-sky-300/50 hover:bg-sky-50/50 dark:hover:bg-sky-900/20'
                            }`}
                          >
                            <option.icon className="h-3 w-3 mr-1" />
                            {option.label}
                          </Button>
                        </motion.div>
                      ))}
                    </motion.div>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsContent value="preview" className="mt-0">
                        <motion.div
                          className={`bg-gradient-to-br from-sky-50/50 to-blue-50/50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl p-8 text-center min-h-[400px] flex items-center justify-center backdrop-blur-sm border border-sky-200/30 ${
                            activeDevice === 'mobile' ? 'max-w-sm mx-auto' :
                            activeDevice === 'tablet' ? 'max-w-2xl mx-auto' : ''
                          }`}
                          key={activeDevice}
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-4">
                            <motion.div
                              animate={isGenerating ? {
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                              } : {}}
                              transition={{ duration: 2, repeat: isGenerating ? Infinity : 0 }}
                            >
                              <motion.div
                                className={isGenerating ? "shadow-glow-sky" : ""}
                                animate={isGenerating ? {
                                  boxShadow: [
                                    '0 0 20px rgba(14, 165, 233, 0.3)',
                                    '0 0 30px rgba(14, 165, 233, 0.6)',
                                    '0 0 20px rgba(14, 165, 233, 0.3)'
                                  ]
                                } : {}}
                                transition={{ duration: 1.5, repeat: isGenerating ? Infinity : 0 }}
                              >
                                <Layers className="h-20 w-20 text-sky-400 mx-auto" />
                              </motion.div>
                            </motion.div>
                            <h4 className="text-2xl font-bold text-slate-600 dark:text-slate-300">
                              {isGenerating ? 'Creating your website...' : 'Ready to preview?'}
                            </h4>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md">
                              {isGenerating
                                ? 'Our AI is crafting a beautiful, responsive website tailored to your needs.'
                                : 'Generate your website to see the live preview here.'
                              }
                            </p>
                          </div>
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="canvas" className="mt-0">
                        <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 min-h-[400px] border border-sky-200/20 flex items-center justify-center">
                          <div className="text-center">
                            <Palette className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                            <p className="text-slate-300 mb-4">Visual Canvas Editor</p>
                            <Button
                              onClick={() => setIsVisualCanvasOpen(true)}
                              className="bg-sky-500 hover:bg-sky-600"
                            >
                              Open Canvas
                            </Button>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="code" className="mt-0">
                        <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 min-h-[400px] border border-sky-200/20">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                <Copy className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </div>
                          <pre className="text-slate-300 text-sm">
                            <code>{`// Generated website code will appear here
import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <h1 className="text-4xl font-bold text-center text-sky-600">
        Your Amazing Website
      </h1>
    </div>
  );
}

export default App;`}</code>
                          </pre>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {/* AI Assistant Component */}
      <AIAssistant
        isOpen={isAIAssistantOpen}
        onToggle={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
      />

      {/* Screenshot Uploader Component */}
      <ScreenshotUploader
        isOpen={isScreenshotUploaderOpen}
        onClose={() => setIsScreenshotUploaderOpen(false)}
        onAnalysisComplete={handleScreenshotUpload}
        projectId={currentProject?.id}
      />

      {/* Visual Canvas Component */}
      {isVisualCanvasOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full h-full max-w-6xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Visual Canvas</h2>
              <Button
                variant="ghost"
                onClick={() => setIsVisualCanvasOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="h-full">
              <VisualCanvas projectId={currentProject?.id || 'default'} />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}