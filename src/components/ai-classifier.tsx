'use client';

import React, { useState } from 'react';
import { simulateAIWasteClassification } from '@/lib/match-engine';
import { Sparkles, UploadCloud, CheckCircle, ShieldAlert, Cpu, Leaf, RefreshCw, BarChart2 } from 'lucide-react';

export function AIClassifier() {
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedSample, setSelectedSample] = useState<'ewaste' | 'organic' | null>(null);
  const [result, setResult] = useState<ReturnType<typeof simulateAIWasteClassification> | null>(null);

  const handleAnalyze = (sampleType: 'ewaste' | 'organic') => {
    setSelectedSample(sampleType);
    setAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const res = simulateAIWasteClassification(
        sampleType === 'ewaste' ? 'circuit_board.jpg' : 'vegetable_scraps.jpg',
        sampleType === 'ewaste' ? 'E_WASTE' : 'ORGANIC_WASTE'
      );
      setResult(res);
      setAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-[#0F382C] to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-emerald-500/20 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-500/20 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Assisted Feature Prototype</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Smart AI Waste Classification & Valuation
            </h3>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
              Upload an image of your material to test computer-vision classification, safety compliance tagging, and estimated recovery value range.
            </p>
          </div>
        </div>

        {/* Upload & Sample Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dropzone simulation */}
          <div className="border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/40 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all">
            <UploadCloud className="w-10 h-10 text-emerald-400 mb-3 animate-bounce" />
            <p className="text-sm font-semibold text-white">Drag & drop material photo</p>
            <p className="text-xs text-slate-400 mt-1 mb-4">Supports JPG, PNG, WEBP (Max 10MB)</p>
            
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => handleAnalyze('ewaste')}
                disabled={analyzing}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Test E-Waste Photo</span>
              </button>
              <button
                onClick={() => handleAnalyze('organic')}
                disabled={analyzing}
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow"
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>Test Organic Photo</span>
              </button>
            </div>
          </div>

          {/* AI Analysis Result Display */}
          <div className="bg-slate-950/70 border border-emerald-500/30 rounded-xl p-6 flex flex-col justify-center min-h-[220px]">
            {analyzing ? (
              <div className="flex flex-col items-center justify-center space-y-3 py-8">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                <p className="text-xs font-semibold text-emerald-300">Extracting visual features & computing recovery index...</p>
              </div>
            ) : result ? (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold ${
                    result.detectedCategory === 'E_WASTE' ? 'bg-blue-900/80 text-blue-300 border border-blue-700' : 'bg-emerald-900/80 text-emerald-300 border border-emerald-700'
                  }`}>
                    {result.detectedCategory === 'E_WASTE' ? <Cpu className="w-3 h-3" /> : <Leaf className="w-3 h-3" />}
                    {result.detectedCategory} DETECTED
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400">
                    {result.confidence}% Confidence
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">{result.subcategory}</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Condition: <span className="font-semibold text-emerald-300">{result.estimatedCondition}</span></p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Estimated Market Value</span>
                    <span className="font-extrabold text-amber-400">{result.suggestedPriceRange}</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Recyclability Index</span>
                    <span className="font-extrabold text-emerald-400">{result.recyclabilityIndex} / 100</span>
                  </div>
                </div>

                <div className="text-[11px] bg-slate-900/90 text-slate-300 p-2.5 rounded border border-slate-800 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{result.safetyNotes}</span>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400 space-y-2 py-6">
                <BarChart2 className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs">Click one of the test photo buttons on the left to see instant AI vision classification.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
