import { QuizQuestion, MaturityResult, AgentPillar, SquadNode, SlideItem } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Como a sua equipe utiliza Inteligência Artificial hoje no dia a dia?",
    subtitle: "Identifique o nível de profundidade e repetição no uso das ferramentas.",
    options: [
      {
        label: "Uso Pontual & Reativo (Prompts Básicos)",
        description: "Pedimos ideias, resumos de textos ou e-mails rápidos no ChatGPT quando lembramos.",
        level: 1,
        points: 1
      },
      {
        label: "Agentes Especializados com Instruções Pró-ativas",
        description: "Temos Custom GPTs ou agentes criados com diretrizes específicas para funções do time.",
        level: 2,
        points: 2
      },
      {
        label: "Squads de IA Conectados via Engenharia de Processos",
        description: "Agentes autônomos integrados entre si, executando fluxos completos sem dependência humana.",
        level: 3,
        points: 3
      }
    ]
  },
  {
    id: 2,
    question: "Quem define as regras de negócio e limites que a IA deve respeitar?",
    subtitle: "Avalie o grau de governança e segurança de marca na sua empresa.",
    options: [
      {
        label: "Ninguém / Cada funcionário decide individualmente",
        description: "Não há padrão. Cada colaborador digita o que quer sem diretrizes prévias.",
        level: 1,
        points: 1
      },
      {
        label: "Existem Prompts e Personas Pré-Configuradas",
        description: "Definimos o 'Tom de Voz' e escopo do agente, mas os dados ainda entram manualmente.",
        level: 2,
        points: 2
      },
      {
        label: "Arquitetura com Função Única, Guardrails e Permissões de API",
        description: "A IA é blindada contra alucinações e integrada diretamente com ler/escrever nos sistemas.",
        level: 3,
        points: 3
      }
    ]
  },
  {
    id: 3,
    question: "Como a informação circula entre o trabalho da IA e seus sistemas (CRM, WhatsApp, ERP)?",
    subtitle: "Entenda o nível de automação do fluxo de dados da sua operação.",
    options: [
      {
        label: "Ctrl+C / Ctrl+V Manual",
        description: "O colaborador gera a resposta na IA e cola manualmente no sistema ou conversa.",
        level: 1,
        points: 1
      },
      {
        label: "Automações Básicas e Disparadores Isolados",
        description: "Usamos Make/Zapier para enviar dados para a IA, mas ela responde isoladamente.",
        level: 2,
        points: 2
      },
      {
        label: "Sinfonia de Agentes (Squads Integrados)",
        description: "A saída de um agente (ex: Qualificador de Lead) ativa o próximo (ex: Agendador no CRM).",
        level: 3,
        points: 3
      }
    ]
  },
  {
    id: 4,
    question: "O que acontece quando você precisa aumentar em 3x o faturamento da empresa?",
    subtitle: "Analise a escalabilidade da sua capacidade produtiva sem estourar custos.",
    options: [
      {
        label: "Preciso triplicar a equipe e o custo fixo de contratação",
        description: "A operação depende de braços humanos para cada nova tarefa executada.",
        level: 1,
        points: 1
      },
      {
        label: "Consigo acelerar tarefas, mas a equipe precisa revisar tudo",
        description: "A IA ajuda como assistente, mas ainda há gargalo de revisão e coordenação.",
        level: 2,
        points: 2
      },
      {
        label: "Escalo a capacidade executiva multiplicando agentes sem inflar folha",
        description: "A infraestrutura de Squads absorve o volume adicional com o mesmo time estratégico.",
        level: 3,
        points: 3
      }
    ]
  },
  {
    id: 5,
    question: "Qual é a sua postura estratégica em relação às tecnologias de IA?",
    subtitle: "Determine o posicionamento da sua liderança.",
    options: [
      {
        label: "Apenas assisto aos lançamentos e uso como curiosidade",
        description: "Sou 'Quem Pede' – uso como um pesquisador avançado.",
        level: 1,
        points: 1
      },
      {
        label: "Crio utilitários individuais para os departamentos da empresa",
        description: "Sou 'Quem Delega' – delego tarefas repetitivas a assistentes virtuais.",
        level: 2,
        points: 2
      },
      {
        label: "Desenho arquiteturas de processos e ecossistemas autônomos",
        description: "Sou 'Quem Desenha' – arquiteto a engenharia de negócios escalável com Squads.",
        level: 3,
        points: 3
      }
    ]
  }
];

