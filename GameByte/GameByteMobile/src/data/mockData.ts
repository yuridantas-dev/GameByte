import { Track, TrackStage, QuizQuestion, LeaderboardUser } from "../types";

export const tracksData: Track[] = [
  // --- TRILHAS FUNDAMENTAIS (BÁSICAS) ---
  {
    id: "logic",
    name: "Lógica de Programação",
    short: "Lógica",
    lessons: "5 fases",
    category: "fundamental",
    iconName: "BrainCircuit",
    gradient: ["#287a8e", "#1d405e"],
    soft: "#1a596d",
    xp: "60 XP",
  },
  {
    id: "python",
    name: "Linguagem Python (Iniciante)",
    short: "Python",
    lessons: "5 fases",
    category: "fundamental",
    prerequisites: ["logic"],
    prerequisiteNames: ["Lógica de Programação"],
    iconName: "Terminal",
    gradient: ["#2563eb", "#1e3a8a"],
    soft: "#1d4ed8",
    xp: "90 XP",
  },
  {
    id: "network",
    name: "Fundamentos de Redes",
    short: "Redes",
    lessons: "5 fases",
    category: "fundamental",
    iconName: "Wifi",
    gradient: ["#aa4d89", "#5c235d"],
    soft: "#742b68",
    xp: "70 XP",
  },
  {
    id: "web",
    name: "Fundamentos Web & Front-end",
    short: "Web",
    lessons: "5 fases",
    category: "fundamental",
    iconName: "Code2",
    gradient: ["#744ce2", "#3e2a83"],
    soft: "#442e8a",
    xp: "80 XP",
  },

  // --- TRILHAS PROFISSIONALIZANTES (AVANÇADAS) ---
  {
    id: "cybersecurity",
    name: "Cibersegurança & Defesa Digital",
    short: "Cibersegurança",
    lessons: "5 fases",
    category: "professional",
    prerequisites: ["network"],
    prerequisiteNames: ["Fundamentos de Redes"],
    targetRole: "Analista de Segurança & SOC",
    iconName: "ShieldCheck",
    gradient: ["#e11d48", "#881337"],
    soft: "#9f1239",
    xp: "150 XP",
  },
  {
    id: "fullstack",
    name: "Desenvolvimento Full Stack",
    short: "Full Stack",
    lessons: "5 fases",
    category: "professional",
    prerequisites: ["logic", "web", "python"],
    prerequisiteNames: ["Lógica de Programação", "Fundamentos Web", "Python"],
    targetRole: "Engenheiro de Software Full Stack",
    iconName: "Layers",
    gradient: ["#6366f1", "#312e81"],
    soft: "#4338ca",
    xp: "180 XP",
  },
  {
    id: "cloud",
    name: "Cloud Computing & DevOps",
    short: "Cloud & DevOps",
    lessons: "5 fases",
    category: "professional",
    prerequisites: ["network", "python"],
    prerequisiteNames: ["Fundamentos de Redes", "Python"],
    targetRole: "Especialista em Cloud & Infra",
    iconName: "Cloud",
    gradient: ["#0284c7", "#0c4a6e"],
    soft: "#0369a1",
    xp: "160 XP",
  },
  {
    id: "ai",
    name: "Inteligência Artificial & Dados",
    short: "IA & Dados",
    lessons: "5 fases",
    category: "professional",
    prerequisites: ["python", "logic"],
    prerequisiteNames: ["Python", "Lógica de Programação"],
    targetRole: "Cientista de Dados & Engenheiro IA",
    iconName: "Cpu",
    gradient: ["#d97706", "#78350f"],
    soft: "#b45309",
    xp: "170 XP",
  },
];

