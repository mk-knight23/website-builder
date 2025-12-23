'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, Globe, Code, Smartphone, Sparkles, Moon, Sun } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [businessName, setBusinessName] = useState('');
  const [websiteType, setWebsiteType] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState('');

  const handleGenerate = async () => {
    if (!businessName || !description) {
      toast.error('Please fill in business name and description');
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 200);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, websiteType, prompt: description })
      });

      if (!res.ok) throw new Error('Generation failed');

      const data = await res.json();
      setGeneratedHtml(data.html);
      setProgress(100);
      toast.success('Website generated successfully!');
    } catch (error) {
      toast.error('Failed to generate website');
      console.error(error);
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  const features = [
    { icon: Zap, title: 'AI Generation', desc: 'Lightning-fast creation' },
    { icon: Code, title: 'Clean Code', desc: 'Production-ready output' },
    { icon: Smartphone, title: 'Mobile First', desc: 'Responsive by default' },
    { icon: Sparkles, title: 'Modern Design', desc: 'Beautiful aesthetics' }
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-blue-100 dark:from-slate-900 dark:via-sky-950 dark:to-slate-900">
        
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-sky-200/50">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-sky-500" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                Website Builder
              </h1>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent mb-4"
            >
              Build your dream website in minutes with AI
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 dark:text-slate-300"
            >
              Describe your vision. Our AI crafts your design instantly.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-sky-200/60 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl">
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Business Name</label>
                  <Input 
                    placeholder="e.g., Nova Studio"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="border-sky-200/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Website Type</label>
                  <Select value={websiteType} onValueChange={setWebsiteType}>
                    <SelectTrigger className="border-sky-200/60">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea 
                    placeholder="Describe your website requirements..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="border-sky-200/60 resize-none"
                  />
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600"
                >
                  {isGenerating ? (
                    <>Generating... {Math.round(progress)}%</>
                  ) : (
                    <><Zap className="h-4 w-4 mr-2" /> Generate Website</>
                  )}
                </Button>

                {isGenerating && <Progress value={progress} className="h-2" />}
              </CardContent>
            </Card>

            <Card className="border-2 border-sky-200/60 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-sky-500" />
                  Preview
                </h3>
                {generatedHtml ? (
                  <div className="bg-white rounded-lg p-4 max-h-96 overflow-auto">
                    <iframe 
                      srcDoc={generatedHtml}
                      className="w-full h-80 border-0"
                      title="Preview"
                    />
                  </div>
                ) : (
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-8 text-center min-h-80 flex items-center justify-center">
                    <p className="text-slate-500">Generate a website to see preview</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Card className="border border-sky-200/40 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>

        <footer className="border-t border-sky-200/30 mt-20">
          <div className="container mx-auto px-6 py-6 text-center text-sm text-slate-600 dark:text-slate-400">
            © 2025 Website Builder. Built with Next.js & AI.
          </div>
        </footer>
      </div>
    </div>
  );
}