export const MATURITY_RESULTS: Record<1 | 2 | 3, MaturityResult> = {
  1: {
    level: 1,
    title: "Nível 1: QUEM PEDE (Operador de Prompt)",
    badge: "OPERACIONAL REATIVO",
    summary: "Sua empresa utiliza a Inteligência Artificial como um mero motor de busca ou gerador de textos pontuais. O conhecimento existe na cabeça das pessoas e a execução depende 100% de braços humanos.",
    characteristics: [
      "Dependência extrema da digitação e presença humana constante.",
      "Respostas genéricas que não refletem o tom de voz da marca.",
      "Falta de padronização nos processos de atendimento e vendas.",
      "Trabalho duplicado copiando e colando entre sistemas."
    ],
    nextSteps: [
      "Mapear a tarefa repetitiva mais custosa do seu departamento.",
      "Evoluir de prompts aleatórios para o desenho do seu 1º Agente com Função Única.",
      "Criar diretrizes claras de marca para evitar conteúdos genéricos."
    ],
    bottlenecks: [
      "Alto custo operacional por lead/atendimento.",
      "Incapaz de escalar vendas sem contratar mais funcionários."
    ]
  },
  2: {
    level: 2,
    title: "Nível 2: QUEM DELEGA (Gestor de Agentes)",
    badge: "AUTOMAÇÃO INTERMEDIÁRIA",
    summary: "Você já compreendeu o valor dos Agentes de IA! Possui assistentes configurados para tarefas do dia a dia, porém esses agentes trabalham isolados em 'ilhas de conhecimento'.",
    characteristics: [
      "Agentes criados com personas e habilidades específicas.",
      "Melhoria visível na velocidade de produção individual.",
      "Falta de integração fluida entre os agentes e o CRM/Sistemas.",
      "Gargalo na coordenação e transferência de tarefas entre humanos e IAs."
    ],
    nextSteps: [
      "Conectar os agentes isolados em uma estrutura de Squad de IA.",
      "Definir Permissões Sistêmicas (leitura/escrita automatizada).",
      "Implementar métricas de performance e auditabilidade de respostas."
    ],
    bottlenecks: [
      "Ainda há dependência de conferência manual entre etapas.",
      "Os agentes não se conversam de forma autônoma."
    ]
  },
  3: {
    level: 3,
    title: "Nível 3: QUEM DESENHA (Arquiteto de Squads de IA)",
    badge: "ENGENHARIA DE NEGÓCIOS",
    summary: "Parabéns! Você atingiu o estado da arte na visão de Ellen Salomão. Sua empresa opera com Engenharia de Negócios, desenhando Squads de IA autônomos que multiplicam o faturamento sem explodir custos.",
    characteristics: [
      "Squads de IA autônomos integrados aos sistemas centrais.",
      "Arquitetura baseada em Função Única, Skills estritas e Permissões de API.",
      "Zero dependência de braços humanos para tarefas repetitivas.",
      "Gargalo de execução eliminando com margens operacionais elevadas."
    ],
    nextSteps: [
      "Expandir os Squads de IA para novas áreas estratégicas da empresa.",
      "Refinar continuamente as diretrizes de proteção de marca e compliance.",
      "Aumentar a tração comercial alavancando a velocidade do Squad."
    ],
    bottlenecks: [
      "Desafio passa a ser a captação massiva de tráfego/leads para alimentar o Squad escalável."
    ]
  }
};

