import { useState, useEffect } from 'react';

export interface WebsiteProject {
  id: string;
  name: string;
  businessName: string;
  websiteType: string;
  prompt: string;
  generatedHTML: string;
  generatedCSS: string;
  components: any[];
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  liveUrl?: string;
}

export interface ProjectState {
  currentProject: WebsiteProject | null;
  projects: WebsiteProject[];
  isGenerating: boolean;
  activeTab: 'preview' | 'code';
  viewMode: 'html' | 'css' | 'components';
}

const STORAGE_KEY = 'website-builder-projects';

export function useProjectState() {
  const [state, setState] = useState<ProjectState>({
    currentProject: null,
    projects: [],
    isGenerating: false,
    activeTab: 'preview',
    viewMode: 'html'
  });

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem(STORAGE_KEY);
    if (savedProjects) {
      try {
        const projects = JSON.parse(savedProjects);
        setState(prev => ({ ...prev, projects }));
      } catch (error) {
        console.error('Failed to load projects from localStorage:', error);
      }
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.projects));
  }, [state.projects]);

  const createProject = (businessName: string, websiteType: string, prompt: string) => {
    const newProject: WebsiteProject = {
      id: Date.now().toString(),
      name: `${businessName} - ${websiteType}`,
      businessName,
      websiteType,
      prompt,
      generatedHTML: '',
      generatedCSS: '',
      components: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublished: false
    };

    setState(prev => ({
      ...prev,
      currentProject: newProject,
      projects: [newProject, ...prev.projects]
    }));

    return newProject;
  };

  const updateProject = (projectId: string, updates: Partial<WebsiteProject>) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId
          ? { ...project, ...updates, updatedAt: new Date().toISOString() }
          : project
      ),
      currentProject: prev.currentProject?.id === projectId
        ? { ...prev.currentProject, ...updates, updatedAt: new Date().toISOString() }
        : prev.currentProject
    }));
  };

  const setCurrentProject = (project: WebsiteProject | null) => {
    setState(prev => ({ ...prev, currentProject: project }));
  };

  const deleteProject = (projectId: string) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== projectId),
      currentProject: prev.currentProject?.id === projectId ? null : prev.currentProject
    }));
  };

  const setGenerating = (isGenerating: boolean) => {
    setState(prev => ({ ...prev, isGenerating }));
  };

  const setActiveTab = (tab: 'preview' | 'code') => {
    setState(prev => ({ ...prev, activeTab: tab }));
  };

  const setViewMode = (mode: 'html' | 'css' | 'components') => {
    setState(prev => ({ ...prev, viewMode: mode }));
  };

  const generateWebsite = async (businessName: string, websiteType: string, prompt: string, model?: string) => {
    setGenerating(true);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName,
          websiteType,
          prompt,
          model
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate website');
      }

      const result = await response.json();
      
      if (result.success) {
        const project = createProject(businessName, websiteType, prompt);
        updateProject(project.id, {
          generatedHTML: result.html,
          generatedCSS: result.css,
          components: result.components
        });
        
        return result;
      } else {
        throw new Error(result.error || 'Generation failed');
      }
    } catch (error) {
      console.error('Website generation error:', error);
      throw error;
    } finally {
      setGenerating(false);
    }
  };

  const downloadProject = (project: WebsiteProject) => {
    const htmlContent = project.generatedHTML;
    const cssContent = project.generatedCSS;
    
    // Create and download HTML file
    const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
    const htmlUrl = URL.createObjectURL(htmlBlob);
    const htmlLink = document.createElement('a');
    htmlLink.href = htmlUrl;
    htmlLink.download = `${project.name.replace(/\s+/g, '-')}.html`;
    document.body.appendChild(htmlLink);
    htmlLink.click();
    document.body.removeChild(htmlLink);
    URL.revokeObjectURL(htmlUrl);

    // Create and download CSS file
    const cssBlob = new Blob([cssContent], { type: 'text/css' });
    const cssUrl = URL.createObjectURL(cssBlob);
    const cssLink = document.createElement('a');
    cssLink.href = cssUrl;
    cssLink.download = `${project.name.replace(/\s+/g, '-')}.css`;
    document.body.appendChild(cssLink);
    cssLink.click();
    document.body.removeChild(cssLink);
    URL.revokeObjectURL(cssUrl);
  };

  const exportAllProjects = () => {
    const exportData = {
      projects: state.projects,
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `website-builder-projects-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return {
    state,
    createProject,
    updateProject,
    setCurrentProject,
    deleteProject,
    setGenerating,
    setActiveTab,
    setViewMode,
    generateWebsite,
    downloadProject,
    exportAllProjects
  };
}

// Project manager utilities
export const useProjectManager = () => {
  const { 
    state, 
    createProject, 
    updateProject, 
    setCurrentProject, 
    deleteProject, 
    downloadProject, 
    generateWebsite, 
    setActiveTab, 
    setViewMode 
  } = useProjectState();

  const publishToGitHub = async (project: WebsiteProject) => {
    // This would integrate with GitHub API to create a repository and upload files
    // For demo purposes, we'll simulate the process
    console.log('Publishing to GitHub:', project);
    
    // Simulate GitHub API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update project with mock GitHub URL
    const githubUrl = `https://github.com/username/${project.name.replace(/\s+/g, '-').toLowerCase()}`;
    updateProject(project.id, {
      isPublished: true,
      liveUrl: githubUrl
    });
    
    return githubUrl;
  };

  const deployToVercel = async (project: WebsiteProject) => {
    // This would integrate with Vercel API for deployment
    console.log('Deploying to Vercel:', project);
    
    // Simulate Vercel API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update project with mock Vercel URL
    const vercelUrl = `https://${project.name.replace(/\s+/g, '-').toLowerCase()}-vercel.vercel.app`;
    updateProject(project.id, {
      isPublished: true,
      liveUrl: vercelUrl
    });
    
    return vercelUrl;
  };

  const generateLiveLink = async (project: WebsiteProject) => {
    // This would integrate with various hosting services
    try {
      // Try Vercel first
      return await deployToVercel(project);
    } catch (error) {
      // Fallback to GitHub Pages
      return await publishToGitHub(project);
    }
  };

  return {
    state,
    createProject,
    updateProject,
    setCurrentProject,
    deleteProject,
    downloadProject,
    generateWebsite,
    publishToGitHub,
    deployToVercel,
    generateLiveLink,
    setActiveTab,
    setViewMode
  };
};
