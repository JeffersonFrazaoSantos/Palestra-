import React, { useState } from 'react';
import { soundFx } from '../utils/soundEffects';
import { AgentSpec } from '../types';
import { AGENT_TEMPLATES, AgentTemplate } from '../data/agentTemplates';
import { 
  Sparkles, 
  Target, 
  Headphones, 
  BarChart3, 
  PenTool, 
  Users, 
  Cpu, 
  Check, 
  ArrowRight, 
  Eye, 
  X, 
  Layers, 
  ShieldCheck, 
  Zap,
  BookOpen
} from 'lucide-react';

interface TemplateLibraryProps {
  currentSpec: AgentSpec;
  onSelectTemplate: (templateSpec: AgentSpec, templateName: string) => void;
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ currentSpec, onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<AgentTemplate | null>(null);
  const [activeLoadedId, setActiveLoadedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Blueprints' },
    { id: 'vendas', label: 'Vendas Inbound' },
    { id: 'suporte', label: 'Atendimento & CX' },
    { id: 'dados', label: 'Análise de Dados' },
    { id: 'marketing', label: 'Marketing & Copy' },
    { id: 'rh', label: 'Operações & RH' },
  ];

  const filteredTemplates = selectedCategory === 'all'
    ? AGENT_TEMPLATES
    : AGENT_TEMPLATES.filter((t) => t.category === selectedCategory);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-5 h-5" />;
      case 'Headphones': return <Headphones className="w-5 h-5" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5" />;
      case 'PenTool': return <PenTool className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleApply = (template: AgentTemplate) => {
    soundFx.playSuccess();
    setActiveLoadedId(template.id);
    onSelectTemplate(template.spec, template.name);
    setPreviewTemplate(null);
  };

  return (
    <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-7 space-y-6 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase">
                BIBLIOTECA DE BLUEPRINTS
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {AGENT_TEMPLATES.length} modelos prontos
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-100 mt-0.5">
              Comece Rápido com Modelos Pré-Configurados
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-400 max-w-md leading-relaxed">
          Selecione um blueprint testado no método de IA para carregar instantaneamente o Pilar 1 (Função Única), Pilar 2 (Guardrails de Marca) e Pilar 3 (Permissões).
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              soundFx.playClick();
              setSelectedCategory(cat.id);
            }}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer border ${
              selectedCategory === cat.id
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.15)] font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((tpl) => {
          const isLoaded = activeLoadedId === tpl.id || currentSpec.name === tpl.spec.name;

          return (
            <div
              key={tpl.id}
              className={`group relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                isLoaded
                  ? 'bg-gradient-to-b from-cyan-950/40 to-slate-950 border-cyan-500/60 shadow-[0_0_25px_rgba(0,240,255,0.15)]'
                  : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                
                {/* Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl border ${tpl.badgeColor}`}>
                    {getCategoryIcon(tpl.iconName)}
                  </div>
                  
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${tpl.badgeColor}`}>
                    {tpl.categoryLabel}
                  </span>
                </div>

                {/* Title & Squad */}
                <div>
                  <h4 className="font-bold text-slate-100 text-base group-hover:text-cyan-300 transition-colors">
                    {tpl.name}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                    {tpl.squadName}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {tpl.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setPreviewTemplate(tpl);
                  }}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer"
                  title="Visualizar Detalhes"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleApply(tpl)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isLoaded
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 border border-slate-700 hover:border-cyan-400 shadow-sm'
                  }`}
                >
                  {isLoaded ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Blueprint Carregado
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      Carregar Blueprint
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Blueprint Detail Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0a0e1a] border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(0,240,255,0.2)] my-auto text-slate-100">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl border ${previewTemplate.badgeColor}`}>
                  {getCategoryIcon(previewTemplate.iconName)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase font-bold">
                      DETALHES DO BLUEPRINT
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {previewTemplate.squadName}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mt-0.5">
                    {previewTemplate.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setPreviewTemplate(null);
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-100 border border-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Specs Content */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 text-xs sm:text-sm">
              
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase block flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  Pilar 1: Função Única
                </span>
                <p className="text-slate-200 leading-relaxed font-sans">
                  {previewTemplate.spec.singleFunction}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase block flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Pilar 2: Instruções & Tom de Voz
                </span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  {previewTemplate.spec.instructions}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-2">
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase block flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Guardrails de Marca (Regras de Negação)
                </span>
                <p className="text-slate-200 leading-relaxed font-mono whitespace-pre-line text-xs">
                  {previewTemplate.spec.brandGuardrails}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-[11px] font-mono text-blue-400 font-bold uppercase block flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Pilar 3: Integrações & Gatilhos
                </span>
                <div className="text-xs text-slate-300 space-y-1 font-mono">
                  <div><strong className="text-slate-400">Gatilho:</strong> {previewTemplate.spec.triggerEvent}</div>
                  <div><strong className="text-slate-400">Output:</strong> {previewTemplate.spec.outputFormat}</div>
                  <div>
                    <strong className="text-slate-400 block mt-1">Conexões de API:</strong>
                    <ul className="list-disc list-inside text-amber-300/90 space-y-0.5 mt-0.5">
                      {previewTemplate.spec.systemPermissions.map((perm, idx) => (
                        <li key={idx}>{perm}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setPreviewTemplate(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 cursor-pointer"
              >
                Fechar
              </button>

              <button
                type="button"
                onClick={() => handleApply(previewTemplate)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                Carregar Este Blueprint no Construtor
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