export const AGENT_PILLARS: AgentPillar[] = [
  {
    id: 'single_function',
    title: '1. Função Única',
    subtitle: 'Single Responsibility Principle',
    description: 'Um agente de IA de alta performance NUNCA tenta fazer tudo. Ele é especializado em resolver UMA única etapa do processo com 100% de maestria.',
    iconName: 'Target',
    color: 'from-cyan-500 to-blue-600',
    keyRule: 'Se um agente precisa qualificar, escrever o e-mail, agendar e atualizar o CRM, ele irá falhar. Divida em 4 agentes especializados!',
    example: 'Agente Qualificador Inbound: Analisa o formulário e classifica o lead como "Frio", "Morno" ou "Quente".',
    antiPattern: 'Agente "Super-Herói" que tenta responder dúvidas, vender, dar suporte e criar copys ao mesmo tempo.'
  },
  {
    id: 'skills_guardrails',
    title: '2. Instruções e Skills',
    subtitle: 'Knowledge Base & Brand Protection',
    description: 'As diretrizes e o tom de voz da marca. Define exatamente como o agente deve raciocinar, quais expressões usar e quais limites NUNCA ultrapassar.',
    iconName: 'ShieldCheck',
    color: 'from-emerald-400 to-teal-600',
    keyRule: 'Sem diretrizes claras, a IA produz conteúdos genéricos ("Copys de IA") que queimam o posicionamento e a autoridade da sua marca.',
    example: 'Regras de Negação: "NUNCA invente preços. NUNCA ofereça desconto sem autorização prévia. Use tom profissional e direto."',
    antiPattern: 'Instruções vagas como "Seja simpático e ajude o cliente a comprar nosso produto".'
  },
  {
    id: 'system_permissions',
    title: '3. Permissões Sistêmicas',
    subtitle: 'Integrations & Action Capabilities',
    description: 'Onde o agente tem permissão para atuar e ler dados. A verdadeira automação acontece quando a IA interage de forma segura com seu ecossistema.',
    iconName: 'Key',
    color: 'from-amber-400 to-orange-500',
    keyRule: 'A IA precisa de olhos (leitura) e mãos (escrita) controladas nos seus sistemas comerciais para eliminar o Ctrl+C Ctrl+V.',
    example: 'Permissão para LER dados da Webhook e ESCREVER nota interna no CRM ActiveCampaign.',
    antiPattern: 'Dar acesso irrestrito sem verificação de escopo ou deixar a IA ilhada no ChatGPT sem conexão.'
  }
];

