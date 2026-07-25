import React from 'react';
import { Play, Grid, Sparkles, Volume2, VolumeX, Maximize2, Cpu, MessageSquare } from 'lucide-react';
import { AppMode } from '../types';
import { soundFx } from '../utils/soundEffects';

interface HeaderProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isSoundOn: boolean;
  setIsSoundOn: (val: boolean) => void;
  showSpeakerNotes: boolean;
  setShowSpeakerNotes: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  setMode,
  activeSection,
  setActiveSection,
  isSoundOn,
  setIsSoundOn,
  showSpeakerNotes,
  setShowSpeakerNotes,
}) => {
  const handleSoundToggle = () => {
    const newState = soundFx.toggleSound();
    setIsSoundOn(newState);
    if (newState) soundFx.playClick();
  };

  const navItems = [
    { id: 'intro', label: '1. Gargalo da Execução' },
    { id: 'quiz', label: '2. Teste de Maturidade' },
    { id: 'maturity', label: '3. Os 3 Níveis' },
    { id: 'architecture', label: '4. Arquitetura do Agente' },
    { id: 'squads', label: '5. Rede de Squads' },
    { id: 'builder', label: '6. Construtor (Comece Pequeno)' },
    { id: 'calculator', label: '7. Calculadora de ROI' },
    { id: 'resources', label: '8. Biblioteca & Materiais' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#080a10]/85 border-b border-cyan-500/20 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Presenter Badge */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
                  Ellen Salomão
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 font-mono">
                  SQUADS IA
                </span>
              </div>
              <h1 className="text-sm font-bold text-slate-100 tracking-tight">
                Escalabilidade & Engenharia de IA
              </h1>
            </div>
          </div>

          {/* Quick Sound, Notes & Mode Actions on Mobile */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={() => {
                soundFx.playClick();
                setShowSpeakerNotes(!showSpeakerNotes);
              }}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1 cursor-pointer ${
                showSpeakerNotes
                  ? 'bg-amber-950/90 border-amber-500/80 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
              title="Ativar/Desativar Notas do Palestrante"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-bold">Notas {showSpeakerNotes ? 'ON' : 'OFF'}</span>
            </button>
            <button
              onClick={handleSoundToggle}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
              title="Som"
            >
              {isSoundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setMode(currentMode === 'presentation' ? 'explorer' : 'presentation');
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500 text-slate-950 flex items-center gap-1.5"
            >
              {currentMode === 'presentation' ? <Grid className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {currentMode === 'presentation' ? 'Explorar' : 'Slides'}
            </button>
          </div>
        </div>

        {/* Navigation Bar in Explorer Mode */}
        {currentMode !== 'presentation' && (
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80 overflow-x-auto max-w-2xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveSection(item.id);
                  if (currentMode === 'quiz' && item.id !== 'quiz') setMode('explorer');
                  if (currentMode === 'builder' && item.id !== 'builder') setMode('explorer');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  activeSection === item.id
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.15)] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}

        {/* Desktop Controls: Presentation Mode Toggle + Sound */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              setShowSpeakerNotes(!showSpeakerNotes);
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              showSpeakerNotes
                ? 'bg-amber-950/80 border-amber-500/80 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Ativar/Desativar Notas do Palestrante"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">Notas {showSpeakerNotes ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={handleSoundToggle}
            className={`p-2 rounded-xl border transition-all flex items-center gap-2 text-xs font-mono ${
              isSoundOn
                ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title={isSoundOn ? 'Efeitos sonoros ativados' : 'Efeitos sonoros desativados'}
          >
            {isSoundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            <span className="hidden xl:inline">{isSoundOn ? 'SFX ON' : 'SFX OFF'}</span>
          </button>

          <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => {
                soundFx.playClick();
                setMode('explorer');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
                currentMode !== 'presentation'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              Navegação
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setMode('presentation');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
                currentMode === 'presentation'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-cyan-400'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Modo Apresentação
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
