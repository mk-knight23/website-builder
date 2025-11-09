'use client';

import { useState } from 'react';
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
  RefreshCw
} from 'lucide-react';

export default function SkyBlueWebsiteBuilder() {
  const [activeSection, setActiveSection] = useState('builder');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [activeTab, setActiveTab] = useState('preview');

  // Futuristic sky-blue themed data
  const features = [
    {
      icon: Zap,
      title: 'AI Generation',
      description: 'Lightning-fast website creation',
      skyGradient: 'from-sky-400 to-sky-600',
      bgColor: 'bg-white/40',
      borderColor: 'border-sky-300/50',
      textColor: 'text-sky-600',
      glowColor: 'shadow-glow-sky'
    },
    {
      icon: Palette,
      title: 'Smart Design',
      description: 'Beautiful, modern aesthetics',
      skyGradient: 'from-blue-400 to-sky-500',
      bgColor: 'bg-white/40',
      borderColor: 'border-blue-300/50',
      textColor: 'text-blue-600',
      glowColor: 'shadow-glow-sky'
    },
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Production-ready output',
      skyGradient: 'from-sky-500 to-blue-600',
      bgColor: 'bg-white/40',
      borderColor: 'border-sky-300/50',
      textColor: 'text-sky-700',
      glowColor: 'shadow-glow-sky'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Responsive by default',
      skyGradient: 'from-sky-600 to-blue-700',
      bgColor: 'bg-white/40',
      borderColor: 'border-sky-300/50',
      textColor: 'text-sky-800',
      glowColor: 'shadow-glow-sky'
    },
    {
      icon: Sparkles,
      title: 'Modern Animations',
      description: 'Smooth floating effects',
      skyGradient: 'from-sky-400 to-cyan-500',
      bgColor: 'bg-white/40',
      borderColor: 'border-cyan-300/50',
      textColor: 'text-cyan-600',
      glowColor: 'shadow-glow-sky'
    },
    {
      icon: Lightbulb,
      title: 'Accessibility',
      description: 'Built-in accessibility features',
      skyGradient: 'from-blue-500 to-sky-600',
      bgColor: 'bg-white/40',
      borderColor: 'border-blue-300/50',
      textColor: 'text-blue-700',
      glowColor: 'shadow-glow-sky'
    }
  ];

  const templates = [
    {
      id: 1,
      name: 'Creative Portfolio',
      category: 'Portfolio',
      skyGradient: 'from-sky-500 to-blue-600',
      preview: '🎨',
      downloads: '1.2k',
      rating: 4.9
    },
    {
      id: 2,
      name: 'SaaS Startup',
      category: 'Business',
      skyGradient: 'from-blue-500 to-sky-600',
      preview: '🚀',
      downloads: '2.1k',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Restaurant',
      category: 'Food',
      skyGradient: 'from-cyan-500 to-blue-500',
      preview: '🍕',
      downloads: '890',
      rating: 4.7
    },
    {
      id: 4,
      name: 'E-commerce',
      category: 'Shop',
      skyGradient: 'from-sky-600 to-cyan-600',
      preview: '🛍️',
      downloads: '1.8k',
      rating: 4.9
    }
  ];

  const stats = [
    {
      icon: Globe,
      label: 'Websites Created',
      value: '12,847',
      change: '+24%',
      skyColor: 'text-sky-600',
      bgColor: 'bg-sky-100/50',
      borderColor: 'border-sky-200/50'
    },
    {
      icon: Users,
      label: 'Active Users',
      value: '3,421',
      change: '+18%',
      skyColor: 'text-blue-600',
      bgColor: 'bg-blue-100/50',
      borderColor: 'border-blue-200/50'
    },
    {
      icon: TrendingUp,
      label: 'Success Rate',
      value: '98.5%',
      change: '+2%',
      skyColor: 'text-cyan-600',
      bgColor: 'bg-cyan-100/50',
      borderColor: 'border-cyan-200/50'
    },
    {
      icon: Activity,
      label: 'Uptime',
      value: '99.9%',
      change: '0%',
      skyColor: 'text-sky-700',
      bgColor: 'bg-sky-100/50',
      borderColor: 'border-sky-200/50'
    }
  ];

  const aiChecklist = [
    'Generate responsive layouts',
    'Optimize for SEO',
    'Create interactive components',
    'Include modern animations',
    'Add accessibility features',
    'Generate production code'
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate progress with sky-blue themed states
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'dark' : ''}`}>
      {/* Futuristic Sky Blue Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-sky-100 via-sky-50 to-blue-100 dark:from-slate-900 dark:via-sky-950 dark:to-slate-900" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(14,165,233,0.2),rgba(30,58,138,0.1),rgba(255,255,255,0))]" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_20%,rgba(14,165,233,0.1),rgba(255,255,255,0))]" />
      
      {/* Main Layout */}
      <div className="relative z-10 flex min-h-screen">
        
        {/* Futuristic Glassmorphic Sidebar */}
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: sidebarOpen ? 0 : -320, opacity: sidebarOpen ? 1 : 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed lg:relative z-30 w-80 h-screen bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border-r border-sky-300/30 dark:border-slate-700/30 shadow-glow-sky overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          {/* Futuristic Header */}
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

          {/* Project Setup Accordion */}
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
                        className="border-sky-200/60 focus:border-sky-500 bg-white/70 dark:bg-slate-700/70 rounded-lg focus:shadow-glow"
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              </motion.div>

              {/* Website Type */}
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
                    <AccordionContent className="px-4 pb-3">
                      <Select>
                        <SelectTrigger className="border-blue-200/60 focus:border-sky-500 bg-white/70 dark:bg-slate-700/70 rounded-lg focus:shadow-glow">
                          <SelectValue placeholder="Select website type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="portfolio">🎨 Creative Portfolio</SelectItem>
                          <SelectItem value="saas">🚀 SaaS Startup</SelectItem>
                          <SelectItem value="restaurant">🍕 Restaurant</SelectItem>
                          <SelectItem value="ecommerce">🛍️ E-commerce</SelectItem>
                          <SelectItem value="blog">📝 Blog</SelectItem>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              </motion.div>

              {/* AI Model */}
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
                        <span className="font-semibold text-slate-800 dark:text-slate-200">AI Model</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3">
                      <Select>
                        <SelectTrigger className="border-cyan-200/60 focus:border-sky-500 bg-white/70 dark:bg-slate-700/70 rounded-lg focus:shadow-glow">
                          <SelectValue placeholder="Select AI model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wizardlm">🧙 WizardLM</SelectItem>
                          <SelectItem value="phi-3">⚡ Phi-3</SelectItem>
                          <SelectItem value="mistral">🌟 Mistral</SelectItem>
                          <SelectItem value="claude">🤖 Claude</SelectItem>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              </motion.div>

              {/* Description */}
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
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Description</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3">
                      <Textarea
                        rows={3}
                        placeholder="Describe your website requirements and vision..."
                        className="border-sky-200/60 focus:border-sky-500 bg-white/70 dark:bg-slate-700/70 rounded-lg resize-none focus:shadow-glow"
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              </motion.div>
            </Accordion>
          </div>

          {/* Templates Carousel */}
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
                {templates.slice(0, 4).map((template, index) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ x: 4, scale: 1.02 }}
                    className="cursor-pointer"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="border border-sky-200/40 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                      <div className={`h-16 bg-gradient-to-r ${template.skyGradient} flex items-center justify-center`}>
                        <motion.span
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          transition={{ duration: 0.3 }}
                        >
                          {template.preview}
                        </motion.span>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-sm text-slate-800 dark:text-slate-200">{template.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{template.category}</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-4"
              >
                <Button
                  variant="outline"
                  className="w-full border-sky-300/50 hover:bg-sky-50/50 dark:hover:bg-sky-900/20"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  View All Templates
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-h-screen">
          
          {/* Sky Blue Top Navigation */}
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
                      <span className="text-sm text-slate-500 dark:text-slate-400">Dashboard</span>
                      <ChevronRight className="h-3 w-3 text-slate-400" />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Builder</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Right Section */}
              <div className="flex items-center gap-3">
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

          {/* Main Content */}
          <div className="flex-1 flex gap-6 p-6 overflow-auto">
            
            {/* Left Side - Hero Section */}
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
                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-sky-500 via-blue-500 to-sky-600 bg-clip-text text-transparent mb-4"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    Build your dream website
                  </motion.h1>
                  <motion.h2
                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-sky-500 bg-clip-text text-transparent mb-6"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2.5 }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    in minutes with AI ✨
                  </motion.h2>
                  <motion.p
                    className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Describe your vision. Our AI crafts your design, layout, and code — instantly.
                  </motion.p>
                </motion.div>
                
                {/* Futuristic CTA Buttons */}
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
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="relative bg-gradient-sky hover:shadow-glow-sky text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transition-all duration-300 group overflow-hidden border-0"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        animate={isGenerating ? { x: ['-100%', '200%'] } : {}}
                        transition={{ duration: 2, repeat: isGenerating ? Infinity : 0, ease: "easeInOut" }}
                      />
                      {isGenerating ? (
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
                          Generate Website
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
                      className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-sky-300/50 hover:bg-sky-50/50 dark:hover:bg-sky-900/20 transition-all duration-300 hover:border-sky-400 hover:shadow-glow"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Play className="h-5 w-5 mr-3" />
                      </motion.div>
                      Use Template
                    </Button>
                  </motion.div>
                </motion.div>

                {/* AI Checklist */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400"
                >
                  {aiChecklist.map((item, index) => (
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
                        <Check className="h-4 w-4 text-sky-500" />
                      </motion.div>
                      {item}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Generation Progress */}
                {isGenerating && (
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
                              <Sparkles className="h-4 w-4 text-white" />
                            </motion.div>
                          </motion.div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">AI is crafting your website...</span>
                        </div>
                        <Progress value={generationProgress} className="h-2" />
                        <motion.p
                          className="text-sm text-slate-600 dark:text-slate-400 mt-2"
                          key={generationProgress}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {Math.round(generationProgress)}% complete
                        </motion.p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>

              {/* Futuristic Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
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
                    <Card className={`h-full border-2 ${feature.borderColor} ${feature.bgColor} backdrop-blur-xl hover:${feature.glowColor} transition-all duration-500 group-hover:border-opacity-70 bg-white/30 dark:bg-slate-800/30`}>
                      <CardContent className="p-6 text-center">
                        <motion.div
                          className={`w-16 h-16 bg-gradient-to-r ${feature.skyGradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
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
                          className={`text-lg font-bold ${feature.textColor} mb-2`}
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

              {/* Futuristic Analytics Section */}
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
                            <stat.icon className={`h-6 w-6 ${stat.skyColor}`} />
                          </motion.div>
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

            {/* Right Panel - Live Preview Tabs */}
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
                          value="code"
                          className="data-[state=active]:bg-sky-500 data-[state=active]:text-white text-xs"
                        >
                          <Code className="h-3 w-3 mr-1" />
                          Code
                        </TabsTrigger>
                        <TabsTrigger
                          value="logs"
                          className="data-[state=active]:bg-sky-500 data-[state=active]:text-white text-xs"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          Logs
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="p-4">
                    {/* Device Switcher */}
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

                      <TabsContent value="code" className="mt-0">
                        <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 font-mono text-sm overflow-auto min-h-[400px] border border-sky-200/20">
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
                          <pre className="text-slate-300">
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

                      <TabsContent value="logs" className="mt-0">
                        <div className="bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 min-h-[400px] overflow-auto border border-sky-200/20">
                          <div className="space-y-2 text-sm font-mono">
                            <motion.div
                              className="text-green-600"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              ✅ Initializing AI model...
                            </motion.div>
                            <motion.div
                              className="text-blue-600"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              🔄 Analyzing requirements...
                            </motion.div>
                            <motion.div
                              className="text-purple-600"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              🎨 Generating layout structure...
                            </motion.div>
                            <motion.div
                              className="text-orange-600"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              ⚡ Optimizing for performance...
                            </motion.div>
                            <motion.div
                              className="text-slate-500"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              ⏳ Waiting for website generation...
                            </motion.div>
                          </div>
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
      
      {/* Floating AI Assistant Widget */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2.0, type: "spring", stiffness: 400, damping: 25 }}
        className="fixed bottom-6 right-6 z-20"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <motion.div
            className="w-16 h-16 bg-gradient-sky rounded-2xl flex items-center justify-center shadow-glow-sky cursor-pointer border border-sky-300/30 backdrop-blur-sm"
            whileHover={{
              scale: 1.1,
              rotate: 5,
              boxShadow: "0 0 30px rgba(14, 165, 233, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('builder')}
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Bot className="h-8 w-8 text-white drop-shadow-sm" />
            </motion.div>
          </motion.div>
          
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
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-400 shadow-lg whitespace-nowrap border border-sky-200/30"
        >
          <div className="text-center">
            <div className="font-medium text-sky-600">Hi! I'm your AI assistant</div>
            <div className="text-xs text-slate-500">✨ Ready to help!</div>
          </div>
          {/* Speech bubble arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/90 dark:border-t-slate-800/90"></div>
        </motion.div>
      </motion.div>

      {/* Minimal Glass Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="fixed bottom-0 left-0 right-0 z-10 bg-white/30 dark:bg-slate-900/30 backdrop-blur-2xl border-t border-sky-200/30 dark:border-slate-700/30"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <motion.span
                  className="text-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🌐
                </motion.span>
                <div className="text-sm">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Website Builder Pro</div>
                  <div className="text-slate-500 dark:text-slate-400">AI-Powered Creation</div>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <motion.a
                  href="#"
                  className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  whileHover={{ y: -1 }}
                >
                  Product
                </motion.a>
                <motion.a
                  href="#"
                  className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  whileHover={{ y: -1 }}
                >
                  Company
                </motion.a>
                <motion.a
                  href="#"
                  className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  whileHover={{ y: -1 }}
                >
                  Legal
                </motion.a>
                <motion.a
                  href="#"
                  className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  whileHover={{ y: -1 }}
                >
                  Support
                </motion.a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs text-slate-500 dark:text-slate-400">All systems operational</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-6 h-6 bg-sky-100 dark:bg-slate-700 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="w-3 h-3 bg-sky-500 rounded-sm"></div>
                </motion.div>
                <motion.div
                  className="w-6 h-6 bg-sky-100 dark:bg-slate-700 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                </motion.div>
                <motion.div
                  className="w-6 h-6 bg-sky-100 dark:bg-slate-700 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="w-3 h-3 bg-cyan-500 rounded-sm"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
