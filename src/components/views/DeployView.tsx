import React, { useState } from 'react';
import { Terminal, Download, Laptop, Smartphone } from 'lucide-react';

export function DeployView() {
  const [platform, setPlatform] = useState<'linux' | 'windows' | 'android'>('linux');

  const scripts = {
    linux: {
      title: "Linux Server / Desktop (CUDA 12.1+)",
      icon: Terminal,
      command: `curl -fsSL https://gemmaforge.local/install.sh | bash
source ~/.bashrc

# Start the offline workflow engine with Max MoE weights
gemma-forge init --model gemma4-26b --quantization tq4_1s`
    },
    windows: {
      title: "Windows Native (TensorRT-LLM)",
      icon: Laptop,
      command: `iwr -useb https://gemmaforge.local/install.ps1 | iex

# Pre-allocating KV cache bounds for local execution
Start-GemmaForge -Model 'gemma4-26b' -Engine 'TensorRT' -MaxCtx 8192`
    },
    android: {
      title: "Android 16 AICore (Gemini Nano v3)",
      icon: Smartphone,
      command: `# Deploy via ADB to flagship device (12GB+ RAM required)
adb install app-arm64-v8a-release.apk
adb shell am start -n com.google.android.aicore/.Manager

# Map model routes internally
adb shell setprop persist.sys.aicore.nano_v3 true`
    }
  };

  const ActiveIcon = scripts[platform].icon;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h3 className="text-xl font-medium text-gray-200">Native Offline Installations</h3>
        <p className="text-gray-400 text-sm mt-1">One-click installation scripts to bypass manual dependency management and Python environment conflicts.</p>
      </div>

      <div className="flex gap-4">
        {(Object.keys(scripts) as Array<keyof typeof scripts>).map((key) => (
          <button
            key={key}
            onClick={() => setPlatform(key)}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              platform === key 
                ? 'bg-emerald-500 text-gray-950 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                : 'bg-[#111] text-gray-400 border border-white/10 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            {key === 'linux' && <Terminal className="w-4 h-4" />}
            {key === 'windows' && <Laptop className="w-4 h-4" />}
            {key === 'android' && <Smartphone className="w-4 h-4" />}
            <span className="capitalize">{key}</span>
          </button>
        ))}
      </div>

      <div className="bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden font-mono text-sm relative">
        <div className="p-4 border-b border-white/10 bg-[#111] flex items-center justify-between">
          <div className="flex items-center gap-3 text-emerald-400">
            <ActiveIcon className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wider uppercase">{scripts[platform].title}</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
        </div>
        <div className="p-6 relative">
          <pre className="text-gray-300 leading-relaxed whitespace-pre-wrap"><code className="language-bash">{scripts[platform].command}</code></pre>
          
          <button className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 rounded-lg transition-colors border border-white/10">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10">
        <h4 className="text-sm font-medium text-blue-400 mb-2">Architectural Blueprint Guarantee</h4>
        <p className="text-sm text-gray-400 leading-relaxed">
          The installation dynamically downloads the optimized <strong>TQ4_1S quantization</strong> for Max MoE on x86 platforms. Mobile targets receive the APK bypassing package bindings to ensure total device-level isolation under Private Compute Core constraints.
        </p>
      </div>
    </div>
  );
}