export const trackStagesData: Record<string, TrackStage[]> = {
  // ==================== 1. LÓGICA DE PROGRAMAÇÃO (BÁSICO & INTUITIVO) ====================
  logic: [
    {
      id: 1,
      title: "O que é Programar e Algoritmos",
      type: "lesson",
      xp: 40,
      description: "Descubra como o computador pensa e como dar instruções passo a passo.",
      study: {
        summary: "Programar nada mais é do que dar uma sequência lógica de ordens para o computador resolver um problema, exatamente como uma receita de bolo.",
        keyPoints: [
          { term: "Algoritmo", desc: "Passo a passo organizado com início, meio e fim para atingir um resultado." },
          { term: "Instrução", desc: "Cada comando individual que o processador deve executar na ordem exata." },
          { term: "Execução Sequencial", desc: "O computador lê seu código de cima para baixo, linha após linha." },
        ],
        codeSnippet: "// Exemplo de algoritmo simples do dia a dia:\n1. Pegar o pão\n2. Passar a manteiga\n3. Colocar na chapa\n4. Servir o lanche",
        mascotTip: "O computador é muito rápido, mas não adivinha nada: ele faz exatamente o que você mandar na ordem que você escreveu!",
      },
    },
    {
      id: 2,
      title: "Variáveis e Tipos de Dados",
      type: "lesson",
      xp: 50,
      description: "Aprenda a guardar informações na memória usando caixinhas nomeadas.",
      study: {
        summary: "Uma variável é como uma caixinha com etiqueta na memória do computador onde guardamos valores para usar depois.",
        keyPoints: [
          { term: "Texto (String)", desc: "Palavras e frases sempre entre aspas. Ex: 'Maria', 'GameByte'." },
          { term: "Números (Integer / Float)", desc: "Valores numéricos para cálculos. Ex: 25 (inteiro) ou 1.75 (decimal)." },
          { term: "Booleano (Boolean)", desc: "Verdadeiro (True) ou Falso (False), usado em testes lógicos." },
        ],
        codeSnippet: "nome = 'Lucas'       # Texto (String)\nidade = 20           # Número Inteiro (Int)\naltura = 1.80        # Número Decimal (Float)\nestudando = True     # Booleano (Bool)",
        mascotTip: "Escolha nomes claros para suas variáveis: `idade_usuario` é muito melhor do que apenas `x`!",
      },
    },
    {
      id: 3,
      title: "Condicionais: Se e Senão (if / else)",
      type: "challenge",
      xp: 60,
      description: "Ensine seu programa a tomar decisões baseadas em condições.",
      study: {
        summary: "Com condicionais, seu programa pode escolher caminhos diferentes dependendo da situação.",
        keyPoints: [
          { term: "SE (if)", desc: "Executa um bloco de código APENAS se a condição for verdadeira." },
          { term: "SENÃO (else)", desc: "Executa caso a condição do 'if' não tenha sido satisfeita." },
          { term: "Operadores de Comparação", desc: "> (maior), < (menor), == (igual), != (diferente)." },
        ],
        codeSnippet: "nota = 8.5\n\nif nota >= 7:\n    print('Aprovado! Parabéns!')\nelse:\n    print('Precisa de recuperação!')",
        mascotTip: "O 'else' nunca tem condição própria; ele é o plano B automático quando o 'if' falha.",
      },
    },
    {
      id: 4,
      title: "Laços de Repetição (while e for)",
      type: "quiz",
      xp: 70,
      description: "Faça o computador repetir tarefas automaticamente sem cansar.",
      study: {
        summary: "Repetições (loops) evitam que você precise copiar e colar o mesmo código várias vezes.",
        keyPoints: [
          { term: "Enquanto (while)", desc: "Repete um bloco ENQUANTO uma condição continuar verdadeira." },
          { term: "Para cada (for)", desc: "Repete um número fixo de vezes ou percorre cada item de uma lista." },
          { term: "Critério de Parada", desc: "A condição que encerra o loop para não travar o programa em loop infinito." },
        ],
        codeSnippet: "# Contando de 1 até 3 com loop:\ncontador = 1\nwhile contador <= 3:\n    print('Passo número:', contador)\n    contador = contador + 1",
        mascotTip: "Sempre lembre de atualizar o contador dentro do `while`, senão ele roda para sempre!",
      },
    },
    {
      id: 5,
      title: "Boss: Funções e Blocos Reaproveitáveis",
      type: "boss",
      xp: 120,
      description: "Crie pequenas ferramentas de código que você pode chamar a qualquer momento!",
      study: {
        summary: "Uma função é um bloco de código com nome que recebe dados, faz um processamento e devolve uma resposta.",
        keyPoints: [
          { term: "Definição de Função", desc: "Criar um bloco com nome e parâmetros de entrada." },
          { term: "Parâmetros / Argumentos", desc: "Os valores que você passa para a função trabalhar." },
          { term: "Retorno (Return)", desc: "O resultado final que a função entrega de volta para quem a chamou." },
        ],
        codeSnippet: "def somar(a, b):\n    resultado = a + b\n    return resultado\n\ntotal = somar(10, 5)   # total recebe 15!",
        mascotTip: "Funções deixam seu código limpo, organizado e evitam repetição de código!",
      },
    },
  ],

  // ==================== 2. PYTHON (FÁCIL & PRÁTICO) ====================
  python: [
    {
      id: 1,
      title: "Sintaxe Limpa e print()",
      type: "lesson",
      xp: 50,
      description: "Descubra por que Python é a linguagem mais amigável e legível do mundo.",
      study: {
        summary: "Python foi projetado para ser lido como inglês simples, sem pontuações confusas ou chaves obrigatórias.",
        keyPoints: [
          { term: "Indentação Obrigatória", desc: "Python usa espaços no início da linha para saber o que está dentro de um bloco." },
          { term: "Função print()", desc: "Exibe qualquer texto ou variável na tela do terminal." },
          { term: "Função input()", desc: "Recebe o que o usuário digitar no teclado." },
        ],
        codeSnippet: "# Seu primeiro programa em Python:\nnome = input('Qual seu nome? ')\nprint(f'Bem-vindo ao GameByte, {nome}!')",
        mascotTip: "Em Python, 4 espaços de indentação substituem as chaves `{ }` de outras linguagens.",
      },
    },
    {
      id: 2,
      title: "Listas e Dicionários",
      type: "lesson",
      xp: 60,
      description: "Guarde conjuntos de dados e tabelas chave-valor com facilidade.",
      study: {
        summary: "Listas guardam itens ordenados e Dicionários associam chaves com seus respectivos valores.",
        keyPoints: [
          { term: "Listas [ ]", desc: "Coleções ordenadas onde você acessa por índice: `linguagens[0]`." },
          { term: "Dicionários { }", desc: "Pares de chave: valor, como uma ficha cadastral: `aluno['idade']`." },
          { term: "Métodos Úteis", desc: "`.append()` para adicionar em listas e `.keys()` em dicionários." },
        ],
        codeSnippet: "jogos = ['Cyberpunk', 'Zelda', 'Mario']\njogos.append('GTA VI')\n\nusuario = {'nome': 'Ana', 'nivel': 5}\nprint(usuario['nome'])  # Exibe: Ana",
        mascotTip: "Lembre-se: listas em programação sempre começam na posição zero (0)!",
      },
    },
    {
      id: 3,
      title: "Loops For e Métodos de Texto",
      type: "challenge",
      xp: 75,
      description: "Percorra listas automaticamente e manipule textos como um profissional.",
      study: {
        summary: "O loop `for item in lista` do Python é o mais simples e direto de todas as linguagens.",
        keyPoints: [
          { term: "for x in lista", desc: "Passa por cada elemento da lista automaticamente, sem precisar de contadores." },
          { term: "range(início, fim)", desc: "Gera uma sequência numérica para você iterar." },
          { term: "Métodos de String", desc: "`.upper()` (maiúsculas), `.lower()` (minúsculas), `.split()` (separar palavras)." },
        ],
        codeSnippet: "linguagens = ['Python', 'JS', 'SQL']\n\nfor lang in linguagens:\n    print('Estudando:', lang.upper())",
        mascotTip: "`for i in range(5):` vai rodar exatamente 5 vezes (de 0 a 4).",
      },
    },
    {
      id: 4,
      title: "Funções e Módulos Nativos",
      type: "quiz",
      xp: 85,
      description: "Organize seu código com `def` e importe bibliotecas prontas.",
      study: {
        summary: "Python vem com 'baterias inclusas': dezenas de módulos nativos como `math`, `random` e `datetime` prontos para uso.",
        keyPoints: [
          { term: "Palavra-chave def", desc: "Usada para declarar funções personalizadas." },
          { term: "Comando import", desc: "Traz funcionalidades prontas da biblioteca padrão do Python." },
          { term: "Módulo random", desc: "Gera números aleatórios e faz sorteios facilmente." },
        ],
        codeSnippet: "import random\n\ndef rolar_dado():\n    return random.randint(1, 6)\n\nprint('Você tirou:', rolar_dado())",
        mascotTip: "Não reinvente a roda: quase tudo o que você precisa já tem um módulo pronto no Python.",
      },
    },
    {
      id: 5,
      title: "Boss: Automação e Leitura de Arquivos",
      type: "boss",
      xp: 150,
      description: "Crie um script prático que abre arquivos, processa dados e gera relatórios!",
      study: {
        summary: "Com poucas linhas de Python você pode automatizar tarefas manuais que levariam horas no computador.",
        keyPoints: [
          { term: "with open() as f:", desc: "Abre e fecha arquivos automaticamente de forma segura." },
          { term: "Modos de Arquivo", desc: "'r' para ler, 'w' para escrever do zero, 'a' para acrescentar ao fim." },
          { term: "Tratamento de Exceções", desc: "Bloco `try / except` para o programa não travar com arquivos inexistentes." },
        ],
        codeSnippet: "try:\n    with open('relatorio.txt', 'w') as arquivo:\n        arquivo.write('GameByte: Missão Concluída com Sucesso!')\n    print('Arquivo gerado!')\nexcept Exception as e:\n    print('Erro ao salvar:', e)",
        mascotTip: "Parabéns! Com o básico de Python dominado, você está pronto para IA, Backend ou DevOps!",
      },
    },
  ],

  // ==================== 3. FUNDAMENTOS DE REDES (COM AS 7 CAMADAS OSI VISUAIS) ====================
  network: [
    {
      id: 1,
      title: "Modelo OSI: As 7 Camadas de Rede",
      type: "lesson",
      xp: 50,
      description: "Entenda o caminho visual que os dados percorrem desde o app até o cabo físico.",
      study: {
        summary: "O Modelo OSI organiza a comunicação em 7 camadas padronizadas. Cada camada tem uma função única e conversa apenas com as camadas vizinhas.",
        osiLayers: [
          { num: 7, name: "Aplicação", protocols: "HTTP, DNS, SSH, SMTP", desc: "A interface direta com o usuário e os softwares.", color: "#ec4899" },
          { num: 6, name: "Apresentação", protocols: "SSL/TLS, JPEG, JSON", desc: "Traduz, formata, comprime e criptografa os dados.", color: "#d946ef" },
          { num: 5, name: "Sessão", protocols: "RPC, NetBIOS, Sockets", desc: "Inicia, mantém e encerra o diálogo entre duas máquinas.", color: "#8b5cf6" },
          { num: 4, name: "Transporte", protocols: "TCP (confiável), UDP (rápido)", desc: "Garante entrega em ordem e divide os dados em segmentos.", color: "#3b82f6" },
          { num: 3, name: "Rede", protocols: "IP (IPv4/IPv6), Roteadores, ICMP", desc: "Endereçamento lógico e escolha do melhor caminho (roteamento).", color: "#06b6d4" },
          { num: 2, name: "Enlace", protocols: "MAC Address, Switches, Ethernet", desc: "Comunicação entre placas de rede vizinhas em quadros (frames).", color: "#10b981" },
          { num: 1, name: "Física", protocols: "Cabos UTP, Fibra Óptica, Wi-Fi", desc: "Transmissão dos bits brutos em pulsos elétricos ou ondas de rádio.", color: "#f59e0b" },
        ],
        keyPoints: [
          { term: "Encapsulamento", desc: "Ao descer da Camada 7 para a 1, cada camada adiciona seu próprio cabeçalho (Header)." },
          { term: "Desencapsulamento", desc: "O receptor retira os cabeçalhos de baixo para cima até entregar os dados à aplicação." },
        ],
        codeSnippet: "// Ordem das Camadas:\n[7] Aplicação ➔ [6] Apresentação ➔ [5] Sessão ➔ [4] Transporte ➔ [3] Rede ➔ [2] Enlace ➔ [1] Física",
        mascotTip: "Mnemônico clássico para decorar de cima para baixo: 'A Freira Transporta Redes Em Fitas'!",
      },
    },
    {
      id: 2,
      title: "Endereçamento IP e Máscaras de Rede",
      type: "lesson",
      xp: 70,
      description: "Aprenda como o endereço IP identifica computadores no mundo todo.",
      study: {
        summary: "O endereço IP funciona como o CEP da sua máquina na rede. A máscara de sub-rede define quantos computadores cabem naquela rede.",
        keyPoints: [
          { term: "IPv4", desc: "32 bits divididos em 4 blocos de 0 a 255. Ex: 192.168.1.1." },
          { term: "Notação CIDR (/24)", desc: "Indica quantos bits pertencem à rede. /24 permite até 254 dispositivos conectados." },
          { term: "IP Privado vs Público", desc: "IPs privados (192.168.x.x, 10.x.x.x) funcionam dentro de casa; o IP público sai para a internet." },
        ],
        codeSnippet: "# Anatomia do IP 192.168.1.10/24:\nRede: 192.168.1.0\nGateway (Roteador): 192.168.1.1\nSeu Dispositivo: 192.168.1.10\nBroadcast: 192.168.1.255",
        mascotTip: "O Gateway padrão é a porta de saída que seu roteador usa para te conectar com a internet mundial.",
      },
    },
    {
      id: 3,
      title: "Switches, Roteadores e VLANs",
      type: "challenge",
      xp: 110,
      description: "Descubra como os equipamentos físicos direcionam o tráfego.",
      study: {
        summary: "Switches conectam dispositivos dentro da mesma sala (Camada 2). Roteadores conectam redes diferentes entre si (Camada 3).",
        keyPoints: [
          { term: "Switch (Camada 2)", desc: "Usa o endereço físico MAC para enviar o pacote direto para a porta do destinatário." },
          { term: "Roteador (Camada 3)", desc: "Lê o endereço IP de destino para escolher a melhor rota na internet." },
          { term: "VLAN (Rede Virtual)", desc: "Divide um switch em redes separadas para que o setor Financeiro não acesse o Wi-Fi de Visitantes." },
        ],
        codeSnippet: "# Visualização:\nDispositivos A, B ➔ [SWITCH L2] ➔ [ROTEADOR L3] ➔ [INTERNET]",
        mascotTip: "VLANs isolam o tráfego e aumentam a segurança sem você precisar comprar outro aparelho físico.",
      },
    },
    {
      id: 4,
      title: "Protocolos Essenciais: DNS, DHCP e TCP",
      type: "quiz",
      xp: 90,
      description: "Entenda os serviços invisíveis que fazem a internet funcionar.",
      study: {
        summary: "Sem DNS não haveria nomes de sites, e sem DHCP você precisaria configurar o IP do celular manualmente toda vez.",
        keyPoints: [
          { term: "DNS (Porta 53)", desc: "A 'lista telefônica' da web: traduz 'google.com' no IP 142.250.190.46." },
          { term: "DHCP (Portas 67/68)", desc: "Entrega um IP automático para qualquer celular ou PC que conectar no Wi-Fi." },
          { term: "TCP vs UDP", desc: "TCP confirma se o dado chegou (ideal para sites e arquivos); UDP é rápido e sem confirmação (ideal para jogos e chamadas de voz)." },
        ],
        codeSnippet: "# Testando DNS no terminal:\nnslookup gamebyte.com\n\n# Testando rota de rede:\ntraceroute 8.8.8.8",
        mascotTip: "Se a internet 'caiu' mas o WhatsApp ainda envia mensagens, quase sempre é o servidor DNS que parou!",
      },
    },
    {
      id: 5,
      title: "Boss: Diagnóstico e Segurança de Redes",
      type: "boss",
      xp: 200,
      description: "Use comandos de terminal para descobrir falhas e proteger a rede!",
      study: {
        summary: "Profissionais de infraestrutura e segurança usam ferramentas de linha de comando para mapear e proteger portas.",
        keyPoints: [
          { term: "Ping e ICMP", desc: "Testa se uma máquina de destino está ligada e respondendo." },
          { term: "Portas TCP Padrão", desc: "Porta 80 (HTTP), 443 (HTTPS seguro), 22 (SSH para controle remoto)." },
          { term: "Firewall", desc: "Barreira que bloqueia conexões vindas de IPs suspeitos ou portas não autorizadas." },
        ],
        codeSnippet: "# Comandos essenciais de diagnóstico:\nping 1.1.1.1          # Testa conectividade\nnetstat -an           # Lista portas abertas\nssh admin@192.168.1.1 # Acesso seguro remoto",
        mascotTip: "Você agora domina a base sólida de Redes! Esse conhecimento é o pilar de Cibersegurança e Cloud.",
      },
    },
  ],

  // ==================== 4. FUNDAMENTOS WEB & FRONT-END ====================
  web: [
    {
      id: 1,
      title: "A Tríade da Web: HTML, CSS e JavaScript",
      type: "lesson",
      xp: 50,
      description: "Entenda a função de cada tecnologia na construção de páginas modernas.",
      study: {
        summary: "HTML é o esqueleto (estrutura), CSS é a pele e a roupa (estilo), e JavaScript é o cérebro (interatividade).",
        keyPoints: [
          { term: "HTML", desc: "Define títulos, parágrafos, botões e imagens usando tags estruturadas." },
          { term: "CSS", desc: "Controla cores, fontes, espaçamentos, tamanhos e efeitos visuais." },
          { term: "JavaScript", desc: "Faz a página reagir a cliques, buscar dados e atualizar informações dinamicamente." },
        ],
        codeSnippet: "<!-- Estrutura básica HTML -->\n<button id='btn'>Clique Aqui</button>\n\n<style>\n  #btn { background: #8b5cf6; color: white; }\n</style>",
        mascotTip: "Pense no HTML como um carro montado em ferro, o CSS como a pintura e o JavaScript como o motor ligado!",
      },
    },
    {
      id: 2,
      title: "Layout Moderno com Flexbox",
      type: "lesson",
      xp: 70,
      description: "Posicione elementos na tela com precisão e responsividade.",
      study: {
        summary: "Flexbox é o sistema do CSS mais usado no mundo para alinhar itens em linhas e colunas em telas de qualquer tamanho.",
        keyPoints: [
          { term: "display: flex", desc: "Transforma o container em uma caixa flexível inteligente." },
          { term: "justify-content", desc: "Alinha os itens no eixo principal (centro, espaçados, esquerda ou direita)." },
          { term: "align-items", desc: "Alinha os itens no eixo transversal (vertical)." },
        ],
        codeSnippet: ".container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}",
        mascotTip: "`justify-content: center` e `align-items: center` juntos centralizam qualquer coisa perfeitamente!",
      },
    },
    {
      id: 3,
      title: "JavaScript no Navegador e DOM",
      type: "challenge",
      xp: 90,
      description: "Capture cliques e altere elementos da tela em tempo real.",
      study: {
        summary: "O DOM (Document Object Model) é a árvore de elementos que o JavaScript pode ler e modificar a qualquer instante.",
        keyPoints: [
          { term: "document.querySelector()", desc: "Localiza qualquer botão ou texto na página pelo seletor CSS." },
          { term: "addEventListener()", desc: "Fica 'escutando' quando o usuário clica ou digita algo." },
        ],
        codeSnippet: "const botao = document.querySelector('#btn');\nbotao.addEventListener('click', () => {\n  alert('Você clicou no botão GameByte!');\n});",
        mascotTip: "Toda ação interativa de um site começa com um `addEventListener` esperando a ação do usuário.",
      },
    },
    {
      id: 4,
      title: "Introdução ao React & Componentes",
      type: "quiz",
      xp: 110,
      description: "Crie interfaces modernas e reutilizáveis com React.",
      study: {
        summary: "React divide telas complexas em pequenos pedaços independentes e reutilizáveis chamados Componentes.",
        keyPoints: [
          { term: "Componente", desc: "Uma função que retorna o visual em formato JSX (HTML dentro do JavaScript)." },
          { term: "Props", desc: "Parâmetros passados para personalizar cada componente." },
          { term: "useState", desc: "Hook que guarda a memória do componente e atualiza a tela quando o valor muda." },
        ],
        codeSnippet: "function Contador() {\n  const [pontos, setPontos] = useState(0);\n  return (\n    <button onClick={() => setPontos(pontos + 10)}>\n      Pontos: {pontos}\n    </button>\n  );\n}",
        mascotTip: "Quando o estado (`state`) muda, o React atualiza na tela só o pedacinho que foi alterado!",
      },
    },
    {
      id: 5,
      title: "Boss: App Web Completo e Consumo de API",
      type: "boss",
      xp: 220,
      description: "Conecte sua interface com um servidor backend usando requisições fetch/REST!",
      study: {
        summary: "Aplicações profissionais buscam dados dinâmicos de servidores através de requisições assíncronas HTTP (JSON).",
        keyPoints: [
          { term: "fetch() / axios", desc: "Funções que enviam pedidos pela internet para buscar ou salvar dados." },
          { term: "async / await", desc: "Permite aguardar a resposta da internet sem travar o restante da aplicação." },
        ],
        codeSnippet: "async function carregarRanking() {\n  const res = await fetch('https://api.gamebyte.com/ranking');\n  const dados = await res.json();\n  console.log(dados);\n}",
        mascotTip: "Com HTML, CSS, JS e React, você tem a base completa para criar qualquer produto digital moderno!",
      },
    },
  ],

  // ==================== 5. CIBERSEGURANÇA (PROFISSIONALIZANTE) ====================
  cybersecurity: [
    {
      id: 1,
      title: "Mapeamento e Reconhecimento com Nmap",
      type: "lesson",
      xp: 100,
      description: "Descubra serviços vulneráveis e portas abertas em servidores.",
      study: {
        summary: "O primeiro passo de qualquer análise de segurança é o reconhecimento (Recon) para mapear a superfície de ataque.",
        keyPoints: [
          { term: "Nmap", desc: "A ferramenta padrão da indústria para varredura de portas e detecção de versões de serviços." },
          { term: "Porta Aberta vs Filtrada", desc: "Aberta responde a conexões; Filtrada indica a presença de um Firewall bloqueando." },
        ],
        codeSnippet: "# Varredura com detecção de versão e scripts seguros:\nnmap -sV -sC 192.168.1.50",
        mascotTip: "Mapear sua própria rede ajuda a fechar portas desnecessárias antes que atacantes as encontrem.",
      },
    },
    {
      id: 2,
      title: "Criptografia e Chaves Públicas",
      type: "lesson",
      xp: 120,
      description: "Domine RSA, AES, certificados SSL/TLS e assinaturas digitais.",
      study: {
        summary: "A criptografia garante os pilares de Confidencialidade, Integridade e Autenticidade.",
        keyPoints: [
          { term: "Criptografia Simétrica (AES)", desc: "Uma única chave secreta para trancar e destrancar os dados (alta velocidade)." },
          { term: "Criptografia Assimétrica (RSA)", desc: "Usa chave pública para cifrar e chave privada para decifrar." },
          { term: "Hashing (SHA-256 / bcrypt)", desc: "Função unidirecional usada para verificar integridade e guardar senhas com segurança." },
        ],
        codeSnippet: "// Senhas NUNCA são salvas em texto puro:\nhash = bcrypt.hashSync('senha123', saltRounds = 12);",
        mascotTip: "Hash não é criptografia: um hash não pode ser revertido, apenas comparado.",
      },
    },
    {
      id: 3,
      title: "Defesa contra Phishing e Endpoint",
      type: "challenge",
      xp: 140,
      description: "Configure filtros de endpoint e sistemas IDS/IPS para neutralizar ameaças.",
      study: {
        summary: "Engenharia social é o vetor de ataque mais comum. Defesas em camadas reduzem drasticamente o risco humano.",
        keyPoints: [
          { term: "SPF e DKIM", desc: "Registros de DNS que validam se um e-mail é de fato legítimo." },
          { term: "MFA (Autenticação Multifator)", desc: "Exige uma confirmação adicional no celular, barrando 99% dos ataques de força bruta." },
        ],
        codeSnippet: "Registro SPF no DNS:\nv=spf1 include:_spf.google.com ~all",
        mascotTip: "Ativar MFA com aplicativo autenticador protege mesmo se a senha for vazada!",
      },
    },
    {
      id: 4,
      title: "Auditoria OWASP Top 10 e Web Security",
      type: "quiz",
      xp: 150,
      description: "Proteja APIs contra SQL Injection, XSS e quebra de autorização.",
      study: {
        summary: "O OWASP Top 10 elenca as vulnerabilidades mais perigosas em aplicações web.",
        keyPoints: [
          { term: "SQL Injection (SQLi)", desc: "Entrada de dados maliciosa que altera a consulta do banco. Defesa: Prepared Statements." },
          { term: "XSS (Cross-Site Scripting)", desc: "Injeção de scripts maliciosos no navegador da vítima." },
        ],
        codeSnippet: "// Seguro contra SQL Injection com parâmetros:\ndb.query('SELECT * FROM usuarios WHERE id = $1', [userId]);",
        mascotTip: "Regra número um de cibersegurança: Nunca confie em dados enviados pelo usuário sem validação.",
      },
    },
    {
      id: 5,
      title: "Boss: Resposta a Incidentes (NIST)",
      type: "boss",
      xp: 300,
      description: "Contenha um ataque cibernético simulado e restaure a integridade do sistema!",
      study: {
        summary: "O framework NIST divide a resposta em: Preparação, Detecção, Contenção, Erradicação e Recuperação.",
        keyPoints: [
          { term: "Contenção Imediata", desc: "Isolar a máquina da rede sem desligar para preservar a memória RAM para perícia." },
          { term: "SIEM e Análise de Logs", desc: "Centralização de registros para traçar a linha do tempo do invasor." },
        ],
        codeSnippet: "Checklist do SOC:\n1. Isolar host da rede\n2. Bloquear IP no Firewall\n3. Revogar tokens e rotacionar chaves",
        mascotTip: "Mantenha a calma, siga o checklist do NIST e vença o Boss de Cibersegurança!",
      },
    },
  ],

  // ==================== 6. FULL STACK (PROFISSIONALIZANTE) ====================
  fullstack: [
    {
      id: 1,
      title: "Arquitetura REST APIs com Node e Express",
      type: "lesson",
      xp: 110,
      description: "Construa endpoints profissionais com roteamento, middlewares e CORS.",
      study: {
        summary: "APIs RESTful conectam o frontend aos dados do backend de forma padronizada usando verbos HTTP.",
        keyPoints: [
          { term: "Verbos HTTP", desc: "GET (buscar), POST (criar), PUT/PATCH (atualizar), DELETE (remover)." },
          { term: "Middlewares", desc: "Funções intermediárias que tratam autenticação, logs e validação." },
        ],
        codeSnippet: "app.get('/api/usuarios', (req, res) => {\n  res.json({ usuarios: ['Carlos', 'Ana'] });\n});",
        mascotTip: "Sempre retorne códigos de status HTTP corretos: 200 (Sucesso), 400 (Erro do cliente), 500 (Erro do servidor).",
      },
    },
    {
      id: 2,
      title: "Bancos de Dados: PostgreSQL e Prisma ORM",
      type: "lesson",
      xp: 130,
      description: "Modele tabelas relacionais, chaves estrangeiras e faça consultas rápidas.",
      study: {
        summary: "Bancos relacionais garantem consistência e integridade das informações do seu negócio.",
        keyPoints: [
          { term: "Chave Primária (PK)", desc: "Identificador exclusivo e imutável de cada linha na tabela." },
          { term: "ORM (Object-Relational Mapping)", desc: "Permite manipular o banco de dados usando código TypeScript puro." },
        ],
        codeSnippet: "// Consulta com Prisma ORM:\nconst user = await prisma.user.findUnique({\n  where: { email: 'contato@gamebyte.com' }\n});",
        mascotTip: "Crie índices nas colunas que você consulta com frequência para acelerar suas buscas.",
      },
    },
    {
      id: 3,
      title: "Autenticação Segura com JWT e Tokens",
      type: "challenge",
      xp: 150,
      description: "Implemente login stateless com tokens de acesso e refresh tokens.",
      study: {
        summary: "JSON Web Tokens (JWT) permitem que o servidor saiba quem é o usuário sem precisar salvar a sessão na memória.",
        keyPoints: [
          { term: "Estrutura do JWT", desc: "Header (algoritmo) + Payload (dados do usuário) + Signature (chave secreta)." },
          { term: "Bearer Token", desc: "Enviado no cabeçalho `Authorization: Bearer <token>` em cada requisição protegida." },
        ],
        codeSnippet: "const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '8h' });",
        mascotTip: "Nunca guarde informações sensíveis como senhas no payload do JWT, pois ele pode ser decodificado!",
      },
    },
    {
      id: 4,
      title: "Integração Full Stack e Testes Automatizados",
      type: "quiz",
      xp: 160,
      description: "Escreva testes unitários e de integração para garantir código livre de bugs.",
      study: {
        summary: "Testes automatizados garantem que novas funcionalidades não quebrem partes antigas do sistema.",
        keyPoints: [
          { term: "Testes Unitários", desc: "Testam funções isoladas com dados de entrada e saída esperados." },
          { term: "Jest / Vitest", desc: "Os frameworks de teste mais populares no ecossistema JavaScript." },
        ],
        codeSnippet: "test('deve calcular XP corretamente', () => {\n  expect(calcularBonusXP(100)).toBe(150);\n});",
        mascotTip: "Código com testes permite lançar atualizações em produção com total tranquilidade.",
      },
    },
    {
      id: 5,
      title: "Boss: Deploy de Aplicação Completa em Produção",
      type: "boss",
      xp: 300,
      description: "Coloque seu projeto no ar com Docker, banco em nuvem e HTTPS configurado!",
      study: {
        summary: "O ciclo de desenvolvimento só termina quando a aplicação está no ar para os usuários finais com alta performance.",
        keyPoints: [
          { term: "Docker Container", desc: "Empacota todo o código e dependências para rodar igual em qualquer máquina." },
          { term: "Variáveis de Ambiente (.env)", desc: "Armazena credenciais secretas fora do controle de versão do GitHub." },
        ],
        codeSnippet: "# Rodando com Docker:\ndocker build -t gamebyte-api .\ndocker run -p 3000:3000 gamebyte-api",
        mascotTip: "Parabéns, você agora é um Desenvolvedor Full Stack completo pronto para o mercado!",
      },
    },
  ],

  // ==================== 7. CLOUD COMPUTING & DEVOPS ====================
  cloud: [
    {
      id: 1,
      title: "Fundamentos de Cloud (AWS, Azure, GCP)",
      type: "lesson",
      xp: 100,
      description: "Entenda os pilares de IaaS, PaaS, SaaS e regiões globais.",
      study: {
        summary: "Computação em nuvem permite alugar poder computacional sob demanda sem comprar servidores físicos.",
        keyPoints: [
          { term: "IaaS (Infraestrutura)", desc: "Máquinas virtuais (EC2), redes (VPC) e discos de armazenamento." },
          { term: "PaaS (Plataforma)", desc: "Ambientes gerenciados onde você envia apenas o código e a nuvem cuida do resto." },
        ],
        codeSnippet: "Modelos:\nIaaS (Você cuida do SO e App)\nPaaS (Você cuida só do App)\nSaaS (Você usa o software pronto)",
        mascotTip: "Nuvem é escalável: quando seu app recebe milhões de acessos, ela cria servidores extras automaticamente.",
      },
    },
    {
      id: 2,
      title: "Containers com Docker",
      type: "lesson",
      xp: 120,
      description: "Crie imagens leves e padronizadas para seus microsserviços.",
      study: {
        summary: "Docker resolve o clássico problema 'na minha máquina funciona' empacotando tudo o que a aplicação precisa.",
        keyPoints: [
          { term: "Dockerfile", desc: "Arquivo com a receita de montagem da imagem do seu sistema." },
          { term: "docker-compose", desc: "Orquestra múltiplos containers (ex: API + Banco de Dados) com um só comando." },
        ],
        codeSnippet: "FROM node:18-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ['npm', 'start']",
        mascotTip: "Imagens Alpine Linux são ultra-leves e diminuem o tempo de deploy de minutos para segundos.",
      },
    },
    {
      id: 3,
      title: "Orquestração com Kubernetes (K8s)",
      type: "challenge",
      xp: 150,
      description: "Gerencie clusters com auto-scaling, auto-healing e balanceamento de carga.",
      study: {
        summary: "Kubernetes gerencia milhares de containers automaticamente, substituindo instâncias com falha sem queda.",
        keyPoints: [
          { term: "Pod", desc: "A menor unidade de execução no Kubernetes, contendo um ou mais containers." },
          { term: "Deployment", desc: "Define quantas réplicas do seu app devem estar sempre ativas." },
        ],
        codeSnippet: "kubectl get pods\nkubectl scale deployment gamebyte-api --replicas=5",
        mascotTip: "Com Kubernetes, se um container travar, ele sobe outro imediatamente sem o usuário perceber.",
      },
    },
    {
      id: 4,
      title: "Infraestrutura como Código (Terraform)",
      type: "quiz",
      xp: 140,
      description: "Crie servidores e redes na nuvem através de código versionável.",
      study: {
        summary: "Em vez de clicar em botões no painel da nuvem, você escreve arquivos de texto que sobem toda a infraestrutura.",
        keyPoints: [
          { term: "terraform init", desc: "Inicializa o diretório e baixa os plugins da AWS/GCP." },
          { term: "terraform apply", desc: "Aplica as mudanças planejadas diretamente na nuvem." },
        ],
        codeSnippet: "resource 'aws_instance' 'servidor_web' {\n  ami           = 'ami-0c55b159cbfafe1f0'\n  instance_type = 't3.micro'\n}",
        mascotTip: "Com IaC, você pode recriar toda a infraestrutura da sua empresa em outra região em minutos.",
      },
    },
    {
      id: 5,
      title: "Boss: Pipeline CI/CD Automatizado",
      type: "boss",
      xp: 300,
      description: "Configure GitHub Actions para testar e publicar seu código automaticamente a cada commit!",
      study: {
        summary: "Pipelines de CI/CD automatizam o processo de testar e colocar o código em produção sem intervenção manual.",
        keyPoints: [
          { term: "Continuous Integration (CI)", desc: "Executa testes automatizados a cada Pull Request." },
          { term: "Continuous Deployment (CD)", desc: "Envia a versão aprovada direto para os servidores de produção." },
        ],
        codeSnippet: "name: CI/CD Pipeline\non: [push]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: npm test && npm run deploy",
        mascotTip: "Você agora é um Engenheiro DevOps & Cloud qualificado para sustentar sistemas de escala global!",
      },
    },
  ],

  // ==================== 8. INTELIGÊNCIA ARTIFICIAL & DADOS ====================
  ai: [
    {
      id: 1,
      title: "Fundamentos de Ciência de Dados com Python",
      type: "lesson",
      xp: 110,
      description: "Manipule arrays numéricos e datasets com NumPy e Pandas.",
      study: {
        summary: "A base de toda IA são os dados organizados em matrizes e tabelas numéricas multidimensionais.",
        keyPoints: [
          { term: "NumPy", desc: "Biblioteca ultra-rápida em C para operações matemáticas em vetores e matrizes." },
          { term: "Pandas DataFrame", desc: "Tabelas em memória para filtrar, limpar e transformar dados brutos." },
        ],
        codeSnippet: "import pandas as pd\n\ndf = pd.read_csv('usuarios.csv')\nprint(df.describe())  # Estatísticas rápidas do dataset",
        mascotTip: "80% do trabalho em Inteligência Artificial é limpar e preparar os dados antes de treinar os modelos.",
      },
    },
    {
      id: 2,
      title: "Análise Exploratória e Visualização de Dados",
      type: "lesson",
      xp: 120,
      description: "Crie gráficos de dispersão, histogramas e matrizes de correlação.",
      study: {
        summary: "Visualizar dados permite identificar padrões, outliers e correlações essenciais antes da modelagem.",
        keyPoints: [
          { term: "Matplotlib & Seaborn", desc: "Bibliotecas gráficas para gerar mapas de calor, boxplots e curvas de tendência." },
          { term: "Correlação", desc: "Mede o quanto duas variáveis variam juntas (de -1 a +1)." },
        ],
        codeSnippet: "import seaborn as sns\nimport matplotlib.pyplot as plt\n\nsns.heatmap(df.corr(), annot=True)",
        mascotTip: "'Garbage in, garbage out': um modelo de IA só é bom se os dados de entrada forem de qualidade.",
      },
    },
    {
      id: 3,
      title: "Modelos de Machine Learning (Scikit-Learn)",
      type: "challenge",
      xp: 140,
      description: "Treine classificadores e regressões e avalie métricas de acurácia e F1-Score.",
      study: {
        summary: "O aprendizado supervisionado treina algoritmos para reconhecer padrões a partir de exemplos passados rotulados.",
        keyPoints: [
          { term: "Treino vs Teste", desc: "Separar 80% dos dados para treino e 20% para testar em dados nunca vistos." },
          { term: "Random Forest & XGBoost", desc: "Algoritmos campeões para problemas em dados tabulares estruturados." },
        ],
        codeSnippet: "from sklearn.ensemble import RandomForestClassifier\n\nmodelo = RandomForestClassifier()\nmodelo.fit(X_treino, y_treino)\nacuracia = modelo.score(X_teste, y_teste)",
        mascotTip: "Cuidado com Overfitting (quando o modelo decora os dados de treino mas erra no mundo real)!",
      },
    },
    {
      id: 4,
      title: "Redes Neurais e Deep Learning",
      type: "quiz",
      xp: 130,
      description: "Responda sobre camadas densas, convolucionais e funções de ativação.",
      study: {
        summary: "Deep Learning utiliza redes neurais com múltiplas camadas para reconhecer imagens, áudio e texto complexo.",
        keyPoints: [
          { term: "Neurônio Artificial", desc: "Soma ponderada das entradas + pesos aplicada a uma função de ativação (ReLU)." },
          { term: "Backpropagation", desc: "Ajusta os pesos da rede calculando o erro para trás a cada iteração." },
        ],
        codeSnippet: "import torch.nn as nn\n\nclass RedeNeural(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.camada = nn.Linear(10, 2)",
        mascotTip: "ReLU (Rectified Linear Unit) é a função de ativação padrão para redes neurais modernas.",
      },
    },
    {
      id: 5,
      title: "Boss: Assistente com LLMs e RAG",
      type: "boss",
      xp: 300,
      description: "Construa um assistente de IA com Embeddings e busca vetorial sobre documentos corporativos!",
      study: {
        summary: "RAG (Retrieval-Augmented Generation) injeta trechos de documentos relevantes no prompt do modelo para garantir respostas precisas e factuais.",
        keyPoints: [
          { term: "Embeddings", desc: "Transformam textos em vetores numéricos de significado semântico." },
          { term: "Vector Database (Chroma, Pinecone)", desc: "Bancos que realizam busca por proximidade de cosseno em milissegundos." },
        ],
        codeSnippet: "# Fluxo RAG:\nPergunta ➔ Busca Vetorial ➔ Prompt com Contexto ➔ LLM ➔ Resposta Confiável",
        mascotTip: "Você conquistou a trilha de ponta da tecnologia! Parabéns por dominar Inteligência Artificial!",
      },
    },
  ],
};

