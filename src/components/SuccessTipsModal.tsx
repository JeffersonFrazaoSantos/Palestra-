import React, { useState } from 'react';
import { soundFx } from '../utils/soundEffects';
import { Lightbulb, X, Check, AlertTriangle, ShieldCheck, Target, Sparkles, BookOpen } from 'lucide-react';

interface SuccessTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyExample?: (exampleInstructions: { instructions: string; brandGuardrails: string }) => void;
}

export const SuccessTipsModal: React.FC<SuccessTipsModalProps> = ({ isOpen, onClose, onApplyExample }) => {
  const [activeTab, setActiveTab] = useState<'guardrails' | 'tone' | 'antipatterns'>('guardrails');

  if (!isOpen) return null;

  const handleClose = () => {
    soundFx.playClick();
    onClose();
  };

  const examplePreset = {
    instructions: 'Atue como SDR especializado no método Ellen Salomão. Qualifique o lead perguntando faturamento mensal e número de colaboradores. Se faturar acima de R$ 50k/mês, ofereça horário na agenda do consultor. Se abaixo, envie o link do e-book gratuito.',
    brandGuardrails: '1. NUNCA ofereça descontos sem aprovação prévia.\n2. NUNCA mencione concorrentes de forma pejorativa.\n3. NUNCA use termos genéricos como "solução revolucionária" ou "alavanque seu negócio".\n4. Mantenha respostas curtas com no máximo 4 frases.'
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#0a0e1a] border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(0,240,255,0.15)] my-auto text-slate-100">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 to-cyan-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Lightbulb className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800 uppercase font-bold">
                  GUIA ANTI-ALUCINAÇÃO
                </span>
                <span className="text-xs font-mono text-cyan-400">MÉTODO ELLEN SALOMÃO</span>
              </div>
              <h3 className="text-xl font-bold text-slate-100 mt-0.5">
                Dicas de Sucesso para Redação de Instruções & Skills
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-100 border border-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 gap-1 text-xs font-mono">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('guardrails');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'guardrails'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            1. Regras de Negação
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('tone');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'tone'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            2. Tom de Voz Específico
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('antipatterns');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'antipatterns'
                ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            3. Erros Fatais ("Copys de IA")
          </button>
        </div>

        {/* Tab Contents */}
        <div className="space-y-4">
          
          {activeTab === 'guardrails' && (
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <p className="text-slate-400">
                A causa #1 das alucinações e respostas embaraçosas de IA é a ausência de <strong className="text-amber-300">Guardrails de Negação</strong> explicitando o que o agente <strong className="text-red-400 uppercase">NUNCA</strong> pode fazer.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-red-950/20 border border-red-900/50 space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-red-400 uppercase flex items-center gap-1">
                    <X className="w-3.5 h-3.5" /> Vago (Gera Alucinação)
                  </span>
                  <p className="text-slate-300 italic text-xs">
                    "Tente ser honesto sobre nossos preços e não prometa nada demais."
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/50 space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Blindado (Método Ellen Salomão)
                  </span>
                  <p className="text-slate-200 text-xs font-mono leading-relaxed">
                    "NUNCA invente preços. NUNCA ofereça desconto sem verificação prévia no CRM. Mantenha respostas curtas e objetivas."
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tone' && (
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <p className="text-slate-400">
                Evite adjetivos genéricos como "seja amigável e simpático". Em vez disso, forneça o <strong className="text-cyan-300">Framework de Raciocínio</strong> exacto que o agente deve seguir passo a passo.
              </p>

              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/60 space-y-2 text-xs">
                <span className="font-mono text-cyan-300 font-bold block">
                  💡 Exemplo de Instrução com Raciocínio Estruturado:
                </span>
                <p className="text-slate-200 leading-relaxed font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                  "Siga o método BANT: 1. Pergunte o faturamento mensal; 2. Verifique quem toma a decisão final; 3. Confirme o prazo desejado. Apresente os dados como um analista de negócios e não como um vendedor insistente."
                </p>
              </div>
            </div>
          )}

          {activeTab === 'antipatterns' && (
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <p className="text-slate-400">
                Palavras-gatilho que queimam a credibilidade da sua marca por soar como "texto gerado por IA":
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <span className="text-red-400 font-bold block">🚫 Palavras Proibidas:</span>
                  <p className="text-slate-400">
                    "Supercharge", "Empower", "Solução Revolucionária", "Alavanque", "No mundo dinâmico de hoje", "Em resumo".
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <span className="text-emerald-400 font-bold block">✅ Substitua por:</span>
                  <p className="text-slate-200">
                    Dados concretos, perguntas diretas, métricas de resultado, tom humano de consultoria direta.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          {onApplyExample ? (
            <button
              onClick={() => {
                soundFx.playSuccess();
                onApplyExample(examplePreset);
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Aplicar Exemplo no Construtor
            </button>
          ) : <div />}

          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 cursor-pointer"
          >
            Entendi, Voltar ao Agente
          </button>
        </div>

      </div>
    </div>
  );
};
