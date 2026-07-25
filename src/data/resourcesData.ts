export interface ResourceItem {
  id: string;
  title: string;
  category: 'slides' | 'frameworks' | 'livros' | 'ferramentas';
  categoryLabel: string;
  type: 'pdf' | 'book' | 'template' | 'sheet';
  typeLabel: string;
  author: string;
  fileSizeOrReadTime: string;
  iconName: string;
  badgeColor: string;
  description: string;
  keyTakeaways: string[];
  downloadFileName?: string;
  previewContent?: {
    summary: string;
    quote?: string;
    sections?: { title: string; content: string }[];
    codeTemplate?: string;
  };
  externalUrl?: string;
}

export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: 'deck-masterclass-pdf',
    title: 'Deck Oficial da Masterclass: Squads de IA & Escalabilidade',
    category: 'slides',
    categoryLabel: 'Slides & Decks',
    type: 'pdf',
    typeLabel: 'Apresentação PDF (HD)',
    author: 'Ellen Salomão',
    fileSizeOrReadTime: '18.4 MB • 42 Slides',
    iconName: 'FileText',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    description: 'Slide deck completo da palestra em alta resolução contendo os diagramas de rede de Squads, os 3 Níveis de Maturidade e os estudos de caso de ROI.',
    keyTakeaways: [
      'Gargalo da execução vs Capacidade de delegação',
      'Matriz dos 3 Níveis: Quem Pede, Quem Delega, Quem Desenha',
      'O Framework de Agente de 3 Pilares (Função, Guardrail, Permissões)',
      'Como estruturar o primeiro Squad de Vendas em menos de 7 dias'
    ],
    downloadFileName: 'Masterclass_Ellen_Salomao_Squads_IA.pdf',
    previewContent: {
      summary: 'Esta apresentação de 42 slides condensa mais de 3 anos de implementação de automação corporativa com IA em empresas de alto crescimento. Ela detalha passo a passo como sair do trabalho manual operacional e estabelecer uma arquitetura resiliente.',
      quote: 'Gargalo não é falta de inteligência na equipe; gargalo é colocar cérebros estratégicos para fazer digitação e cópia manual.',
      sections: [
        { title: 'Parte 1: A Crise da Operação Manual', content: 'Demonstração empírica de como 40% da semana de profissionais de alto custo é gasta em tarefas de formatação, envio de e-mails e cópia de dados entre CRM e WhatsApp.' },
        { title: 'Parte 2: Os 3 Pilares do Agente de Sucesso', content: 'Detalhamento do pilar da Função Única (SDR, SAC, BI), dos Guardrails Anti-Alucinação (Regras de Negação) e das Permissões de Leitura e Escrita via API.' },
        { title: 'Parte 3: O Primeiro Squad em Produção', content: 'Roteiro de validação com 1 agente SDR + 1 agente de Follow-up + 1 analista de CRM.' }
      ]
    }
  },
  {
    id: 'framework-3-pilares-cheat-sheet',
    title: 'Cheat Sheet: O Framework dos 3 Pilares do Agente de IA',
    category: 'frameworks',
    categoryLabel: 'Frameworks & Guias',
    type: 'pdf',
    typeLabel: 'Guia Prático PDF',
    author: 'Ellen Salomão',
    fileSizeOrReadTime: '4.2 MB • 3 Páginas',
    iconName: 'ShieldCheck',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    description: 'Guia de bolso resumido para líderes de produto e operações aplicarem na hora de redigir instruções e guardrails para agentes de IA.',
    keyTakeaways: [
      'Checklist de validação antes de publicar um agente',
      'Exemplos de regras de negação anti-alucinação',
      'Matriz de permissões seguras para APIs'
    ],
    downloadFileName: 'CheatSheet_Framework_3_Pilares_IA.pdf',
    previewContent: {
      summary: 'Um guia prático de 3 páginas projetado para ficar ao lado da tela enquanto você configura seus agentes no construtor de IA.',
      quote: 'Se o seu agente pode fazer tudo, ele não faz nada direito. Defina uma única função e blinde com regras do que ele NUNCA pode fazer.',
      sections: [
        { title: 'Regra da Função Única', content: 'Um agente deve ter 1 único objetivo mensurável. Exemplo: "Qualificar o lead do formulário em 10 segundos", e NÃO "Fazer o marketing completo da empresa".' },
        { title: 'Sintaxe de Regras de Negação', content: 'Sempre comece com palavras fortes: NUNCA dê descontos, NUNCA mencione concorrentes, NUNCA invente prazos. A negação explícita reduz a alucinação em até 92%.' }
      ]
    }
  },
  {
    id: 'prompt-template-sdr-b2b',
    title: 'Template de Prompt de System Instruction: SDR B2B',
    category: 'frameworks',
    categoryLabel: 'Frameworks & Guias',
    type: 'template',
    typeLabel: 'Template Markdown',
    author: 'Engenharia de Prompt Ellen Salomão',
    fileSizeOrReadTime: 'Leitura 5 min • Copiável',
    iconName: 'FileText',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    description: 'Prompt de sistema testado em produção para SDRs de IA com qualificação BANT e direcionamento de agendamento no CRM.',
    keyTakeaways: [
      'Estrutura em Markdown pronta para colar na OpenAI / Claude / Gemini',
      'Guardrails anti-desconto e anti-alucinação já embutidos',
      'Variáveis dinâmicas para fácil customização da sua marca'
    ],
    downloadFileName: 'Prompt_System_Instruction_SDR_B2B.md',
    previewContent: {
      summary: 'Cole este prompt de instrução de sistema no seu construtor de agentes ou na API do seu modelo de linguagem para obter um SDR instantaneamente qualificado.',
      codeTemplate: `# CONTEXTO & IDENTIDADE
Você é um SDR Sênior de Elite especializado em qualificação B2B. Sua função única é analisar os dados do formulário de contato do site e definir o enquadramento do lead.

# METODOLOGIA DE QUALIFICAÇÃO (BANT)
1. Faturamento Mensal Mínimo: R$ 50.000/mês
2. Equipe Operacional: Mais de 5 colaboradores
3. Urgência: Quer implementar nos próximos 30 dias

# REGRAS DE NEGAÇÃO EXPLICITAS (GUARDRAILS)
- NUNCA invente valores de tabelas de preço.
- NUNCA ofereça condições especiais ou descontos sem aprovação no CRM.
- NUNCA utilize linguagem apelativa como "alavanque seu negócio" ou "solução revolucionária".
- NUNCA responda dúvidas fora do escopo de qualificação.

# FORMATO DA RESPOSTA (JSON)
{
  "lead_name": "Nome do Lead",
  "classification": "HOT" | "WARM" | "COLD",
  "qualification_reason": "Resumo explicativo direto",
  "next_action": "Schedule_Consultant" | "Send_Free_Ebook"
}`
    }
  },
  {
    id: 'book-checklist-manifesto',
    title: 'Livro Recomendado: Checklist Manifesto',
    category: 'livros',
    categoryLabel: 'Leitura Obrigatória',
    type: 'book',
    typeLabel: 'Livro (Atul Gawande)',
    author: 'Recomendação por Ellen Salomão',
    fileSizeOrReadTime: 'Livro de Referência • 224 págs',
    iconName: 'BookOpen',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    description: 'Descubra por que cirurgiões e pilotos usam checklists simples para eliminar erros fatais — a mesma filosofia aplicada para zerar falhas em agentes de IA.',
    keyTakeaways: [
      'A diferença entre erro de ignorância e erro de execução',
      'Como checklists curtos evitam falhas em processos complexos',
      'Aplicação direta na criação de System Prompts e fluxos determinísticos'
    ],
    externalUrl: 'https://www.amazon.com/Checklist-Manifesto-How-Things-Right/dp/0312430000',
    previewContent: {
      summary: 'Em um mundo com volume massivo de informações, a falha não vem da falta de conhecimento, mas da falta de disciplina em seguir passos simples repetidamente. O mesmo vale para IAs.',
      quote: 'O ser humano moderno é sobrecarregado. O checklist não substitui o cérebro; ele garante que o básico seja feito com perfeição todas as vezes.'
    }
  },
  {
    id: 'book-build-tony-fadell',
    title: 'Livro Recomendado: BUILD — Um Guia Não Convencional',
    category: 'livros',
    categoryLabel: 'Leitura Obrigatória',
    type: 'book',
    typeLabel: 'Livro (Tony Fadell)',
    author: 'Recomendação por Ellen Salomão',
    fileSizeOrReadTime: 'Livro de Referência • 416 págs',
    iconName: 'BookOpen',
    badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    description: 'Escrito pelo criador do iPod e Nest, mostra como construir produtos funcionais focados em resolver dores reais sem ornamentos inúteis.',
    keyTakeaways: [
      'Como focar na dor tangível do cliente antes da tecnologia',
      'Prototipagem rápida e iteração semanal de processos',
      'A importância de manter a simplicidade extrema na experiência'
    ],
    externalUrl: 'https://www.amazon.com/Build-Unorthodox-Guide-Making-Things/dp/0063046067',
    previewContent: {
      summary: 'Tony Fadell compartilha lições práticas sobre liderança, produto e tecnologia adquiridas ao lado de Steve Jobs na Apple. Indispensável para quem está desenhando a arquitetura de operações modernas.',
      quote: 'Não construa nada só porque a tecnologia existe. Construa porque resolve uma dor insuportável de alguém.'
    }
  },
  {
    id: 'sheet-calculadora-roi-excel',
    title: 'Planilha em Excel: Matriz de ROI & Equivalência FTE de Squads',
    category: 'ferramentas',
    categoryLabel: 'Ferramentas & Planilhas',
    type: 'sheet',
    typeLabel: 'Planilha Excel / CSV',
    author: 'Engenharia de Negócios Ellen Salomão',
    fileSizeOrReadTime: 'Modelo Editável .XLSX',
    iconName: 'FileSpreadsheet',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    description: 'Planilha com fórmulas automáticas para simular horas recuperadas, custo por colaborador e payback na contratação de licenças e infraestrutura de IA.',
    keyTakeaways: [
      'Fórmulas pré-configuradas para cálculo de equivalência de pessoas (FTE)',
      'Tabela de comparação de custos: Equipe Manual vs Squad de IA',
      'Gráficos prontos para apresentação a diretores e sócios'
    ],
    downloadFileName: 'Calculadora_ROI_Squads_IA_Ellen_Salomao.xlsx',
    previewContent: {
      summary: 'Insira a quantidade de colaboradores da sua empresa, o salário médio com encargos e a quantidade de horas gasta em e-mails e planilhas. A planilha gera o relatório executivo em segundos.',
      sections: [
        { title: 'Aba 1: Diagnóstico Atual', content: 'Mapeamento de tarefas repetitivas por departamento (Vendas, Suporte, Marketing, Operações).' },
        { title: 'Aba 2: Simulação de Squads', content: 'Cálculo de economia financeira direta e projeção do tempo para retorno do investimento (Payback < 30 dias).' }
      ]
    }
  }
];
