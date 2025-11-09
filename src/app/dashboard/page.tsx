'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Download, 
  Eye, 
  Share2, 
  Edit, 
  Trash2,
  MoreHorizontal,
  Calendar,
  User,
  TrendingUp,
  Clock,
  Zap,
  Brain,
  Code,
  Image as ImageIcon,
  Users,
  Settings,
  BarChart3,
  Target,
  Activity
} from 'lucide-react';
import { useProjectManager, AIGeneratedProject } from '@/hooks/useProjectManager';
import toast from 'react-hot-toast';

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  publishedProjects: number;
  totalViews: number;
  collaborationScore: number;
  aiEfficiency: number;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<AIGeneratedProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<AIGeneratedProject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('updated');
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    activeProjects: 0,
    publishedProjects: 0,
    totalViews: 0,
    collaborationScore: 0,
    aiEfficiency: 0
  });

  const { projects: allProjects, currentProject, tokenBalance, user } = useProjectManager();

  // Load projects and calculate stats
  useEffect(() => {
    setProjects(allProjects);
    
    // Calculate dashboard stats
    const dashboardStats: DashboardStats = {
      totalProjects: allProjects.length,
      activeProjects: allProjects.filter(p => !p.is_published).length,
      publishedProjects: allProjects.filter(p => p.is_published).length,
      totalViews: allProjects.reduce((sum, p) => sum + (Math.random() * 1000), 0),
      collaborationScore: allProjects.filter(p => p.is_collaborative).length > 0 ? 85 : 45,
      aiEfficiency: allProjects.length > 0 ? Math.min(95, 70 + (allProjects.length * 5)) : 70
    };
    
    setStats(dashboardStats);
  }, [allProjects]);

  // Filter and sort projects
  useEffect(() => {
    let filtered = [...projects];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.website_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(project => {
        switch (selectedFilter) {
          case 'published': return project.is_published;
          case 'draft': return !project.is_published;
          case 'collaborative': return project.is_collaborative;
          case 'ai-generated': return project.ai_plans.length > 0;
          default: return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'created': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'updated': return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case 'type': return a.website_type.localeCompare(b.website_type);
        default: return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedFilter, sortBy]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProjectTypeColor = (type: string) => {
    const colors = {
      saas: 'bg-purple-100 text-purple-700',
      ecommerce: 'bg-green-100 text-green-700',
      portfolio: 'bg-blue-100 text-blue-700',
      restaurant: 'bg-orange-100 text-orange-700',
      business: 'bg-slate-100 text-slate-700',
      blog: 'bg-cyan-100 text-cyan-700'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const renderProjectGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <Card className="h-full hover:shadow-lg transition-all duration-300 border-sky-200/50 dark:border-slate-700/50">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {project.name}
                  </CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {project.business_name}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {project.is_published && (
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      Published
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Project Preview */}
              <div className="aspect-video bg-gradient-to-br from-sky-100 to-blue-100 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-blue-500/10" />
                <div className="text-center z-10">
                  <Code className="h-8 w-8 text-sky-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {project.website_type} website
                  </p>
                </div>
                
                {/* AI Generated Badge */}
                {project.ai_plans.length > 0 && (
                  <Badge className="absolute top-2 right-2 bg-sky-500 text-white text-xs">
                    <Brain className="h-3 w-3 mr-1" />
                    AI
                  </Badge>
                )}
                
                {/* Collaboration Indicator */}
                {project.is_collaborative && (
                  <Badge className="absolute top-2 left-2 bg-purple-500 text-white text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    Team
                  </Badge>
                )}
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getProjectTypeColor(project.website_type)}`}>
                    {project.website_type}
                  </Badge>
                  <span className="text-xs text-slate-500">
                    v{project.version}
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {project.prompt}
                </p>

                {/* AI Plans Summary */}
                {project.ai_plans.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.ai_plans.slice(0, 3).map((plan, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {plan.agent_type}
                      </Badge>
                    ))}
                    {project.ai_plans.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.ai_plans.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(project.updated_at)}
                    </span>
                    {project.token_cost > 0 && (
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {project.token_cost.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-3 w-3" />
                </Button>
                {project.is_published && (
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderProjectList = () => (
    <div className="space-y-3">
      {filteredProjects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="hover:shadow-md transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Preview */}
                <div className="w-16 h-12 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center">
                  <Code className="h-6 w-6 text-sky-500" />
                </div>

                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {project.name}
                    </h3>
                    {project.is_published && (
                      <Badge className="bg-green-100 text-green-700 text-xs">Published</Badge>
                    )}
                    {project.ai_plans.length > 0 && (
                      <Badge className="bg-sky-100 text-sky-700 text-xs">
                        <Brain className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                    {project.business_name} • {project.website_type}
                  </p>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-4 text-sm text-slate-500">
                  <span>{formatDate(project.updated_at)}</span>
                  <span>v{project.version}</span>
                  {project.token_cost > 0 && (
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {project.token_cost.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage your AI-generated websites and collaborate with your team
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-slate-500">Token Balance</p>
              <p className="text-lg font-semibold text-sky-600">
                {tokenBalance.toLocaleString()} tokens
              </p>
            </div>
            <Button className="bg-gradient-sky hover:shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-sky-200/50 dark:border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Projects</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                      {stats.totalProjects}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-xl flex items-center justify-center">
                    <Code className="h-6 w-6 text-sky-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-green-200/50 dark:border-green-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Published</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                      {stats.publishedProjects}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-purple-200/50 dark:border-purple-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">AI Efficiency</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                      {stats.aiEfficiency}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-orange-200/50 dark:border-orange-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Team Score</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                      {stats.collaborationScore}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Projects Section */}
        <div className="space-y-6">
          {/* Controls */}
          <Card className="border-sky-200/50 dark:border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-sky-200/50 focus:border-sky-500"
                    />
                  </div>
                  
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="collaborative">Collaborative</SelectItem>
                      <SelectItem value="ai-generated">AI Generated</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="updated">Recently Updated</SelectItem>
                      <SelectItem value="created">Recently Created</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="type">Type</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Controls */}
                <div className="flex items-center gap-2">
                  <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${filteredProjects.length}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.length > 0 ? (
                viewMode === 'grid' ? renderProjectGrid() : renderProjectList()
              ) : (
                <Card className="border-sky-200/50 dark:border-slate-700/50">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Code className="h-8 w-8 text-sky-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      {searchTerm || selectedFilter !== 'all' ? 'No projects found' : 'No projects yet'}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      {searchTerm || selectedFilter !== 'all' 
                        ? 'Try adjusting your search or filter criteria'
                        : 'Create your first AI-generated website to get started'
                      }
                    </p>
                    <Button className="bg-gradient-sky">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Project
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}