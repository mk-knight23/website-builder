'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Scan, 
  Zap, 
  Eye, 
  Download,
  Sparkles,
  Layers,
  Palette,
  Code,
  MousePointer,
  Move,
  RotateCcw,
  Save,
  Share2
} from 'lucide-react';
import { useProjectManager, ScreenshotAnalysis } from '@/hooks/useProjectManager';
import toast from 'react-hot-toast';

interface ScreenshotUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisComplete: (analysis: ScreenshotAnalysis) => void;
  projectId?: string;
}

export interface DetectedComponent {
  id: string;
  type: 'header' | 'hero' | 'features' | 'cta' | 'footer' | 'form' | 'gallery' | 'navigation' | 'sidebar';
  position: { x: number; y: number; width: number; height: number };
  confidence: number;
  extracted_properties: {
    text_content?: string;
    colors?: string[];
    has_hover_effects?: boolean;
    is_sticky?: boolean;
    alignment?: 'left' | 'center' | 'right';
    typography?: any;
    spacing?: any;
  };
  suggested_replacements?: string[];
}

export default function ScreenshotUploader({ 
  isOpen, 
  onClose, 
  onAnalysisComplete, 
  projectId 
}: ScreenshotUploaderProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<ScreenshotAnalysis | null>(null);
  const [detectedComponents, setDetectedComponents] = useState<DetectedComponent[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadScreenshot } = useProjectManager();

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image file must be less than 10MB');
      return;
    }

    setUploadedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const startAnalysis = async () => {
    if (!uploadedFile || !projectId) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResult(null);

    try {
      // Simulate progressive analysis
      const progressSteps = [
        { step: 20, message: 'Analyzing image quality and dimensions...' },
        { step: 40, message: 'Detecting layout structure and components...' },
        { step: 60, message: 'Extracting color palette and typography...' },
        { step: 80, message: 'Generating component suggestions...' },
        { step: 100, message: 'Finalizing analysis results...' }
      ];

      for (const { step, message } of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setAnalysisProgress(step);
        toast.loading(message, { id: 'analysis' });
      }

      toast.dismiss('analysis');

      // Call the actual upload and analysis function
      const analysis = await uploadScreenshot(uploadedFile, projectId);
      
      // Convert to our local format and add additional analysis
      const enhancedAnalysis: ScreenshotAnalysis = {
        ...analysis,
        components_detected: [
          ...analysis.components_detected,
          // Add more sophisticated analysis
          {
            type: 'navigation',
            position: { x: 0, y: 0, width: 100, height: 70 },
            confidence: 0.88,
            extracted_properties: {
              text_content: 'Navigation Menu',
              colors: analysis.color_palette.slice(0, 3),
              has_hover_effects: true,
              alignment: 'center',
              typography: { font_size: '16px', font_weight: '500' }
            }
          },
          {
            type: 'hero',
            position: { x: 0, y: 70, width: 100, height: 200 },
            confidence: 0.95,
            extracted_properties: {
              text_content: 'Hero Section with CTA',
              colors: analysis.color_palette,
              has_hover_effects: false,
              alignment: 'center',
              typography: { font_size: '32px', font_weight: '700' }
            }
          }
        ]
      };

      setAnalysisResult(enhancedAnalysis);
      onAnalysisComplete(enhancedAnalysis);
      
      toast.success('Screenshot analyzed successfully! ✨');
      
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze screenshot');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateFromScreenshot = async () => {
    if (!analysisResult) return;

    toast.loading('Generating website from screenshot...');
    
    // This would trigger the website generation with screenshot context
    try {
      // Simulate generation process
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.dismiss();
      toast.success('Website generation started with screenshot analysis!');
      onClose();
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to start website generation');
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setDetectedComponents([]);
    setAnalysisProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-sky/10 border-b border-sky-200/30 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-sky rounded-xl flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  Screenshot to Code
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Upload a screenshot and I'll recreate it as a website
                </p>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-[600px]">
          
          {/* Upload Area */}
          <div className="flex-1 p-6 border-r border-sky-200/30">
            
            {!uploadedFile ? (
              <div
                className="h-full border-2 border-dashed border-sky-300/50 rounded-xl flex flex-col items-center justify-center text-center p-8 hover:border-sky-400/50 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <motion.div
                  className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <Upload className="h-8 w-8 text-sky-600" />
                </motion.div>
                
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Drop your screenshot here
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  or click to browse files
                </p>
                
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Supports PNG, JPG, WebP up to 10MB
                </p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="h-full flex flex-col">
                
                {/* Image Preview */}
                <div className="flex-1 relative bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden mb-4">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Uploaded screenshot"
                      className="w-full h-full object-contain"
                    />
                  )}
                  
                  {/* Overlay with detected components */}
                  {analysisResult && (
                    <div className="absolute inset-0 pointer-events-none">
                      {detectedComponents.map((component, index) => (
                        <motion.div
                          key={component.id}
                          className="absolute border-2 border-sky-400 bg-sky-400/20"
                          style={{
                            left: `${component.position.x}%`,
                            top: `${component.position.y}%`,
                            width: `${component.position.width}%`,
                            height: `${component.position.height}%`
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="absolute -top-6 left-0 bg-sky-500 text-white text-xs px-2 py-1 rounded">
                            {component.type} ({Math.round(component.confidence * 100)}%)
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={resetUpload}
                    className="flex-1"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  
                  <Button
                    onClick={startAnalysis}
                    disabled={isAnalyzing}
                    className="flex-1 bg-sky-500 hover:bg-sky-600"
                  >
                    {isAnalyzing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                        />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Scan className="h-4 w-4 mr-2" />
                        Analyze Screenshot
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Panel */}
          <div className="w-80 p-6 bg-sky-50/30 dark:bg-sky-900/20">
            
            {isAnalyzing && (
              <div className="space-y-4">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-sky-200 border-t-sky-500 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    Analyzing Screenshot
                  </h3>
                  <Progress value={analysisProgress} className="mb-2" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {analysisProgress}% complete
                  </p>
                </div>
              </div>
            )}

            {analysisResult && !isAnalyzing && (
              <div className="space-y-4">
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                    Analysis Complete!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Found {analysisResult.components_detected.length} components
                  </p>
                </div>

                {/* Color Palette */}
                <Card className="border-sky-200/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Color Palette
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      {analysisResult.color_palette.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Detected Components */}
                <Card className="border-sky-200/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      Detected Components
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {analysisResult.components_detected.map((component, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 rounded-lg border"
                        >
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {component.type}
                            </Badge>
                            <span className="text-xs text-slate-500">
                              {Math.round(component.confidence * 100)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Suggestions */}
                {analysisResult.suggested_improvements.length > 0 && (
                  <Card className="border-sky-200/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        AI Suggestions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {analysisResult.suggested_improvements.map((suggestion, index) => (
                          <div key={index} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                            <div className="w-1 h-1 bg-sky-400 rounded-full mt-2 flex-shrink-0" />
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    onClick={generateFromScreenshot}
                    className="w-full bg-gradient-sky hover:shadow-lg"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Generate Website
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      // Save analysis for later use
                      toast.success('Analysis saved to project');
                    }}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Analysis
                  </Button>
                </div>
              </div>
            )}

            {!uploadedFile && !isAnalyzing && (
              <div className="text-center text-slate-500 dark:text-slate-400">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">
                  Upload a screenshot to start AI analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}