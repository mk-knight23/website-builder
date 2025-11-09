'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Code, 
  Download, 
  Github, 
  Rocket, 
  Eye, 
  FileText, 
  Settings,
  Save,
  ExternalLink,
  Sparkles,
  Loader2,
  RefreshCw,
  Monitor,
  Smartphone,
  Tablet,
  Copy,
  CheckCircle,
  Folder,
  FolderOpen,
  ChevronRight,
  Search,
  Filter,
  Star,
  Zap,
  ArrowRight,
  Palette
} from 'lucide-react';

interface ModernCodeViewerProps {
  currentProject?: any;
  viewMode: 'html' | 'css' | 'js' | 'all';
  onViewModeChange: (mode: 'html' | 'css' | 'js' | 'all') => void;
  isGenerating: boolean;
}

export default function ModernCodeViewer({ 
  currentProject, 
  viewMode, 
  onViewModeChange, 
  isGenerating 
}: ModernCodeViewerProps) {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['src']);
  const [searchTerm, setSearchTerm] = useState('');

  const fileStructure = [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'index.html', type: 'file', size: '2.4KB' },
        { name: 'styles.css', type: 'file', size: '1.8KB' },
        { name: 'script.js', type: 'file', size: '0.9KB' },
        { name: 'assets', type: 'folder', children: [
          { name: 'logo.png', type: 'file', size: '12KB' },
          { name: 'hero-bg.jpg', type: 'file', size: '45KB' }
        ]}
      ]
    },
    { name: 'package.json', type: 'file', size: '0.5KB' },
    { name: 'README.md', type: 'file', size: '1.2KB' }
  ];

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(f => f !== folderName)
        : [...prev, folderName]
    );
  };

  const copyToClipboard = async (text: string, fileName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFile(fileName);
      setTimeout(() => setCopiedFile(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop();
    switch (ext) {
      case 'html': return <FileText className="h-4 w-4 text-orange-500" />;
      case 'css': return <Code className="h-4 w-4 text-blue-500" />;
      case 'js': return <Code className="h-4 w-4 text-yellow-500" />;
      case 'json': return <Settings className="h-4 w-4 text-green-500" />;
      case 'md': return <FileText className="h-4 w-4 text-gray-500" />;
      default: return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const renderFileTree = (items: any[], level = 0) => {
    return items.map((item, index) => (
      <motion.div
        key={item.name}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="select-none"
      >
        {item.type === 'folder' ? (
          <div>
            <div
              className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              style={{ paddingLeft: `${level * 16 + 8}px` }}
              onClick={() => toggleFolder(item.name)}
            >
              <motion.div
                animate={{ rotate: expandedFolders.includes(item.name) ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-3 w-3 text-gray-500" />
              </motion.div>
              {expandedFolders.includes(item.name) ? 
                <FolderOpen className="h-4 w-4 text-blue-500" /> : 
                <Folder className="h-4 w-4 text-blue-500" />
              }
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
            </div>
            {expandedFolders.includes(item.name) && item.children && (
              <div className="ml-4">
                {renderFileTree(item.children, level + 1)}
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors group"
            style={{ paddingLeft: `${level * 16 + 8}px` }}
            onClick={() => onViewModeChange(item.name.includes('.html') ? 'html' : item.name.includes('.css') ? 'css' : 'js')}
          >
            <div className="flex items-center gap-2">
              {getFileIcon(item.name)}
              <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{item.size}</span>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(
                    item.name.includes('.html') ? currentProject?.generatedHTML || '' :
                    item.name.includes('.css') ? currentProject?.generatedCSS || '' :
                    '// JavaScript code would be here',
                    item.name
                  );
                }}
              >
                {copiedFile === item.name ? 
                  <CheckCircle className="h-3 w-3 text-green-500" /> : 
                  <Copy className="h-3 w-3 text-gray-500" />
                }
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    ));
  };

  const getCurrentCode = () => {
    if (!currentProject) return '';
    switch (viewMode) {
      case 'html': return currentProject.generatedHTML || '';
      case 'css': return currentProject.generatedCSS || '';
      case 'js': return '// JavaScript code would be generated here\nconsole.log("Website functionality");';
      default: return '// All files would be displayed here';
    }
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-modern border-gray-200/50 dark:border-gray-700/50 shadow-modern">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-modern rounded-lg flex items-center justify-center">
            <Code className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Code Explorer</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Generated with AI</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex h-[500px]">
        {/* File Tree Sidebar */}
        <div className="w-64 border-r border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50 p-3 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Project Files</span>
            <Badge variant="secondary" className="text-xs bg-modern-100 text-modern-700">
              {fileStructure.length} files
            </Badge>
          </div>
          {renderFileTree(fileStructure)}
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          {/* Tab Bar */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-1">
              {[
                { mode: 'html', label: 'HTML', icon: FileText, color: 'text-orange-500' },
                { mode: 'css', label: 'CSS', icon: Code, color: 'text-blue-500' },
                { mode: 'js', label: 'JavaScript', icon: Code, color: 'text-yellow-500' },
                { mode: 'all', label: 'All Files', icon: Folder, color: 'text-gray-500' },
              ].map((tab) => (
                <Button
                  key={tab.mode}
                  variant={viewMode === tab.mode ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewModeChange(tab.mode as any)}
                  className={`gap-2 ${
                    viewMode === tab.mode 
                      ? 'bg-gradient-modern text-white shadow-sm' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className={`h-3 w-3 ${viewMode === tab.mode ? 'text-white' : tab.color}`} />
                  {tab.label}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(getCurrentCode(), 'current-file')}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {copiedFile === 'current-file' ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Code Content */}
          <div className="flex-1 relative">
            {isGenerating ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-modern-500/30 border-t-modern-500 rounded-full mx-auto mb-4"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Generating code...</p>
                </div>
              </div>
            ) : currentProject ? (
              <div className="h-full overflow-auto">
                <pre className="p-4 text-sm font-mono whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                  {getCurrentCode()}
                </pre>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Code className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg mb-2">No code to display</p>
                  <p className="text-sm">Generate a website first to view the code</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-3 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-900/30">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span>Lines: {getCurrentCode().split('\n').length}</span>
          <span>Size: {(getCurrentCode().length / 1024).toFixed(1)}KB</span>
          <span>Language: {viewMode.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Generated
          </Badge>
        </div>
      </div>
    </Card>
  );
}
