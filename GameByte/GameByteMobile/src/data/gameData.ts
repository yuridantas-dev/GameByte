export interface CodeBlock {
  id: string;
  text: string;
}

export interface CodePuzzle {
  id: string;
  title: string;
  objective: string;
  blocks: CodeBlock[];
  correctOrder: string[]; // IDs in correct order
  outputPreview: string;
  explanation: string;
}

export interface BugHunterLine {
  lineNum: number;
  code: string;
  isBug?: boolean;
}

export interface BugHunter {
  id: string;
  title: string;
  objective: string;
  language: string;
  lines: BugHunterLine[];
  bugExplanation: string;
  fixPreview: string;
}

export interface StageGameData {
  puzzle: CodePuzzle;
  bugHunter: BugHunter;
}

export const stageGamesRecord: Record<string, Record<number, StageGameData>> = {
  // ==================== 1. LÓGICA DE PROGRAMAÇÃO ====================
  logic: {
    1: {
      puzzle: {
        id: "logic-1-puzzle",
        title: "Montador de Algoritmo de Saudação",
        objective: "Ordene os blocos para declarar o nome, criar a mensagem e imprimir no terminal:",
        blocks: [
          { id: "b3", text: 'console.log(mensagem);' },
          { id: "b1", text: 'let nome = "Marcos";' },
          { id: "b2", text: 'let mensagem = "Olá, " + nome + "!";' },
        ],
        correctOrder: ["b1", "b2", "b3"],
        outputPreview: "> Olá, Marcos!",
        explanation: "Primeiro declaramos a variável com o dado, depois concatenamos a string e por último exibimos com console.log().",
      },
      bugHunter: {
        id: "logic-1-bug",
        title: "Caça ao Bug: Sintaxe da Condicional",
        objective: "Toque na linha exata que contém o erro de sintaxe que impede o programa de rodar:",
        language: "javascript",
        lines: [
          { lineNum: 1, code: "let idade = 20;" },
          { lineNum: 2, code: "let temCarteira = true;" },
          { lineNum: 3, code: "if (idade >= 18 {", isBug: true },
          { lineNum: 4, code: '  console.log("Pode dirigir!");' },
          { lineNum: 5, code: "}" },
        ],
        bugExplanation: "Na Linha 3 faltou fechar o parêntese da condição do 'if'. O correto é: if (idade >= 18) {",
        fixPreview: "if (idade >= 18) {",
      },
    },
    2: {
      puzzle: {
        id: "logic-2-puzzle",
        title: "Cálculo de Desconto Condicional",
        objective: "Monte a verificação que dá desconto de R$ 20 se o valor for maior que 100:",
        blocks: [
          { id: "b2", text: "if (total >= 100) {" },
          { id: "b1", text: "let total = 120;" },
          { id: "b4", text: "console.log(total);" },
          { id: "b3", text: "  total = total - 20;" },
          { id: "b5", text: "}" },
        ],
        correctOrder: ["b1", "b2", "b3", "b5", "b4"],
        outputPreview: "> 100",
        explanation: "O total é inicializado, o if testa a condição, subtrai o desconto dentro do bloco e exibe o total final.",
      },
      bugHunter: {
        id: "logic-2-bug",
        title: "Caça ao Bug: Operador de Comparação",
        objective: "Toque na linha onde a atribuição está sendo usada no lugar de comparação:",
        language: "javascript",
        lines: [
          { lineNum: 1, code: 'let status = "online";' },
          { lineNum: 2, code: 'if (status = "offline") {', isBug: true },
          { lineNum: 3, code: '  console.log("Usuário ausente");' },
          { lineNum: 4, code: "} else {" },
          { lineNum: 5, code: '  console.log("Usuário conectado");' },
          { lineNum: 6, code: "}" },
        ],
        bugExplanation: "Na Linha 2 foi usado '=' (atribuição) em vez de '===' (comparação de igualdade). Isso sobrescreve a variável!",
        fixPreview: 'if (status === "offline") {',
      },
    },
    3: {
      puzzle: {
        id: "logic-3-puzzle",
        title: "Laço de Repetição com Contador",
        objective: "Ordene os blocos para contar de 1 até 3 com um laço while:",
        blocks: [
          { id: "b4", text: "  contador++;" },
          { id: "b1", text: "let contador = 1;" },
          { id: "b2", text: "while (contador <= 3) {" },
          { id: "b5", text: "}" },
          { id: "b3", text: '  console.log("Passo: " + contador);' },
        ],
        correctOrder: ["b1", "b2", "b3", "b4", "b5"],
        outputPreview: "> Passo: 1\n> Passo: 2\n> Passo: 3",
        explanation: "O laço while repete o bloco de código enquanto a condição for verdadeira, incrementando o contador.",
      },
      bugHunter: {
        id: "logic-3-bug",
        title: "Caça ao Bug: Loop Infinito Mortal",
        objective: "Toque na linha que trava o computador por esquecer o incremento:",
        language: "javascript",
        lines: [
          { lineNum: 1, code: "let i = 0;" },
          { lineNum: 2, code: "while (i < 5) {" },
          { lineNum: 3, code: '  console.log("Contando...");' },
          { lineNum: 4, code: "  // BUG: Nenhuma linha atualiza a variável i!", isBug: true },
          { lineNum: 5, code: "}" },
        ],
        bugExplanation: "Sem o incremento 'i++', a variável i sempre vale 0, fazendo o laço rodar para sempre e travando a memória!",
        fixPreview: "  i++;",
      },
    },
  },

  // ==================== 2. PYTHON ====================
  python: {
    1: {
      puzzle: {
        id: "python-1-puzzle",
        title: "Função de Cálculo em Python",
        objective: "Ordene os blocos para criar uma função que dobra um número e exibe o resultado:",
        blocks: [
          { id: "b3", text: "resultado = dobrar(7)" },
          { id: "b1", text: "def dobrar(numero):" },
          { id: "b4", text: 'print(f"O dobro é: {resultado}")' },
          { id: "b2", text: "    return numero * 2" },
        ],
        correctOrder: ["b1", "b2", "b3", "b4"],
        outputPreview: "> O dobro é: 14",
        explanation: "Em Python definimos a função com 'def', indentamos o retorno, chamamos a função e imprimimos com f-string.",
      },
      bugHunter: {
        id: "python-1-bug",
        title: "Caça ao Bug: Dois Pontos em Python",
        objective: "Toque na linha com erro de sintaxe clássico do Python:",
        language: "python",
        lines: [
          { lineNum: 1, code: "def verificar_aprovacao(nota)" , isBug: true },
          { lineNum: 2, code: "    if nota >= 7.0:" },
          { lineNum: 3, code: '        return "Aprovado"' },
          { lineNum: 4, code: '    return "Reprovado"' },
        ],
        bugExplanation: "Na Linha 1 faltou o caractere de dois-pontos ':' no final da definição da função def!",
        fixPreview: "def verificar_aprovacao(nota):",
      },
    },
  },

  // ==================== 3. WEB & FRONT-END ====================
  web: {
    1: {
      puzzle: {
        id: "web-1-puzzle",
        title: "Interatividade com DOM em JavaScript",
        objective: "Ordene os blocos para selecionar um botão, adicionar clique e alterar o título:",
        blocks: [
          { id: "b3", text: 'btn.addEventListener("click", () => {' },
          { id: "b1", text: 'const btn = document.querySelector("#acao");' },
          { id: "b2", text: 'const titulo = document.querySelector("h1");' },
          { id: "b5", text: "});" },
          { id: "b4", text: '  titulo.innerText = "GameByte Ativado!";' },
        ],
        correctOrder: ["b1", "b2", "b3", "b4", "b5"],
        outputPreview: "> [DOM Update]: <h1>GameByte Ativado!</h1>",
        explanation: "Capturamos as referências do DOM antes de registrar o EventListener para evitar buscas repetitivas.",
      },
      bugHunter: {
        id: "web-1-bug",
        title: "Caça ao Bug: Digitação na API do Navegador",
        objective: "Toque na linha com a chamada errada de método DOM:",
        language: "javascript",
        lines: [
          { lineNum: 1, code: 'const botao = document.getElementById("enviar");' },
          { lineNum: 2, code: 'botao.adEventListener("click", () => {', isBug: true },
          { lineNum: 3, code: '  alert("Formulário enviado!");' },
          { lineNum: 4, code: "});" },
        ],
        bugExplanation: "Na Linha 2 foi digitado 'adEventListener' com apenas um 'd'. O método correto é 'addEventListener'!",
        fixPreview: 'botao.addEventListener("click", () => {',
      },
    },
  },

  // ==================== 4. CIBERSEGURANÇA ====================
  cybersecurity: {
    1: {
      puzzle: {
        id: "cyber-1-puzzle",
        title: "Autenticação Segura com Hash bcrypt",
        objective: "Ordene os blocos para comparar a senha do usuário com o hash criptográfico:",
        blocks: [
          { id: "b2", text: "const { senha } = req.body;" },
          { id: "b1", text: 'const bcrypt = require("bcrypt");' },
          { id: "b4", text: "if (valido) { return emitirTokenJWT(); }" },
          { id: "b3", text: "const valido = await bcrypt.compare(senha, hashSalvo);" },
        ],
        correctOrder: ["b1", "b2", "b3", "b4"],
        outputPreview: "> [Auth]: Senha confere com salt hash. Token JWT emitido!",
        explanation: "A senha em texto puro nunca é salva; usamos bcrypt.compare() com await para validar o hash seguro.",
      },
      bugHunter: {
        id: "cyber-1-bug",
        title: "Caça ao Bug: Vulnerabilidade SQL Injection",
        objective: "Toque na linha crítica vulnerável a injeção SQL direta:",
        language: "javascript",
        lines: [
          { lineNum: 1, code: 'app.post("/login", async (req, res) => {' },
          { lineNum: 2, code: "  const { usuario, senha } = req.body;" },
          { lineNum: 3, code: '  const sql = "SELECT * FROM users WHERE user = \'" + usuario + "\'";', isBug: true },
          { lineNum: 4, code: "  const user = await db.query(sql);" },
          { lineNum: 5, code: "  res.json(user);" },
          { lineNum: 6, code: "});" },
        ],
        bugExplanation: "Na Linha 3, concatenar dados do usuário diretamente na query SQL permite ataques de SQL Injection! Use parâmetros ($1, $2).",
        fixPreview: '  const sql = "SELECT * FROM users WHERE user = $1";',
      },
    },
  },

  // ==================== 5. FULL STACK ====================
  fullstack: {
    1: {
      puzzle: {
        id: "fullstack-1-puzzle",
        title: "Criando Rota REST com Express",
        objective: "Ordene os blocos para inicializar o Express, configurar JSON e criar rota GET:",
        blocks: [
          { id: "b2", text: "const app = express();" },
          { id: "b5", text: "app.listen(3000);" },
          { id: "b1", text: 'import express from "express";' },
          { id: "b4", text: 'app.get("/api", (req, res) => res.json({ ok: true }));' },
          { id: "b3", text: "app.use(express.json());" },
        ],
        correctOrder: ["b1", "b2", "b3", "b4", "b5"],
        outputPreview: '> Servidor ouvindo na porta 3000! GET /api -> {"ok": true}',
        explanation: "Importamos express, instanciamos app, registramos o middleware json, criamos a rota e ligamos o listener.",
      },
      bugHunter: {
        id: "fullstack-1-bug",
        title: "Caça ao Bug: Falta de Await na Promise",
        objective: "Toque na linha onde uma função assíncrona foi chamada sem await:",
        language: "javascript",
        lines: [
          { lineNum: 1, code: 'app.get("/produtos", async (req, res) => {' },
          { lineNum: 2, code: "  try {" },
          { lineNum: 3, code: "    const lista = db.produtos.findMany();", isBug: true },
          { lineNum: 4, code: "    res.status(200).json(lista);" },
          { lineNum: 5, code: "  } catch (err) { res.status(500).send(err); }" },
          { lineNum: 6, code: "});" },
        ],
        bugExplanation: "Na Linha 3 faltou 'await db.produtos.findMany()'. Sem await, o código envia uma Promise vazia antes dos dados chegarem do banco!",
        fixPreview: "    const lista = await db.produtos.findMany();",
      },
    },
  },
};

