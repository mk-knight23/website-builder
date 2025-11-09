'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Layout, 
  Search, 
  Filter, 
  Star, 
  Eye, 
  Download, 
  Heart, 
  TrendingUp,
  Clock,
  Users,
  Zap,
  Code,
  Palette,
  ShoppingCart,
  Briefcase,
  Utensils,
  Camera,
  Music,
  Book,
  Gamepad2,
  Car,
  Building,
  Home,
  Sparkles,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface Template {
  id: number;
  name: string;
  category: string;
  description: string;
  preview: string;
  features: string[];
  rating: number;
  downloads: number;
  isPremium: boolean;
  tags: string[];
  author: string;
  lastUpdated: string;
  colors: string[];
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
}

interface ModernTemplateGalleryProps {
  onSelectTemplate: (template: Template) => void;
  selectedTemplate?: Template | null;
}

export default function ModernTemplateGallery({ onSelectTemplate, selectedTemplate }: ModernTemplateGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'All Templates', icon: Layout, count: 48 },
    { id: 'business', name: 'Business', icon: Briefcase, count: 12 },
    { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, count: 8 },
    { id: 'portfolio', name: 'Portfolio', icon: Camera, count: 10 },
    { id: 'restaurant', name: 'Restaurant', icon: Utensils, count: 6 },
    { id: 'blog', name: 'Blog', icon: Book, count: 7 },
    { id: 'saas', name: 'SaaS', icon: Code, count: 5 },
  ];

  const templates: Template[] = [
    {
      id: 1,
      name: 'Modern SaaS Landing',
      category: 'saas',
      description: 'Clean and professional SaaS landing page with animated features and pricing tables.',
      preview: '/api/placeholder/300/200',
      features: ['Responsive Design', 'Dark Mode', 'Animation', 'SEO Optimized'],
      rating: 4.9,
      downloads: 1250,
      isPremium: true,
      tags: ['saas', 'landing', 'modern', 'animated'],
      author: 'Design Studio Pro',
      lastUpdated: '2 days ago',
      colors: ['#6D28D9', '#06B6D4', '#ffffff'],
      complexity: 'Intermediate',
      techStack: ['React', 'Tailwind', 'Framer Motion']
    },
    {
      id: 2,
      name: 'Creative Portfolio',
      category: 'portfolio',
      description: 'Stunning portfolio template for creative professionals with gallery and contact forms.',
      preview: '/api/placeholder/300/200',
      features: ['Gallery', 'Contact Form', 'Smooth Scrolling', 'Mobile First'],
      rating: 4.8,
      downloads: 890,
      isPremium: false,
      tags: ['portfolio', 'creative', 'gallery', 'minimal'],
      author: 'Creative Collective',
      lastUpdated: '1 week ago',
      colors: ['#1f2937', '#f3f4f6', '#ef4444'],
      complexity: 'Beginner',
      techStack: ['HTML5', 'CSS3', 'JavaScript']
    },
    {
      id: 3,
      name: 'Restaurant Deluxe',
      category: 'restaurant',
      description: 'Elegant restaurant website with menu, reservations, and location features.',
      preview: '/api/placeholder/300/200',
      features: ['Menu Display', 'Reservation System', 'Location Map', 'Online Ordering'],
      rating: 4.7,
      downloads: 650,
      isPremium: true,
      tags: ['restaurant', 'menu', 'booking', 'elegant'],
      author: 'Food & Design Co',
      lastUpdated: '3 days ago',
      colors: ['#92400e', '#fbbf24', '#ffffff'],
      complexity: 'Advanced',
      techStack: ['Next.js', 'TypeScript', 'Stripe']
    },
    {
      id: 4,
      name: 'E-commerce Pro',
      category: 'ecommerce',
      description: 'Complete e-commerce solution with cart, checkout, and product management.',
      preview: '/api/placeholder/300/200',
      features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Admin Panel'],
      rating: 4.9,
      downloads: 2100,
      isPremium: true,
      tags: ['ecommerce', 'shop', 'cart', 'payment'],
      author: 'Commerce Experts',
      lastUpdated: '1 day ago',
      colors: ['#059669', '#10b981', '#ffffff'],
      complexity: 'Advanced',
      techStack: ['React', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
      id: 5,
      name: 'Minimalist Blog',
      category: 'blog',
      description: 'Clean and focused blog template perfect for content creators and writers.',
      preview: '/api/placeholder/300/200',
      features: ['Markdown Support', 'SEO', 'Comments', 'Newsletter'],
      rating: 4.6,
      downloads: 780,
      isPremium: false,
      tags: ['blog', 'minimal', 'content', 'writing'],
      author: 'Content Crafters',
      lastUpdated: '5 days ago',
      colors: ['#374151', '#f9fafb', '#3b82f6'],
      complexity: 'Beginner',
      techStack: ['Hugo', 'CSS', 'JavaScript']
    },
    {
      id: 6,
      name: 'Corporate Business',
      category: 'business',
      description: 'Professional corporate website template for businesses and organizations.',
      preview: '/api/placeholder/300/200',
      features: ['Team Page', 'Services', 'Testimonials', 'Contact'],
      rating: 4.5,
      downloads: 1500,
      isPremium: false,
      tags: ['corporate', 'business', 'professional', 'services'],
      author: 'Business Solutions Inc',
      lastUpdated: '1 week ago',
      colors: ['#1e40af', '#3b82f6', '#ffffff'],
      complexity: 'Intermediate',
      techStack: ['Bootstrap', 'jQuery', 'PHP']
    }
  ];

  const filteredTemplates = templates
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'downloads': return b.downloads - a.downloads;
        case 'newest': return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default: return 0; // popular
      }
    });

  const toggleFavorite = (templateId: number) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Template Gallery
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose from our curated collection of AI-generated templates
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-modern-100 text-modern-700">
            {filteredTemplates.length} templates
          </Badge>
          <Button 
            className="bg-gradient-modern text-white shadow-glow-modern"
            onClick={() => {
              // Generate custom template logic
              console.log('Generate custom template');
            }}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Custom
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-modern border-gray-200/50 dark:border-gray-700/50">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search templates, categories, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 dark:border-gray-600 focus:border-modern-500 focus:ring-modern-500"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-modern border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-modern-500 focus:border-transparent"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="downloads">Most Downloaded</option>
            <option value="newest">Newest First</option>
          </select>

          {/* View Mode */}
          <div className="flex border border-gray-200 dark:border-gray-600 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-modern-500 text-white' : ''}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-modern-500 text-white' : ''}
            >
              List
            </Button>
          </div>
        </div>
      </Card>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-ultra border transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-modern text-white border-transparent shadow-glow-modern'
                  : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 hover:border-modern-300 dark:hover:border-modern-500'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{category.name}</span>
              <Badge variant="secondary" className={`text-xs ${
                selectedCategory === category.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                {category.count}
              </Badge>
            </motion.button>
          );
        })}
      </div>

      {/* Templates Grid/List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedCategory}-${viewMode}-${searchTerm}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }
        >
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Card className={`overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-modern border-gray-200/50 dark:border-gray-700/50 shadow-modern hover:shadow-modern-lg transition-all duration-300 ${
                selectedTemplate?.id === template.id ? 'ring-2 ring-modern-500' : ''
              } ${viewMode === 'list' ? 'flex' : ''}`}>
                
                {/* Template Preview */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'
                } bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-modern-500/20 to-accent-cyan-500/20" />
                  
                  {/* Preview Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Layout className="h-12 w-12 text-gray-400" />
                  </div>

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" className="backdrop-blur-sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => onSelectTemplate(template)}
                      className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Use Template
                    </Button>
                  </div>

                  {/* Premium Badge */}
                  {template.isPremium && (
                    <Badge className="absolute top-2 right-2 bg-gradient-modern text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Pro
                    </Badge>
                  )}

                  {/* Favorite Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(template.id)}
                    className="absolute top-2 left-2 w-8 h-8 p-0 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                  >
                    {favorites.includes(template.id) ? 
                      <Heart className="h-4 w-4 fill-current" /> : 
                      <Heart className="h-4 w-4" />
                    }
                  </Button>
                </div>

                {/* Template Info */}
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-modern-600 transition-colors">
                      {template.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{template.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700">
                        {feature}
                      </Badge>
                    ))}
                    {template.features.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700">
                        +{template.features.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>{template.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{template.lastUpdated}</span>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getComplexityColor(template.complexity)}`}>
                      {template.complexity}
                    </Badge>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.techStack.slice(0, 2).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => onSelectTemplate(template)}
                    className={`w-full ${
                      selectedTemplate?.id === template.id
                        ? 'bg-accent-cyan-500 hover:bg-accent-cyan-600'
                        : 'bg-gradient-modern hover:shadow-glow-modern'
                    } text-white transition-all duration-200`}
                  >
                    {selectedTemplate?.id === template.id ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Use This Template
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-ultra flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No templates found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            Clear Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
}