export const INITIAL_SQUAD_NODES: SquadNode[] = [
  {
    id: 'node_inbound',
    name: 'Agente SDR Lead Classifier',
    role: 'Qualificação Inbound',
    function: 'Analisa respostas do formulário e identifica perfil de compra imediata.',
    skills: ['Análise de BANT', 'Pontuação de Fit Comercial', 'Classificação ABC'],
    permissions: ['Ler Webhook Typeform/WhatsApp', 'Escrever no CRM'],
    x: 80,
    y: 180,
    status: 'active',
    connections: ['node_copy', 'node_crm'],
    modelType: 'Gemini 1.5 Flash (Low Latency)',
    latencyAvg: '420ms',
    architectureType: 'Função Única / Determinística',
    systemPromptSnippet: 'Você é o Agente SDR de Inbound. Sua ÚNICA função é analisar o JSON do formulário recebido via Webhook e atribuir um score de 0 a 100 baseado no faturamento e gargalo de execução declarado. NUNCA faça vendas diretas.',
    inputTrigger: 'Webhook Event: { form_id: "lead_2026_masterclass", data: { faturamento, equipe, maior_gargalo } }',
    outputArtifact: 'JSON Payload: { lead_id: "L-9842", score: 92, category: "HOT_LEAD", recommended_squad: "VIP_CLOSING" }',
    guardrails: [
      'Proibido categorizar sem dados de faturamento.',
      'SLA de processamento máximo de 1.5 segundos.'
    ]
  },
  {
    id: 'node_copy',
    name: 'Agente Personalizer Copy',
    role: 'Copywriting Contextual',
    function: 'Gera abordagem de vendas personalizada com base nas dores específicas do lead.',
    skills: ['Framework AIDA', 'Tom de Voz Ellen Salomão', 'Análise de Nicho'],
    permissions: ['Ler perfil do Lead', 'Gerar modelo de mensagem personalizada'],
    x: 340,
    y: 80,
    status: 'idle',
    connections: ['node_scheduler'],
    modelType: 'Gemini 1.5 Pro (High Reasoning)',
    latencyAvg: '850ms',
    architectureType: 'Gerador Contextual com RAG',
    systemPromptSnippet: 'Você é o Copywriter do Squad Ellen Salomão. Receba o perfil do Lead do Agente SDR e elabore uma abordagem em 3 parágrafos usando o Tom de Voz autêntico e sem palavras genéricas de IA.',
    inputTrigger: 'SDR Output: { lead_name: "Mariana Silva", niche: "Agência Digital", pain: "Falta de braço para entregar projetos" }',
    outputArtifact: 'Message Body: "Mariana, vi que a escala da sua agência travou pela falta de braço na entrega. Na Masterclass, mostro como 1 Squad de IA substitui 4 contratações..."',
    guardrails: [
      'Proibido usar clichês de IA ("supercharge", "revolucionário").',
      'Manter mensagem abaixo de 120 palavras para WhatsApp.'
    ]
  },
  {
    id: 'node_crm',
    name: 'Agente CRM Sync & Routing',
    role: 'Engenharia de Dados',
    function: 'Atualiza o pipeline, atribui o vendedor responsável e registra tags de interesse.',
    skills: ['Sincronização de APIs', 'Atribuição Inteligente de Leads'],
    permissions: ['Escrever no CRM', 'Disparar Notificação Slack/WhatsApp'],
    x: 340,
    y: 280,
    status: 'idle',
    connections: ['node_followup'],
    modelType: 'Algoritmo de Roteamento + Function Calling',
    latencyAvg: '180ms',
    architectureType: 'Event-Driven Sync Agent',
    systemPromptSnippet: 'Atue como o Roteador do CRM. Receba a qualificação e atualize o contato no ActiveCampaign / HubSpot, aplicando a tag #LeadQuente_SquadIA e notificando o Closer de plantão.',
    inputTrigger: 'Event Stream: { lead_id: "L-9842", score: 92, assigned_closer: "Carlos" }',
    outputArtifact: 'API Response: { crm_status: 200, deal_created: true, slack_alert_sent: true }',
    guardrails: [
      'Verificação estrita de duplicidade de e-mail antes do cadastro.',
      'Logs auditáveis no banco de dados.'
    ]
  },
  {
    id: 'node_scheduler',
    name: 'Agente Closer Scheduler',
    role: 'Conversão de Reunião',
    function: 'Interage com o lead para encontrar o melhor horário e confirma a agenda.',
    skills: ['Gestão de Calendário', 'Tratativa de Objeções de Horário'],
    permissions: ['Ler/Escrever Google Calendar', 'Disparar Convite no Zoom'],
    x: 600,
    y: 80,
    status: 'idle',
    connections: ['node_followup'],
    modelType: 'Gemini 1.5 Flash + Tool Use',
    latencyAvg: '350ms',
    architectureType: 'Agente Conversacional Agendador',
    systemPromptSnippet: 'Sua única missão é agendar uma reunião estratégica de 30 minutos com o Closer humano. Apresente 2 opções de horários livres no Google Calendar e confirme os dados.',
    inputTrigger: 'Custom Copy + Lead Context: { phone: "+5511999998888", timezone: "America/Sao_Paulo" }',
    outputArtifact: 'Calendar Event: { summary: "Diagnóstico de Squad com Mariana", start: "2026-07-26T14:00:00Z", zoom_link: "https://zoom.us/j/9842" }',
    guardrails: [
      'Bloqueio de agendamento fora do horário comercial.',
      'Validação de choque de horários na agenda.'
    ]
  },
  {
    id: 'node_followup',
    name: 'Agente Follow-up Guardian',
    role: 'Nurturing & Lembrete',
    function: 'Garante 0% de no-show enviando insumos de alto valor antes da reunião.',
    skills: ['Lembrete de Alto Impacto', 'Envio de Estudo de Caso'],
    permissions: ['Disparar Z-API WhatsApp', 'Verificar Status no CRM'],
    x: 600,
    y: 280,
    status: 'idle',
    connections: [],
    modelType: 'Cron Trigger + Gemini 1.5 Flash',
    latencyAvg: '210ms',
    architectureType: 'Agente de Nutrição & Retenção',
    systemPromptSnippet: 'Envie um lembrete 24h e 1h antes do diagnóstico agendado. Anexe o PDF do Estudo de Caso de ROI para aquecer o prospect.',
    inputTrigger: 'Scheduled Job (Cron): { event_id: "E-402", time_remaining: "60min" }',
    outputArtifact: 'WhatsApp Message Status: { delivered: true, read: true, pdf_attached: "case_squad_roi.pdf" }',
    guardrails: [
      'Proibido enviar mensagens entre 22h e 07h.',
      'Interrupção imediata em caso de resposta do cliente solicitando cancelamento.'
    ]
  }
];

