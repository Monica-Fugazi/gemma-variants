import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ModelsView } from './components/views/ModelsView';
import { SkillsView } from './components/views/SkillsView';
import { WidgetView } from './components/views/WidgetView';
import { DeployView } from './components/views/DeployView';
import { Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type ViewState = 'models' | 'skills' | 'widget' | 'deploy';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('models');

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-gray-200 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-10 p-6 flex justify-between items-center border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md">
          <h2 className="text-xl font-display font-medium text-emerald-400 flex items-center gap-3">
            <Terminal className="w-5 h-5 text-emerald-500" />
            <span className="capitalize">{currentView === 'models' ? 'Local Models' : currentView === 'skills' ? 'MCP Skills & Manifests' : currentView === 'widget' ? 'Gemini Nano Widget (Simulated)' : 'Deploy Configuration'}</span>
          </h2>
          <div className="flex items-center gap-4 text-sm font-mono text-gray-500">
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-bold tracking-wider">BETA BUILD</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> SYSTEM: ONLINE</span>
            <span className="hidden sm:inline">VRAM: 14.2GB / 24GB</span>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentView === 'models' && <ModelsView />}
              {currentView === 'skills' && <SkillsView />}
              {currentView === 'widget' && <WidgetView />}
              {currentView === 'deploy' && <DeployView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
