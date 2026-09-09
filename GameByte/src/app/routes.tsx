import { useState, useEffect, type ReactNode } from "react";
import { createBrowserRouter, Link, NavLink, useLocation, useNavigate } from "react-router";
import {
  ArrowLeft,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleHelp,
  Code2,
  Compass,
  Crown,
  Flame,
  Gamepad2,
  Globe2,
  GraduationCap,
  Home,
  LayoutGrid,
  LockKeyhole,
  Medal,
  Network,
  Play,
  Rocket,
  Search,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  UsersRound,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import mascot from "@/imports/WhatsApp_Image_2026-08-21_at_12.07.41.jpeg";
import mascotTransparent from "@/imports/mascote_transparent.png";
import appIcon from "@/imports/WhatsApp_Image_2026-08-21_at_12.09.51__1_.jpeg";

const primaryNav = [
  { to: "/", label: "Início", icon: Home, end: true },
  { to: "/trilhas", label: "Trilhas", icon: LayoutGrid },
  { to: "/ranking", label: "Ranking", icon: Trophy },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={`overflow-hidden rounded-[15px] ${compact ? "size-9" : "size-10"} bg-[#6b4ee8] shadow-[0_8px_18px_rgba(94,67,221,.28)]`}>
        <img src={appIcon} alt="Bora" className="size-full object-cover" />
      </div>
      {!compact && <span className="font-display text-[24px] font-bold tracking-[-.06em] text-white"><span className="font-normal">Byte</span></span>}
    </div>
  );
}

function XP() {
  const [xp, setXp] = useState(() => {
    const stored = localStorage.getItem("gamebyte_total_xp");
    if (!stored) {
      localStorage.setItem("gamebyte_total_xp", "1240");
      return 1240;
    }
    return parseInt(stored);
  });

  useEffect(() => {
    const handleXpUpdate = () => {
      setXp(parseInt(localStorage.getItem("gamebyte_total_xp") || "1240"));
    };
    window.addEventListener("gamebyte_xp_updated", handleXpUpdate);
    return () => window.removeEventListener("gamebyte_xp_updated", handleXpUpdate);
  }, []);

  const formattedValue = xp.toLocaleString("pt-BR") + " XP";
  return <div className="inline-flex items-center gap-1.5 rounded-full border border-[#8d75f3]/30 bg-[#5d42ca]/30 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[.08em] text-[#e9e4ff]"><Zap size={13} className="fill-[#f8c662] text-[#f8c662]" />{formattedValue}</div>;
}

function Avatar({ className = "" }: { className?: string }) {
  return <div className={`flex items-center justify-center rounded-full bg-gradient-to-br from-[#fdc8a9] to-[#d98874] font-display font-bold text-[#5a2e44] ${className}`}>M</div>;
}

function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [notice, setNotice] = useState(false);
  return (
    <div className="min-h-screen bg-[#160d2e] font-body text-[#f8f6ff] selection:bg-[#9a7cff] selection:text-white">
      <div className="pointer-events-none fixed left-[14%] top-[-180px] size-[460px] rounded-full bg-[#4d2daa] opacity-30 blur-[105px]" />
      <div className="pointer-events-none fixed bottom-[-240px] right-[-120px] size-[520px] rounded-full bg-[#7034b4] opacity-20 blur-[120px]" />
      <div className="relative mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="hidden w-[238px] shrink-0 flex-col border-r border-white/[.07] bg-[#120a29]/65 px-5 py-7 lg:flex">
          <Logo />
          <nav className="mt-12 space-y-2">
            {primaryNav.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-3 py-3 text-[13px] font-bold transition ${isActive ? "bg-[#6546dc] text-white shadow-[0_10px_22px_rgba(77,48,190,.3)]" : "text-[#a89dc6] hover:bg-white/[.05] hover:text-white"}`}><Icon size={18} />{label}</NavLink>)}
          </nav>
          <div className="mt-auto overflow-hidden rounded-[24px] border border-white/[.08] bg-gradient-to-br from-[#312059] to-[#211143] p-4">
            <img src={mascot} alt="Mascote Bora" className="-mb-6 ml-auto h-24 w-24 rounded-[22px] object-cover object-[center_40%] mix-blend-screen opacity-90" />
            <p className="relative z-10 font-display text-[16px] font-bold leading-tight">Bora para o<br />próximo nível?</p>
            <p className="mt-2 text-[11px] leading-4 text-[#b9add7]">Conclua uma missão hoje.</p>
          </div>
        </aside>
        <div className="min-w-0 flex-1 pb-20 lg:pb-0">
          <header className="flex h-[76px] items-center justify-between border-b border-white/[.07] bg-[#160d2e]/75 px-5 backdrop-blur-xl md:px-8">
            <div className="lg:hidden"><Logo /></div>
            <div className="hidden lg:flex items-center gap-3 text-[12px] text-[#a399bf]"><span>Bootcamp ADS</span><ChevronRight size={14} /><span className="text-[#edeaff]">{location.pathname === "/ranking" ? "Ranking" : location.pathname === "/trilhas" ? "Trilhas" : "Início"}</span></div>
            <div className="flex items-center gap-3"><XP /><button onClick={() => setNotice(!notice)} aria-label="Notificações" className="relative flex size-10 items-center justify-center rounded-full border border-white/[.08] bg-white/[.045] text-[#c9c1df] hover:bg-white/[.09]"><Bell size={18} />{notice && <span className="absolute right-2 top-2 size-2 rounded-full bg-[#ffbf66] ring-2 ring-[#20123f]" />}</button><Link to="/perfil" aria-label="Abrir perfil"><Avatar className="size-9 text-[13px]" /></Link></div>
          </header>
          {children}
        </div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-white/[.08] bg-[#180d33]/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden">
        {primaryNav.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex min-w-16 flex-col items-center gap-1 text-[10px] font-bold ${isActive ? "text-[#b9a7ff]" : "text-[#9184aa]"}`}>{({ isActive }) => <><span className={`flex size-9 items-center justify-center rounded-xl ${isActive ? "bg-[#5e40d3] text-white" : ""}`}><Icon size={18} /></span>{label}</>}</NavLink>)}
      </nav>
    </div>
  );
}

function Stat({ icon: Icon, label, value, accent }: { icon: typeof Flame; label: string; value: string; accent: string }) {
  return <div className="rounded-[22px] border border-white/[.07] bg-white/[.045] p-4"><div className={`flex size-9 items-center justify-center rounded-xl ${accent}`}><Icon size={18} /></div><p className="mt-5 text-[11px] font-bold uppercase tracking-[.12em] text-[#a69bbf]">{label}</p><p className="mt-1 font-display text-[23px] font-bold tracking-[-.05em] text-white">{value}</p></div>;
}

