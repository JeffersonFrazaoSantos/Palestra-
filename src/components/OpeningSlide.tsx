import React from 'react';
import { Zap, AlertTriangle, ArrowRight, ShieldAlert, TrendingUp, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface OpeningSlideProps {
  onStartQuiz: () => void;
  onExploreSquads: () => void;
}

export const OpeningSlide: React.FC<OpeningSlideProps> = ({ onStartQuiz, onExploreSquads }) => {
  return (
    <div className="space-y-10 py-4">
      {/* Hero Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-[#0a0f1d] to-[#0d162d] border border-cyan-500/30 p-8 lg:p-12 overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.08)]">
        
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              Palestra Ellen Salomão • Engenharia de Negócios
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Conhecimento Isolado <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Não Gera Lucro.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-light leading-relaxed">
              A <strong className="font-semibold text-cyan-300">execução</strong> é o verdadeiro gargalo das empresas modernas.
              Descubra como escalar o faturamento alavancando a produtividade do seu time com <strong className="font-semibold text-emerald-400">Squads de IA Autônomos</strong> — sem precisar demitir ou explodir a folha de pagamento.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  soundFx.playSuccess();
                  onStartQuiz();
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                Fazer Teste de Maturidade de IA
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onExploreSquads();
                }}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                Ver Rede de Squads na Prática
              </button>
            </div>
          </div>

          {/* Right Column (Desktop Bento Card): Comparative Live Telemetry */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="p-6 rounded-3xl bg-slate-950/90 border border-cyan-500/40 space-y-5 shadow-[0_0_30px_rgba(0,240,255,0.1)] relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  RADAR DE EFICIÊNCIA OPERACIONAL
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 animate-pulse">
                  AO VIVO
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono text-slate-400">Capacidade de Produção</span>
                    <p className="text-xs text-slate-200 font-medium">Sem aumentar custos fixos</p>
                  </div>
                  <span className="text-2xl font-extrabold font-mono text-cyan-300">+1.000%</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono text-slate-400">Gargalo de Digitação & Copia</span>
                    <p className="text-xs text-slate-200 font-medium">Automação de ponta a ponta</p>
                  </div>
                  <span className="text-2xl font-extrabold font-mono text-emerald-400">0%</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono text-slate-400">Governança dos 3 Pilares</span>
                    <p className="text-xs text-slate-200 font-medium">Proteção total da marca</p>
                  </div>
                  <span className="text-2xl font-extrabold font-mono text-blue-400">100%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800 text-[11px] text-cyan-200 font-mono">
                ⚡ 1 Colaborador Estratégico + 1 Squad IA = Produção de uma agência inteira.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Problem vs Solution Comparison Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            O Paradoxo do Crescimento Tradicional vs. Modelo Squads de IA
          </h2>
          <span className="text-xs font-mono text-slate-400">ENGENHARIA DE PROCESSO</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Card 1: Tradicional (Gargalo) */}
          <div className="rounded-2xl bg-slate-950/80 border border-red-500/30 p-6 space-y-4 relative overflow-hidden group hover:border-red-500/50 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                <ShieldAlert className="w-4 h-4" />
                Modelo Tradicional (Gargalo da Folha)
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-800">
                BAIXA ESCALA
              </span>
            </div>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <span><strong>Mais Vendas = Mais Pessoas:</strong> Para dobrar a produção, você precisa triplicar o time operacional.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <span><strong>Esmagamento de Margem:</strong> O aumento dos custos fixos, encargos e treinamento corrói o lucro líquido.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <span><strong>Inconsistência de Execução:</strong> Falhas de comunicação e retrabalho geram processos manuais lentos.</span>
              </li>
            </ul>

            <div className="pt-2">
              <div className="p-3 rounded-xl bg-red-950/30 border border-red-900/50 text-xs text-red-200">
                ⚠️ <strong>Resultado:</strong> A empresa fatura mais, mas o empresário ganha menos e trabalha o dobro gerenciando gargalos.
              </div>
            </div>
          </div>

          {/* Card 2: Modelo Ellen Salomão (Squads) */}
          <div className="rounded-2xl bg-gradient-to-b from-cyan-950/30 to-slate-950/90 border border-cyan-500/40 p-6 space-y-4 relative overflow-hidden group shadow-[0_0_30px_rgba(0,240,255,0.05)] hover:border-cyan-400 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Modelo Ellen Salomão (Squads de IA)
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
                ESCALABILIDADE
              </span>
            </div>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Capacidade Executiva Multiplicada:</strong> 1 colaborador gerencia um Squad de 5 Agentes Especializados.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Preservação de Margem:</strong> O volume operacional escala infinitamente sem inflar a folha de pagamento.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Padronização Cirúrgica:</strong> Instruções e permissões garantem respostas alinhadas com o tom da marca.</span>
              </li>
            </ul>

            <div className="pt-2">
              <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-800 text-xs text-cyan-200 font-medium">
                🚀 <strong>Resultado:</strong> O faturamento cresce exponencialmente mantendo uma estrutura enxuta, ágil e lucrativa.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Metric Cards Banner */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>MULTIPLICADOR DE CAPACIDADE</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-100 font-mono">10x</div>
          <p className="text-xs text-slate-400">Mais produção entregue por pessoa no time</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>REDUÇÃO DE GARGALO</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">0%</div>
          <p className="text-xs text-slate-400">Gargalo de digitação em tarefas repetitivas</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>GOVERNANÇA DE MARCA</span>
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-300 font-mono">100%</div>
          <p className="text-xs text-slate-400">Conformidade com os 3 Pilares do Agente</p>
        </div>
      </div>
    </div>
  );
};
