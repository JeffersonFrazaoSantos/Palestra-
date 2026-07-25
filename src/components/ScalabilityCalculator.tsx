import React, { useState } from 'react';
import { soundFx } from '../utils/soundEffects';
import { Calculator, TrendingUp, Users, Clock, DollarSign, Zap, Sparkles } from 'lucide-react';

export const ScalabilityCalculator: React.FC = () => {
  const [employees, setEmployees] = useState<number>(10);
  const [repetitiveHours, setRepetitiveHours] = useState<number>(15); // hours per week per employee
  const [hourlyCost, setHourlyCost] = useState<number>(45); // R$ per hour

  // Calculations
  const weeklyHoursWasted = employees * repetitiveHours;
  const monthlyHoursWasted = weeklyHoursWasted * 4.33;
  const monthlyCostWasted = monthlyHoursWasted * hourlyCost;
  const yearlyCostWasted = monthlyCostWasted * 12;

  // Capacity multiplier with AI Squads (assuming 85% of repetitive task automation)
  const automatedHoursSaved = monthlyHoursWasted * 0.85;
  const fteCapacityGain = (automatedHoursSaved / 160).toFixed(1);

  return (
    <div className="space-y-8 py-2">
      
      {/* Header Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest">
          <Calculator className="w-3.5 h-3.5 text-cyan-400" />
          Simulador Finanças & Produtividade
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Escalabilidade de IA</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Simule em tempo real o ganho de capacidade produtiva e a preservação de margens de lucro com Squads de IA.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Sliders Input Panel */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-950 border border-cyan-500/30 p-6 sm:p-8 space-y-6 shadow-[0_0_30px_rgba(0,240,255,0.05)]">
          
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="w-4 h-4 text-cyan-400" />
            Parâmetros da Operação Atual
          </h3>

          {/* Slider 1: Employees */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Tamanho da Equipe Operacional:</span>
              <span className="text-cyan-300 font-bold text-sm bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">{employees} pessoas</span>
            </div>
            <input
              type="range"
              min="2"
              max="100"
              value={employees}
              onChange={(e) => {
                soundFx.playClick();
                setEmployees(Number(e.target.value));
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Slider 2: Hours spent on repetitive tasks */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Horas Repetitivas por Pessoa/Semana:</span>
              <span className="text-cyan-300 font-bold text-sm bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">{repetitiveHours} hrs/sem</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              value={repetitiveHours}
              onChange={(e) => {
                soundFx.playClick();
                setRepetitiveHours(Number(e.target.value));
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              *Inclui e-mails, transferir dados para CRM, formatar relatórios e mensagens de rotina.
            </p>
          </div>

          {/* Slider 3: Custo Hora Médio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Custo Hora Médio por Colaborador:</span>
              <span className="text-emerald-400 font-bold text-sm bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">R$ {hourlyCost},00/h</span>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              step="5"
              value={hourlyCost}
              onChange={(e) => {
                soundFx.playClick();
                setHourlyCost(Number(e.target.value));
              }}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Desperdício Mensal Atual (Manual):</span>
              <span className="text-red-400 font-bold">R$ {Math.round(monthlyCostWasted).toLocaleString('pt-BR')}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full w-full" />
            </div>
          </div>

        </div>

        {/* Results Output Cards (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-950 border border-emerald-500/40 p-6 sm:p-8 space-y-6 shadow-[0_0_40px_rgba(0,255,157,0.08)] flex flex-col justify-between">
          
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                IMPACTO FINANCEIRO & PRODUTIVIDADE (SQUADS IA)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                PROJEÇÃO DE ESCALA
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">Horas Salvas/Mês</span>
                <div className="text-2xl font-extrabold text-cyan-300 font-mono">
                  {Math.round(automatedHoursSaved)} hrs
                </div>
                <span className="text-[10px] text-slate-400">Tempo para estratégia</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">Ganho FTE</span>
                <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                  +{fteCapacityGain} pessoas
                </div>
                <span className="text-[10px] text-slate-400">Capacidade sem contratar</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">Payback Estimado</span>
                <div className="text-2xl font-extrabold text-amber-400 font-mono">
                  &lt; 30 dias
                </div>
                <span className="text-[10px] text-slate-400">Retorno do investimento</span>
              </div>

            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/30 border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>VALOR DE PRODUTIVIDADE RECUPERADO / ANO:</span>
                <TrendingUp className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <div className="text-3xl sm:text-5xl font-extrabold text-emerald-300 font-mono">
                R$ {Math.round(yearlyCostWasted * 0.85).toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-slate-300">
                Valor reaproveitado diretamente em atividades de fechamento comercial, inovação e crescimento da empresa.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Multiplique a capacidade executiva da sua empresa sem inflar a folha salarial.</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-900 text-cyan-400 border border-slate-800">
              MÉTODO ELLEN SALOMÃO
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
