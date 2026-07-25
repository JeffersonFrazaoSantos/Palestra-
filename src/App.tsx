import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppMode } from './types';
import { Header } from './components/Header';
import { OpeningSlide } from './components/OpeningSlide';
import { MaturityQuiz } from './components/MaturityQuiz';
import { MaturityLevels } from './components/MaturityLevels';
import { TechnicalArchitecture } from './components/TechnicalArchitecture';
import { SquadNetworkGraph } from './components/SquadNetworkGraph';
import { AgentBuilder } from './components/AgentBuilder';
import { ScalabilityCalculator } from './components/ScalabilityCalculator';
import { ResourceLibrary } from './components/ResourceLibrary';
import { PresentationMode } from './components/PresentationMode';
import { Cpu, Play, MessageSquare, X } from 'lucide-react';

const SPEAKER_NOTES_MAP: Record<string, { title: string; note: string }> = {
  intro: {
    title: '1. Gargalo da Execução',
    note: 'Apresente o problema central: a maioria das empresas foca em acumular conhecimento, mas trava na capacidade de execução. A solução de Ellen Salomão é alavancar a produtividade sem inflar a folha de pagamento.',
  },
  quiz: {
    title: '2. Teste de Maturidade de IA',
    note: 'Convoque a audiência para realizar o teste de 5 perguntas. O diagnóstico mostra visualmente se o negócio é "Quem Pede", "Quem Delega" ou "Quem Desenha".',
  },
  maturity: {
    title: '3. Os 3 Níveis de IA',
    note: 'Detalhe a diferença entre prompt pontual, criação de assistentes isolados e a verdadeira Engenharia de Negócios com Squads de IA.',
  },
  architecture: {
    title: '4. Arquitetura do Agente',
    note: 'Alerte vigorosamente sobre o perigo da falta de diretrizes, gerando conteúdos genéricos que destroem a credibilidade e autoridade da marca.',
  },
  squads: {
    title: '5. Rede de Squads de IA',
    note: 'Demonstre na prática a transmissão de dados entre agentes. Mostre como o output do Lead Classifier vira input para o Personalizer Copy.',
  },
  builder: {
    title: '6. Construtor de Agentes',
    note: 'Entregue o plano de ação imediato. Não tente criar sistemas hiper complexos no dia 1. Escolha a tarefa mais dolorosa, isole a função e gere a especificação técnica.',
  },
  calculator: {
    title: '7. Calculadora de Escalabilidade',
    note: 'Demonstre a matemática da escalabilidade em tempo real: ganho de horas, capacidade ampliada e preservação das margens de lucro.',
  },
  resources: {
    title: '8. Biblioteca & Materiais',
    note: 'Apresente o acervo exclusivo de slides em PDF HD, templates de System Prompts em Markdown e livros recomendados para aprofundamento técnico.',
  },
};

export default function App() {
  const [currentMode, setMode] = useState<AppMode>('explorer');
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);

  const activeNote = SPEAKER_NOTES_MAP[activeSection];

  return (
    <div className="min-h-screen bg-[#080a10] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* App Header */}
      <Header
        currentMode={currentMode}
        setMode={setMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSoundOn={isSoundOn}
        setIsSoundOn={setIsSoundOn}
        showSpeakerNotes={showSpeakerNotes}
        setShowSpeakerNotes={setShowSpeakerNotes}
      />

      {/* Fullscreen Presentation Mode Deck Overlay */}
      {currentMode === 'presentation' && (
        <PresentationMode
          onExit={() => setMode('explorer')}
          showSpeakerNotes={showSpeakerNotes}
          setShowSpeakerNotes={setShowSpeakerNotes}
        />
      )}

      {/* Main Container in Explorer Mode */}
      <main className="flex-1 max-w-7xl 2xl:max-w-[1536px] w-full mx-auto px-4 lg:px-8 py-8 space-y-8">
        
        {/* Speaker Notes Banner in Explorer Mode */}
        {currentMode !== 'presentation' && (
          showSpeakerNotes && activeNote ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/90 border border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.2)] flex items-start justify-between gap-4 transition-all animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    NOTAS DA PALESTRANTE • {activeNote.title.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-900/80 text-amber-200 border border-amber-700 font-bold">
                    ELLEN SALOMÃO
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-100 leading-relaxed font-mono">
                  {activeNote.note}
                </p>
              </div>

              <button
                onClick={() => setShowSpeakerNotes(false)}
                className="p-1.5 rounded-lg bg-amber-900/60 text-amber-300 hover:bg-amber-800 hover:text-amber-100 transition-all cursor-pointer shrink-0"
                title="Ocultar notas de palestra"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 px-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                Notas do palestrante estão ocultas.
              </span>
              <button
                onClick={() => setShowSpeakerNotes(true)}
                className="text-amber-400 hover:text-amber-300 font-mono font-bold underline cursor-pointer text-xs"
              >
                Ativar Notas
              </button>
            </div>
          )
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.995 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeSection === 'intro' && (
              <OpeningSlide
                onStartQuiz={() => {
                  setActiveSection('quiz');
                }}
                onExploreSquads={() => {
                  setActiveSection('squads');
                }}
              />
            )}

            {activeSection === 'quiz' && (
              <MaturityQuiz
                onExploreSquads={() => {
                  setActiveSection('maturity');
                }}
              />
            )}

            {activeSection === 'maturity' && <MaturityLevels />}

            {activeSection === 'architecture' && <TechnicalArchitecture />}

            {activeSection === 'squads' && <SquadNetworkGraph />}

            {activeSection === 'builder' && <AgentBuilder />}

            {activeSection === 'calculator' && <ScalabilityCalculator />}

            {activeSection === 'resources' && <ResourceLibrary />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer & Presenter Banner */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 lg:px-8 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="font-bold text-slate-200">
                Apresentação 2: Ellen Salomão — Escalabilidade e Squads de IA
              </p>
              <p className="text-[11px] text-slate-500">
                Engenharia de Negócios • Automação Escalável com 3 Pilares de IA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setMode('presentation');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-mono font-semibold flex items-center gap-2 cursor-pointer transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Iniciar Modo Apresentação Slide Deck
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
