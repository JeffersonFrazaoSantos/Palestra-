import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_SQUAD_NODES } from '../data/presentationData';
import { SquadNode } from '../types';
import { soundFx } from '../utils/soundEffects';
import { 
  Play, 
  Cpu, 
  CheckCircle2, 
  ShieldCheck, 
  Key, 
  Zap, 
  Activity, 
  X, 
  Code2, 
  Terminal, 
  Copy, 
  Check, 
  Clock, 
  ArrowUpRight,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

export const SquadNetworkGraph: React.FC = () => {
  const [nodes, setNodes] = useState<SquadNode[]>(INITIAL_SQUAD_NODES);
  const [selectedNode, setSelectedNode] = useState<SquadNode | null>(INITIAL_SQUAD_NODES[0]);
  const [popoverNode, setPopoverNode] = useState<SquadNode | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activePacketStep, setActivePacketStep] = useState<number>(0);
  const [logMessages, setLogMessages] = useState<string[]>([
    ':: SISTEMA PRONTO :: Squad de Vendas Inbound inicializado.',
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCopyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    soundFx.playSuccess();
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Simulation sequence trigger
  const runSimulation = () => {
    soundFx.playSuccess();
    setIsSimulating(true);
    setActivePacketStep(0);
    setLogMessages(['🚀 [TRIGGER] Novo formulário de Lead recebido via Webhook (Typeform).']);

    const sequence = ['node_inbound', 'node_copy', 'node_crm', 'node_scheduler', 'node_followup'];

    sequence.forEach((nodeId, idx) => {
      setTimeout(() => {
        soundFx.playNodePulse();
        setActivePacketStep(idx);

        setNodes((prevNodes) =>
          prevNodes.map((n) => ({
            ...n,
            status: n.id === nodeId ? 'active' : 'idle',
          }))
        );

        const nodeObj = INITIAL_SQUAD_NODES.find((n) => n.id === nodeId);
        if (nodeObj) {
          setSelectedNode(nodeObj);
          setLogMessages((prev) => [
            `⚡ [SQUAD_EXEC] ${nodeObj.name} executando Função Única: ${nodeObj.function}`,
            ...prev,
          ]);
        }

        if (idx === sequence.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            setLogMessages((prev) => [
              '✅ [SQUAD_SUCCESS] Lead qualificado, personalizado, agendado no CRM e nutrido no WhatsApp com 0% intervenção humana!',
              ...prev,
            ]);
            soundFx.playSuccess();
          }, 1200);
        }
      }, (idx + 1) * 1200);
    });
  };

  // Canvas drawing loop for animated connecting lines and glowing pulsing particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particleOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Connection Lines between nodes
      nodes.forEach((node) => {
        node.connections.forEach((targetId) => {
          const targetNode = nodes.find((n) => n.id === targetId);
          if (targetNode) {
            // Line glow
            ctx.beginPath();
            ctx.moveTo(node.x + 80, node.y + 35);
            ctx.lineTo(targetNode.x + 80, targetNode.y + 35);
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 6]);
            ctx.lineDashOffset = -particleOffset;
            ctx.stroke();

            // Active animated pulse packet
            if (node.status === 'active' || targetNode.status === 'active') {
              const dx = targetNode.x - node.x;
              const dy = targetNode.y - node.y;
              const progress = (particleOffset % 30) / 30;

              const px = node.x + 80 + dx * progress;
              const py = node.y + 35 + dy * progress;

              ctx.beginPath();
              ctx.arc(px, py, 4, 0, Math.PI * 2);
              ctx.fillStyle = '#00ff9d';
              ctx.shadowColor = '#00ff9d';
              ctx.shadowBlur = 10;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        });
      });

      particleOffset += 0.5;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodes]);

  return (
    <div className="space-y-8 py-2 relative">
      
      {/* Title & Control Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-2">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Engenharia de Processos • Diagrama de Rede de Squads
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Sinergia Autônoma entre <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Agentes de IA</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Clique em qualquer nó para abrir o popover com as diretrizes técnicas e especificações do agente.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={isSimulating}
            onClick={runSimulation}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] disabled:opacity-50 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            Simular Transmissão no Squad
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Network Diagram Viewport */}
        <div className="lg:col-span-8 rounded-3xl bg-slate-950 border border-cyan-500/30 p-4 sm:p-6 relative overflow-hidden min-h-[480px] flex flex-col justify-between shadow-[0_0_40px_rgba(0,240,255,0.05)]">
          
          {/* Cyberpunk Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff0d_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff0d_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* HTML5 Canvas overlay for animated lines */}
          <canvas
            ref={canvasRef}
            width={760}
            height={400}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />

          {/* Nodes Container */}
          <div className="relative z-20 min-h-[380px] flex flex-wrap gap-4 items-center justify-around p-2">
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isActive = node.status === 'active';

              return (
                <button
                  key={node.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedNode(node);
                    setPopoverNode(node);
                  }}
                  className={`w-64 p-4 rounded-2xl border text-left transition-all cursor-pointer relative group ${
                    isActive
                      ? 'bg-emerald-950/80 border-emerald-400 text-slate-100 shadow-[0_0_25px_rgba(0,255,157,0.3)] ring-2 ring-emerald-400'
                      : isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 text-slate-100 shadow-[0_0_20px_rgba(0,240,255,0.2)] ring-1 ring-cyan-400'
                      : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-cyan-500/60 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      isActive ? 'bg-emerald-400 text-slate-950 animate-pulse' : 'bg-slate-800 text-cyan-300'
                    }`}>
                      {isActive ? '⚡ PROCESSANDO' : node.role}
                    </span>
                    <Cpu className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-cyan-400'}`} />
                  </div>

                  <h3 className="font-bold text-sm text-slate-100 mt-2 flex items-center justify-between">
                    <span>{node.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {node.function}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="text-cyan-400 font-semibold">{node.modelType?.split(' ')[0] || 'AI Model'}</span>
                    <span className="text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/60 text-[10px]">
                      Ficha Técnica ➔
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* System Terminal Log Bar */}
          <div className="relative z-20 mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <span className="truncate text-cyan-300 font-semibold">{logMessages[0]}</span>
            </div>
            <span className="text-[10px] text-slate-500 shrink-0">LOGS DO SQUAD</span>
          </div>

        </div>

        {/* Selected Node Inspector Drawer */}
        <div className="lg:col-span-4 rounded-3xl bg-slate-950 border border-cyan-500/30 p-6 space-y-6 shadow-[0_0_30px_rgba(0,240,255,0.05)]">
          {selectedNode ? (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                    INSPECTOR DE AGENTE
                  </span>
                  <h3 className="text-xl font-bold text-slate-100 mt-0.5">
                    {selectedNode.name}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setPopoverNode(selectedNode);
                  }}
                  className="p-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 transition-all cursor-pointer flex items-center gap-1 text-xs font-mono font-bold"
                  title="Abrir Popover Técnico Completo"
                >
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span className="hidden sm:inline">Ver Ficha</span>
                </button>
              </div>

              {/* Pillar 1: Single Function */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
                  <Zap className="w-4 h-4" />
                  1. Função Única
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {selectedNode.function}
                </p>
              </div>

              {/* Pillar 2: Skills & Guardrails */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  2. Skills & Diretrizes
                </div>
                <div className="space-y-1.5">
                  {selectedNode.skills.map((skill, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pillar 3: System Permissions */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                  <Key className="w-4 h-4" />
                  3. Permissões Sistêmicas
                </div>
                <div className="space-y-1.5">
                  {selectedNode.permissions.map((perm, i) => (
                    <div key={i} className="text-xs text-amber-200/90 font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{perm}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button to Trigger Detailed Technical Popover */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setPopoverNode(selectedNode);
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-950 via-slate-900 to-emerald-950 border border-cyan-500/40 text-cyan-300 hover:text-cyan-100 font-mono text-xs font-bold flex items-center justify-center gap-2 hover:border-cyan-400 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.1)]"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                Abrir Ficha Técnica e System Prompt
              </button>

            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Clique em qualquer agente no mapa ao lado para inspecionar seus 3 pilares.
            </div>
          )}
        </div>

      </div>

      {/* TECHNICAL DETAILS POPOVER / MODAL */}
      <AnimatePresence>
        {popoverNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
            
            {/* Backdrop click to close */}
            <div 
              className="absolute inset-0" 
              onClick={() => {
                soundFx.playClick();
                setPopoverNode(null);
              }}
            />

            {/* Popover Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-3xl rounded-3xl bg-slate-950 border border-cyan-500/50 shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col max-h-[90vh]"
            >
              
              {/* Modal Header */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/50 text-cyan-400 uppercase tracking-wider">
                      {popoverNode.role}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      SLA: {popoverNode.latencyAvg || '300ms'}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2 pt-1">
                    <Cpu className="w-6 h-6 text-cyan-400" />
                    {popoverNode.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {popoverNode.architectureType || 'Arquitetura de Agente Especializado'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    setPopoverNode(null);
                  }}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all cursor-pointer shrink-0"
                  title="Fechar Popover"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
                
                {/* 1. Quick Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Modelo LLM</span>
                    <span className="font-bold text-cyan-400">{popoverNode.modelType || 'Gemini 1.5 Flash'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Latência Média</span>
                    <span className="font-bold text-emerald-400">{popoverNode.latencyAvg || '350ms'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Garantia da Marca</span>
                    <span className="font-bold text-amber-400">100% Determinístico</span>
                  </div>
                </div>

                {/* 2. System Prompt Snippet */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <Terminal className="w-4 h-4" />
                      Directivas do Agente (System Prompt)
                    </span>
                    {popoverNode.systemPromptSnippet && (
                      <button
                        onClick={() => handleCopyPrompt(popoverNode.systemPromptSnippet || '')}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        {copiedPrompt ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Directive</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-100 leading-relaxed overflow-x-auto shadow-inner">
                    <code>{popoverNode.systemPromptSnippet || 'Diretrizes padrão configuradas para este agente.'}</code>
                  </div>
                </div>

                {/* 3. Input Trigger & Output Artifact Schema */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5 uppercase">
                      <Code2 className="w-4 h-4 text-emerald-400" />
                      Trigger de Entrada (Input)
                    </span>
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed overflow-x-auto">
                      <code>{popoverNode.inputTrigger || '{ status: "event_received" }'}</code>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5 uppercase">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      Artefato Gerado (Output)
                    </span>
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-[11px] text-cyan-200 leading-relaxed overflow-x-auto">
                      <code>{popoverNode.outputArtifact || '{ artifact: "processed" }'}</code>
                    </div>
                  </div>
                </div>

                {/* 4. Guardrails & Rules */}
                {popoverNode.guardrails && popoverNode.guardrails.length > 0 && (
                  <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5 uppercase">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      Guardrails de Segurança & Anti-Falha
                    </span>
                    <ul className="space-y-1">
                      {popoverNode.guardrails.map((rule, idx) => (
                        <li key={idx} className="text-xs text-amber-200/90 font-mono flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 5. Connected Systems & Permissions */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5 uppercase">
                    <Key className="w-4 h-4 text-amber-400" />
                    Permissões de Integração Ativas
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {popoverNode.permissions.map((perm, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
                <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                  Arquitetura Ellen Salomão • Engenharia de Negócios
                </span>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setPopoverNode(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-mono font-bold text-xs transition-all cursor-pointer ml-auto"
                >
                  Entendido / Fechar Detalhes
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

