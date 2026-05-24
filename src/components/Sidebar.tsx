import React from 'react';
import { Cpu, FileJson, LayoutTemplate, DownloadCloud } from 'lucide-react';
import type { ViewState } from '../App';

interface SidebarProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
}

export function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const navItems = [
    { id: 'models', label: 'Models & Weights', icon: Cpu },
    { id: 'skills', label: 'MCP Manifests', icon: FileJson },
    { id: 'widget', label: 'Nano Widget', icon: LayoutTemplate },
    { id: 'deploy', label: 'Local Deployment', icon: DownloadCloud },
  ];

  return (
    <div className="w-64 bg-[#0F0F0F] border-r border-white/5 flex flex-col h-full shrink-0">
      <div className="p-6 border-b border-white/5">
        <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Incognito</h1>
        <p className="text-xs text-gray-500 font-mono mt-1 flex items-center gap-2">
          Local Nexus 
          <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">BETA</span>
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5">
          <div className="text-xs text-gray-500 font-mono font-bold mb-2 uppercase tracking-widest">Active Runtime</div>
          <div className="text-sm font-medium text-emerald-400">CUDA 12.1 / RTX 4090</div>
          <div className="text-xs text-gray-500 mt-1">TensorRT-LLM Enabled</div>
        </div>
      </div>
    </div>
  );
}
