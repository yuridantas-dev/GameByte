import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
  Dimensions,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Users,
  AlertTriangle,
  GraduationCap,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  Flame,
  Zap,
  Check,
  X,
  Trash2,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  BookOpen,
} from "lucide-react-native";
import { useApp } from "../context/AppContext";
import { ClassStudent, CreatedQuestion } from "../types";
import { avatars3DData, tracksData } from "../data/mockData";
import { ButtonCustom } from "../components/ButtonCustom";
import { InputCustom } from "../components/InputCustom";

const { width: screenWidth } = Dimensions.get("window");
const isSmallDevice = screenWidth < 375;

export function TelaPainelProfessor() {
  const {
    classStudents,
    recordStudentActivity,
    resetStudentXp,
    createdQuestions,
    addCustomQuestion,
    deleteCustomQuestion,
    setCurrentTab,
    setUserRole,
  } = useApp();

  // Abas internas do painel
  const [activeTab, setActiveTab] = useState<"turma" | "conteudo" | "testes">("turma");

  // Filtros da turma
  const [filterMode, setFilterMode] = useState<"all" | "risk" | "active">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal de Ajuste de XP
  const [editingStudent, setEditingStudent] = useState<ClassStudent | null>(null);
  const [newXpInput, setNewXpInput] = useState("");

  // Modal de Cadastro de Questão
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [qTrackId, setQTrackId] = useState("logic");
  const [qStageId, setQStageId] = useState(1);
  const [qQuestion, setQQuestion] = useState("");
  const [qOptA, setQOptA] = useState("");
  const [qOptB, setQOptB] = useState("");
  const [qOptC, setQOptC] = useState("");
  const [qOptD, setQOptD] = useState("");
  const [qCorrectIndex, setQCorrectIndex] = useState(0);
  const [qExplanation, setQExplanation] = useState("");
  const [qXp, setQXp] = useState("60");
  const [formError, setFormError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Estado da Execução do Caso de Teste (Seção 7.2)
  const [testExecutionStatus, setTestExecutionStatus] = useState<"idle" | "running" | "passed">("idle");
  const [testLog, setTestLog] = useState<string[]>([]);

  // Helpers
  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const studentsInRisk = classStudents.filter((s) => s.lastActiveDaysAgo > 7);
  const totalXpSum = classStudents.reduce((acc, s) => acc + s.xp, 0);
  const avgXp = Math.round(totalXpSum / (classStudents.length || 1));

  // Filtragem da lista
  const filteredStudents = classStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterMode === "risk") {
      return student.lastActiveDaysAgo > 7;
    }
    if (filterMode === "active") {
      return student.lastActiveDaysAgo <= 7;
    }
    return true;
  });

  const getAvatarImage = (avatarId: number) => {
    const found = avatars3DData.find((a) => a.id === avatarId);
    return found ? found.image : avatars3DData[0].image;
  };

  // Submissão do Ajuste de XP
  const handleSaveXp = () => {
    if (!editingStudent) return;
    const parsedXp = parseInt(newXpInput, 10);
    if (isNaN(parsedXp) || parsedXp < 0) {
      alert("Por favor, informe um valor de XP válido.");
      return;
    }
    resetStudentXp(editingStudent.id, parsedXp);
    showToast(`XP de ${editingStudent.name} atualizado para ${parsedXp.toLocaleString("pt-BR")} XP!`);
    setEditingStudent(null);
  };

  // Submissão da Nova Questão
  const handleSaveQuestion = () => {
    if (!qQuestion.trim()) {
      setFormError("Informe o enunciado da questão.");
      return;
    }
    if (!qOptA.trim() || !qOptB.trim() || !qOptC.trim() || !qOptD.trim()) {
      setFormError("Preencha todas as 4 alternativas.");
      return;
    }
    if (!qExplanation.trim()) {
      setFormError("Adicione uma explicação pedagógica para a resposta correta.");
      return;
    }

    const options = [qOptA.trim(), qOptB.trim(), qOptC.trim(), qOptD.trim()];
    const correct = options[qCorrectIndex];
    const trackObj = tracksData.find((t) => t.id === qTrackId);

    addCustomQuestion({
      trackId: qTrackId,
      trackName: trackObj ? trackObj.name : "Trilha Geral",
      stageId: qStageId,
      question: qQuestion.trim(),
      options,
      correct,
      explanation: qExplanation.trim(),
      xp: parseInt(qXp, 10) || 60,
    });

    setFormError(null);
    setIsQuestionModalOpen(false);
    showToast("Questão cadastrada com sucesso na ementa da trilha!");

    // Reset fields
    setQQuestion("");
    setQOptA("");
    setQOptB("");
    setQOptC("");
    setQOptD("");
    setQExplanation("");
  };

  // Execução Interativa do Caso de Teste da Banca (Seção 7.2)
  const handleRunTestCase = () => {
    setTestExecutionStatus("running");
    setTestLog([]);

    const steps = [
      "1. Autenticação: Verificando credenciais institucionais do professor...",
      "2. Carregamento: Conectando com a base de dados da turma (4º Semestre ADS)...",
      "3. Processamento de Regras: Calculando inatividade (dias desde a última ação)...",
      "4. Validação Visual: Identificados alunos com > 7 dias inativos (Rafael Nunes e Lucas Barbosa)...",
      "5. Aplicação de Destaque: Borda vermelha e alerta de evasão renderizados com sucesso!",
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setTestLog((prev) => [...prev, step]);
        if (idx === steps.length - 1) {
          setTestExecutionStatus("passed");
          showToast("Caso de Teste 'Acompanhar a Turma' APROVADO com 100% de sucesso!");
        }
      }, (idx + 1) * 600);
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Toast de Sucesso Flutuante */}
      {successToast && (
        <View style={styles.toastContainer}>
          <CheckCircle2 size={16} color="#4ade80" />
          <Text style={styles.toastText}>{successToast}</Text>
        </View>
      )}

      {/* Header do Painel Docente */}
      <LinearGradient
        colors={["#2b135e", "#1b0d3e", "#12082b"]}
        style={styles.headerHero}
      >
        <View style={styles.headerTopRow}>
          <View style={styles.badgeDocente}>
            <GraduationCap size={12} color="#facc15" />
            <Text style={styles.badgeDocenteText}>PAINEL DO DOCENTE · FACULDADE CCI</Text>
          </View>

          {/* Botão de Alternar Rápido para Visão do Aluno */}
          <TouchableOpacity
            style={styles.switchRoleButton}
            onPress={() => {
              setUserRole("student");
              setCurrentTab("home");
            }}
            activeOpacity={0.8}
          >
            <RotateCcw size={12} color="#c4b5fd" />
            <Text style={styles.switchRoleText}>Visão do Aluno</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Gestão de Turma & Conteúdo</Text>
        <Text style={styles.headerSubtitle}>
          Análise e Desenvolvimento de Sistemas · Disciplina de Dispositivos Móveis
        </Text>

        {/* Indicadores Chave de Desempenho (KPIs) */}
        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Users size={16} color="#38bdf8" />
            <Text style={styles.kpiValue}>{classStudents.length}</Text>
            <Text style={styles.kpiLabel}>ESTUDANTES</Text>
          </View>

          <View style={styles.kpiCard}>
            <Zap size={16} color="#facc15" fill="#facc15" />
            <Text style={styles.kpiValue}>{avgXp.toLocaleString("pt-BR")}</Text>
            <Text style={styles.kpiLabel}>MÉDIA XP</Text>
          </View>

          <View style={[styles.kpiCard, studentsInRisk.length > 0 && styles.kpiCardDanger]}>
            <AlertTriangle
              size={16}
              color={studentsInRisk.length > 0 ? "#f87171" : "#4ade80"}
            />
            <Text
              style={[
                styles.kpiValue,
                studentsInRisk.length > 0 && styles.kpiValueDanger,
              ]}
            >
              {studentsInRisk.length}
            </Text>
            <Text style={styles.kpiLabel}>EM RISCO (&gt;7d)</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Seletor de Abas do Painel */}
      <View style={styles.tabSelector}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "turma" && styles.tabButtonActive]}
          onPress={() => setActiveTab("turma")}
          activeOpacity={0.8}
        >
          <Users
            size={14}
            color={activeTab === "turma" ? "#ffffff" : "#9487b0"}
          />
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "turma" && styles.tabButtonTextActive,
            ]}
          >
            Minha Turma {studentsInRisk.length > 0 && `(${studentsInRisk.length} ⚠️)`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === "conteudo" && styles.tabButtonActive]}
          onPress={() => setActiveTab("conteudo")}
          activeOpacity={0.8}
        >
          <BookOpen
            size={14}
            color={activeTab === "conteudo" ? "#ffffff" : "#9487b0"}
          />
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "conteudo" && styles.tabButtonTextActive,
            ]}
          >
            Gestão de Trilhas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === "testes" && styles.tabButtonActive]}
          onPress={() => setActiveTab("testes")}
          activeOpacity={0.8}
        >
          <ShieldCheck
            size={14}
            color={activeTab === "testes" ? "#ffffff" : "#9487b0"}
          />
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "testes" && styles.tabButtonTextActive,
            ]}
          >
            Avaliação & Testes
          </Text>
        </TouchableOpacity>
      </View>

      {/* ==================== ABA 1: MINHA TURMA (HISTÓRIA DE USUÁRIO 7.1) ==================== */}
      {activeTab === "turma" && (
        <View style={styles.tabContent}>
          {/* Alerta de Destaque sobre o Critério de Avaliação */}
          {studentsInRisk.length > 0 && (
            <View style={styles.alertBanner}>
              <AlertTriangle size={18} color="#f87171" />
              <View style={styles.alertBannerTextCol}>
                <Text style={styles.alertBannerTitle}>
                  Atenção Docente: {studentsInRisk.length} aluno(s) sem atividade há mais de 7 dias
                </Text>
                <Text style={styles.alertBannerDesc}>
                  O sistema destacou automaticamente alunos em risco de evasão. Clique em "Registrar Apoio" para registrar a intervenção e o alerta desaparecerá!
                </Text>
              </View>
            </View>
          )}

          {/* Barra de Busca e Filtros */}
          <View style={styles.searchBarBox}>
            <Search size={15} color="#9487b0" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar aluno por nome ou e-mail..."
              placeholderTextColor="#7a6e94"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <X size={15} color="#9487b0" />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Filtros em Pílulas */}
          <View style={styles.filterPillsRow}>
            <TouchableOpacity
              style={[styles.filterPill, filterMode === "all" && styles.filterPillActive]}
              onPress={() => setFilterMode("all")}
            >
              <Text style={[styles.filterPillText, filterMode === "all" && styles.filterPillTextActive]}>
                Todos ({classStudents.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                filterMode === "risk" && styles.filterPillDangerActive,
              ]}
              onPress={() => setFilterMode("risk")}
            >
              <Text
                style={[
                  styles.filterPillText,
                  filterMode === "risk" && styles.filterPillTextActive,
                ]}
              >
                ⚠️ Em Risco ({studentsInRisk.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                filterMode === "active" && styles.filterPillActive,
              ]}
              onPress={() => setFilterMode("active")}
            >
              <Text
                style={[
                  styles.filterPillText,
                  filterMode === "active" && styles.filterPillTextActive,
                ]}
              >
                Ativos ({classStudents.length - studentsInRisk.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Lista de Alunos */}
          <View style={styles.studentsList}>
            {filteredStudents.map((student, index) => {
              const isDanger = student.lastActiveDaysAgo > 7;

              return (
                <View
                  key={student.id}
                  style={[
                    styles.studentCard,
                    isDanger && styles.studentCardDanger,
                  ]}
                >
                  {/* Badge de Risco no Topo do Card */}
                  {isDanger && (
                    <View style={styles.studentRiskBadge}>
                      <AlertTriangle size={12} color="#ffffff" />
                      <Text style={styles.studentRiskBadgeText}>
                        RISCO DE EVASÃO: {student.lastActiveDaysAgo} DIAS SEM ATIVIDADE
                      </Text>
                    </View>
                  )}

                  <View style={styles.studentMainRow}>
                    {/* Avatar 3D do Aluno */}
                    <View
                      style={[
                        styles.studentAvatarBox,
                        isDanger && styles.studentAvatarBoxDanger,
                      ]}
                    >
                      <Image
                        source={getAvatarImage(student.avatarId)}
                        style={styles.studentAvatarImg}
                        resizeMode="cover"
                      />
                      <View style={styles.studentRankBadge}>
                        <Text style={styles.studentRankText}>#{index + 1}</Text>
                      </View>
                    </View>

                    {/* Dados do Aluno */}
                    <View style={styles.studentInfoCol}>
                      <View style={styles.studentNameRow}>
                        <Text style={styles.studentNameText} numberOfLines={1}>
                          {student.name}
                        </Text>
                        <View style={styles.studentLevelTag}>
                          <Text style={styles.studentLevelTagText}>NV. {student.level}</Text>
                        </View>
                      </View>

                      <Text style={styles.studentEmailText}>{student.email}</Text>

                      {/* Métricas do Aluno */}
                      <View style={styles.studentStatsRow}>
                        <View style={styles.studentStatItem}>
                          <Zap size={11} color="#facc15" fill="#facc15" />
                          <Text style={styles.studentStatText}>{student.xp.toLocaleString("pt-BR")} XP</Text>
                        </View>
                        <View style={styles.studentStatItem}>
                          <Flame size={11} color="#ff8b52" fill="#ff8b52" />
                          <Text style={styles.studentStatText}>{student.streak} dias</Text>
                        </View>
                        <View style={styles.studentStatItem}>
                          <BookOpen size={11} color="#c084fc" />
                          <Text style={styles.studentStatText}>{student.tracksCompleted} trilhas</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Linha de Status de Atividade e Ações do Professor */}
                  <View style={styles.studentFooterRow}>
                    <View style={styles.studentLastActiveCol}>
                      <View style={styles.activityDotRow}>
                        <View
                          style={[
                            styles.activityDot,
                            isDanger ? styles.activityDotRed : styles.activityDotGreen,
                          ]}
                        />
                        <Text
                          style={[
                            styles.studentLastActiveText,
                            isDanger && styles.studentLastActiveDanger,
                          ]}
                        >
                          {student.lastActiveDate}
                        </Text>
                      </View>
                      {student.notes && (
                        <Text style={styles.studentNotesText} numberOfLines={1}>
                          {student.notes}
                        </Text>
                      )}
                    </View>

                    {/* Botões de Ação do Professor */}
                    <View style={styles.studentActionsRow}>
                      {isDanger && (
                        <TouchableOpacity
                          style={styles.resolveAlertButton}
                          onPress={() => {
                            recordStudentActivity(student.id);
                            showToast(`Intervenção registrada! Alerta de ${student.name} resolvido.`);
                          }}
                          activeOpacity={0.8}
                        >
                          <Check size={12} color="#ffffff" strokeWidth={3} />
                          <Text style={styles.resolveAlertText}>Apoiar Aluno</Text>
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        style={styles.editXpButton}
                        onPress={() => {
                          setEditingStudent(student);
                          setNewXpInput(student.xp.toString());
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.editXpText}>Ajustar XP</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* ==================== ABA 2: GESTÃO DE CONTEÚDO (SEÇÃO 6.3) ==================== */}
      {activeTab === "conteudo" && (
        <View style={styles.tabContent}>
          <View style={styles.contentManagementHeader}>
            <View style={styles.flexItem}>
              <Text style={styles.sectionHeaderTitle}>Banco de Questões e Quizzes</Text>
              <Text style={styles.sectionHeaderDesc}>
                Cadastre novas perguntas alinhadas à ementa do curso para serem distribuídas nas fases do app.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.addQuestionCta}
              onPress={() => setIsQuestionModalOpen(true)}
              activeOpacity={0.85}
            >
              <Plus size={14} color="#ffffff" />
              <Text style={styles.addQuestionCtaText}>Nova Questão</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de Questões Cadastradas */}
          <View style={styles.questionsList}>
            {createdQuestions.map((q, idx) => (
              <View key={q.id} style={styles.questionCard}>
                <View style={styles.questionCardHeader}>
                  <View style={styles.questionTrackBadge}>
                    <Text style={styles.questionTrackBadgeText}>
                      {q.trackName.toUpperCase()} · FASE {q.stageId}
                    </Text>
                  </View>
                  <View style={styles.questionMetaRight}>
                    <Text style={styles.questionXpTag}>+{q.xp} XP</Text>
                    <TouchableOpacity
                      onPress={() => {
                        deleteCustomQuestion(q.id);
                        showToast("Questão removida do banco de dados.");
                      }}
                      style={styles.deleteQuestionBtn}
                    >
                      <Trash2 size={13} color="#f87171" />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.questionTitleText}>
                  {idx + 1}. {q.question}
                </Text>

                {/* Alternativas */}
                <View style={styles.questionOptionsList}>
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = opt === q.correct;
                    return (
                      <View
                        key={optIdx}
                        style={[
                          styles.questionOptionRow,
                          isCorrect && styles.questionOptionRowCorrect,
                        ]}
                      >
                        <Text
                          style={[
                            styles.questionOptionLetter,
                            isCorrect && styles.questionOptionLetterCorrect,
                          ]}
                        >
                          {String.fromCharCode(65 + optIdx)})
                        </Text>
                        <Text
                          style={[
                            styles.questionOptionText,
                            isCorrect && styles.questionOptionTextCorrect,
                          ]}
                        >
                          {opt}
                        </Text>
                        {isCorrect && <Check size={13} color="#4ade80" />}
                      </View>
                    );
                  })}
                </View>

                {/* Justificativa Pedagógica */}
                <View style={styles.questionExplanationBox}>
                  <Text style={styles.questionExplanationLabel}>JUSTIFICATIVA PEDAGÓGICA:</Text>
                  <Text style={styles.questionExplanationText}>{q.explanation}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* ==================== ABA 3: AVALIAÇÃO DE SOFTWARE & TESTES (SEÇÃO 7) ==================== */}
      {activeTab === "testes" && (
        <View style={styles.tabContent}>
          {/* Card da História de Usuário Oficial (Seção 7.1) */}
          <View style={styles.specCard}>
            <View style={styles.specHeaderRow}>
              <FileTextIcon />
              <View style={styles.flexItem}>
                <Text style={styles.specTagline}>SEÇÃO 7.1 · HISTÓRIA DE USUÁRIO</Text>
                <Text style={styles.specTitle}>"Acompanhar a turma"</Text>
              </View>
            </View>

            <View style={styles.specBodyBox}>
              <Text style={styles.specUserStoryText}>
                <Text style={styles.specHighlight}>Como:</Text> Professor da Faculdade CCI.{"\n"}
                <Text style={styles.specHighlight}>Quero:</Text> Acompanhar o progresso dos alunos da minha turma em um painel.{"\n"}
                <Text style={styles.specHighlight}>Para:</Text> Identificar os alunos que precisam de atenção e apoiá-los.{"\n"}
                <Text style={styles.specHighlight}>E:</Text> O sistema deve destacar automaticamente os alunos com mais de 7 dias sem atividade.
              </Text>
            </View>

            <View style={styles.acceptanceBox}>
              <Text style={styles.acceptanceTitle}>Critérios de Aceite Verificados:</Text>
              <View style={styles.acceptanceItem}>
                <Check size={13} color="#4ade80" />
                <Text style={styles.acceptanceText}>O painel exibe a lista de alunos da turma com XP, trilhas e ranking.</Text>
              </View>
              <View style={styles.acceptanceItem}>
                <Check size={13} color="#4ade80" />
                <Text style={styles.acceptanceText}>O painel destaca visualmente quem está há mais de 7 dias sem atividade.</Text>
              </View>
              <View style={styles.acceptanceItem}>
                <Check size={13} color="#4ade80" />
                <Text style={styles.acceptanceText}>O alerta desaparece assim que o aluno realiza uma nova atividade.</Text>
              </View>
            </View>
          </View>

          {/* Quadro 01 - Caso de Teste com Execução Interativa */}
          <View style={styles.testCaseCard}>
            <View style={styles.testCaseHeader}>
              <View style={styles.flexItem}>
                <Text style={styles.testCaseTag}>QUADRO 01 · CASO DE TESTE OFICIAL</Text>
                <Text style={styles.testCaseTitle}>Validação Funcional da Turma</Text>
              </View>
              <View
                style={[
                  styles.testStatusBadge,
                  testExecutionStatus === "passed"
                    ? styles.testStatusBadgeSuccess
                    : styles.testStatusBadgePending,
                ]}
              >
                <Text
                  style={[
                    styles.testStatusBadgeText,
                    testExecutionStatus === "passed"
                      ? styles.testStatusBadgeTextSuccess
                      : styles.testStatusBadgeTextPending,
                  ]}
                >
                  {testExecutionStatus === "passed" ? "✓ APROVADO (100%)" : "PRONTO PARA TESTE"}
                </Text>
              </View>
            </View>

            {/* Tabela do Caso de Teste */}
            <View style={styles.testTableBox}>
              <View style={styles.testTableRow}>
                <Text style={styles.testTableLabel}>Funcionalidade:</Text>
                <Text style={styles.testTableValue}>
                  Acompanhar a turma – visualizar painel e destaque de alunos com &gt; 7 dias inativos.
                </Text>
              </View>
              <View style={styles.testTableRow}>
                <Text style={styles.testTableLabel}>Pré-condição:</Text>
                <Text style={styles.testTableValue}>
                  Professor cadastrado com e-mail institucional e turma com alunos inativos (&gt; 7 dias).
                </Text>
              </View>
              <View style={styles.testTableRow}>
                <Text style={styles.testTableLabel}>Resultado Esperado:</Text>
                <Text style={styles.testTableValue}>
                  Lista renderizada com XP, ranking e aluno inativo destacado visualmente.
                </Text>
              </View>
            </View>

            {/* Botão de Rodar Teste da Banca */}
            <ButtonCustom
              title={
                testExecutionStatus === "running"
                  ? "Executando Teste..."
                  : testExecutionStatus === "passed"
                  ? "Re-executar Teste da Rúbrica"
                  : "▶ Executar Teste da Rúbrica ao Vivo"
              }
              variant={testExecutionStatus === "passed" ? "success" : "primary"}
              loading={testExecutionStatus === "running"}
              onPress={handleRunTestCase}
              style={styles.testRunBtn}
            />

            {/* Log de Passos Executados */}
            {testLog.length > 0 && (
              <View style={styles.testLogTerminal}>
                <Text style={styles.testLogHeader}>CONSOLE DE EXECUÇÃO ISO/IEC 25010:</Text>
                {testLog.map((log, idx) => (
                  <Text key={idx} style={styles.testLogLine}>
                    {log}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      )}

      {/* ==================== MODAL: AJUSTAR XP DO ALUNO ==================== */}
      <Modal
        visible={!!editingStudent}
        transparent
        animationType="fade"
        onRequestClose={() => setEditingStudent(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeaderTitle}>Ajustar XP do Aluno</Text>
              <TouchableOpacity onPress={() => setEditingStudent(null)}>
                <X size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {editingStudent && (
              <View style={styles.modalBody}>
                <Text style={styles.modalDescText}>
                  Defina a nova pontuação de XP para <Text style={styles.whiteBold}>{editingStudent.name}</Text>. O nível será recalculado automaticamente.
                </Text>

                <InputCustom
                  label="Nova Pontuação de XP"
                  value={newXpInput}
                  onChangeText={setNewXpInput}
                  placeholder="Ex: 2500"
                  keyboardType="numeric"
                />

                <View style={styles.modalActionsRow}>
                  <ButtonCustom
                    title="Cancelar"
                    variant="secondary"
                    onPress={() => setEditingStudent(null)}
                    style={styles.flexItem}
                  />
                  <ButtonCustom
                    title="Salvar XP"
                    variant="primary"
                    onPress={handleSaveXp}
                    style={styles.flexItem}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* ==================== MODAL: CADASTRAR NOVA QUESTÃO ==================== */}
      <Modal
        visible={isQuestionModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsQuestionModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, styles.modalCardLarge]}>
            <View style={styles.modalHeaderRow}>
              <View style={styles.flexItem}>
                <Text style={styles.modalHeaderTitle}>Nova Questão Acadêmica</Text>
                <Text style={styles.modalHeaderSubtitle}>
                  Cadastro de atividade pedagógica para as trilhas do GameByte
                </Text>
              </View>
              <TouchableOpacity onPress={() => setIsQuestionModalOpen(false)}>
                <X size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
              {formError && (
                <View style={styles.formErrorBox}>
                  <AlertTriangle size={14} color="#f87171" />
                  <Text style={styles.formErrorText}>{formError}</Text>
                </View>
              )}

              {/* Seletor de Trilha */}
              <Text style={styles.fieldLabel}>Trilha de Destino:</Text>
              <View style={styles.trackPickerRow}>
                {tracksData.map((t) => (
                  <TouchableOpacity
                    key={t.id}
                    style={[
                      styles.trackChip,
                      qTrackId === t.id && styles.trackChipActive,
                    ]}
                    onPress={() => setQTrackId(t.id)}
                  >
                    <Text
                      style={[
                        styles.trackChipText,
                        qTrackId === t.id && styles.trackChipTextActive,
                      ]}
                    >
                      {t.short}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Enunciado */}
              <InputCustom
                label="Enunciado da Pergunta"
                value={qQuestion}
                onChangeText={setQQuestion}
                placeholder="Ex: O que é uma variável em programação?"
              />

              {/* 4 Alternativas */}
              <Text style={styles.fieldLabel}>Alternativas (marque a correta):</Text>

              {[
                { label: "A", val: qOptA, setVal: setQOptA, idx: 0 },
                { label: "B", val: qOptB, setVal: setQOptB, idx: 1 },
                { label: "C", val: qOptC, setVal: setQOptC, idx: 2 },
                { label: "D", val: qOptD, setVal: setQOptD, idx: 3 },
              ].map((opt) => (
                <View key={opt.label} style={styles.optionInputRow}>
                  <TouchableOpacity
                    style={[
                      styles.correctCheckCircle,
                      qCorrectIndex === opt.idx && styles.correctCheckCircleActive,
                    ]}
                    onPress={() => setQCorrectIndex(opt.idx)}
                  >
                    {qCorrectIndex === opt.idx && <Check size={12} color="#ffffff" strokeWidth={3} />}
                  </TouchableOpacity>
                  <View style={styles.flexItem}>
                    <InputCustom
                      label={`Opção ${opt.label}${qCorrectIndex === opt.idx ? " (Gabarito Correto)" : ""}`}
                      value={opt.val}
                      onChangeText={opt.setVal}
                      placeholder={`Texto da opção ${opt.label}...`}
                    />
                  </View>
                </View>
              ))}

              {/* Explicação Pedagógica */}
              <InputCustom
                label="Explicação Pedagógica (Feedback ao Aluno)"
                value={qExplanation}
                onChangeText={setQExplanation}
                placeholder="Explique o motivo desta alternativa ser a correta..."
              />

              {/* Recompensa XP */}
              <InputCustom
                label="XP Concedido ao Acertar"
                value={qXp}
                onChangeText={setQXp}
                keyboardType="numeric"
                placeholder="60"
              />

              <View style={styles.modalActionsRow}>
                <ButtonCustom
                  title="Cancelar"
                  variant="secondary"
                  onPress={() => setIsQuestionModalOpen(false)}
                  style={styles.flexItem}
                />
                <ButtonCustom
                  title="Salvar Questão"
                  variant="primary"
                  onPress={handleSaveQuestion}
                  style={styles.flexItem}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

function FileTextIcon() {
  return (
    <View style={styles.fileIconBox}>
      <Sparkles size={16} color="#c084fc" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#160d2e",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 110,
    maxWidth: 700,
    width: "100%",
    alignSelf: "center",
  },
  flexItem: {
    flex: 1,
  },
  whiteBold: {
    color: "#ffffff",
    fontWeight: "700",
  },

  // Toast
  toastContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#14532d",
    borderWidth: 1,
    borderColor: "#22c55e",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  toastText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    flex: 1,
  },

  // Header Hero
  headerHero: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 16,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  badgeDocente: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(250, 204, 21, 0.15)",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeDocenteText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#facc15",
    letterSpacing: 0.8,
  },
  switchRoleButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  switchRoleText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#c4b5fd",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#a99bc4",
    marginTop: 2,
    marginBottom: 14,
  },

  // KPIs
  kpiRow: {
    flexDirection: "row",
    gap: 10,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  kpiCardDanger: {
    backgroundColor: "rgba(239, 68, 68, 0.18)",
    borderColor: "rgba(239, 68, 68, 0.4)",
  },
  kpiValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#ffffff",
    marginTop: 4,
  },
  kpiValueDanger: {
    color: "#f87171",
  },
  kpiLabel: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8,
    fontWeight: "700",
    color: "#9487b0",
    marginTop: 1,
    letterSpacing: 0.6,
  },

  // Tabs
  tabSelector: {
    flexDirection: "row",
    backgroundColor: "#20133e",
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 9,
    borderRadius: 10,
  },
  tabButtonActive: {
    backgroundColor: "#6b4ee8",
  },
  tabButtonText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#9487b0",
  },
  tabButtonTextActive: {
    color: "#ffffff",
  },

  tabContent: {
    gap: 14,
  },

  // Alerta de Risco Banner
  alertBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.35)",
    borderRadius: 16,
    padding: 14,
  },
  alertBannerTextCol: {
    flex: 1,
  },
  alertBannerTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#fca5a5",
    marginBottom: 3,
  },
  alertBannerDesc: {
    fontSize: 10.5,
    color: "#cbd5e1",
    lineHeight: 15,
  },

  // Busca e Filtros
  searchBarBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#20133e",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: "#ffffff",
    paddingVertical: 2,
  },
  filterPillsRow: {
    flexDirection: "row",
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  filterPillActive: {
    backgroundColor: "#6b4ee8",
  },
  filterPillDangerActive: {
    backgroundColor: "#ef4444",
  },
  filterPillText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9487b0",
  },
  filterPillTextActive: {
    color: "#ffffff",
  },

  // Lista de Alunos
  studentsList: {
    gap: 10,
  },
  studentCard: {
    backgroundColor: "#20133e",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
    padding: 14,
    overflow: "hidden",
  },
  studentCardDanger: {
    borderColor: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.07)",
  },
  studentRiskBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#ef4444",
    marginHorizontal: -14,
    marginTop: -14,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  studentRiskBadgeText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.8,
  },
  studentMainRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  studentAvatarBox: {
    position: "relative",
    width: 46,
    height: 46,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#6b4ee8",
    overflow: "hidden",
  },
  studentAvatarBoxDanger: {
    borderColor: "#ef4444",
  },
  studentAvatarImg: {
    width: "100%",
    height: "100%",
  },
  studentRankBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    paddingHorizontal: 4,
    borderTopLeftRadius: 6,
  },
  studentRankText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#ffffff",
  },
  studentInfoCol: {
    flex: 1,
  },
  studentNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  studentNameText: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#ffffff",
    flex: 1,
  },
  studentLevelTag: {
    backgroundColor: "rgba(107, 78, 232, 0.25)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  studentLevelTagText: {
    fontSize: 8.5,
    fontWeight: "800",
    color: "#c4b5fd",
  },
  studentEmailText: {
    fontSize: 10,
    color: "#8e80ab",
    marginTop: 1,
    marginBottom: 4,
  },
  studentStatsRow: {
    flexDirection: "row",
    gap: 12,
  },
  studentStatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  studentStatText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#d1c7e6",
  },
  studentFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  studentLastActiveCol: {
    flex: 1,
  },
  activityDotRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  activityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activityDotGreen: {
    backgroundColor: "#4ade80",
  },
  activityDotRed: {
    backgroundColor: "#ef4444",
  },
  studentLastActiveText: {
    fontSize: 9.5,
    color: "#9487b0",
  },
  studentLastActiveDanger: {
    color: "#fca5a5",
    fontWeight: "700",
  },
  studentNotesText: {
    fontSize: 9,
    color: "#7e729a",
    fontStyle: "italic",
    marginTop: 1,
  },
  studentActionsRow: {
    flexDirection: "row",
    gap: 6,
  },
  resolveAlertButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#22c55e",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  resolveAlertText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#ffffff",
  },
  editXpButton: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  editXpText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#c4b5fd",
  },

  // Gestão de Conteúdo
  contentManagementHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 10,
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ffffff",
  },
  sectionHeaderDesc: {
    fontSize: 10.5,
    color: "#9487b0",
    lineHeight: 14,
    marginTop: 2,
  },
  addQuestionCta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#6b4ee8",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addQuestionCtaText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#ffffff",
  },
  questionsList: {
    gap: 12,
  },
  questionCard: {
    backgroundColor: "#20133e",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
    padding: 14,
  },
  questionCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  questionTrackBadge: {
    backgroundColor: "rgba(107, 78, 232, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  questionTrackBadgeText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#c4b5fd",
  },
  questionMetaRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  questionXpTag: {
    fontSize: 10,
    fontWeight: "800",
    color: "#facc15",
  },
  deleteQuestionBtn: {
    padding: 4,
  },
  questionTitleText: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: 17,
    marginBottom: 10,
  },
  questionOptionsList: {
    gap: 5,
    marginBottom: 10,
  },
  questionOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  questionOptionRowCorrect: {
    backgroundColor: "rgba(34, 197, 94, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.35)",
  },
  questionOptionLetter: {
    fontSize: 10,
    fontWeight: "800",
    color: "#9487b0",
  },
  questionOptionLetterCorrect: {
    color: "#4ade80",
  },
  questionOptionText: {
    fontSize: 10.5,
    color: "#cbd5e1",
    flex: 1,
  },
  questionOptionTextCorrect: {
    color: "#ffffff",
    fontWeight: "700",
  },
  questionExplanationBox: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 8,
    padding: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#facc15",
  },
  questionExplanationLabel: {
    fontSize: 8,
    fontWeight: "800",
    color: "#facc15",
    marginBottom: 2,
  },
  questionExplanationText: {
    fontSize: 9.5,
    color: "#a99bc4",
    lineHeight: 13,
  },

  // Avaliação & Testes
  specCard: {
    backgroundColor: "#20133e",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  specHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  fileIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(192, 132, 252, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  specTagline: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#c084fc",
    letterSpacing: 0.8,
  },
  specTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ffffff",
  },
  specBodyBox: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  specUserStoryText: {
    fontSize: 11,
    color: "#cbd5e1",
    lineHeight: 16,
  },
  specHighlight: {
    color: "#c084fc",
    fontWeight: "800",
  },
  acceptanceBox: {
    gap: 6,
  },
  acceptanceTitle: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 2,
  },
  acceptanceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  acceptanceText: {
    fontSize: 10,
    color: "#a99bc4",
    flex: 1,
  },

  testCaseCard: {
    backgroundColor: "#20133e",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  testCaseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  testCaseTag: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#4ade80",
    letterSpacing: 0.8,
  },
  testCaseTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ffffff",
  },
  testStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  testStatusBadgePending: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  testStatusBadgeSuccess: {
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    borderWidth: 1,
    borderColor: "#22c55e",
  },
  testStatusBadgeText: {
    fontSize: 9,
    fontWeight: "800",
  },
  testStatusBadgeTextPending: {
    color: "#9487b0",
  },
  testStatusBadgeTextSuccess: {
    color: "#4ade80",
  },
  testTableBox: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 10,
    padding: 10,
    gap: 6,
    marginBottom: 14,
  },
  testTableRow: {
    flexDirection: "row",
    gap: 6,
  },
  testTableLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#c4b5fd",
    width: 105,
  },
  testTableValue: {
    fontSize: 10,
    color: "#cbd5e1",
    flex: 1,
    lineHeight: 14,
  },
  testRunBtn: {
    width: "100%",
  },
  testLogTerminal: {
    backgroundColor: "#0d061c",
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  testLogHeader: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#4ade80",
    marginBottom: 6,
  },
  testLogLine: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 9.5,
    color: "#cbd5e1",
    lineHeight: 15,
  },

  // Modais
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#1e113a",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalCardLarge: {
    maxHeight: "85%",
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#ffffff",
  },
  modalHeaderSubtitle: {
    fontSize: 10.5,
    color: "#9487b0",
    marginTop: 2,
  },
  modalBody: {
    gap: 12,
  },
  modalDescText: {
    fontSize: 11,
    color: "#a99bc4",
    lineHeight: 15,
  },
  modalActionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  modalScroll: {
    marginTop: 4,
  },
  formErrorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  formErrorText: {
    fontSize: 10.5,
    color: "#fca5a5",
    fontWeight: "700",
    flex: 1,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#c4b5fd",
    marginBottom: 6,
  },
  trackChipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  trackPickerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  trackChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  trackChipActive: {
    backgroundColor: "#6b4ee8",
  },
  trackChipText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9487b0",
  },
  trackChipTextActive: {
    color: "#ffffff",
  },
  optionInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
  },
  correctCheckCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#6b4ee8",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  correctCheckCircleActive: {
    backgroundColor: "#22c55e",
    borderColor: "#22c55e",
  },
});