// ==================== QUIZ COM EXPLICAÇÕES DIDÁTICAS COMPLETAS ====================
export const quizQuestionsData: Record<string, Record<number, QuizQuestion[]>> = {
  // Lógica de Programação
  logic: {
    1: [
      {
        question: "O que é um algoritmo no contexto de desenvolvimento de software?",
        options: [
          "Uma peça física instalada na placa-mãe",
          "Uma sequência lógica de instruções passo a passo para resolver um problema",
          "Um tipo de vírus de computador",
          "Uma linguagem de banco de dados",
        ],
        correct: "Uma sequência lógica de instruções passo a passo para resolver um problema",
        explanation: "Algoritmo é a receita lógica com etapas bem definidas que o computador segue para processar dados e entregar um resultado.",
      },
    ],
    2: [
      {
        question: "Qual tipo de dado é mais adequado para guardar a resposta se o usuário está 'ativo' ou 'inativo'?",
        options: ["Texto longo (String)", "Número Decimal (Float)", "Booleano (True / False)", "Lista de Caracteres"],
        correct: "Booleano (True / False)",
        explanation: "O tipo Booleano (boolean) armazena exatamente dois estados: True (Verdadeiro/Ativo) ou False (Falso/Inativo), sendo o mais leve e eficiente.",
      },
    ],
    3: [
      {
        question: "Quando o bloco 'else' (senão) de uma estrutura condicional é executado?",
        options: [
          "Sempre que o programa inicia",
          "Apenas se a condição do 'if' for avaliada como Falsa (False)",
          "Apenas se a condição do 'if' for Verdadeira",
          "Ele nunca é executado automaticamente",
        ],
        correct: "Apenas se a condição do 'if' for avaliada como Falsa (False)",
        explanation: "O 'else' é a alternativa padrão de fallback: se a condição principal do 'if' não for atendida, o código cai no 'else'.",
      },
    ],
    4: [
      {
        question: "Qual é a principal função de um laço de repetição (loop) no código?",
        options: [
          "Desligar o computador quando houver erro",
          "Repetir um bloco de comandos várias vezes sem precisar reescrever o código",
          "Mudar a cor da tela",
          "Criar novos botões automaticamente",
        ],
        correct: "Repetir um bloco de comandos várias vezes sem precisar reescrever o código",
        explanation: "Loops como `while` e `for` automatizam tarefas repetitivas, economizando linhas de código e evitando duplicação.",
      },
    ],
    5: [
      {
        question: "Por que usamos funções (blocos com nome) em programação?",
        options: [
          "Para aumentar o tamanho do arquivo",
          "Para reaproveitar código, modularizar a lógica e evitar repetições",
          "Apenas para mudar o design visual",
          "Para conectar a internet mais rápido",
        ],
        correct: "Para reaproveitar código, modularizar a lógica e evitar repetições",
        explanation: "Funções agrupam instruções com um propósito específico, permitindo chamá-las de qualquer parte do sistema passando diferentes parâmetros.",
      },
    ],
  },

  // Python
  python: {
    1: [
      {
        question: "Como o Python organiza blocos de código em vez de usar chaves `{ }`?",
        options: [
          "Usando ponto e vírgula no final de cada linha",
          "Usando indentação (espaços no início da linha)",
          "Usando tags como no HTML",
          "Não possui blocos de código",
        ],
        correct: "Usando indentação (espaços no início da linha)",
        explanation: "O Python utiliza a indentação visual (normalmente 4 espaços) para definir o que pertence a um `if`, `for` ou `def`, deixando o código naturalmente limpo.",
      },
    ],
    2: [
      {
        question: "Qual estrutura em Python armazena pares de 'chave': 'valor'?",
        options: ["Lista [ ]", "Tupla ( )", "Dicionário { }", "String"],
        correct: "Dicionário { }",
        explanation: "Dicionários (`dict`) associam uma chave única a um valor, permitindo buscar dados rapidamente como em `usuario['nome']`.",
      },
    ],
    3: [
      {
        question: "O que o comando `for item in ['A', 'B', 'C']:` faz em Python?",
        options: [
          "Apaga todos os itens da lista",
          "Percorre cada elemento da lista atribuindo o valor atual à variável `item`",
          "Ordena a lista em ordem alfabética",
          "Cria um arquivo de texto no disco",
        ],
        correct: "Percorre cada elemento da lista atribuindo o valor atual à variável `item`",
        explanation: "O loop `for ... in` itera diretamente sobre os elementos de uma coleção, executando o bloco uma vez para cada item.",
      },
    ],
    4: [
      {
        question: "Qual palavra-chave é usada para criar uma nova função em Python?",
        options: ["function", "def", "func", "create"],
        correct: "def",
        explanation: "Em Python, `def` (de *define*) é a palavra reservada padrão para declarar novas funções personalizadas.",
      },
    ],
    5: [
      {
        question: "Por que o comando `with open('arquivo.txt', 'w') as f:` é a forma recomendada de manipular arquivos em Python?",
        options: [
          "Ele fecha o arquivo automaticamente ao final, mesmo se ocorrer um erro",
          "Ele envia o arquivo para a nuvem",
          "Ele duplica a velocidade do processador",
          "Ele criptografa o arquivo com senha do Windows",
        ],
        correct: "Ele fecha o arquivo automaticamente ao final, mesmo se ocorrer um erro",
        explanation: "A instrução `with` usa um Context Manager que garante que o arquivo seja fechado e a memória liberada de forma segura.",
      },
    ],
  },

  // Redes
  network: {
    1: [
      {
        question: "Qual das camadas do Modelo OSI é responsável pelo endereçamento lógico (IP) e roteamento de pacotes?",
        options: ["Camada 7 (Aplicação)", "Camada 4 (Transporte)", "Camada 3 (Rede)", "Camada 1 (Física)"],
        correct: "Camada 3 (Rede)",
        explanation: "A Camada 3 (Rede) é onde atuam os Roteadores e o protocolo IP, decidindo qual o melhor caminho para o pacote chegar ao destino.",
      },
    ],
    2: [
      {
        question: "Quantos endereços de dispositivos utilizáveis estão disponíveis em uma sub-rede IPv4 com máscara `/24`?",
        options: ["256", "254", "1024", "16"],
        correct: "254",
        explanation: "Um bloco /24 tem 256 IPs no total (2^8). O primeiro IP é reservado para a Rede e o último para Broadcast, restando 254 IPs úteis para dispositivos.",
      },
    ],
    3: [
      {
        question: "Qual a diferença principal entre um Switch (Camada 2) e um Roteador (Camada 3)?",
        options: [
          "Switch usa MAC Address na rede local; Roteador usa endereços IP para interligar redes diferentes",
          "Não há diferença, são o mesmo equipamento com nomes comerciais diferentes",
          "Switch só funciona com Wi-Fi; Roteador só com cabos",
          "Roteador não suporta internet",
        ],
        correct: "Switch usa MAC Address na rede local; Roteador usa endereços IP para interligar redes diferentes",
        explanation: "Switches operam na camada de enlace encaminhando quadros por endereço MAC. Roteadores leem cabeçalhos IP e direcionam pacotes entre redes distintas.",
      },
    ],
    4: [
      {
        question: "Qual é a função do protocolo DNS na internet?",
        options: [
          "Atribuir senhas para roteadores",
          "Traduzir nomes de domínio legíveis (ex: google.com) no respectivo endereço IP numérico",
          "Aumentar o volume do áudio em chamadas",
          "Bloquear vírus em arquivos baixados",
        ],
        correct: "Traduzir nomes de domínio legíveis (ex: google.com) no respectivo endereço IP numérico",
        explanation: "O DNS é a 'agenda telefônica' da web: os humanos digitam nomes de sites e o DNS devolve o IP que os computadores usam para se conectar.",
      },
    ],
    5: [
      {
        question: "Qual porta TCP padrão é utilizada para conexões web seguras e criptografadas (HTTPS)?",
        options: ["Porta 80", "Porta 22", "Porta 443", "Porta 21"],
        correct: "Porta 443",
        explanation: "A porta 443 é o padrão universal para HTTPS com criptografia SSL/TLS. A porta 80 é o HTTP sem criptografia.",
      },
    ],
  },

  // Web
  web: {
    1: [
      {
        question: "Qual tecnologia é responsável por definir o comportamento e a interatividade de uma página web?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        correct: "JavaScript",
        explanation: "O HTML cria os elementos e o CSS estiliza as cores e fontes. O JavaScript é a linguagem de programação que processa cliques, animações e requisições.",
      },
    ],
    2: [
      {
        question: "Qual propriedade CSS Flexbox alinha os elementos ao longo do eixo principal (horizontal por padrão)?",
        options: ["justify-content", "align-items", "flex-direction", "display-grid"],
        correct: "justify-content",
        explanation: "`justify-content` controla o espaçamento e alinhamento no eixo principal (ex: `center`, `space-between`), enquanto `align-items` atua no eixo transversal.",
      },
    ],
    3: [
      {
        question: "O que o método `addEventListener('click', ...)` faz no JavaScript?",
        options: [
          "Fecha o navegador imediatamente",
          "Registra uma função que será disparada toda vez que o elemento selecionado for clicado",
          "Exclui o botão da tela",
          "Gera um número aleatório",
        ],
        correct: "Registra uma função que será disparada toda vez que o elemento selecionado for clicado",
        explanation: "Event Listeners são ouvintes de eventos: eles reagem a ações do usuário como cliques, toques ou teclas digitadas.",
      },
    ],
    4: [
      {
        question: "Em React, para que serve o hook `useState`?",
        options: [
          "Para salvar dados na nuvem",
          "Para guardar valores de estado local e re-renderizar a tela automaticamente quando o valor mudar",
          "Para mudar o título da aba do navegador",
          "Para conectar com o banco de dados diretamente",
        ],
        correct: "Para guardar valores de estado local e re-renderizar a tela automaticamente quando o valor mudar",
        explanation: "`useState` cria uma variável de estado reativa no React. Quando você atualiza o estado com a função `set...`, o React redesenha a interface com os novos dados.",
      },
    ],
    5: [
      {
        question: "O que o comando `async / await` facilita em requisições de API?",
        options: [
          "Permite aguardar a resposta da internet de forma limpa e sequencial sem bloquear a interface",
          "Faz o download da internet ser instantâneo",
          "Desliga o roteador",
          "Converte imagens em vídeos",
        ],
        correct: "Permite aguardar a resposta da internet de forma limpa e sequencial sem bloquear a interface",
        explanation: "`async/await` é uma sintaxe moderna do JavaScript para lidar com código assíncrono (Promises), deixando o código fácil de ler como se fosse síncrono.",
      },
    ],
  },

  // Cibersegurança
  cybersecurity: {
    1: [
      {
        question: "Qual o principal objetivo de executar uma varredura com o Nmap?",
        options: [
          "Formatar computadores",
          "Descobrir hosts ativos, portas de rede abertas e versões de serviços em execução",
          "Trocar senhas do Windows",
          "Acelerar o download de jogos",
        ],
        correct: "Descobrir hosts ativos, portas de rede abertas e versões de serviços em execução",
        explanation: "O Nmap é a ferramenta de reconhecimento padrão para auditar redes e identificar serviços desatualizados ou portas expostas indevidamente.",
      },
    ],
    2: [
      {
        question: "Qual a diferença entre hashing (SHA-256) e criptografia simétrica (AES)?",
        options: [
          "Hash é unidirecional e irreversível; Criptografia pode ser decifrada com a chave correta",
          "Não há diferença",
          "Hash só funciona com texto curto",
          "Criptografia nunca usa senhas",
        ],
        correct: "Hash é unidirecional e irreversível; Criptografia pode ser decifrada com a chave correta",
        explanation: "Hashes são funções matemáticas de mão única feitas para validar integridade de senhas e arquivos. Criptografia é feita para ser decifrada pelo destinatário legítimo.",
      },
    ],
    3: [
      {
        question: "Por que a autenticação multifator (MFA) é uma das defesas mais eficazes?",
        options: [
          "Porque exige uma segunda prova de identidade que o invasor não possui (como app no celular)",
          "Porque deixa as senhas mais curtas",
          "Porque dispensa o uso de antivírus",
          "Porque bloqueia o acesso à internet",
        ],
        correct: "Porque exige uma segunda prova de identidade que o invasor não possui (como app no celular)",
        explanation: "Mesmo que a senha seja vazada por phishing ou vazamento de banco, o invasor não consegue entrar sem o código de segurança gerado no dispositivo pessoal da vítima.",
      },
    ],
    4: [
      {
        question: "Como os desenvolvedores devem se proteger contra ataques de SQL Injection?",
        options: [
          "Usando Prepared Statements e consultas parametrizadas em vez de concatenar texto puro nas queries",
          "Desligando o banco de dados à noite",
          "Usando senhas de 4 dígitos",
          "Evitando usar tabelas relacionais",
        ],
        correct: "Usando Prepared Statements e consultas parametrizadas em vez de concatenar texto puro nas queries",
        explanation: "Prepared Statements tratam os dados enviados pelo usuário estritamente como parâmetros literais, impedindo que comandos SQL maliciosos sejam interpretados pelo banco.",
      },
    ],
    5: [
      {
        question: "Ao detectar um ataque ativo em um servidor, qual a primeira ação de contenção recomendada pelo NIST?",
        options: [
          "Isolar a máquina da rede sem desligá-la para conter a propagação e preservar a memória para perícia",
          "Formatar o disco rígido imediatamente",
          "Pagar o resgate aos invasores",
          "Desligar a energia geral da empresa",
        ],
        correct: "Isolar a máquina da rede sem desligá-la para conter a propagação e preservar a memória para perícia",
        explanation: "Isolar da rede impede o invasor de se mover lateralmente. Manter a máquina ligada preserva a memória RAM, onde residem evidências forenses e chaves de criptografia voláteis.",
      },
    ],
  },

  // Full Stack
  fullstack: {
    1: [
      {
        question: "Qual método HTTP deve ser utilizado segundo as boas práticas REST para atualizar parcialmente dados de um recurso?",
        options: ["GET", "POST", "PATCH", "DELETE"],
        correct: "PATCH",
        explanation: "`PATCH` é usado para modificações parciais (ex: atualizar apenas o e-mail), enquanto `PUT` substitui o recurso inteiro.",
      },
    ],
    2: [
      {
        question: "Qual a vantagem de usar um ORM como o Prisma em projetos Node.js/TypeScript?",
        options: [
          "Permite interagir com o banco com autocomplete, tipagem estática e sem concatenar SQL puro",
          "Elimina a necessidade de ter um banco de dados instalado",
          "Faz o frontend carregar sem internet",
          "Substitui o CSS",
        ],
        correct: "Permite interagir com o banco com autocomplete, tipagem estática e sem concatenar SQL puro",
        explanation: "ORMs mapeiam tabelas em objetos tipados na linguagem, trazendo segurança de tipos e prevenindo erros de sintaxe em tempo de compilação.",
      },
    ],
    3: [
      {
        question: "Onde o token JWT deve ser enviado pelo frontend nas requisições autenticadas?",
        options: [
          "No cabeçalho HTTP `Authorization: Bearer <token>`",
          "Dentro do nome da imagem",
          "Nos comentários do código HTML",
          "Como parâmetro na URL visível",
        ],
        correct: "No cabeçalho HTTP `Authorization: Bearer <token>`",
        explanation: "O padrão RFC 6750 define o cabeçalho `Authorization: Bearer <token>` como o método seguro e padronizado para autenticação em APIs REST.",
      },
    ],
    4: [
      {
        question: "Qual o objetivo de escrever testes unitários em uma aplicação profissional?",
        options: [
          "Validar o comportamento de funções individuais e evitar que alterações futuras quebrem regras de negócio",
          "Aumentar o tempo de inicialização do servidor",
          "Deixar o código mais bonito visualmente",
          "Impedir que outros desenvolvedores editem o código",
        ],
        correct: "Validar o comportamento de funções individuais e evitar que alterações futuras quebrem regras de negócio",
        explanation: "Testes unitários automatizam a validação de regras de negócio, servindo como uma rede de proteção contra regressões de bugs.",
      },
    ],
    5: [
      {
        question: "Por que usamos containers Docker no deploy de aplicações full stack?",
        options: [
          "Para garantir que a aplicação rode com o mesmo ambiente, versões e dependências em qualquer servidor",
          "Para substituir o banco de dados",
          "Para não precisar de servidor na nuvem",
          "Para rodar o código sem compilar",
        ],
        correct: "Para garantir que a aplicação rode com o mesmo ambiente, versões e dependências em qualquer servidor",
        explanation: "Docker empacota a aplicação com seu runtime exato, eliminando incompatibilidades de sistema operacional entre o computador do dev e a nuvem.",
      },
    ],
  },

  // Cloud
  cloud: {
    1: [
      {
        question: "O que caracteriza o modelo IaaS (Infraestrutura como Serviço) em Cloud Computing?",
        options: [
          "Fornecimento de servidores virtuais, rede e armazenamento sob demanda para o cliente configurar",
          "Apenas software pronto para uso no navegador",
          "Desenvolvimento sem computadores",
          "Compra física de gabinetes de servidores",
        ],
        correct: "Fornecimento de servidores virtuais, rede e armazenamento sob demanda para o cliente configurar",
        explanation: "No IaaS (ex: AWS EC2), o provedor de nuvem entrega a máquina virtual e a rede, dando total controle para você instalar o sistema operacional e softwares.",
      },
    ],
    2: [
      {
        question: "Qual é a função do comando `docker-compose up`?",
        options: [
          "Iniciar e conectar múltiplos containers definidos no arquivo `docker-compose.yml`",
          "Deletar todas as imagens do computador",
          "Formatar a placa de rede",
          "Criar uma conta na AWS",
        ],
        correct: "Iniciar e conectar múltiplos containers definidos no arquivo `docker-compose.yml`",
        explanation: "O docker-compose orquestra ambientes multicontainer, subindo API, banco de dados e cache em uma rede compartilhada com apenas um comando.",
      },
    ],
    3: [
      {
        question: "O que é um 'Pod' na arquitetura do Kubernetes?",
        options: [
          "A menor unidade computacional gerenciável que encapsula um ou mais containers compartilhando IP e discos",
          "O data center físico da nuvem",
          "O arquivo de senha do cluster",
          "O cabo de rede da máquina",
        ],
        correct: "A menor unidade computacional gerenciável que encapsula um ou mais containers compartilhando IP e discos",
        explanation: "Pods são as unidades atômicas do Kubernetes onde os containers rodam. O Kubernetes escala, monitora e reinicia Pods conforme a necessidade de tráfego.",
      },
    ],
    4: [
      {
        question: "Qual a vantagem do conceito de Infraestrutura como Código (IaC) com Terraform?",
        options: [
          "Permite versionar, auditar e reproduzir ambientes de nuvem idênticos via código de forma automatizada",
          "Faz o tráfego da internet ser gratuito",
          "Substitui a necessidade de programadores",
          "Aumenta o consumo de energia dos servidores",
        ],
        correct: "Permite versionar, auditar e reproduzir ambientes de nuvem idênticos via código de forma automatizada",
        explanation: "Com IaC você elimina configurações manuais propensas a falhas humanas e pode recriar sua infraestrutura inteira em qualquer região da nuvem com um comando.",
      },
    ],
    5: [
      {
        question: "Qual o papel do pipeline de CI/CD (Continuous Integration / Continuous Deployment)?",
        options: [
          "Automatizar a execução de testes a cada alteração e publicar a versão estável em produção sem paradas manuais",
          "Apenas salvar arquivos no Google Drive",
          "Bloquear o acesso dos desenvolvedores ao código",
          "Criar contas de e-mail para funcionários",
        ],
        correct: "Automatizar a execução de testes a cada alteração e publicar a versão estável em produção sem paradas manuais",
        explanation: "CI/CD garante entregas frequentes, seguras e com qualidade testada, reduzindo o tempo entre a escrita do código e sua disponibilidade real para os usuários.",
      },
    ],
  },

  // IA & Dados
  ai: {
    1: [
      {
        question: "Qual biblioteca Python é amplamente utilizada para manipulação de tabelas e análise exploratória de dados?",
        options: ["Pandas", "Flask", "Pygame", "Requests"],
        correct: "Pandas",
        explanation: "O Pandas fornece estruturas de dados de alto desempenho como DataFrames, permitindo filtrar, agregar e limpar grandes volumes de dados tabulares.",
      },
    ],
    2: [
      {
        question: "Por que separamos datasets em dados de Treino (80%) e Teste (20%) em Machine Learning?",
        options: [
          "Para avaliar a capacidade de generalização do modelo em dados inéditos e evitar overfitting",
          "Para economizar espaço no disco rígido",
          "Porque o computador não aguenta ler o arquivo inteiro",
          "Apenas por convenção visual",
        ],
        correct: "Para avaliar a capacidade de generalização do modelo em dados inéditos e evitar overfitting",
        explanation: "Testar o modelo com dados que ele nunca viu durante o treinamento é a única forma de medir sua real precisão e garantir que ele não apenas 'decorou' o treino.",
      },
    ],
    3: [
      {
        question: "O que caracteriza o problema de 'Overfitting' em modelos de Inteligência Artificial?",
        options: [
          "O modelo decora os dados de treino com perfeição, mas falha ao fazer previsões em dados novos do mundo real",
          "O computador desliga por falta de memória",
          "O modelo atinge 100% de precisão em qualquer situação",
          "Os dados foram apagados por engano",
        ],
        correct: "O modelo decora os dados de treino com perfeição, mas falha ao fazer previsões em dados novos do mundo real",
        explanation: "Overfitting (sobreajuste) ocorre quando o modelo aprende o ruído dos dados de treino em vez dos padrões gerais, perdendo sua capacidade de generalização.",
      },
    ],
    4: [
      {
        question: "Qual é a função do mecanismo de 'Backpropagation' no treinamento de Redes Neurais?",
        options: [
          "Calcular o erro na saída e propagar o gradiente de volta para ajustar os pesos de cada neurônio",
          "Converter imagens coloridas em preto e branco",
          "Aumentar a velocidade da placa de vídeo",
          "Apagar os neurônios antigos",
        ],
        correct: "Calcular o erro na saída e propagar o gradiente de volta para ajustar os pesos de cada neurônio",
        explanation: "Backpropagation (retropropagação) usa cálculo diferencial para descobrir quanto cada peso contribuiu para o erro final, refinando a rede para que ela acerte mais na próxima tentativa.",
      },
    ],
    5: [
      {
        question: "Qual o papel da técnica RAG (Retrieval-Augmented Generation) ao integrar LLMs em empresas?",
        options: [
          "Recuperar informações atualizadas de bases de dados internas para fundamentar as respostas do modelo com fatos reais",
          "Treinar uma inteligência artificial do zero sem dados",
          "Traduzir código Python para Java",
          "Substituir os bancos de dados tradicionais",
        ],
        correct: "Recuperar informações atualizadas de bases de dados internas para fundamentar as respostas do modelo com fatos reais",
        explanation: "RAG combina a capacidade linguística dos LLMs com uma base de conhecimento corporativa (Vector DB), eliminando alucinações e fornecendo respostas fundamentadas em documentos confiáveis.",
      },
    ],
  },
};

export const leaderboardData: LeaderboardUser[] = [
  { name: "João Victor", xp: "2.480", streak: 28, initials: "JV", tone: ["#fde1b7", "#c6805c"] },
  { name: "Letícia Ramos", xp: "2.330", streak: 21, initials: "LR", tone: ["#c8defa", "#658cc5"] },
  { name: "Carlos Eduardo", xp: "2.110", streak: 19, initials: "CE", tone: ["#e7c1cc", "#aa677b"] },
  { name: "Ana Clara", xp: "1.970", streak: 17, initials: "AC", tone: ["#d6ccff", "#806ac3"] },
  { name: "Rafael Nunes", xp: "1.860", streak: 15, initials: "RN", tone: ["#cde7db", "#4e997a"] },
];
