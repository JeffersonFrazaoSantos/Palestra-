import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  BookOpen, 
  ShieldCheck, 
  FileSpreadsheet, 
  Download, 
  Eye, 
  Search, 
  Sparkles, 
  ExternalLink, 
  Check, 
  Copy, 
  X, 
  Bookmark,
  Layers,
  Award,
  Zap,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square
} from 'lucide-react';
import { RESOURCES_DATA, ResourceItem } from '../data/resourcesData';
import { soundFx } from '../utils/soundEffects';

export const ResourceLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePreviewItem, setActivePreviewItem] = useState<ResourceItem | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Audio Speech Synthesis state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isPausedAudio, setIsPausedAudio] = useState<boolean>(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);

  // Stop audio on item change or unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    }
  }, [activePreviewItem]);

  const toggleAudioSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não possui suporte para síntese de voz (Web Speech API).');
      return;
    }

    const synth = window.speechSynthesis;

    if (isPlayingAudio) {
      if (isPausedAudio) {
        synth.resume();
        setIsPausedAudio(false);
      } else {
        synth.pause();
        setIsPausedAudio(true);
      }
      return;
    }

    if (!activePreviewItem) return;

    // Build text to speak
    let textToSpeak = `${activePreviewItem.title}. Por ${activePreviewItem.author}. `;
    if (activePreviewItem.previewContent?.summary) {
      textToSpeak += `Resumo: ${activePreviewItem.previewContent.summary}. `;
    }
    if (activePreviewItem.previewContent?.quote) {
      textToSpeak += `Citação: ${activePreviewItem.previewContent.quote}. `;
    }
    if (activePreviewItem.keyTakeaways.length > 0) {
      textToSpeak += `Principais pontos: ${activePreviewItem.keyTakeaways.join('. ')}.`;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'pt-BR';
    utterance.rate = audioSpeed;

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    synth.cancel();
    synth.speak(utterance);
    setIsPlayingAudio(true);
    setIsPausedAudio(false);
    soundFx.playSuccess();
  };

  const stopAudioSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setIsPausedAudio(false);
  };

  // Category filter mapping
  const categories = [
    { id: 'todos', label: 'Todos os Materiais' },
    { id: 'slides', label: 'Slides & Decks' },
    { id: 'frameworks', label: 'Frameworks & Guias' },
    { id: 'livros', label: 'Leitura Recomendada' },
    { id: 'ferramentas', label: 'Ferramentas & ROI' },
  ];

  // Filter items
  const filteredResources = RESOURCES_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyTakeaways.some(kt => kt.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const handleDownload = (item: ResourceItem) => {
    soundFx.playSuccess();
    setDownloadedIds(prev => ({ ...prev, [item.id]: true }));

    // Generate real downloadable text blob if applicable
    let content = `# ${item.title}\n`;
    content += `Autor: ${item.author}\n`;
    content += `Categoria: ${item.categoryLabel}\n\n`;
    content += `--- RESUMO ---\n${item.previewContent?.summary || item.description}\n\n`;
    
    if (item.previewContent?.quote) {
      content += `--- CITAÇÃO MARCANTE ---\n"${item.previewContent.quote}"\n\n`;
    }

    if (item.previewContent?.codeTemplate) {
      content += `--- TEMPLATE / PROMPT DE SISTEMA ---\n${item.previewContent.codeTemplate}\n\n`;
    }

    if (item.keyTakeaways.length > 0) {
      content += `--- PONTOS CHAVE ---\n`;
      item.keyTakeaways.forEach((kt, i) => {
        content += `${i + 1}. ${kt}\n`;
      });
    }

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', item.downloadFileName || `${item.id}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyCode = (code: string, id: string) => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/60 border border-cyan-500/30 p-6 sm:p-10 relative overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.06)]">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-wider uppercase">
              <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
              Acervo de Materiais Exclusivos • Método Ellen Salomão
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Biblioteca de Materiais & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">Leituras Recomendadas</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-3xl">
              Baixe os slides em PDF da Masterclass, acesse templates em Markdown de System Prompts para SDRs, planilhas editáveis de cálculo de ROI e as obras recomendadas por Ellen Salomão sobre gestão de processos sem falha.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <FileText className="w-4 h-4 text-cyan-400" />
                {RESOURCES_DATA.length} Materiais Disponíveis
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Formato PDF HD & Markdown
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <Award className="w-4 h-4 text-amber-400" />
                Acesso Livre e Gratuito
              </span>
            </div>
          </div>

          {/* Right Highlight Box (Desktop) */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 space-y-3 relative shadow-[0_0_20px_rgba(0,240,255,0.08)]">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  SLIDES OFICIAIS MASTERCLASS
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                  PDF HD
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Baixe a apresentação completa com os diagramas de Squads de IA e os 3 Níveis de Maturidade em um único arquivo.
              </p>
              <button
                onClick={() => handleDownload(RESOURCES_DATA[0])}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                Baixar Slides da Masterclass (PDF)
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Controls Bar: Category Tabs & Search Input */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80">
        
        {/* Category Pill Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.15)] font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input Box */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar material, prompt ou livro..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Resources Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((item) => {
          const isDownloaded = downloadedIds[item.id];

          return (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 p-6 space-y-5 transition-all hover:shadow-[0_0_25px_rgba(0,240,255,0.08)] flex flex-col justify-between group relative"
            >
              <div className="space-y-4">
                
                {/* Header Tag & Type Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${item.badgeColor} uppercase tracking-wider`}>
                    {item.typeLabel}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {item.fileSizeOrReadTime}
                  </span>
                </div>

                {/* Title & Author */}
                <div className="space-y-1">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/40 shrink-0 mt-0.5 transition-all">
                      {getIcon(item.iconName)}
                    </div>
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-cyan-400/80 font-mono pl-10">
                    {item.author}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Takeaways / Points */}
                <div className="space-y-1.5 pt-2 border-t border-slate-900">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
                    Destaques do Material:
                  </span>
                  <ul className="space-y-1">
                    {item.keyTakeaways.slice(0, 3).map((kt, idx) => (
                      <li key={idx} className="text-[11px] text-slate-400 flex items-start gap-1.5 leading-snug">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{kt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-900 flex items-center gap-2">
                
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActivePreviewItem(item);
                  }}
                  className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  Ver Prévia
                </button>

                {item.type === 'book' && item.externalUrl ? (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="flex-1 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-800 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Acessar Obra
                  </a>
                ) : (
                  <button
                    onClick={() => handleDownload(item)}
                    className={`flex-1 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      isDownloaded
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                    {isDownloaded ? 'Baixado ✓' : 'Baixar'}
                  </button>
                )}

              </div>

            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <Layers className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300">Nenhum material encontrado</h3>
          <p className="text-xs text-slate-500">Tente ajustar os termos de busca ou mudar a categoria selecionada.</p>
        </div>
      )}

      {/* Preview Modal Overlay */}
      {activePreviewItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(0,240,255,0.15)] relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActivePreviewItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${activePreviewItem.badgeColor} uppercase tracking-wider`}>
                {activePreviewItem.typeLabel}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 pr-8">
                {activePreviewItem.title}
              </h2>
              <p className="text-xs text-cyan-400 font-mono">
                {activePreviewItem.author} • {activePreviewItem.fileSizeOrReadTime}
              </p>
            </div>

            {/* Audio Overview TTS Player */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/60 border border-cyan-500/30 space-y-3 shadow-[0_0_20px_rgba(0,240,255,0.06)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${isPlayingAudio ? 'bg-cyan-500 text-slate-950 animate-pulse' : 'bg-slate-800 text-cyan-400'}`}>
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 font-mono flex items-center gap-1.5">
                      Audio Overview (Síntese do Material)
                      {isPlayingAudio && !isPausedAudio && (
                        <span className="inline-flex gap-0.5 items-end h-3">
                          <span className="w-0.5 bg-cyan-400 animate-[bounce_1s_infinite_100ms] h-full" />
                          <span className="w-0.5 bg-cyan-400 animate-[bounce_1s_infinite_300ms] h-2" />
                          <span className="w-0.5 bg-cyan-400 animate-[bounce_1s_infinite_200ms] h-3" />
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      Ouva o resumo executivo, destaques e citações narrados em português.
                    </p>
                  </div>
                </div>

                {/* Speed Controls */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px] font-mono">
                  {[1.0, 1.25, 1.5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setAudioSpeed(speed)}
                      className={`px-1.5 py-0.5 rounded ${audioSpeed === speed ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
                <button
                  onClick={toggleAudioSpeech}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    isPlayingAudio && !isPausedAudio
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                      : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                  }`}
                >
                  {isPlayingAudio && !isPausedAudio ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      Pausar Áudio
                    </>
                  ) : isPausedAudio ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Continuar Áudio
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Ouvir Resumo Executivo
                    </>
                  )}
                </button>

                {isPlayingAudio && (
                  <button
                    onClick={stopAudioSpeech}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Square className="w-3.5 h-3.5 fill-current text-rose-400" />
                    Parar
                  </button>
                )}
              </div>
            </div>

            {/* Summary */}
            {activePreviewItem.previewContent?.summary && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase block">
                  Visão Geral do Material
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activePreviewItem.previewContent.summary}
                </p>
              </div>
            )}

            {/* Quote if available */}
            {activePreviewItem.previewContent?.quote && (
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 text-xs text-cyan-200 italic font-serif leading-relaxed">
                "{activePreviewItem.previewContent.quote}"
              </div>
            )}

            {/* Sections */}
            {activePreviewItem.previewContent?.sections && (
              <div className="space-y-3">
                <span className="text-xs font-mono text-slate-400 uppercase font-bold block">
                  Conteúdo Detalhado:
                </span>
                <div className="space-y-2">
                  {activePreviewItem.previewContent.sections.map((sec, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <h4 className="text-xs font-bold text-slate-200 font-mono">{sec.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{sec.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Template if available */}
            {activePreviewItem.previewContent?.codeTemplate && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase font-bold">
                    System Instruction Template (Markdown)
                  </span>
                  <button
                    onClick={() => handleCopyCode(activePreviewItem.previewContent!.codeTemplate!, activePreviewItem.id)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === activePreviewItem.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === activePreviewItem.id ? 'Copiado!' : 'Copiar Template'}
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-200 overflow-x-auto max-h-56 leading-relaxed">
                  {activePreviewItem.previewContent.codeTemplate}
                </pre>
              </div>
            )}

            {/* Footer Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setActivePreviewItem(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs cursor-pointer"
              >
                Fechar
              </button>
              
              {activePreviewItem.type === 'book' && activePreviewItem.externalUrl ? (
                <a
                  href={activePreviewItem.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-slate-100 font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Abrir Link do Livro
                </a>
              ) : (
                <button
                  onClick={() => {
                    handleDownload(activePreviewItem);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  Baixar Arquivo Completo
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