/**
 * Fallback generator so every single track and stage in the app has an interactive game!
 */
export function getStageGameData(
  trackId: string,
  stageId: number,
  fallbackTitle: string = "Desafio Prático"
): StageGameData {
  const custom = stageGamesRecord[trackId]?.[stageId];
  if (custom) return custom;

  // Smart fallback generator for other stages
  return {
    puzzle: {
      id: `${trackId}-${stageId}-puzzle`,
      title: `Montador de Código: ${fallbackTitle}`,
      objective: "Ordene os blocos na sequência correta para executar a operação da fase:",
      blocks: [
        { id: "b2", text: `const resultado = processar(${stageId} * 10);` },
        { id: "b1", text: `const entrada = "Etapa ${stageId}";` },
        { id: "b3", text: `console.log("Sucesso:", resultado);` },
      ],
      correctOrder: ["b1", "b2", "b3"],
      outputPreview: `> Sucesso: Etapa ${stageId} executada com perfeição!`,
      explanation: "A sequência respeita o fluxo de entrada -> processamento -> saída de dados.",
    },
    bugHunter: {
      id: `${trackId}-${stageId}-bug`,
      title: `Caça ao Bug: ${fallbackTitle}`,
      objective: "Identifique a linha que contém uma falha de sintaxe ou lógica:",
      language: "javascript",
      lines: [
        { lineNum: 1, code: `// Inicializando módulo de ${fallbackTitle}` },
        { lineNum: 2, code: `const config = { modo: "producao" };` },
        { lineNum: 3, code: `if (config.modo == "producao" {`, isBug: true },
        { lineNum: 4, code: `  iniciarServico(config);` },
        { lineNum: 5, code: `}` },
      ],
      bugExplanation: "Na Linha 3 faltou fechar o parêntese ')' na condição do if antes de abrir as chaves '{'!",
      fixPreview: `if (config.modo === "producao") {`,
    },
  };
}