function HomePage() {
  const navigate = useNavigate();
  const [totalXp, setTotalXp] = useState(() => {
    return parseInt(localStorage.getItem("gamebyte_total_xp") || "1240");
  });

  useEffect(() => {
    const handleXpUpdate = () => {
      setTotalXp(parseInt(localStorage.getItem("gamebyte_total_xp") || "1240"));
    };
    window.addEventListener("gamebyte_xp_updated", handleXpUpdate);
    return () => window.removeEventListener("gamebyte_xp_updated", handleXpUpdate);
  }, []);

  return (
    <AppShell>
      <main className="mx-auto max-w-[1160px] px-5 py-7 md:px-8 md:py-10">
        <section className="relative min-h-[150px] overflow-hidden rounded-[29px] border border-[#856ce9]/25 bg-gradient-to-br from-[#5e3ed2] via-[#3d277f] to-[#2c165d] shadow-[0_18px_50px_rgba(0,0,0,.22)] sm:min-h-[168px] px-[30px] py-[20px]">
          <div className="pointer-events-none absolute -right-9 -top-16 size-48 rounded-full border-[24px] border-[#9d87f3]/25" />
          
          <img 
            src={mascotTransparent} 
            alt="Mascote Bora celebrando sua evolução" 
            className="pointer-events-none absolute -bottom-[35px] -right-[35px] h-[200px] w-[200px] sm:-bottom-[45px] sm:-right-[40px] sm:h-[300px] sm:w-[300px] object-contain opacity-95" 
          />
          
          <div className="relative z-10 max-w-[200px] sm:max-w-[540px]">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#d5caff]">Quinta · 21 de agosto</p>
            <h1 className="mt-3 font-display text-[clamp(1.55rem,4vw,3rem)] font-bold leading-[.96] tracking-[-.06em] text-white">Bom te ver de volta,<br />Marina <span className="text-[#f6c768]">✦</span></h1>
          </div>
        </section>
        
        <div className="mt-5 grid grid-cols-3 gap-3">
          <Stat icon={Flame} label="Sequência" value="12 dias" accent="bg-[#55304c] text-[#ff9b73]" />
          <Stat icon={Zap} label="XP total" value={totalXp.toLocaleString("pt-BR")} accent="bg-[#55472a] text-[#f6c768]" />
          <Stat icon={Trophy} label="Sua posição" value="#18" accent="bg-[#443475] text-[#ae9aff]" />
        </div>
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-[24px] font-bold tracking-[-.045em] text-white">Sua jornada de aprendizado</p>
            <p className="mt-1 text-[13px] text-[#9e94b5]">Escolha um desafio e suba de nível</p>
          </div>
        </div>
        
        <div className="mt-4 grid gap-4 md:grid-cols-[1.18fr_.82fr]">
          {/* Iniciar Trilha Card */}
          <article className="relative overflow-hidden rounded-[28px] border border-white/[.08] bg-gradient-to-br from-[#4d2daa]/60 via-[#2a1367]/80 to-[#120531] p-6 flex flex-col justify-between min-h-[220px]">
            {/* Background glowing circle */}
            <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-[#6a49dd]/20 blur-3xl" />
            
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ffbf66]/15 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[.1em] text-[#ffc67a]">
                💡 Próximo Desafio
              </span>
              <h3 className="mt-4 font-display text-[26px] font-bold leading-tight tracking-[-.04em] text-white">
                Pronto para evoluir suas habilidades?
              </h3>
              <p className="mt-2.5 max-w-[440px] text-[13px] leading-relaxed text-[#aaa0c0]">
                Acesse suas trilhas, conclua as fases do mapa de aprendizado e dispute as primeiras posições do ranking de ADS com a sua turma.
              </p>
            </div>
            
            <div className="mt-6 relative z-10">
              <button 
                onClick={() => navigate("/trilhas")} 
                className="group inline-flex items-center gap-2 rounded-2xl bg-[#ffbf66] hover:bg-[#ffc97a] active:scale-[0.98] transition px-5 py-3 text-[13px] font-bold text-[#200e54] shadow-lg shadow-[#ffbf66]/10"
              >
                <Play size={14} fill="currentColor" className="transition-transform group-hover:scale-110" /> Iniciar Trilha
              </button>
            </div>
          </article>
          
          {/* Achievements (Conquistas) Card */}
          <article className="rounded-[28px] border border-white/[.08] bg-[#211440] p-6 flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-[#f2bb5e] text-[#472c11]">
                <Award size={20} />
              </div>
              <div>
                <p className="font-display text-[17px] font-bold tracking-[-.035em]">Quase lá!</p>
                <p className="text-[11px] text-[#a79abb]">Próxima conquista</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="max-w-36 font-display text-[22px] font-bold leading-[1.03] tracking-[-.05em]">Exploradora de dados</p>
              <span className="font-mono text-[10px] text-[#f5c463] block mt-1">3/5 conquistas</span>
            </div>
            
            <div className="mt-4">
              <div className="h-2 overflow-hidden rounded-full bg-white/[.09]">
                <div className="h-full w-3/5 rounded-full bg-[#f3bd5d]" />
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="mt-10"><div className="flex items-end justify-between"><div><p className="font-display text-[24px] font-bold tracking-[-.045em] text-white">Suas trilhas</p><p className="mt-1 text-[13px] text-[#9e94b5]">Escolha uma habilidade para evoluir.</p></div><Link to="/trilhas" className="hidden text-[12px] font-bold text-[#ab98ff] sm:block">Explorar todas</Link></div><TrackRail /></section></main></AppShell>
  );
}

const getTrackProgress = (trackId: string) => {
  const unlocked = parseInt(localStorage.getItem(`gamebyte_unlocked_stage_${trackId}`) || '1');
  // 5 total stages.
  // if unlocked is 1, completed = 0 -> 0%
  // if unlocked is 2, completed = 1 -> 20%
  // if unlocked is 5, completed = 4 -> 80%
  // if unlocked is 6 (completed all), completed = 5 -> 100%
  const completed = unlocked - 1;
  return Math.min(Math.round((completed / 5) * 100), 100);
};

const trackStages: Record<string, {
  id: number;
  title: string;
  type: 'lesson' | 'quiz' | 'challenge' | 'boss';
  xp: number;
  description: string;
}[]> = {
  ads: [
    { id: 1, title: "Fundamentos Web", type: 'lesson', xp: 50, description: "Entenda o protocolo HTTP, servidores, clientes e a arquitetura básica da internet." },
    { id: 2, title: "Métricas de Performance", type: 'lesson', xp: 80, description: "Aprenda a analisar CTR, CPC, CPM e como otimizar conversões." },
    { id: 3, title: "Desafio do Dashboard", type: 'challenge', xp: 120, description: "Construa um painel de métricas e identifique os gargalos de conversão." },
    { id: 4, title: "Prática: Teste A/B", type: 'quiz', xp: 90, description: "Responda às questões sobre validação estatística e tomada de decisão orientada a dados." },
    { id: 5, title: "Batalha Final: Arquiteto de Sistemas", type: 'boss', xp: 200, description: "O chefão final: estruture uma aplicação escalável do zero e resista à carga de acessos!" },
  ],
  logic: [
    { id: 1, title: "Variáveis e Tipos de Dados", type: 'lesson', xp: 40, description: "Descubra como armazenar informações na memória e os tipos básicos de dados." },
    { id: 2, title: "Estruturas Condicionais", type: 'lesson', xp: 60, description: "Aprenda a fazer o código tomar decisões com blocos IF/ELSE." },
    { id: 3, title: "Laços de Repetição", type: 'challenge', xp: 100, description: "Automatize tarefas repetitivas usando loops FOR e WHILE." },
    { id: 4, title: "Quiz: Funções e Escopo", type: 'quiz', xp: 80, description: "Responda a perguntas para testar sua compreensão sobre modularização de código." },
    { id: 5, title: "Desafio Final: Bug Hunter", type: 'boss', xp: 180, description: "Encontre e corrija os 5 bugs críticos que estão travando a produção do sistema!" },
  ],
  network: [
    { id: 1, title: "Modelo OSI e TCP/IP", type: 'lesson', xp: 50, description: "Entenda como os dados são empacotados e transmitidos pelas 7 camadas de rede." },
    { id: 2, title: "Endereçamento IP e Máscaras", type: 'lesson', xp: 70, description: "Aprenda a fazer sub-redes e como o roteamento IP direciona pacotes." },
    { id: 3, title: "Roteadores e Switches", type: 'challenge', xp: 110, description: "Configure portas, switches gerenciáveis e regras de VLAN." },
    { id: 4, title: "Segurança de Redes", type: 'quiz', xp: 90, description: "Responda questões sobre firewalls, criptografia WPA3 e ataques de rede." },
    { id: 5, title: "Boss: Rede Corporativa Segura", type: 'boss', xp: 220, description: "Monte o diagrama e a configuração de uma rede de escritório imune a invasões!" },
  ]
};

const quizQuestions: Record<string, Record<number, {
  question: string;
  options: string[];
  correct: string;
}>> = {
  ads: {
    1: {
      question: "Qual protocolo é usado para transferir páginas web criptografadas de forma segura?",
      options: ["FTP", "HTTP", "HTTPS", "SMTP"],
      correct: "HTTPS"
    },
    2: {
      question: "O que significa CTR no marketing digital e otimização de campanhas?",
      options: ["Click Through Rate", "Cost Per Return", "Conversion Target Ratio", "Click Transfer Route"],
      correct: "Click Through Rate"
    },
    3: {
      question: "Qual hook do React é utilizado para executar efeitos colaterais como chamadas de API?",
      options: ["useState", "useMemo", "useEffect", "useCallback"],
      correct: "useEffect"
    },
    4: {
      question: "Qual a principal vantagem de um teste A/B em sistemas de software?",
      options: ["Aumentar o tráfego do site artificialmente", "Validar hipóteses com dados reais de comportamento do usuário", "Melhorar o ranking de SEO", "Reduzir custos de infraestrutura"],
      correct: "Validar hipóteses com dados reais de comportamento do usuário"
    },
    5: {
      question: "Qual padrão arquitetural separa a aplicação em Modelo, Visão e Controle?",
      options: ["Singleton", "MVC", "Microservices", "Observer"],
      correct: "MVC"
    }
  },
  logic: {
    1: {
      question: "Qual a saída do código JavaScript: let a = 5; let b = '5'; console.log(a == b)?",
      options: ["true", "false", "undefined", "Erro de Sintaxe"],
      correct: "true"
    },
    2: {
      question: "Como fazer um desvio condicional de multipla escolha em Javascript de forma elegante?",
      options: ["switch / case", "for / while", "try / catch", "import / export"],
      correct: "switch / case"
    },
    3: {
      question: "Qual loop é executado pelo menos uma vez, mesmo se a condição for falsa inicialmente?",
      options: ["for loop", "while loop", "do...while loop", "foreach loop"],
      correct: "do...while loop"
    },
    4: {
      question: "O que caracteriza uma função como sendo recursiva?",
      options: ["Uma função que chama a si mesma", "Uma função sem parâmetros", "Uma função assíncrona", "Uma função dentro de um objeto"],
      correct: "Uma função que chama a si mesma"
    },
    5: {
      question: "Qual estrutura de dados funciona no formato LIFO (Last In, First Out)?",
      options: ["Fila (Queue)", "Pilha (Stack)", "Árvore (Tree)", "Grafo (Graph)"],
      correct: "Pilha (Stack)"
    }
  },
  network: {
    1: {
      question: "Em qual camada do modelo OSI atua o protocolo IP de endereçamento?",
      options: ["Camada de Enlace", "Camada de Transporte", "Camada de Rede", "Camada Física"],
      correct: "Camada de Rede"
    },
    2: {
      question: "Qual a finalidade principal do serviço DNS na internet?",
      options: ["Atribuir endereços IP dinâmicos para máquinas", "Traduzir nomes de domínio legíveis (ex: google.com) em endereços IP", "Criptografar o tráfego da web", "Bloquear acessos não autorizados de portas"],
      correct: "Traduzir nomes de domínio legíveis (ex: google.com) em endereços IP"
    },
    3: {
      question: "Qual dispositivo de rede é usado para segmentar domínios de colisão e encaminhar pacotes baseado em endereços MAC?",
      options: ["Hub", "Switch", "Roteador", "Repetidor"],
      correct: "Switch"
    },
    4: {
      question: "O que é um ataque DDoS no contexto de segurança de redes?",
      options: ["Invasão de banco de dados por SQL Injection", "Ataque distribuído para sobrecarregar um servidor e torná-lo indisponível", "Criptografia maliciosa de arquivos para resgate", "Interceptação de pacotes de dados em rede Wi-Fi"],
      correct: "Ataque distribuído para sobrecarregar um servidor e torná-lo indisponível"
    },
    5: {
      question: "Qual porta padrão do protocolo TCP é usada pelo serviço SSH seguro de terminal?",
      options: ["Porta 80", "Porta 21", "Porta 443", "Porta 22"],
      correct: "Porta 22"
    }
  }
};

const tracks = [
  { id: "ads", name: "Análise e Desenvolvimento de Sistemas", short: "ADS", lessons: "5 fases", get progress() { return getTrackProgress('ads'); }, icon: Code2, gradient: "from-[#744ce2] to-[#3e2a83]", soft: "bg-[#442e8a]", xp: "80 XP" },
  { id: "logic", name: "Lógica de programação", short: "Lógica", lessons: "5 fases", get progress() { return getTrackProgress('logic'); }, icon: BrainCircuit, gradient: "from-[#287a8e] to-[#1d405e]", soft: "bg-[#1a596d]", xp: "60 XP" },
  { id: "network", name: "Fundamentos de redes", short: "Redes", lessons: "5 fases", get progress() { return getTrackProgress('network'); }, icon: Wifi, gradient: "from-[#aa4d89] to-[#5c235d]", soft: "bg-[#742b68]", xp: "70 XP" },
];

function TrackRail() { return <div className="mt-4 grid gap-3 md:grid-cols-3">{tracks.map((track) => { const Icon = track.icon; return <Link key={track.id} to={`/trilhas#${track.id}`} className={`group overflow-hidden rounded-[25px] bg-gradient-to-br ${track.gradient} p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_30px_rgba(0,0,0,.2)]`}><div className="flex items-start justify-between"><span className="flex size-11 items-center justify-center rounded-2xl bg-white/[.14]"><Icon size={22} /></span><span className="rounded-full bg-black/[.16] px-2.5 py-1 font-mono text-[9px] font-medium">{track.xp}</span></div><p className="mt-8 font-display text-[20px] font-bold leading-[1.05] tracking-[-.045em]">{track.short}</p><p className="mt-1 text-[11px] text-white/70">{track.lessons}</p><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/[.18]"><div className="h-full rounded-full bg-white" style={{ width: `${track.progress}%` }} /></div></Link>})}</div>; }

function TracksPage() {
  const [filter, setFilter] = useState("Todas");
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState<{ id: number; title: string; type: string; xp: number; description: string } | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizSuccess, setQuizSuccess] = useState(false);
  const [quizFailed, setQuizFailed] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [shakeStageId, setShakeStageId] = useState<number | null>(null);
  const [shakeQuiz, setShakeQuiz] = useState(false);

  const filters = ["Todas", "Em andamento", "Não iniciadas"];
  const selectedTrack = tracks.find(t => t.id === selectedTrackId);

  // Automatically select track based on page hash (e.g. #ads) from Home Page links
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const trackId = hash.replace("#", "");
      if (trackStages[trackId]) {
        setSelectedTrackId(trackId);
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, []);

  // Dynamic unlocked stage for the selected track
  const getUnlockedStage = (trackId: string) => {
    return parseInt(localStorage.getItem(`gamebyte_unlocked_stage_${trackId}`) || '1');
  };

  const handleStageClick = (stage: typeof trackStages[string][number]) => {
    const unlockedStage = getUnlockedStage(selectedTrackId!);
    if (stage.id > unlockedStage) {
      // Locked: Trigger shake animation
      setShakeStageId(stage.id);
      setTimeout(() => setShakeStageId(null), 400);
      return;
    }
    // Unlocked or Completed: Open stage details modal
    setActiveStage(stage);
    setQuizMode(false);
    setCurrentQuestionIndex(0);
    setCorrectCount(0);
    setAnswerSubmitted(false);
    setQuizFinished(false);
    setSelectedOption(null);
    setQuizSuccess(false);
    setQuizFailed(false);
    setConfettiActive(false);
  };

  const handleStartChallenge = () => {
    setQuizMode(true);
    setCurrentQuestionIndex(0);
    setCorrectCount(0);
    setAnswerSubmitted(false);
    setQuizFinished(false);
    setSelectedOption(null);
    setQuizSuccess(false);
    setQuizFailed(false);
    setConfettiActive(false);
  };

  const handleAnswerSubmit = () => {
    if (!selectedOption || !selectedTrackId || !activeStage) return;
    const questionList = quizQuestions[selectedTrackId][activeStage.id];
    const currentQuestion = questionList[currentQuestionIndex];
    
    setAnswerSubmitted(true);
    
    if (selectedOption === currentQuestion.correct) {
      setCorrectCount(prev => prev + 1);
      setQuizSuccess(true);
      setQuizFailed(false);
    } else {
      setQuizFailed(true);
      setQuizSuccess(false);
      setShakeQuiz(true);
      setTimeout(() => setShakeQuiz(false), 400);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedTrackId || !activeStage) return;
    const questionList = quizQuestions[selectedTrackId][activeStage.id];
    
    if (currentQuestionIndex + 1 < questionList.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setAnswerSubmitted(false);
      setQuizSuccess(false);
      setQuizFailed(false);
    } else {
      setQuizFinished(true);
      
      // Since states are set asynchronously, the final correct score is already updated by the click of Enviar Resposta button.
      // We check if the score meets the requirements (+7 acertos) to unlock the next level and reward XP
      if (correctCount >= 7) {
        setConfettiActive(true);
        // Unlock next stage
        const currentUnlocked = getUnlockedStage(selectedTrackId);
        if (activeStage.id === currentUnlocked) {
          localStorage.setItem(`gamebyte_unlocked_stage_${selectedTrackId}`, (currentUnlocked + 1).toString());
        }
        // Reward XP
        const currentXp = parseInt(localStorage.getItem("gamebyte_total_xp") || "1240");
        localStorage.setItem("gamebyte_total_xp", (currentXp + activeStage.xp).toString());
        window.dispatchEvent(new Event("gamebyte_xp_updated"));
      } else {
        setConfettiActive(false);
      }
    }
  };

  const handleCloseModal = () => {
    setActiveStage(null);
    setConfettiActive(false);
  };

  const getStageStyle = (stageId: number, unlockedStage: number) => {
    if (stageId < unlockedStage) return 'completed';
    if (stageId === unlockedStage) return 'unlocked';
    return 'locked';
  };

  return (
    <AppShell>
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(500px) rotate(720deg); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px 8px rgba(139, 92, 246, 0.6); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .animate-confetti-fall {
          animation: confettiFall linear forwards;
        }
        .animate-pulse-glow {
          animation: pulseGlow 1.8s infinite ease-in-out;
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>

      <main className="mx-auto max-w-[1160px] px-5 py-8 md:px-8 md:py-10">
        {!selectedTrackId ? (
          // General list of tracks
          <>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="relative pr-20 sm:pr-0">
                <img 
                  src={mascotTransparent} 
                  alt="Mascote Bora guiando as trilhas" 
                  className="absolute -right-4 -top-6 size-24 rounded-[21px] object-contain opacity-95 sm:hidden" 
                />
                <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#a996ff]">Seu mapa de aprendizagem</p>
                <h1 className="mt-3 font-display text-[clamp(2.3rem,4vw,3.5rem)] font-bold leading-[.98] tracking-[-.065em]">Trilhas para<br />desbloquear seu potencial.</h1>
              </div>
              <div className="flex gap-2 overflow-auto pb-1">
                {filters.map((item) => (
                  <button 
                    key={item} 
                    onClick={() => setFilter(item)} 
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-bold ${filter === item ? "bg-[#6b4be0] text-white" : "border border-white/[.08] bg-white/[.04] text-[#aaa0bf]"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {tracks
                .filter((track) => filter === "Todas" || (filter === "Em andamento" ? track.progress > 0 : track.progress === 0))
                .map((track, index) => (
                  <TrackDetail 
                    key={track.id} 
                    track={track} 
                    unlocked={index !== 2} 
                    onSelect={() => setSelectedTrackId(track.id)} 
                  />
                ))}
            </div>
          </>
        ) : (
          // Interactive Winding Game Path View
          selectedTrack && (
            <div className="relative">
              {/* Winding Map Breadcrumb Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[.08] pb-6">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedTrackId(null)} 
                    className="flex size-10 items-center justify-center rounded-2xl border border-white/[.08] bg-white/[.045] hover:bg-white/[.09] text-white transition active:scale-95 animate-pulse-glow"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[.18em] text-[#a996ff]">Mapa da Trilha</p>
                    <h1 className="font-display text-[22px] sm:text-[28px] font-bold tracking-tight text-white leading-none mt-1">{selectedTrack.name}</h1>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/[.03] border border-white/[.06] rounded-2xl px-4 py-2.5 max-w-sm">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#aaa0bf] mb-1.5">
                      <span>Progresso</span>
                      <span>{selectedTrack.progress}%</span>
                    </div>
                    <div className="h-2 w-32 sm:w-40 overflow-hidden rounded-full bg-white/[.08]">
                      <div className="h-full rounded-full bg-[#8b5cf6]" style={{ width: `${selectedTrack.progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Game Map Board */}
              <div className="mt-10 relative flex flex-col items-center min-h-[600px] w-full max-w-xl mx-auto py-10">
                {/* Winding Trail Line connector */}
                <div className="absolute top-10 bottom-10 left-1/2 w-0.5 border-l-2 border-dashed border-[#7352df]/30 -translate-x-1/2 z-0" />
                
                {trackStages[selectedTrackId].map((stage, idx) => {
                  const unlockedStage = getUnlockedStage(selectedTrackId);
                  const status = getStageStyle(stage.id, unlockedStage);
                  const isShake = shakeStageId === stage.id;
                  
                  // Horizontal alignment for winding trail path
                  let alignClass = "translate-x-0";
                  if (idx % 4 === 1) alignClass = "-translate-x-10 sm:-translate-x-16";
                  else if (idx % 4 === 3) alignClass = "translate-x-10 sm:translate-x-16";

                  return (
                    <div 
                      key={stage.id} 
                      className={`relative my-8 flex flex-col items-center ${alignClass} transition-transform duration-300 z-10`}
                    >
                      {/* Node Button */}
                      <button
                        onClick={() => handleStageClick(stage)}
                        className={`
                          size-16 sm:size-20 rounded-full flex items-center justify-center relative transition duration-300 active:scale-95 shadow-lg
                          ${status === 'completed' ? 'bg-gradient-to-br from-[#4ade80] to-[#22c55e] text-white shadow-[#4ade80]/20 hover:scale-105' : ''}
                          ${status === 'unlocked' ? 'bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] text-white ring-4 ring-[#a78bfa]/40 animate-pulse-glow hover:scale-105' : ''}
                          ${status === 'locked' ? 'bg-[#241a42] border border-white/[.08] text-[#6d5e94] cursor-default' : ''}
                          ${isShake ? 'animate-shake' : ''}
                        `}
                      >
                        {status === 'completed' && <Check size={24} className="stroke-[3]" />}
                        {status === 'unlocked' && (
                          stage.type === 'boss' ? <Crown size={24} className="animate-bounce" /> : <Gamepad2 size={24} />
                        )}
                        {status === 'locked' && <LockKeyhole size={20} />}
                        
                        {/* Node Level Number Badge */}
                        <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-[#1b0d3e] border border-white/[.08] font-mono text-[9px] font-bold text-[#bbaaff]">
                          {stage.id}
                        </span>
                      </button>

                      {/* Stage Label */}
                      <div className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+16px)] w-40 text-left pointer-events-none hidden sm:block">
                        <p className="font-display text-[13px] font-bold text-white leading-tight">{stage.title}</p>
                        <p className="text-[10px] text-[#9387a7] mt-0.5 uppercase tracking-wider">{stage.type}</p>
                      </div>

                      {/* Stage Mobile Tooltip */}
                      <div className="mt-2.5 sm:hidden text-center max-w-[120px] pointer-events-none">
                        <p className="font-display text-[11px] font-bold text-white leading-tight truncate">{stage.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}
      </main>

      {/* Stage Detail & Quiz Modal */}
      {activeStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition duration-300">
          <style>{`
            .confetti-piece {
              position: absolute;
              animation: confettiFall linear forwards;
            }
          `}</style>
          
          {/* Confetti cascade */}
          {confettiActive && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
              {Array.from({ length: 45 }).map((_, i) => {
                const colors = ['#ffd700', '#ff4500', '#00ff00', '#00ffff', '#ff00ff', '#ff8c00'];
                const color = colors[i % colors.length];
                const left = Math.random() * 100;
                const delay = Math.random() * 1.5;
                const duration = 1.2 + Math.random() * 1.5;
                const size = 5 + Math.random() * 8;
                return (
                  <div
                    key={i}
                    className="confetti-piece"
                    style={{
                      left: `${left}%`,
                      top: `-20px`,
                      backgroundColor: color,
                      width: `${size}px`,
                      height: `${size}px`,
                      borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                      animationDelay: `${delay}s`,
                      animationDuration: `${duration}s`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                  />
                );
              })}
            </div>
          )}

          <div 
            className={`
              relative w-full max-w-md overflow-hidden rounded-[30px] border border-white/[.08] bg-[#1e133e] p-6 shadow-2xl transition duration-250
              ${shakeQuiz ? 'animate-shake' : ''}
            `}
          >
            {/* Modal Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-white/[.05] hover:bg-white/[.1] text-[#aaa0c2]"
            >
              <X size={16} />
            </button>

            {!quizMode ? (
              // Stage Information Mode (Initial screen)
              <div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-xl px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider bg-[#8b5cf6]/20 text-[#a78bfa]`}>
                    Fase {activeStage.id} · {activeStage.type}
                  </span>
                  <span className="rounded-xl px-2 py-0.5 font-mono text-[9px] font-bold bg-[#ffd700]/10 text-[#f5c463]">+ {activeStage.xp} XP</span>
                </div>
                
                <h3 className="mt-4 font-display text-[22px] font-bold tracking-tight text-white">{activeStage.title}</h3>
                
                <p className="mt-3 text-[13px] leading-relaxed text-[#aaa0c0]">{activeStage.description}</p>

                <div className="mt-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4">
                  <p className="text-[11px] font-bold text-[#b9aaff] uppercase tracking-wider">Requisitos do Desafio</p>
                  <p className="text-[12px] text-[#9387a7] mt-1 font-medium">Você responderá a 10 perguntas de conhecimento técnico sobre a matéria. Precisa de no mínimo 7 acertos para concluir a fase.</p>
                </div>
                
                <div className="mt-8 flex items-center justify-end gap-3 border-t border-white/[.06] pt-4">
                  <button 
                    onClick={handleCloseModal}
                    className="rounded-2xl border border-white/[.08] hover:bg-white/[.03] px-4 py-2.5 text-[12px] font-bold text-[#c9c1df]"
                  >
                    Fechar
                  </button>
                  <button 
                    onClick={handleStartChallenge}
                    className="inline-flex items-center gap-1.5 rounded-2xl bg-[#7352df] hover:bg-[#8363e9] px-5 py-2.5 text-[12px] font-bold text-white transition active:scale-95 animate-pulse-glow"
                  >
                    <Play size={12} fill="currentColor" /> Iniciar Desafio
                  </button>
                </div>
              </div>
            ) : (
              // Challenge Mode (The 10-Question Flow)
              <div>
                {quizFinished ? (
                  // Final Results Screen
                  <div className="text-center py-6">
                    {correctCount >= 7 ? (
                      // Success Result
                      <>
                        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#4ade80]/15 text-[#4ade80]">
                          <Sparkles size={28} className="animate-pulse" />
                        </div>
                        <h3 className="mt-5 font-display text-[24px] font-bold text-white tracking-tight">Desafio Concluído!</h3>
                        <p className="mt-2 text-[13px] text-[#aaa0c0]">Parabéns! Você passou com <strong className="text-[#4ade80]">{correctCount}/10 acertos</strong> e dominou esta etapa.</p>
                        
                        <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#ffd700]/15 px-4 py-2 font-mono text-[13px] font-bold text-[#f5c463] shadow-md shadow-[#ffd700]/5 animate-pulse-glow">
                          <Zap size={15} className="fill-[#ffd700]" /> +{activeStage.xp} XP
                        </div>
                      </>
                    ) : (
                      // Failure Result
                      <>
                        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-500/15 text-red-400">
                          <X size={28} className="animate-shake" />
                        </div>
                        <h3 className="mt-5 font-display text-[24px] font-bold text-white tracking-tight">Tente Novamente</h3>
                        <p className="mt-2 text-[13px] text-[#aaa0c0]">Você acertou <strong className="text-red-400">{correctCount}/10 perguntas</strong>. Você precisa de pelo menos 7 acertos para liberar o próximo nível.</p>
                      </>
                    )}

                    <div className="mt-8 flex gap-3 border-t border-white/[.06] pt-4">
                      {correctCount < 7 ? (
                        <>
                          <button 
                            onClick={handleCloseModal}
                            className="flex-1 rounded-2xl border border-white/[.08] hover:bg-white/[.03] py-3 text-[12px] font-bold text-[#c9c1df] transition active:scale-95"
                          >
                            Voltar ao Mapa
                          </button>
                          <button 
                            onClick={handleStartChallenge}
                            className="flex-1 rounded-2xl bg-[#7352df] hover:bg-[#8363e9] py-3 text-[12px] font-bold text-white transition active:scale-95 animate-pulse-glow"
                          >
                            Tentar Novamente
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={handleCloseModal}
                          className="w-full rounded-2xl bg-[#22c55e] hover:bg-[#2ed86c] py-3 text-[13px] font-bold text-white transition active:scale-95"
                        >
                          Continuar no Mapa
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  // Active Question View
                  <div>
                    {selectedTrackId && quizQuestions[selectedTrackId][activeStage.id] && (
                      (() => {
                        const questionList = quizQuestions[selectedTrackId][activeStage.id];
                        const currentQuestion = questionList[currentQuestionIndex];
                        return (
                          <>
                            {/* Question Header Progress Bar */}
                            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#b9aaff] uppercase tracking-wider mb-2">
                              <span>Pergunta {currentQuestionIndex + 1} de {questionList.length}</span>
                              <span>Acertos: {correctCount}/{currentQuestionIndex + (answerSubmitted ? 1 : 0)}</span>
                            </div>
                            
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[.08] mb-5">
                              <div className="h-full rounded-full bg-[#8b5cf6] transition-all duration-300" style={{ width: `${((currentQuestionIndex) / questionList.length) * 100}%` }} />
                            </div>
                            
                            <p className="mt-3 font-display text-[15px] sm:text-[16px] font-bold text-white leading-relaxed">
                              {currentQuestion.question}
                            </p>

                            <div className="mt-5 space-y-2.5">
                              {currentQuestion.options.map((option) => {
                                const isSelected = selectedOption === option;
                                
                                // Dynamic styling classes based on submission state
                                let styleClass = "border-white/[.08] bg-white/[.02] hover:bg-white/[.05] text-[#dcd6eb]";
                                if (answerSubmitted) {
                                  if (option === currentQuestion.correct) {
                                    styleClass = "border-green-500 bg-green-500/10 text-green-200";
                                  } else if (isSelected && option !== currentQuestion.correct) {
                                    styleClass = "border-red-500 bg-red-500/10 text-red-200";
                                  } else {
                                    styleClass = "border-white/[.04] bg-white/[.01] text-[#9387a7] cursor-not-allowed opacity-55";
                                  }
                                } else if (isSelected) {
                                  styleClass = "bg-[#7352df]/20 border-[#9f85ff] text-[#e3dcff]";
                                }

                                return (
                                  <button
                                    key={option}
                                    disabled={answerSubmitted}
                                    onClick={() => {
                                      setSelectedOption(option);
                                      setQuizFailed(false);
                                    }}
                                    className={`w-full text-left rounded-2xl border px-4 py-3 text-[12px] transition duration-200 ${styleClass}`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Feedbacks */}
                            {answerSubmitted && (
                              <div className="mt-4 text-center">
                                {quizSuccess ? (
                                  <p className="text-[11px] font-semibold text-green-400">
                                    ✨ Resposta Correta! Muito bem!
                                  </p>
                                ) : (
                                  <p className="text-[11px] font-semibold text-red-400">
                                    ❌ Resposta Incorreta! A resposta certa era: <strong className="underline">{currentQuestion.correct}</strong>
                                  </p>
                                )}
                              </div>
                            )}

                            <div className="mt-6 flex items-center justify-between border-t border-white/[.06] pt-4">
                              <button 
                                onClick={handleCloseModal}
                                className="rounded-2xl border border-white/[.08] hover:bg-white/[.03] px-4 py-2.5 text-[11px] font-bold text-[#c9c1df]"
                              >
                                Desistir
                              </button>
                              
                              {!answerSubmitted ? (
                                <button 
                                  disabled={!selectedOption}
                                  onClick={handleAnswerSubmit}
                                  className={`
                                    rounded-2xl px-5 py-2.5 text-[11px] font-bold transition active:scale-95
                                    ${selectedOption ? 'bg-[#7352df] hover:bg-[#8363e9] text-white animate-pulse-glow' : 'bg-white/[.04] text-[#8e85a5] cursor-not-allowed'}
                                  `}
                                >
                                  Enviar Resposta
                                </button>
                              ) : (
                                <button 
                                  onClick={handleNextQuestion}
                                  className="rounded-2xl bg-[#7352df] hover:bg-[#8363e9] text-white px-5 py-2.5 text-[11px] font-bold transition active:scale-95 animate-pulse-glow"
                                >
                                  {currentQuestionIndex + 1 === questionList.length ? "Ver Resultado" : "Próxima Questão"}
                                </button>
                              )}
                            </div>
                          </>
                        );
                      })()
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}

function TrackDetail({ track, unlocked, onSelect }: { track: (typeof tracks)[number]; unlocked: boolean; onSelect: () => void }) {
  const Icon = track.icon;
  const activities = track.id === "ads" 
    ? ["Fundamentos Web", "Métricas de Performance", "Desafio do Dashboard", "E mais 2 fases"] 
    : track.id === "logic" 
      ? ["Variáveis e Tipos", "Estruturas Condicionais", "Laços de Repetição", "E mais 2 fases"] 
      : ["Modelo OSI e TCP/IP", "Endereçamento IP", "Roteadores e Switches", "E mais 2 fases"];

  return (
    <article id={track.id} className="overflow-hidden rounded-[29px] border border-white/[.08] bg-[#211440]">
      <div className={`relative h-28 overflow-hidden bg-gradient-to-br ${track.gradient} p-5`}>
        <div className="absolute -right-8 -bottom-9 size-32 rounded-full border-[20px] border-white/[.12]" />
        <span className="relative flex size-12 items-center justify-center rounded-[17px] bg-white/[.15]"><Icon size={24} /></span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-[21px] font-bold leading-[1.07] tracking-[-.045em] text-white">{track.name}</p>
            <p className="mt-2 text-[11px] text-[#aa9fbe]">{track.lessons}</p>
          </div>
          <span className="rounded-full bg-[#33245d] px-2.5 py-1 font-mono text-[9px] font-bold text-[#c4b5ff] shrink-0 mt-0.5">
            + {track.xp}
          </span>
        </div>
        
        <div className="mt-5">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#aa9fbe] mb-1.5">
            <span>Progresso da Trilha</span>
            <span>{track.progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[.08]">
            <div className="h-full rounded-full bg-[#a58bff] transition-all duration-300" style={{ width: `${track.progress}%` }} />
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          {activities.map((activity, i) => (
            <div key={activity} className="flex items-center gap-3 text-[12px] text-[#d3cce2]">
              <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] bg-white/[.06] text-[#9387a7]`}>
                {i + 1}
              </span>
              {activity}
            </div>
          ))}
        </div>
        
        <button 
          disabled={!unlocked} 
          onClick={onSelect} 
          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-[12px] font-bold transition duration-200 active:scale-98
            ${unlocked ? 'bg-[#6a49dd] text-white hover:bg-[#795ae7]' : 'cursor-not-allowed bg-white/[.06] text-[#82769c]'}
          `}
        >
          {unlocked ? (
            <>
              {track.progress > 0 ? "Continuar Trilha" : "Começar Trilha"}
              <ChevronRight size={15} />
            </>
          ) : (
            <>
              <LockKeyhole size={15} /> Desbloqueie no Nível 4
            </>
          )}
        </button>
      </div>
    </article>
  );
}

const leaderboard = [
  { name: "João Victor", xp: "2.480", streak: 28, initials: "JV", tone: "from-[#fde1b7] to-[#c6805c]" },
  { name: "Letícia Ramos", xp: "2.330", streak: 21, initials: "LR", tone: "from-[#c8defa] to-[#658cc5]" },
  { name: "Carlos Eduardo", xp: "2.110", streak: 19, initials: "CE", tone: "from-[#e7c1cc] to-[#aa677b]" },
  { name: "Ana Clara", xp: "1.970", streak: 17, initials: "AC", tone: "from-[#d6ccff] to-[#806ac3]" },
  { name: "Rafael Nunes", xp: "1.860", streak: 15, initials: "RN", tone: "from-[#cde7db] to-[#4e997a]" },
];

function RankingPage() {
  const [period, setPeriod] = useState("Esta semana");

  // Arranged as: 2nd place (left), 1st place (center), 3rd place (right)
  const podium = [
    {
      ...leaderboard[1],
      rank: 2,
      height: "h-[105px] sm:h-[135px]",
      bg: "from-[#251b4f]/70 to-[#1e1442]/90 border-[#c8defa]/10",
      badgeBg: "bg-[#cbd5e1]/15 text-[#cbd5e1]",
      avatarSize: "size-14 sm:size-20",
      ringColor: "ring-slate-400/20",
      textColor: "text-[#cbd5e1]",
      xpColor: "text-slate-300",
      emoji: "🥈"
    },
    {
      ...leaderboard[0],
      rank: 1,
      height: "h-[130px] sm:h-[170px]",
      bg: "from-[#432d1d]/85 to-[#271a10]/95 border-[#ffd700]/30 shadow-[0_-5px_25px_rgba(255,215,0,0.08)]",
      badgeBg: "bg-[#ffd700]/25 text-[#f5c463]",
      avatarSize: "size-18 sm:size-24",
      ringColor: "ring-[#ffd700]/30",
      textColor: "text-[#ffe9a5]",
      xpColor: "text-[#ffd700]",
      emoji: "👑"
    },
    {
      ...leaderboard[2],
      rank: 3,
      height: "h-[85px] sm:h-[110px]",
      bg: "from-[#251b4f]/70 to-[#1e1442]/90 border-[#aa677b]/10",
      badgeBg: "bg-[#cd7f32]/20 text-[#fca5a5]",
      avatarSize: "size-12 sm:size-16",
      ringColor: "ring-[#cd7f32]/20",
      textColor: "text-[#fca5a5]",
      xpColor: "text-amber-600/80",
      emoji: "🥉"
    }
  ];

  return (
    <AppShell>
      <main className="mx-auto max-w-[1020px] px-5 py-8 md:px-8 md:py-10">
        
        {/* Page Header */}
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div className="relative pr-20 sm:pr-0">
            <img 
              src={mascot} 
              alt="Mascote Bora acompanhando o ranking" 
              className="absolute right-0 top-0 size-16 rounded-[21px] object-cover object-[center_36%] mix-blend-screen opacity-90 sm:hidden" 
            />
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#a996ff]">
              Classificação ADS
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.35rem,4vw,3.7rem)] font-bold leading-[.98] tracking-[-.065em]">
              Ranking da galera.
            </h1>
            <p className="mt-3 max-w-md text-[13px] leading-6 text-[#a69bbd]">
              Cada missão concluída soma XP. Acompanhe seu lugar entre os alunos de ADS.
            </p>
          </div>
          
          <button 
            onClick={() => setPeriod(period === "Esta semana" ? "Este mês" : "Esta semana")} 
            className="rounded-full border border-white/[.09] bg-white/[.045] px-4 py-2 text-[11px] font-bold text-[#d7d1e5] flex items-center gap-1.5 transition hover:bg-white/[.08]"
          >
            <span>{period}</span> 
            <ChevronRight className="rotate-90 sm:rotate-0" size={14} />
          </button>
        </div>

        {/* Podium Leaderboard */}
        <section className="relative mt-14 mb-10 flex items-end justify-center w-full max-w-[520px] mx-auto px-2">
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[350px] h-[150px] bg-[#6b4be0]/10 blur-[80px] pointer-events-none rounded-full" />
          
          <div className="flex items-end justify-center gap-3 sm:gap-6 w-full relative z-10">
            {podium.map((user) => (
              <div 
                key={user.name} 
                className="flex flex-col items-center flex-1 max-w-[140px] relative animate-fade-in"
              >
                
                {/* Crown or Medal emoji */}
                <div className="relative mb-2.5 h-8 flex items-end justify-center">
                  {user.rank === 1 ? (
                    <div className="animate-[bounce_2.5s_infinite] flex flex-col items-center">
                      <Crown size={26} className="fill-[#f5c463] text-[#f5c463] drop-shadow-[0_0_8px_rgba(245,196,99,0.5)]" />
                    </div>
                  ) : (
                    <span className="text-[22px] filter drop-shadow-md">{user.emoji}</span>
                  )}
                </div>

                {/* Avatar with Floating Rank */}
                <div className={`relative ${user.avatarSize} flex items-center justify-center rounded-full bg-gradient-to-br ${user.tone} font-display text-[15px] sm:text-[20px] font-bold text-[#372247] shadow-[0_10px_25px_rgba(0,0,0,0.4)] ring-2 sm:ring-4 ${user.ringColor} transition-transform duration-300 hover:scale-105 z-10`}>
                  {user.initials}
                  
                  <span className={`absolute -bottom-1 -right-1 flex size-5 sm:size-6 items-center justify-center rounded-full font-display text-[10px] sm:text-[12px] font-black border border-white/[.15] shadow-md ${
                    user.rank === 1 ? "bg-[#ffd700] text-[#432d1d]" :
                    user.rank === 2 ? "bg-[#cbd5e1] text-[#251b4f]" :
                    "bg-[#cd7f32] text-[#251b4f]"
                  }`}>
                    {user.rank}
                  </span>
                </div>

                {/* Name */}
                <p className="mt-4 font-display text-[12px] sm:text-[14px] font-bold text-[#f4f0ff] truncate w-full text-center px-1">
                  {user.name.split(" ")[0]}
                </p>

                {/* XP */}
                <p className={`font-mono text-[10px] sm:text-[11px] font-black mt-0.5 ${user.xpColor}`}>
                  {user.xp} XP
                </p>

                {/* Pillar Pedestal */}
                <div className={`mt-3.5 w-full rounded-t-[20px] sm:rounded-t-[28px] border-t border-x bg-gradient-to-b ${user.bg} ${user.height} flex flex-col items-center justify-start pt-4 transition-all duration-500 shadow-lg`}>
                  <span className="text-[12px] sm:text-[14px] font-black tracking-wider uppercase opacity-65 font-display">
                    #{user.rank}
                  </span>
                  <div className="hidden sm:flex items-center gap-1 mt-2.5 rounded-full bg-white/[.04] border border-white/[.06] py-1 px-2.5">
                    <Flame size={12} className="fill-[#ff965e] text-[#ff965e]" />
                    <span className="font-mono text-[9px] text-[#af9fc3] font-bold">
                      {user.streak}d
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* Detailed Leaderboard Table */}
        <section className="mt-8 overflow-hidden rounded-[28px] border border-white/[.08] bg-[#211440] shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between border-b border-white/[.07] px-5 py-4">
            <p className="font-display text-[18px] sm:text-[19px] font-bold tracking-[-.04em]">
              Tabela completa
            </p>
            <UsersRound size={18} className="text-[#a795da]" />
          </div>
          
          {leaderboard.map((user, index) => (
            <div 
              key={user.name} 
              className={`flex items-center gap-4 px-5 py-4 transition hover:bg-white/[.015] ${
                index < leaderboard.length - 1 ? "border-b border-white/[.06]" : ""
              }`}
            >
              <span className="w-5 font-mono text-[11px] text-[#9a8fb1] font-semibold">
                {index < 9 ? `0${index + 1}` : index + 1}
              </span>
              
              <div className={`flex size-9 sm:size-10 items-center justify-center rounded-full bg-gradient-to-br ${user.tone} text-[11px] sm:text-[12px] font-bold text-[#382448] shadow-inner`}>
                {user.initials}
              </div>
              
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-[#f4f0ff] truncate">
                  {user.name}
                </p>
                <p className="mt-0.5 text-[10px] text-[#968aa9] flex items-center gap-1">
                  <Flame className="fill-[#ff965e] text-[#ff965e]" size={11} />
                  <span>{user.streak} dias de sequência</span>
                </p>
              </div>
              
              <p className="font-mono text-[11px] sm:text-[12px] font-bold text-[#f1c668]">
                {user.xp} XP
              </p>
            </div>
          ))}
          
          {/* Current User fixed row */}
          <div className="flex items-center gap-4 border-t border-[#8064e6]/25 bg-gradient-to-r from-[#2c2050] to-[#342461] px-5 py-4.5">
            <span className="w-5 font-mono text-[11px] text-[#c7b8ff] font-extrabold">18</span>
            <Avatar className="size-9 sm:size-10 text-[12px] shadow-md" />
            <div className="flex-1">
              <p className="text-[13px] font-extrabold text-white">Você · Marina</p>
              <p className="mt-0.5 text-[10px] text-[#c7b8ff] opacity-80">Faltam 620 XP para o top 10</p>
            </div>
            <p className="font-mono text-[11px] sm:text-[12px] font-black text-[#f1c668]">1.240 XP</p>
          </div>
        </section>

      </main>
    </AppShell>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const login = () => {
    setLoading(true);
    window.setTimeout(() => navigate("/"), 650);
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#160d2e] p-0 md:p-4 lg:p-8 font-body text-white">
      {/* Background radial glow effects */}
      <div className="absolute -left-28 top-[-100px] size-[390px] rounded-full bg-[#6944df] opacity-35 blur-[100px]" />
      <div className="absolute -bottom-40 -right-16 size-[430px] rounded-full bg-[#963c94] opacity-20 blur-[110px]" />
      
      {/* Responsive layout container - Splits on PC, Stacks/Full-Screen on Mobile */}
      <main className="relative grid w-full max-w-full md:max-w-[980px] min-h-screen md:min-h-[auto] overflow-hidden md:overflow-visible rounded-none md:rounded-[34px] border-0 md:border border-white/[.1] bg-[#20113f]/80 shadow-none md:shadow-[0_25px_80px_rgba(0,0,0,.35)] backdrop-blur-xl grid-cols-1 md:grid-cols-[.95fr_1.05fr]">
        
        {/* Left Section (PC Style / Top Banner on Mobile) */}
        <section className="relative overflow-hidden md:overflow-visible bg-gradient-to-br from-[#754fdf] via-[#5535b7] to-[#2c165d] p-5 sm:p-8 md:p-10 min-h-[190px] md:min-h-[630px] flex flex-col justify-between">
          <div className="absolute -right-20 top-[-70px] size-64 rounded-full border-[30px] border-white/[.12]" />
          <div className="absolute bottom-[-120px] left-[-70px] size-72 rounded-full border-[34px] border-[#c4b2ff]/20" />
          
          <div>
            <Logo />
          </div>
          
          {/* Tagline block */}
          <div className="relative z-10 mt-3 md:mt-16 max-w-[52%] md:max-w-[250px]">
            <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-[.18em] text-[#dfd6ff]">
              Seu game de aprendizado
            </p>
            <h1 className="mt-1.5 md:mt-5 font-display text-[19px] sm:text-[22px] md:text-[46px] font-bold leading-[1.1] md:leading-[.95] tracking-[-.05em] md:tracking-[-.07em]">
              Aprender pode ser o seu melhor <span className="text-[#f6c768]">jogo.</span>
            </h1>
            <p className="mt-2.5 md:mt-6 text-[11px] md:text-[14px] leading-normal md:leading-6 text-[#ded7ff] opacity-90 hidden md:block">
              Domine habilidades, conclua missões e suba no ranking com a sua turma.
            </p>
          </div>
          
          {/* Mascot absolute positioned in the bottom-right corner of the section */}
          <div className="absolute bottom-[15px] -right-[105px] md:-bottom-48 md:-right-[260px] shrink-0 z-0">
            <img 
              src={mascotTransparent} 
              alt="Mascote Bora" 
              className="h-[340px] w-[340px] sm:h-[380px] sm:w-[380px] md:size-[640px] object-contain opacity-95" 
            />
          </div>
          
          {/* Subheading under the main tagline block on mobile, keeping everything within height limits */}
          <p className="relative z-10 mt-2 max-w-[52%] text-[10.5px] leading-relaxed text-[#e2d9ff] opacity-95 md:hidden block">
            Domine habilidades, conclua missões e suba no ranking com a sua turma.
          </p>
        </section>
        
        {/* Right Section (Login Form - Stacks at bottom on Mobile) */}
        <section className="flex flex-col justify-center p-5 sm:p-8 md:p-10 min-h-[380px] md:min-h-[590px]">
          <div>
            <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[.18em] text-[#a997ff]">
              Boas-vindas
            </p>
            <h2 className="mt-1 md:mt-3 font-display text-[21px] sm:text-[24px] md:text-[34px] font-bold leading-[1.1] md:leading-[1] tracking-[-.05em] md:tracking-[-.06em]">
              Entre e continue sua jornada.
            </h2>
            <p className="mt-2 md:mt-4 text-[11px] sm:text-[12px] md:text-[13px] leading-relaxed md:leading-6 text-[#aaa0c1]">
              Use a sua conta institucional para acessar suas trilhas e seu progresso.
            </p>
            
            <button 
              onClick={login} 
              disabled={loading} 
              className="group mt-4.5 md:mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-white py-3 text-[13px] font-bold text-[#281a4a] transition hover:bg-[#f2efff] active:scale-[0.98] disabled:opacity-70 shadow-sm"
            >
              <span className="grid size-5 place-items-center rounded-full bg-[#4285f4] text-[11px] font-extrabold text-white">
                G
              </span>
              {loading ? "Conectando..." : "Continuar com Google"}
            </button>
            
            <div className="my-5 md:my-7 flex items-center gap-3 text-[9px] uppercase tracking-[.12em] text-[#776b91]">
              <span className="h-px flex-1 bg-white/[.08]" />acesso seguro<span className="h-px flex-1 bg-white/[.08]" />
            </div>
            
            <div className="flex items-start gap-2.5 rounded-2xl border border-[#8066de]/20 bg-[#302051] p-3.5">
              <LockKeyhole size={16} className="mt-0.5 shrink-0 text-[#b5a2ff]" />
              <p className="text-[10.5px] leading-relaxed text-[#bbb0ce]">
                Ao entrar, você concorda com os termos de uso e a política de privacidade do Bora.
              </p>
            </div>
          </div>
          
          <p className="mt-6 md:mt-9 text-center text-[10.5px] text-[#837799]">
            Ainda não tem acesso?{" "}
            <button className="font-bold text-[#b7a5ff] hover:underline">Fale com sua instituição</button>
          </p>
        </section>
        
      </main>
    </div>
  );
}

function ProfilePage() { return <AppShell><main className="mx-auto max-w-[860px] px-5 py-10 md:px-8"><div className="relative overflow-hidden rounded-[30px] border border-white/[.08] bg-[#211440] p-5 sm:p-7"><img src={mascot} alt="Mascote Bora no perfil" className="pointer-events-none absolute -right-5 -top-6 size-28 rounded-[34px] object-cover object-[center_36%] mix-blend-screen opacity-60 sm:size-36" /><div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center"><Avatar className="size-20 text-[23px]" /><div className="flex-1"><p className="font-display text-[30px] font-bold tracking-[-.05em]">Marina Silva</p><p className="mt-1 text-[13px] text-[#a69aba]">Bootcamp ADS · Turma 2026.2</p></div><XP /></div><div className="mt-8 grid grid-cols-3 gap-3"><Stat icon={Target} label="Missões" value="18" accent="bg-[#443475] text-[#ae9aff]" /><Stat icon={Trophy} label="Badges" value="04" accent="bg-[#55472a] text-[#f6c768]" /><Stat icon={Flame} label="Streak" value="12" accent="bg-[#55304c] text-[#ff9b73]" /></div></div></main></AppShell>; }

function NotFound() { return <AppShell><main className="grid min-h-[60vh] place-items-center px-6 text-center"><div><p className="font-display text-5xl font-bold">404</p><p className="mt-3 text-[#aaa0c1]">Essa tela não faz parte da sua trilha.</p><Link to="/" className="mt-5 inline-flex rounded-xl bg-[#6b4be0] px-4 py-3 text-sm font-bold">Voltar ao início</Link></div></main></AppShell>; }

export const router = createBrowserRouter([
  { path: "/login", Component: LoginPage },
  { path: "/", Component: HomePage },
  { path: "/trilhas", Component: TracksPage },
  { path: "/ranking", Component: RankingPage },
  { path: "/perfil", Component: ProfilePage },
  { path: "*", Component: NotFound },
]);
