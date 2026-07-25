import React, { useState } from 'react';
import { soundFx } from '../utils/soundEffects';
import { MessageSquare, Bot, Network, ArrowRight, Zap, ShieldAlert, Cpu } from 'lucide-react';

export const MaturityLevels: React.FC = () => {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(3);

  const levels = [
    {
      level: 1,
      title: 'QUEM PEDE',
      roleName: 'Operador de Prompt Reativo',
      icon: MessageSquare,
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300',
      badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-800',
      tagline: 'Geração de conteúdo pontual sem retenção de processo.',
      description: 'O usuário entra no chat (ChatGPT, Claude, Gemini) e faz perguntas soltas. Cada tarefa exige interação manual humana contínua.',
      routine: 'Digita um prompt -> Espera a resposta -> Copia e cola -> Corrige o texto -> Envia.',
      bottleneck: 'Falta de padrão, alucinações de marca e dependência humana em 100% dos cliques.',
      valueToAdd: 'Migrar de prompts soltos para agentes salvos com instruções pré-definidas.'
    },
    {
      level: 2,
      title: 'QUEM DELEGA',
      roleName: 'Gestor de Agentes Isolados',
      icon: Bot,
      color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/40 text-blue-300',
      badgeBg: 'bg-blue-950/80 text-blue-300 border-blue-800',
      tagline: 'Agentes criados com personas e habilidades específicas.',
      description: 'A empresa já cria assistentes ou Custom GPTs com arquivos de apoio (PDFs, regras). No entanto, esses agentes trabalham ilhados.',
      routine: 'O agente escreve o artigo -> O humano lê -> O humano passa o artigo para o agente de CRM -> O humano agenda.',
      bottleneck: 'Gargalo de transferência (hand-off manual) entre agentes. Falta de comunicação via API.',
      valueToAdd: 'Interconectar os agentes via engenharia de processos para criar um Squad Autônomo.'
    },
    {
      level: 3,
      title: 'QUEM DESENHA',
      roleName: 'Arquiteto de Squads de IA (Engenharia de Negócios)',
      icon: Network,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/50 text-emerald-300',
      badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
      tagline: 'Rede de agentes autônomos integrados aos sistemas centrais.',
      description: 'O estado da arte de Ellen Salomão! Você desenha o mapa da operação e posiciona Squads de IA com Função Única, Skills e Permissões Sistêmicas.',
      routine: 'Lead preenche formulário -> Agente 1 Classifica -> Agente 2 Personaliza Copy -> Agente 3 Atualiza CRM -> Agente 4 Agenda Reunião.',
      bottleneck: 'O único gargalo passa a ser a escala do tráfego de entrada (Inbound/Outbound).',
      valueToAdd: 'Manter a folha enxuta enquanto o faturamento e a capacidade executiva multiplicam.'
    }
  ];

  return (
    <div className="space-y-8 py-2">
      
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          Modelo de Maturidade de IA • Ellen Salomão
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          De Pedir a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Desenhar Squads</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Compreenda os três estágios de adoção de Inteligência Artificial nas empresas modernas e identifique onde ocorre o salto de faturamento.
        </p>
      </div>

      {/* Level Selector Tabs */}
      <div className="grid sm:grid-cols-3 gap-4">
        {levels.map((lvl) => {
          const Icon = lvl.icon;
          const isActive = activeTab === lvl.level;
          return (
            <button
              key={lvl.level}
              onClick={() => {
                soundFx.playClick();
                setActiveTab(lvl.level as 1 | 2 | 3);
              }}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                isActive
                  ? 'bg-slate-900 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.15)] ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between pb-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${lvl.badgeBg}`}>
                  NÍVEL {lvl.level}
                </span>
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              </div>

              <div className="font-bold text-slate-100 text-base">
                {lvl.title}
              </div>

              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                {lvl.roleName}
              </p>

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Level Detail Card */}
      {(() => {
        const currentLvl = levels.find((l) => l.level === activeTab)!;
        const Icon = currentLvl.icon;

        return (
          <div className="rounded-3xl bg-slate-950 border border-cyan-500/30 p-6 sm:p-10 space-y-8 shadow-[0_0_40px_rgba(0,240,255,0.06)] relative overflow-hidden">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                  <Icon className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                    ESTÁGIO NÍVEL {currentLvl.level}
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-100">
                    {currentLvl.title} — {currentLvl.roleName}
                  </h3>
                </div>
              </div>

              <span className="text-xs text-slate-300 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl font-mono self-start sm:self-auto">
                {currentLvl.tagline}
              </span>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
                Funcionamento da Operação
              </h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                {currentLvl.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Routine Flow */}
              <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold font-mono uppercase">
                  <Zap className="w-4 h-4" />
                  Fluxo de Execução Típico
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  {currentLvl.routine}
                </p>
              </div>

              {/* Bottlenecks & Risk */}
              <div className="p-5 rounded-2xl bg-amber-950/10 border border-amber-900/40 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono uppercase">
                  <ShieldAlert className="w-4 h-4" />
                  Gargalo do Nível
                </div>
                <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                  {currentLvl.bottleneck}
                </p>
              </div>

            </div>

            {/* How to Evolve */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                  COMO EVOLUIR PARA O PRÓXIMO NÍVEL
                </span>
                <p className="text-sm font-medium text-slate-200">
                  {currentLvl.valueToAdd}
                </p>
              </div>

              {currentLvl.level < 3 && (
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveTab((currentLvl.level + 1) as 1 | 2 | 3);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  Ver Nível {currentLvl.level + 1}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        );
      })()}

    </div>
  );
};
