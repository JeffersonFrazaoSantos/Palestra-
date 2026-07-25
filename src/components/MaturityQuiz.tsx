import React, { useState } from 'react';
import { QUIZ_QUESTIONS, MATURITY_RESULTS } from '../data/presentationData';
import { soundFx } from '../utils/soundEffects';
import { CheckCircle2, ChevronRight, RotateCcw, AlertCircle, ArrowRight, Award, ShieldCheck, Sparkles, Layers } from 'lucide-react';

interface MaturityQuizProps {
  onCompleteQuiz?: (level: 1 | 2 | 3) => void;
  onExploreSquads?: () => void;
}

export const MaturityQuiz: React.FC<MaturityQuizProps> = ({ onCompleteQuiz, onExploreSquads }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [calculatedLevel, setCalculatedLevel] = useState<1 | 2 | 3>(1);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optionLevel: 1 | 2 | 3) => {
    soundFx.playClick();
    const newAnswers = { ...selectedAnswers, [currentQuestion.id]: optionLevel };
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    soundFx.playClick();
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate overall level based on average score
      const levels: number[] = Object.values(selectedAnswers);
      const avg = levels.reduce((a: number, b: number) => a + b, 0) / (levels.length || 1);
      let finalLevel: 1 | 2 | 3 = 1;
      if (avg >= 2.5) finalLevel = 3;
      else if (avg >= 1.6) finalLevel = 2;
      else finalLevel = 1;

      setCalculatedLevel(finalLevel);
      setQuizFinished(true);
      soundFx.playSuccess();
      if (onCompleteQuiz) onCompleteQuiz(finalLevel);
    }
  };

  const handleRestart = () => {
    soundFx.playClick();
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
  };

  const result = MATURITY_RESULTS[calculatedLevel];

  return (
    <div className="space-y-6 py-2">
      
      {/* Quiz Progress & Title Bar */}
      {!quizFinished ? (
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Question Panel (7 cols on desktop) */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-950/80 border border-cyan-500/30 p-6 sm:p-8 space-y-6 shadow-[0_0_30px_rgba(0,240,255,0.05)]">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Diagnóstico de Maturidade • Pergunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
                  {currentQuestion.question}
                </h2>
              </div>
              
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 self-start sm:self-auto shrink-0">
                {Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}% Concluído
              </span>
            </div>

            <p className="text-sm text-slate-400">
              {currentQuestion.subtitle}
            </p>

            {/* Options Grid */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQuestion.id] === opt.level;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.level)}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 text-slate-100 shadow-[0_0_20px_rgba(0,240,255,0.15)] ring-1 ring-cyan-400'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          Opção {String.fromCharCode(65 + idx)}
                        </span>
                        <h3 className="font-semibold text-sm sm:text-base">
                          {opt.label}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isSelected ? 'border-cyan-400 bg-cyan-400 text-slate-950' : 'border-slate-700'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => {
                  soundFx.playClick();
                  setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
                }}
                className="text-xs font-medium text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                ← Pergunta Anterior
              </button>

              <button
                disabled={!selectedAnswers[currentQuestion.id]}
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                {currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'Ver Resultado Final' : 'Próxima Pergunta'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Live Telemetry Sidebar (5 cols on desktop) */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-950 border border-cyan-500/30 p-6 space-y-6 shadow-[0_0_30px_rgba(0,240,255,0.05)]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                TELEMETRIA DO DIAGNÓSTICO
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                PROCESSO EM TEMPO REAL
              </span>
            </div>

            {/* Progress Gauge */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Progresso do Teste</span>
                <span className="text-cyan-300 font-bold">{currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Answer Tracker Pills */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold block">
                Histórico das Perguntas
              </span>
              <div className="space-y-1.5">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const answeredLevel = selectedAnswers[q.id];
                  const isCurrent = idx === currentQuestionIndex;

                  return (
                    <div 
                      key={q.id}
                      className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 font-bold'
                          : answeredLevel
                          ? 'bg-slate-900 border-slate-800 text-slate-300'
                          : 'bg-slate-950 border-slate-800/60 text-slate-600'
                      }`}
                    >
                      <span className="truncate max-w-[200px]">P{idx + 1}. {q.question}</span>
                      {answeredLevel ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 shrink-0 font-bold">
                          Nível {answeredLevel}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-600 shrink-0">Pendente</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-sans">
              💡 <strong>Objetivo:</strong> Mapear os pontos ciegos na execução do seu time para recomendar a estrutura ideal de Squads de IA.
            </div>

          </div>

        </div>
      ) : (
        /* Quiz Completed Result Screen */
        <div className="rounded-3xl bg-slate-950 border border-cyan-500/40 p-6 sm:p-10 space-y-8 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
          
          {/* Header Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  DIAGNÓSTICO CONCLUÍDO
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                {result.title}
              </h2>
            </div>

            <div className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase border ${
              calculatedLevel === 3
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : calculatedLevel === 2
                ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                : 'bg-red-950/80 border-red-500 text-red-300'
            }`}>
              {result.badge}
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Resumo da Operação Atual
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {result.summary}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Characteristics & Bottlenecks */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                Principais Sintomas Identificados
              </h3>

              <div className="space-y-2">
                {result.characteristics.map((char, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{char}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Action Plan based on Ellen Salomão's method */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Plano de Ação para Escalar
              </h3>

              <div className="space-y-2">
                {result.nextSteps.map((step, i) => (
                  <div key={i} className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/50 text-xs text-emerald-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
            <button
              onClick={handleRestart}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2 border border-slate-700 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Refazer o Teste
            </button>

            {onExploreSquads && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onExploreSquads();
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all cursor-pointer"
              >
                Avançar para Arquitetura de Squads
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
