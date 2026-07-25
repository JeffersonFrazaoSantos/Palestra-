import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRESENTATION_SLIDES } from '../data/presentationData';
import { OpeningSlide } from './OpeningSlide';
import { MaturityQuiz } from './MaturityQuiz';
import { MaturityLevels } from './MaturityLevels';
import { TechnicalArchitecture } from './TechnicalArchitecture';
import { SquadNetworkGraph } from './SquadNetworkGraph';
import { AgentBuilder } from './AgentBuilder';
import { ScalabilityCalculator } from './ScalabilityCalculator';
import { soundFx } from '../utils/soundEffects';
import { ChevronLeft, ChevronRight, X, Play, MessageSquare, Sparkles, Maximize2, Grid } from 'lucide-react';

interface PresentationModeProps {
  onExit: () => void;
  showSpeakerNotes: boolean;
  setShowSpeakerNotes: (val: boolean) => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  onExit,
  showSpeakerNotes,
  setShowSpeakerNotes,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex];

  const handleNext = () => {
    soundFx.playClick();
    if (currentSlideIndex < PRESENTATION_SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    soundFx.playClick();
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const renderSlideContent = () => {
    switch (currentSlide.id) {
      case 'intro':
        return <OpeningSlide onStartQuiz={() => setCurrentSlideIndex(1)} onExploreSquads={() => setCurrentSlideIndex(4)} />;
      case 'quiz':
        return <MaturityQuiz onExploreSquads={() => setCurrentSlideIndex(2)} />;
      case 'maturity_levels':
        return <MaturityLevels />;
      case 'architecture':
        return <TechnicalArchitecture />;
      case 'squad_diagram':
        return <SquadNetworkGraph />;
      case 'builder':
        return <AgentBuilder />;
      case 'calculator':
        return <ScalabilityCalculator />;
      default:
        return <OpeningSlide onStartQuiz={() => setCurrentSlideIndex(1)} onExploreSquads={() => setCurrentSlideIndex(4)} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080a10] text-slate-100 flex flex-col justify-between overflow-y-auto">
      
      {/* Top Slide Control Header */}
      <div className="sticky top-0 z-40 bg-[#080a10]/90 backdrop-blur-md border-b border-cyan-500/20 px-6 py-3 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
            SLIDE {currentSlideIndex + 1} / {PRESENTATION_SLIDES.length}
          </div>

          <div className="hidden sm:block">
            <span className="text-xs font-mono text-slate-400 uppercase">{currentSlide.category}</span>
            <h2 className="text-sm font-bold text-slate-200">{currentSlide.title}</h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={() => {
              soundFx.playClick();
              setShowSpeakerNotes(!showSpeakerNotes);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-1.5 cursor-pointer ${
              showSpeakerNotes ? 'bg-amber-950/80 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Notas do Palestrante</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onExit();
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 cursor-pointer"
            title="Sair da Apresentação"
          >
            <X className="w-4 h-4" />
          </button>

        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 flex flex-col justify-center my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, x: 20, scale: 0.99 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.99 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderSlideContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Speaker Notes Overlay Drawer */}
      {showSpeakerNotes && (
        <div className="bg-amber-950/90 border-t border-amber-500/40 p-4 px-6 text-xs text-amber-200 font-mono space-y-1">
          <span className="font-bold text-amber-400 uppercase">💡 NOTAS DO PALESTRANTE (ELLEN SALOMÃO):</span>
          <p className="leading-relaxed">{currentSlide.speakerNotes}</p>
        </div>
      )}

      {/* Bottom Progress & Slide Controls Bar */}
      <div className="sticky bottom-0 z-40 bg-[#080a10]/95 border-t border-cyan-500/20 px-6 py-3 flex items-center justify-between">
        
        {/* Slide Progress Line */}
        <div className="flex-1 max-w-md hidden md:flex items-center gap-1">
          {PRESENTATION_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundFx.playClick();
                setCurrentSlideIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all flex-1 cursor-pointer ${
                idx === currentSlideIndex
                  ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                  : idx < currentSlideIndex
                  ? 'bg-cyan-900'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs font-mono text-slate-500 hidden sm:inline">
            Use as Setas do Teclado (← / →)
          </span>

          <button
            disabled={currentSlideIndex === 0}
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            disabled={currentSlideIndex === PRESENTATION_SLIDES.length - 1}
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            Próximo Slide
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
