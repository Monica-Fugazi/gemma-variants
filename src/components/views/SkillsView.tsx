import React, { useState } from 'react';
import { Save, Plus, FileCode } from 'lucide-react';

export function SkillsView() {
  const [skillName, setSkillName] = useState('weather-mcp');
  const [skillDesc, setSkillDesc] = useState('Fetches live weather data through standardized JSON-RPC 2.0 interface.');

  const generatedManifest = `{
  "mcpVersion": "2024-11-05",
  "server": {
    "name": "${skillName}",
    "version": "1.0.0"
  },
  "capabilities": {
    "tools": {
      "get_weather": {
        "description": "${skillDesc}",
        "parameters": {
          "type": "object",
          "properties": { "location": { "type": "string" } },
          "required": ["location"]
        }
      }
    }
  }
}`;

  const generatedMarkdown = `---
name: ${skillName}
description: ${skillDesc}
allowed-tools: [get_weather]
---

# Weather MCP Skill Guidelines
You are connected to a structured weather API via the Model Context Protocol.

1. When a user asks for weather, strictly invoke the \`get_weather\` tool.
2. Present the retrieved JSON-RPC response in a clean, human-readable format.
3. If the tool request fails, inform the user you cannot reach the local node.
`;

  return (
    <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
      {/* Editor Side */}
      <div className="bg-[#111] rounded-2xl border border-white/10 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
          <h3 className="font-medium text-gray-200 flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" /> Builder
          </h3>
          <button className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-md hover:bg-emerald-500/20 transition-colors flex items-center gap-2">
            <Save className="w-3 h-3" /> Save Repo
          </button>
        </div>
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Skill Namespace</label>
            <input 
              type="text" 
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono text-sm text-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Operation Description</label>
            <textarea 
              value={skillDesc}
              onChange={(e) => setSkillDesc(e.target.value)}
              rows={4}
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm text-gray-200 resize-none"
            />
          </div>
          <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
            <h4 className="text-sm font-medium text-emerald-400 mb-2">Workflow Integration</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              These manifests will be auto-indexed into your local workflow repository. 
              The agent uses <code>SKILL.md</code> constraints for behavior and routes the JSON schema dynamically into local execution pipelines.
            </p>
          </div>
        </div>
      </div>

      {/* Preview Side */}
      <div className="bg-[#0A0A0A] rounded-2xl border border-white/10 flex flex-col overflow-hidden font-mono text-sm">
        <div className="p-4 border-b border-white/10 bg-black/40 flex items-center gap-4">
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300 flex items-center gap-2 text-xs">
            <FileCode className="w-3.5 h-3.5 text-blue-400" /> manifest.json
          </div>
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300 flex items-center gap-2 text-xs">
            <FileCode className="w-3.5 h-3.5 text-yellow-400" /> SKILL.md
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h4 className="text-xs font-bold text-gray-500 mb-3 border-b border-white/10 pb-2 uppercase tracking-wider">manifest.json</h4>
            <pre className="text-gray-300 leading-relaxed whitespace-pre-wrap"><code className="language-json">{generatedManifest}</code></pre>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-500 mb-3 border-b border-white/10 pb-2 uppercase tracking-wider">SKILL.md</h4>
            <pre className="text-blue-300 leading-relaxed whitespace-pre-wrap"><code className="language-markdown">{generatedMarkdown}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
}
