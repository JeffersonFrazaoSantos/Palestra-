import React, { useState } from 'react';
import { AGENT_PILLARS } from '../data/presentationData';
import { soundFx } from '../utils/soundEffects';
import { Target, ShieldCheck, Key, AlertOctagon, Check, X, ShieldAlert, Cpu } from 'lucide-react';

export const TechnicalArchitecture: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>('single_function');
  const [showComparison, setShowComparison] = useState<boolean>(true);

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return Target;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Key':
        return Key;
      default:
        return Target;
    }
  };

  return (
    <div className="space-y-8 py-2">
      
      {/* Header Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          Arquitetura Técnica • Os 3 Pilares Obrigatórios
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Como Construir um <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Agente de IA Inquebrável</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Sem essas três diretrizes obrigatórias, a IA gera conteúdos vagos e genéricos que queimam a autoridade da sua marca.
        </p>
      </div>

      {/* 3 Pillars Visual Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {AGENT_PILLARS.map((pillar) => {
          const Icon = getPillarIcon(pillar.iconName);
          const isActive = activePillarId === pillar.id;

          return (
            <div
              key={pillar.id}
              onClick={() => {
                soundFx.playClick();
                setActivePillarId(pillar.id);
              }}
              className={`p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.15)] ring-1 ring-cyan-400'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.color} p-0.5 shadow-lg`}>
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cyan-300" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    PILAR {pillar.id === 'single_function' ? '01' : pillar.id === 'skills_guardrails' ? '02' : '03'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-100">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan-400">
                    {pillar.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-2">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold block">
                  💡 REGRA DE OURO:
                </span>
                <p className="text-xs text-slate-300 font-medium">
                  {pillar.keyRule}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Brand Protection Warning & Interactive Comparison */}
      <div className="rounded-3xl bg-slate-950 border border-amber-500/30 p-6 sm:p-8 space-y-6 shadow-[0_0_40px_rgba(255,183,3,0.05)]">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                RISCO DE MARCA • COMPARAÇÃO PRÁTICA
              </span>
              <h3 className="text-lg font-bold text-slate-100">
                Agente Genérico (Sem Diretrizes) vs. Agente Estruturado (Ellen Salomão)
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              setShowComparison(!showComparison);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 font-medium hover:text-white cursor-pointer"
          >
            {showComparison ? 'Ocultar Comparação' : 'Exibir Comparação'}
          </button>
        </div>

        {showComparison && (
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Bad Example */}
            <div className="p-5 rounded-2xl bg-red-950/10 border border-red-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                  <X className="w-4 h-4 text-red-400" />
                  AGENTE GENÉRICO (SEM OS 3 PILARES)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                  DANO À MARCA
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-red-900/40 text-xs text-slate-300 font-mono leading-relaxed">
                "Olá! Sou a IA de Vendas da empresa. Nossos cursos são incríveis e revolucionários!
                O preço é R$ 2.000, mas posso te fazer por R$ 1.000 se fechar agora no Pix! Quer comprar?"
              </div>

              <div className="text-xs text-red-300 space-y-1">
                <p>❌ <strong>Falhas:</strong> Alucinação de preço, tom desesperado, promessa sem autorização e linguagem genérica estilo "Copys de IA".</p>
              </div>
            </div>

            {/* Good Example */}
            <div className="p-5 rounded-2xl bg-emerald-950/10 border border-emerald-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  AGENTE ESTRUTURADO (COM 3 PILARES)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  HIGH-PERFORMANCE
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-900/40 text-xs text-slate-300 font-mono leading-relaxed">
                "Olá, Gustavo! Analisei o perfil da sua empresa e identifiquei um gargalo na qualificação do seu time comercial.
                Nossa solução de Squads ajusta essa etapa sem necessidade de novas contratações. Agendei uma análise técnica com nosso especialista."
              </div>

              <div className="text-xs text-emerald-300 space-y-1">
                <p>✅ <strong>Sucesso:</strong> Respeita a Função Única de qualificação, mantém tom de autoridade e opera com permissões integradas ao CRM.</p>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
