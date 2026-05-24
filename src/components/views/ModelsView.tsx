import React from 'react';
import { Cpu, HardDrive, ShieldCheck } from 'lucide-react';

export function ModelsView() {
  const models = [
    {
      name: "Gemma 4 (26B MoE)",
      params: "25.2B / 3.8B Active",
      context: "256K Context",
      quantization: "TQ4_1S (Max MoE)",
      size: "15.4 GB",
      status: "Downloaded",
      description: "Highly sparse Mixture-of-Experts. Activates ~3.8B parameters during standard reasoning, delivering ultra-fast local generation on consumer GPUs."
    },
    {
      name: "Gemini Nano v3",
      params: "3.2B Dense",
      context: "32K Context",
      quantization: "INT4 (AICore Native)",
      size: "2.8 GB",
      status: "Available",
      description: "Optimized for extreme zero-latency constraints. Default for Android 16 AICore and Chrome Prompt APIs."
    },
    {
      name: "Gemma 4 (31B Dense)",
      params: "30.7B Dense",
      context: "128K Context",
      quantization: "AWQ INT4",
      size: "17.1 GB",
      status: "Available",
      description: "Server-class dense architecture for high-precision analytical tasks and vast retrieval-augmented generation pipelines."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-200">Local Hardware Profiles</h3>
        <p className="text-gray-400 text-sm mt-1">Manage optimal centroids and quantization targets for your specific acceleration layer.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {models.map((mod, idx) => (
          <div key={idx} className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col hover:border-emerald-500/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-emerald-500/10 transition-colors">
                <Cpu className={`w-6 h-6 ${mod.status === 'Downloaded' ? 'text-emerald-400' : 'text-gray-400'}`} />
              </div>
              {mod.status === 'Downloaded' ? (
                <span className="flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full"><ShieldCheck className="w-3.5 h-3.5"/> Local</span>
              ) : (
                <span className="text-xs font-mono font-medium text-gray-500 bg-white/5 px-2 py-1 rounded-full">Cloud</span>
              )}
            </div>
            
            <h4 className="text-xl font-display font-medium text-gray-100 mb-2">{mod.name}</h4>
            <p className="text-sm text-gray-400 mb-6 flex-1">{mod.description}</p>
            
            <div className="space-y-3 mb-6 font-mono text-xs text-gray-400">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Architecture</span>
                <span className="text-gray-200">{mod.params}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Quantization</span>
                <span className="text-gray-200">{mod.quantization}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Context</span>
                <span className="text-gray-200">{mod.context}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>VRAM Req.</span>
                <span className="text-gray-200">{mod.size}</span>
              </div>
            </div>

            <button 
              className={`w-full py-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                mod.status === 'Downloaded' 
                  ? 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                  : 'bg-emerald-500 text-gray-950 hover:bg-emerald-400'
              }`}
            >
              <HardDrive className="w-4 h-4" />
              {mod.status === 'Downloaded' ? 'Purge Weights' : 'Pull Weights'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
