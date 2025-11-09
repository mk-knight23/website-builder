'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Move, 
  RotateCcw, 
  Copy, 
  Trash2, 
  Lock, 
  Unlock,
  Eye,
  Code,
  Layers,
  Square,
  Type,
  Image as ImageIcon,
  Layout,
  Save,
  Share2,
  Download,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Grid,
  AlignLeft,
  AlignCenter,
  AlignRight,
  MousePointer,
  Crop,
  Palette,
  Settings
} from 'lucide-react';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, useSensor, useSensors, PointerSensor, KeyboardSensor, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useProjectManager, VisualComponent } from '@/hooks/useProjectManager';
import toast from 'react-hot-toast';

interface VisualCanvasProps {
  projectId: string;
  className?: string;
}

interface CanvasElement extends VisualComponent {
  name: string;
  parentId?: string;
  zIndex: number;
  rotation: number;
  opacity: number;
  locked: boolean;
  visible: boolean;
}

interface DevicePreview {
  id: string;
  name: string;
  icon: any;
  width: number;
  height: number;
  borderRadius: number;
}

const DEVICE_PRESETS: DevicePreview[] = [
  { id: 'desktop', name: 'Desktop', icon: Monitor, width: 1200, height: 800, borderRadius: 0 },
  { id: 'tablet', name: 'Tablet', icon: Tablet, width: 768, height: 1024, borderRadius: 12 },
  { id: 'mobile', name: 'Mobile', icon: Smartphone, width: 375, height: 667, borderRadius: 20 }
];

const COMPONENT_LIBRARY = [
  { type: 'text', name: 'Text', icon: Type, category: 'Content' },
  { type: 'image', name: 'Image', icon: ImageIcon, category: 'Content' },
  { type: 'button', name: 'Button', icon: Square, category: 'Interactive' },
  { type: 'input', name: 'Input', icon: Type, category: 'Forms' },
  { type: 'container', name: 'Container', icon: Square, category: 'Layout' },
  { type: 'flex', name: 'Flex', icon: Layout, category: 'Layout' },
  { type: 'grid', name: 'Grid', icon: Grid, category: 'Layout' }
];

function DraggableElement({ element, isSelected, onSelect, onUpdate }: {
  element: CanvasElement;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<CanvasElement>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: element.id,
    data: { element }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: element.opacity,
    zIndex: element.zIndex,
  };

  const handleDoubleClick = () => {
    // Enable inline editing
    const newText = prompt('Edit text content:', element.props.text || 'Text content');
    if (newText !== null) {
      onUpdate(element.id, { 
        props: { ...element.props, text: newText }
      });
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`relative group cursor-move ${isDragging ? 'opacity-50' : ''} ${
        isSelected ? 'ring-2 ring-sky-400' : ''
      }`}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element.id);
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Element Content */}
      <div className={element.type}>
        {element.type === 'text' && (
          <div 
            className="text-slate-800 dark:text-slate-200"
            style={{ 
              fontSize: element.props.fontSize || '16px',
              fontWeight: element.props.fontWeight || '400',
              textAlign: element.props.textAlign || 'left'
            }}
            onDoubleClick={handleDoubleClick}
          >
            {element.props.text || 'Text content'}
          </div>
        )}
        
        {element.type === 'button' && (
          <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
            {element.props.text || 'Button'}
          </button>
        )}
        
        {element.type === 'image' && (
          <div className="w-32 h-24 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-slate-400" />
          </div>
        )}
        
        {element.type === 'input' && (
          <input 
            type="text" 
            placeholder={element.props.placeholder || 'Enter text...'}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        )}
        
        {element.type === 'container' && (
          <div 
            className="border-2 border-dashed border-slate-300 p-4 rounded-lg min-h-[100px]"
            style={{ backgroundColor: element.props.backgroundColor || 'transparent' }}
          >
            <span className="text-slate-400 text-sm">Container</span>
          </div>
        )}
      </div>

      {/* Selection Controls */}
      {isSelected && !element.locked && (
        <div className="absolute -top-8 left-0 flex items-center gap-1">
          <Button
            size="sm"
            variant="secondary"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate(element.id, { locked: !element.locked });
            }}
          >
            {element.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              // Duplicate element
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              // Delete element
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Resize Handles */}
      {isSelected && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-sky-400 rounded-full pointer-events-auto cursor-nw-resize" />
          <div className="absolute -top-1 right-0 w-2 h-2 bg-sky-400 rounded-full pointer-events-auto cursor-ne-resize" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-sky-400 rounded-full pointer-events-auto cursor-sw-resize" />
          <div className="absolute -bottom-1 right-0 w-2 h-2 bg-sky-400 rounded-full pointer-events-auto cursor-se-resize" />
        </div>
      )}
    </motion.div>
  );
}

