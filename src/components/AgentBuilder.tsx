import React, { useState } from 'react';
import { soundFx } from '../utils/soundEffects';
import { AgentSpec } from '../types';
import { Copy, Check, Download, Sparkles, Target, ShieldCheck, Key, FileText, Cpu, RefreshCw, Lightbulb, Layers } from 'lucide-react';
import { SuccessTipsModal } from './SuccessTipsModal';
import { TemplateLibrary } from './TemplateLibrary';

export const AgentBuilder: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isTipsOpen, setIsTipsOpen] = useState<boolean>(false);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  const [spec, setSpec] = useState<AgentSpec>({
    name: 'SDR Qualificador B2B',
    squadName: 'Squad de Vendas Inbound',
    singleFunction: 'Analisar as respostas do formulário de contato do site e classificar o lead como Quente, Morno ou Frio em menos de 10 segundos.',
    targetAudience: 'Leads empresariais interessados em consultoria de tecnologia e IA.',
    instructions: 'Você é um especialista em qualificação de vendas com tom profissional, analítico e conciso. Avalie se a empresa tem mais de 10 funcionários e orçamento prévio.',
    brandGuardrails: '1. NUNCA responda sobre ofertas concorrentes.\n2. NUNCA faça promessas de desconto.\n3. Mantenha linguagem de autoridade sem gírias.',
    systemPermissions: ['Ler Webhook Typeform/Site', 'Escrever campo Status no ActiveCampaign/HubSpot', 'Enviar alerta no canal #vendas-leads no Slack'],
    triggerEvent: 'Formulário do site preenchido pelo usuário',
    outputFormat: 'JSON estruturado contendo: { lead_score, classification, summary_reason, assigned_sales_rep }'
  });

  const handleCopy = () => {
    soundFx.playSuccess();
    const formattedText = `================================================
ESPECIFICAÇÃO TÉCNICA DE AGENTE DE IA (MÉTODO ELLEN SALOMÃO)
================================================
NOME DO AGENTE: ${spec.name}
SQUAD INTEGRADO: ${spec.squadName}

[PILAR 1: FUNÇÃO ÚNICA]
- Ativação/Gatilho: ${spec.triggerEvent}
- Responsabilidade Única: ${spec.singleFunction}
- Público-Alvo: ${spec.targetAudience}

[PILAR 2: INSTRUÇÕES & GUARDRAILS DE MARCA]
- Diretrizes Principais: ${spec.instructions}
- Proteção de Marca (Regras de Negação): ${spec.brandGuardrails}
- Formato do Output: ${spec.outputFormat}

[PILAR 3: PERMISSÕES SISTÊMICAS]
- Conexões de API:
  ${spec.systemPermissions.map((p) => `* ${p}`).join('\n  ')}

================================================
Aviso: Desenhado seguindo a Regra de Ouro "Comece Pequeno".
================================================`;

    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSelectTemplate = (templateSpec: AgentSpec, templateName: string) => {
    setSpec(templateSpec);
    setActiveNotification(`Blueprint "${templateName}" aplicado com sucesso no construtor!`);
    setTimeout(() => setActiveNotification(null), 4000);
  };

  return (
    <div className="space-y-8 py-2">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-slate-950 border border-cyan-500/30 p-6 sm:p-8 space-y-4 shadow-[0_0_40px_rgba(0,240,255,0.05)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              PLANO DE AÇÃO PRÁTICO • REGRA DE OURO
            </span>
            <h2 className="text-2xl font-extrabold text-slate-100">
              Comece Pequeno: Desenhe no Papel Primeiro
            </h2>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Antes de tentar criar sistemas complexos com dezenas de automações, escolha <strong className="text-cyan-300 font-semibold">UMA única tarefa repetitiva dolorosa</strong> na sua empresa e desenhe o blueprint do seu primeiro agente.
        </p>
      </div>

      {/* Notification Toast for Blueprint Load */}
      {activeNotification && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm font-mono flex items-center justify-between gap-3 shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{activeNotification}</span>
          </div>
          <button 
            onClick={() => setActiveNotification(null)}
            className="text-emerald-400 hover:text-emerald-200 cursor-pointer text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Template Library Section */}
      <TemplateLibrary 
        currentSpec={spec}
        onSelectTemplate={handleSelectTemplate}
      />

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Form Inputs Panel */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
              <Target className="w-4 h-4 text-cyan-400" />
              1. Identificação & Pilar 1 (Função Única)
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Nome do Agente</label>
                <input
                  type="text"
                  value={spec.name}
                  onChange={(e) => setSpec({ ...spec, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Squad Pertencente</label>
                <input
                  type="text"
                  value={spec.squadName}
                  onChange={(e) => setSpec({ ...spec, squadName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Função Única (Tarefa Específica)</label>
              <textarea
                rows={2}
                value={spec.singleFunction}
                onChange={(e) => setSpec({ ...spec, singleFunction: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                2. Pilar 2 (Instruções & Guardrails)
              </h3>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setIsTipsOpen(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_10px_rgba(245,158,11,0.15)]"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                Dicas de Sucesso
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Tom de Voz e Instruções Principais</label>
              <textarea
                rows={2}
                value={spec.instructions}
                onChange={(e) => setSpec({ ...spec, instructions: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-amber-400 mb-1">Proteção de Marca (Regras de Negação / NUNCA FAZER)</label>
              <textarea
                rows={2}
                value={spec.brandGuardrails}
                onChange={(e) => setSpec({ ...spec, brandGuardrails: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-amber-900/50 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
              <Key className="w-4 h-4 text-amber-400" />
              3. Pilar 3 (Permissões Sistêmicas & Integrações)
            </h3>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Gatilho de Ativação</label>
              <input
                type="text"
                value={spec.triggerEvent}
                onChange={(e) => setSpec({ ...spec, triggerEvent: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Formato de Saída (Output)</label>
              <input
                type="text"
                value={spec.outputFormat}
                onChange={(e) => setSpec({ ...spec, outputFormat: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* Live Spec Preview & Export Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-950 border border-cyan-500/40 space-y-5 sticky top-24 shadow-[0_0_30px_rgba(0,240,255,0.08)]">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                <FileText className="w-4 h-4" />
                ESPECIFICAÇÃO GERADA DA IA
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                PRONTO PARA IMPLANTAR
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-4 max-h-[420px] overflow-y-auto">
              <div>
                <div className="text-[10px] text-cyan-400 uppercase font-bold">// AGENTE & SQUAD</div>
                <div className="font-bold text-slate-100">{spec.name}</div>
                <div className="text-slate-400 text-[11px]">{spec.squadName}</div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-[10px] text-cyan-400 uppercase font-bold">// PILAR 1: FUNÇÃO ÚNICA</div>
                <div className="text-slate-300 leading-relaxed mt-0.5">{spec.singleFunction}</div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-[10px] text-emerald-400 uppercase font-bold">// PILAR 2: GUARDRAILS DE MARCA</div>
                <div className="text-slate-300 leading-relaxed mt-0.5">{spec.brandGuardrails}</div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-[10px] text-amber-400 uppercase font-bold">// PILAR 3: PERMISSÕES DE SISTEMA</div>
                <div className="space-y-1 mt-1">
                  {spec.systemPermissions.map((p, i) => (
                    <div key={i} className="text-[11px] text-amber-200/90 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  Copiado para a Área de Transferência!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar Especificação Técnica
                </>
              )}
            </button>

          </div>
        </div>

      </div>

      <SuccessTipsModal
        isOpen={isTipsOpen}
        onClose={() => setIsTipsOpen(false)}
        onApplyExample={(preset) => {
          setSpec((prev) => ({
            ...prev,
            instructions: preset.instructions,
            brandGuardrails: preset.brandGuardrails
          }));
        }}
      />

    </div>
  );
};