export const PRESENTATION_SLIDES: SlideItem[] = [
  {
    id: 'intro',
    category: 'ABERTURA & MANIFESTO',
    title: 'Conhecimento Isolado Não Gera Lucro',
    subtitle: 'A execução é o verdadeiro gargalo das empresas modernas na Era da IA.',
    speakerNotes: 'Apresente o problema central: a maioria das empresas foca em acumular conhecimento, mas trava na capacidade de execução. A solução de Ellen Salomão é alavancar a produtividade sem inflar o headcount.'
  },
  {
    id: 'quiz',
    category: 'INTERATIVO & DIAGNÓSTICO',
    title: 'Teste Rápido de Maturidade de IA',
    subtitle: 'Em qual dos 3 níveis de adoção sua empresa se encontra neste momento?',
    speakerNotes: 'Convoque a audiência para realizar o teste de 5 perguntas. O diagnóstico mostra visualmente se o negócio é "Quem Pede", "Quem Delega" ou "Quem Desenha".'
  },
  {
    id: 'maturity_levels',
    category: 'MODELO DE MATURIDADE',
    title: 'Os 3 Níveis de IA: De Pedir a Desenhar',
    subtitle: 'Compreenda a evolução: Nível 1 (Quem Pede), Nível 2 (Quem Delega) e Nível 3 (Quem Desenha).',
    speakerNotes: 'Detalhe a diferença entre prompt pontual, criação de assistentes isolados e a verdadeira Engenharia de Negócios com Squads de IA.'
  },
  {
    id: 'architecture',
    category: 'ARQUITETURA TÉCNICA',
    title: 'Os 3 Pilares Obrigatórios de um Agente',
    subtitle: 'Função Única, Skills/Instruções e Permissões Sistêmicas.',
    speakerNotes: 'Alerte vigorosamente sobre o perigo da falta de diretrizes, gerando conteúdos genéricos que destroem a credibilidade e autoridade da marca.'
  },
  {
    id: 'squad_diagram',
    category: 'ENGENHARIA DE PROCESSO',
    title: 'Nós Conectados: O Ecossistema de Squads',
    subtitle: 'Diagrama de rede em tempo real simulando a sinergia entre agentes autônomos.',
    speakerNotes: 'Demonstre na prática a transmissão de dados entre agentes. Mostre como o output do Lead Classifier vira input para o Personalizer Copy.'
  },
  {
    id: 'builder',
    category: 'FECHAMENTO PRÁTICO',
    title: 'Comece Pequeno: Desenhe seu 1º Agente',
    subtitle: 'Regra de Ouro: Desenhe no papel primeiro. Escolha UMA tarefa repetitiva.',
    speakerNotes: 'Entregue o plano de ação imediato. Não tente criar sistemas hiper complexos no dia 1. Escolha a tarefa mais dolorosa, isole a função e gere a especificação técnica.'
  },
  {
    id: 'calculator',
    category: 'IMPACTO FINANCEIRO',
    title: 'Calculadora de Escalabilidade sem Demissões',
    subtitle: 'Multiplicando a capacidade produtiva mantendo a folha enxuta.',
    speakerNotes: 'Demonstre a matemática da escalabilidade em tempo real: ganho de horas, capacidade ampliada e preservação das margens de lucro.'
  }
];