export default function VisualCanvas({ projectId, className = '' }: VisualCanvasProps) {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [history, setHistory] = useState<CanvasElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const { updateVisualComponents } = useProjectManager();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Load existing visual components
  useEffect(() => {
    // In production, this would load from project state
    setCanvasElements([]);
  }, [projectId]);

  // Save to history
  const saveToHistory = useCallback((elements: CanvasElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...elements]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // Undo/Redo
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCanvasElements([...history[historyIndex - 1]]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCanvasElements([...history[historyIndex + 1]]);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setIsDragging(false);
    setActiveId(null);

    if (over && active.data.current?.element) {
      const activeElement = active.data.current.element;
      const overElement = over.data.current?.element;

      if (activeElement.id !== overElement.id) {
        // Reorder elements
        const newElements = [...canvasElements];
        const activeIndex = newElements.findIndex(el => el.id === activeElement.id);
        const overIndex = newElements.findIndex(el => el.id === overElement.id);

        newElements.splice(activeIndex, 1);
        newElements.splice(overIndex, 0, activeElement);
        
        saveToHistory(newElements);
        setCanvasElements(newElements);
      }
    }
  };

  const addElement = (type: string) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type,
      props: getDefaultProps(type),
      position: { x: 100, y: 100, width: 200, height: 100 },
      selected: false,
      locked: false,
      name: `New ${type}`,
      zIndex: canvasElements.length + 1,
      rotation: 0,
      opacity: 1,
      visible: true,
      children: []
    };

    const newElements = [...canvasElements, newElement];
    saveToHistory(newElements);
    setCanvasElements(newElements);
    setSelectedElement(newElement.id);
    
    toast.success(`${newElement.name} added to canvas`);
  };

  const getDefaultProps = (type: string) => {
    const defaults = {
      text: { text: 'New text', fontSize: '16px', fontWeight: '400', textAlign: 'left' },
      button: { text: 'Button', variant: 'primary' },
      image: { src: '', alt: 'Image' },
      input: { placeholder: 'Enter text...', type: 'text' },
      container: { backgroundColor: 'transparent', padding: '16px' },
      flex: { direction: 'row', gap: '16px', alignItems: 'stretch', justifyContent: 'flex-start' },
      grid: { columns: 3, gap: '16px' }
    };
    return defaults[type as keyof typeof defaults] || {};
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    const newElements = canvasElements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    saveToHistory(newElements);
    setCanvasElements(newElements);
    
    // Update visual components in project state
    updateVisualComponents(projectId, newElements);
  };

  const deleteElement = (id: string) => {
    const newElements = canvasElements.filter(el => el.id !== id);
    saveToHistory(newElements);
    setCanvasElements(newElements);
    
    if (selectedElement === id) {
      setSelectedElement(null);
    }
    
    toast.success('Element deleted');
  };

  const duplicateElement = (id: string) => {
    const element = canvasElements.find(el => el.id === id);
    if (!element) return;

    const duplicated: CanvasElement = {
      ...element,
      id: `element-${Date.now()}`,
      name: `${element.name} Copy`,
      position: {
        ...element.position,
        x: element.position.x + 20,
        y: element.position.y + 20
      }
    };

    const newElements = [...canvasElements, duplicated];
    saveToHistory(newElements);
    setCanvasElements(newElements);
    
    toast.success('Element duplicated');
  };

  const selectedElementData = canvasElements.find(el => el.id === selectedElement);

  return (
    <div className={`flex h-full ${className}`}>
      
      {/* Left Panel - Component Library */}
      <div className="w-64 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-4 overflow-y-auto">
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Components
          </h3>
          
          {Object.entries(
            COMPONENT_LIBRARY.reduce((acc, comp) => {
              if (!acc[comp.category]) acc[comp.category] = [];
              acc[comp.category].push(comp);
              return acc;
            }, {} as Record<string, typeof COMPONENT_LIBRARY>)
          ).map(([category, components]) => (
            <div key={category}>
              <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                {category}
              </h4>
              <div className="space-y-1">
                {components.map((component) => {
                  const Icon = component.icon;
                  return (
                    <Button
                      key={component.type}
                      variant="ghost"
                      className="w-full justify-start h-8 text-sm"
                      onClick={() => addElement(component.type)}
                    >
                      <Icon className="h-3 w-3 mr-2" />
                      {component.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Toolbar */}
        <div className="h-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {/* Device Presets */}
            <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
              {DEVICE_PRESETS.map((device) => {
                const Icon = device.icon;
                return (
                  <Button
                    key={device.id}
                    variant={activeDevice === device.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveDevice(device.id)}
                    className="h-7"
                  >
                    <Icon className="h-3 w-3" />
                  </Button>
                );
              })}
            </div>
            
            {/* Zoom Controls */}
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => setZoom(Math.max(25, zoom - 25))}>
                <ZoomOut className="h-3 w-3" />
              </Button>
              <span className="text-xs min-w-[3rem] text-center">{zoom}%</span>
              <Button variant="ghost" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
                <ZoomIn className="h-3 w-3" />
              </Button>
            </div>
            
            {/* Grid Toggle */}
            <Button
              variant={showGrid ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
            >
              <Grid className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            {/* History Controls */}
            <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
              <Button variant="ghost" size="sm" onClick={undo} disabled={historyIndex <= 0}>
                <Undo className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}>
                <Redo className="h-3 w-3" />
              </Button>
            </div>
            
            {/* Actions */}
            <Button variant="ghost" size="sm">
              <Save className="h-3 w-3 mr-1" />
              Save
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-3 w-3 mr-1" />
              Share
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-800 overflow-auto">
          <div 
            ref={canvasRef}
            className="p-8 flex items-center justify-center min-h-full"
            style={{ transform: `scale(${zoom / 100})` }}
            onClick={() => setSelectedElement(null)}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div
                className="relative bg-white dark:bg-slate-900 shadow-2xl"
                style={{
                  width: DEVICE_PRESETS.find(d => d.id === activeDevice)?.width || 1200,
                  height: DEVICE_PRESETS.find(d => d.id === activeDevice)?.height || 800,
                  borderRadius: DEVICE_PRESETS.find(d => d.id === activeDevice)?.borderRadius || 0,
                  backgroundImage: showGrid 
                    ? 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)' 
                    : 'none',
                  backgroundSize: showGrid ? '20px 20px' : 'auto'
                }}
              >
                <SortableContext items={canvasElements.map(el => el.id)} strategy={verticalListSortingStrategy}>
                  {canvasElements.map((element) => (
                    <DraggableElement
                      key={element.id}
                      element={element}
                      isSelected={selectedElement === element.id}
                      onSelect={setSelectedElement}
                      onUpdate={updateElement}
                    />
                  ))}
                </SortableContext>
                
                <DragOverlay>
                  {activeId ? (
                    <div className="opacity-50 bg-sky-100 border-2 border-sky-400 rounded">
                      {canvasElements.find(el => el.id === activeId)?.name}
                    </div>
                  ) : null}
                </DragOverlay>
              </div>
            </DndContext>
          </div>
        </div>
      </div>

      {/* Right Panel - Properties */}
      <div className="w-80 bg-slate-50 dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 p-4 overflow-y-auto">
        {selectedElementData ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                {selectedElementData.name}
              </h3>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => duplicateElement(selectedElementData.id)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => updateElement(selectedElementData.id, { 
                    locked: !selectedElementData.locked 
                  })}
                >
                  {selectedElementData.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteElement(selectedElementData.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Position & Size */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Position & Size</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-500">X</label>
                  <Input
                    type="number"
                    value={selectedElementData.position.x}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      position: { ...selectedElementData.position, x: parseInt(e.target.value) }
                    })}
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Y</label>
                  <Input
                    type="number"
                    value={selectedElementData.position.y}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      position: { ...selectedElementData.position, y: parseInt(e.target.value) }
                    })}
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Width</label>
                  <Input
                    type="number"
                    value={selectedElementData.position.width}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      position: { ...selectedElementData.position, width: parseInt(e.target.value) }
                    })}
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Height</label>
                  <Input
                    type="number"
                    value={selectedElementData.position.height}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      position: { ...selectedElementData.position, height: parseInt(e.target.value) }
                    })}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Typography (for text elements) */}
            {selectedElementData.type === 'text' && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Typography</h4>
                <div>
                  <label className="text-xs text-slate-500">Text</label>
                  <Input
                    value={selectedElementData.props.text || ''}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      props: { ...selectedElementData.props, text: e.target.value }
                    })}
                    className="h-8 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-500">Size</label>
                    <Input
                      value={selectedElementData.props.fontSize || '16px'}
                      onChange={(e) => updateElement(selectedElementData.id, {
                        props: { ...selectedElementData.props, fontSize: e.target.value }
                      })}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Weight</label>
                    <Select
                      value={selectedElementData.props.fontWeight || '400'}
                      onValueChange={(value) => updateElement(selectedElementData.id, {
                        props: { ...selectedElementData.props, fontWeight: value }
                      })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300">Light</SelectItem>
                        <SelectItem value="400">Normal</SelectItem>
                        <SelectItem value="500">Medium</SelectItem>
                        <SelectItem value="600">Semi Bold</SelectItem>
                        <SelectItem value="700">Bold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Styles */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Styles</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-slate-500">Opacity</label>
                  <Input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={selectedElementData.opacity}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      opacity: parseFloat(e.target.value)
                    })}
                    className="h-8"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Z-Index</label>
                  <Input
                    type="number"
                    value={selectedElementData.zIndex}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      zIndex: parseInt(e.target.value)
                    })}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500 dark:text-slate-400 mt-8">
            <MousePointer className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Select an element to edit its properties</p>
          </div>
        )}
      </div>
    </div>
  );
}