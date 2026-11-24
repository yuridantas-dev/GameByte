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
  Zap,
  Check,
  X,
  Trash2,
  BookOpen,
  LayoutGrid,
} from "lucide-react-native";
import { useApp } from "../context/AppContext";
import { CreatedQuestion } from "../types";
import { avatars3DData, tracksData, trackStagesData, quizQuestionsData } from "../data/mockData";
import { ButtonCustom } from "../components/ButtonCustom";
import { InputCustom } from "../components/InputCustom";

export function TelaPainelProfessor() {
  const {
    classStudents,
    recordStudentActivity,
    createdQuestions,
    addCustomQuestion,
    deleteCustomQuestion,
    setCurrentTab,
  } = useApp();

  // 2 Abas principais limpas
  const [activeTab, setActiveTab] = useState<"frequencia" | "trilhas">("frequencia");

  // Filtros de Alunos & Frequência
  const [filterMode, setFilterMode] = useState<"all" | "infrequent" | "frequent">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Gestão de Trilhas
  const [selectedTrackId, setSelectedTrackId] = useState<string>("logic");
  const [selectedStageId, setSelectedStageId] = useState<number>(1);

  // Modal de Criação Dinâmica de Questão
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
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

  // Helper de Toast
  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Métricas de Frequência
  const infrequentStudents = classStudents.filter((s) => s.lastActiveDaysAgo > 7);
  const frequentStudents = classStudents.filter((s) => s.lastActiveDaysAgo <= 7);

  // Filtragem da Lista de Alunos
  const filteredStudents = classStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterMode === "infrequent") {
      return student.lastActiveDaysAgo > 7;
    }
    if (filterMode === "frequent") {
      return student.lastActiveDaysAgo <= 7;
    }
    return true;
  });

  const getAvatarImage = (avatarId: number) => {
    const found = avatars3DData.find((a) => a.id === avatarId);
    return found ? found.image : avatars3DData[0].image;
  };

  // Trilha Selecionada
  const currentTrack = tracksData.find((t) => t.id === selectedTrackId) || tracksData[0];
  const stagesOfTrack = trackStagesData[selectedTrackId] || [];
  const currentStage = stagesOfTrack.find((s) => s.id === selectedStageId) || stagesOfTrack[0];

  // Questões da Trilha/Fase Selecionada (Padrão + Dinâmicas criadas pelo professor)
  const defaultQuestions = (quizQuestionsData[selectedTrackId]?.[selectedStageId] || []).map((q, idx) => ({
    id: `def-${selectedTrackId}-${selectedStageId}-${idx}`,
    trackId: selectedTrackId,
    trackName: currentTrack.name,
    stageId: selectedStageId,
    question: q.question,
    options: q.options,
    correct: q.correct,
    explanation: q.explanation || "Conceito fundamental abordado no módulo.",
    xp: currentStage ? currentStage.xp : 60,
    isDynamic: false,
  }));

  const dynamicQuestionsOfStage = createdQuestions
    .filter((q) => q.trackId === selectedTrackId && q.stageId === selectedStageId)
    .map((q) => ({
      ...q,
      isDynamic: true,
    }));

  const allQuestionsForStage = [...dynamicQuestionsOfStage, ...defaultQuestions];

  // Salvar Nova Questão Dinâmica
  const handleSaveQuestion = () => {
    if (!qQuestion.trim()) {
      setFormError("Informe o enunciado da pergunta.");
      return;
    }
    if (!qOptA.trim() || !qOptB.trim() || !qOptC.trim() || !qOptD.trim()) {
      setFormError("Preencha todas as 4 alternativas.");
      return;
    }
    if (!qExplanation.trim()) {
      setFormError("Informe a explicação pedagógica do gabarito.");
      return;
    }

    const options = [qOptA.trim(), qOptB.trim(), qOptC.trim(), qOptD.trim()];
    const correct = options[qCorrectIndex];

    addCustomQuestion({
      trackId: selectedTrackId,
      trackName: currentTrack.name,
      stageId: selectedStageId,
      question: qQuestion.trim(),
      options,
      correct,
      explanation: qExplanation.trim(),
      xp: parseInt(qXp, 10) || 60,
    });

    setFormError(null);
    setIsQuestionModalOpen(false);
    showToast("Questão adicionada dinamicamente com sucesso à trilha!");

    // Limpar formulário
    setQQuestion("");
    setQOptA("");
    setQOptB("");
    setQOptC("");
    setQOptD("");
    setQExplanation("");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Toast Flutuante de Confirmação */}
      {successToast && (
        <View style={styles.toastContainer}>
          <CheckCircle2 size={16} color="#4ade80" />
          <Text style={styles.toastText}>{successToast}</Text>
        </View>
      )}

      {/* Header Limpo do Docente */}
      <LinearGradient
        colors={["#2b135e", "#1b0d3e", "#12082b"]}
        style={styles.headerHero}
      >
        <View style={styles.headerTopRow}>
          <View style={styles.badgeDocente}>
            <GraduationCap size={13} color="#facc15" />
            <Text style={styles.badgeDocenteText}>PAINEL DO DOCENTE · FACULDADE CCI</Text>
          </View>
        </View>

        <Text style={styles.headerTitle}>Gestão de Turma & Conteúdo</Text>
        <Text style={styles.headerSubtitle}>
          Análise e Desenvolvimento de Sistemas · Acompanhamento de Alunos e Trilhas
        </Text>

        {/* Métricas Rápidas e Limpas de Frequência */}
        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Users size={16} color="#38bdf8" />
            <Text style={styles.kpiValue}>{classStudents.length}</Text>
            <Text style={styles.kpiLabel}>ALUNOS</Text>
          </View>

          <View style={styles.kpiCard}>
            <CheckCircle2 size={16} color="#4ade80" />
            <Text style={styles.kpiValue}>{frequentStudents.length}</Text>
            <Text style={styles.kpiLabel}>FREQUENTES</Text>
          </View>

          <View style={[styles.kpiCard, infrequentStudents.length > 0 && styles.kpiCardDanger]}>
            <AlertTriangle
              size={16}
              color={infrequentStudents.length > 0 ? "#f87171" : "#4ade80"}
            />
            <Text
              style={[
                styles.kpiValue,
                infrequentStudents.length > 0 && styles.kpiValueDanger,
              ]}
            >
              {infrequentStudents.length}
            </Text>
            <Text style={styles.kpiLabel}>INFREQUENTES (&gt;7d)</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Seletor Segmentado das 2 Abas */}
      <View style={styles.tabSelector}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "frequencia" && styles.tabButtonActive]}
          onPress={() => setActiveTab("frequencia")}
          activeOpacity={0.8}
        >
          <Users
            size={14}
            color={activeTab === "frequencia" ? "#ffffff" : "#9487b0"}
          />
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "frequencia" && styles.tabButtonTextActive,
            ]}
          >
            Alunos & Frequência {infrequentStudents.length > 0 ? `(${infrequentStudents.length} ⚠️)` : ""}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === "trilhas" && styles.tabButtonActive]}
          onPress={() => setActiveTab("trilhas")}
          activeOpacity={0.8}
        >
          <BookOpen
            size={14}
            color={activeTab === "trilhas" ? "#ffffff" : "#9487b0"}
          />
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "trilhas" && styles.tabButtonTextActive,
            ]}
          >
            Gestão de Trilhas & Quizzes
          </Text>
        </TouchableOpacity>
      </View>

      {/* ==================== ABA 1: ALUNOS & FREQUÊNCIA ==================== */}
      {activeTab === "frequencia" && (
        <View style={styles.tabContent}>
          {/* Banner de Atenção a Alunos Infrequentes */}
          {infrequentStudents.length > 0 && (
            <View style={styles.alertBanner}>
              <AlertTriangle size={18} color="#f87171" />
              <View style={styles.alertBannerTextCol}>
                <Text style={styles.alertBannerTitle}>
                  {infrequentStudents.length} aluno(s) sem acesso há mais de 7 dias
                </Text>
                <Text style={styles.alertBannerDesc}>
                  Acompanhe a frequência da turma. O sistema destaca automaticamente os estudantes ausentes para ação pedagógica imediata.
                </Text>
              </View>
            </View>
          )}

          {/* Busca */}
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
                filterMode === "infrequent" && styles.filterPillDangerActive,
              ]}
              onPress={() => setFilterMode("infrequent")}
            >
              <Text
                style={[
                  styles.filterPillText,
                  filterMode === "infrequent" && styles.filterPillTextActive,
                ]}
              >
                ⚠️ Infrequentes ({infrequentStudents.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                filterMode === "frequent" && styles.filterPillActive,
              ]}
              onPress={() => setFilterMode("frequent")}
            >
              <Text
                style={[
                  styles.filterPillText,
                  filterMode === "frequent" && styles.filterPillTextActive,
                ]}
              >
                Frequentes ({frequentStudents.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Lista de Alunos e Frequência */}
          <View style={styles.studentsList}>
            {filteredStudents.map((student, index) => {
              const isInfrequent = student.lastActiveDaysAgo > 7;

              return (
                <View
                  key={student.id}
                  style={[
                    styles.studentCard,
                    isInfrequent && styles.studentCardDanger,
                  ]}
                >
                  {/* Badge de Alerta para Infrequentes */}
                  {isInfrequent && (
                    <View style={styles.studentRiskBadge}>
                      <AlertTriangle size={12} color="#ffffff" />
                      <Text style={styles.studentRiskBadgeText}>
                        INFREQUENTE: {student.lastActiveDaysAgo} DIAS SEM ACESSO
                      </Text>
                    </View>
                  )}

                  <View style={styles.studentMainRow}>
                    {/* Avatar 3D do Aluno */}
                    <View
                      style={[
                        styles.studentAvatarBox,
                        isInfrequent && styles.studentAvatarBoxDanger,
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

                    {/* Informações do Aluno */}
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

                      {/* Métricas e Progresso */}
                      <View style={styles.studentStatsRow}>
                        <View style={styles.studentStatItem}>
                          <Zap size={11} color="#facc15" fill="#facc15" />
                          <Text style={styles.studentStatText}>{student.xp.toLocaleString("pt-BR")} XP</Text>
                        </View>
                        <View style={styles.studentStatItem}>
                          <Clock size={11} color="#38bdf8" />
                          <Text style={styles.studentStatText}>{student.streak} dias sequência</Text>
                        </View>
                        <View style={styles.studentStatItem}>
                          <BookOpen size={11} color="#c084fc" />
                          <Text style={styles.studentStatText}>{student.tracksCompleted} trilhas</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Linha de Frequência e Ação Docente */}
                  <View style={styles.studentFooterRow}>
                    <View style={styles.studentLastActiveCol}>
                      <View style={styles.activityDotRow}>
                        <View
                          style={[
                            styles.activityDot,
                            isInfrequent ? styles.activityDotRed : styles.activityDotGreen,
                          ]}
                        />
                        <Text
                          style={[
                            styles.studentLastActiveText,
                            isInfrequent && styles.studentLastActiveDanger,
                          ]}
                        >
                          {isInfrequent
                            ? `Ausente há ${student.lastActiveDaysAgo} dias (${student.lastActiveDate})`
                            : `Frequente · ${student.lastActiveDate}`}
                        </Text>
                      </View>
                      {student.notes && (
                        <Text style={styles.studentNotesText} numberOfLines={1}>
                          {student.notes}
                        </Text>
                      )}
                    </View>

                    {/* Botão de Registrar Presença / Apoio (Sem ajuste de XP) */}
                    {isInfrequent && (
                      <TouchableOpacity
                        style={styles.resolveAlertButton}
                        onPress={() => {
                          recordStudentActivity(student.id);
                          showToast(`Presença/Apoio registrado para ${student.name}!`);
                        }}
                        activeOpacity={0.8}
                      >
                        <Check size={12} color="#ffffff" strokeWidth={3} />
                        <Text style={styles.resolveAlertText}>Registrar Presença</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* ==================== ABA 2: GESTÃO DE TRILHAS & QUIZZES (ORGANIZADA POR TRILHAS) ==================== */}
      {activeTab === "trilhas" && (
        <View style={styles.tabContent}>
          {/* Seletor Horizontal de Trilhas */}
          <Text style={styles.sectionHeaderTitle}>Selecione a Trilha para Administrar:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trackScrollList}
          >
            {tracksData.map((track) => {
              const isSelected = track.id === selectedTrackId;
              return (
                <TouchableOpacity
                  key={track.id}
                  style={[
                    styles.trackSelectCard,
                    isSelected && styles.trackSelectCardActive,
                  ]}
                  onPress={() => {
                    setSelectedTrackId(track.id);
                    setSelectedStageId(1);
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.trackSelectCardName,
                      isSelected && styles.trackSelectCardNameActive,
                    ]}
                    numberOfLines={1}
                  >
                    {track.name}
                  </Text>
                  <Text style={styles.trackSelectCardCategory}>
                    {track.category === "professional" ? "Profissionalizante" : "Fundamental"} · {track.lessons}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Cabeçalho da Trilha Atual com Ação de Nova Questão */}
          <View style={styles.trackDetailBanner}>
            <View style={styles.flexItem}>
              <View style={styles.trackCategoryBadge}>
                <Text style={styles.trackCategoryBadgeText}>
                  TRILHA SELECIONADA · {currentTrack.category.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.trackDetailBannerTitle}>{currentTrack.name}</Text>
              <Text style={styles.trackDetailBannerSubtitle}>
                Administre os módulos, visualize os quizzes cadastrados e insira novas perguntas dinâmicas.
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

          {/* Seletor de Fases / Módulos da Trilha */}
          <View style={styles.stagesSelectorBox}>
            <Text style={styles.stagesSelectorLabel}>Módulo / Fase da Trilha:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.stagesChipsRow}
            >
              {stagesOfTrack.map((stage) => {
                const isSelected = stage.id === selectedStageId;
                return (
                  <TouchableOpacity
                    key={stage.id}
                    style={[
                      styles.stageChip,
                      isSelected && styles.stageChipActive,
                    ]}
                    onPress={() => setSelectedStageId(stage.id)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.stageChipText,
                        isSelected && styles.stageChipTextActive,
                      ]}
                    >
                      Fase {stage.id}: {stage.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Lista de Questões deste Módulo (Padrão + Dinâmicas) */}
          <View style={styles.questionsContainer}>
            <View style={styles.questionsListHeader}>
              <Text style={styles.questionsCountText}>
                {allQuestionsForStage.length} questão(ões) no Módulo {selectedStageId}
              </Text>
              <Text style={styles.questionsHintText}>
                (Quizzes ativos para os estudantes no app)
              </Text>
            </View>

            {allQuestionsForStage.map((q, idx) => (
              <View key={q.id} style={styles.questionCard}>
                <View style={styles.questionCardHeader}>
                  <View style={styles.questionBadgeRow}>
                    <View
                      style={[
                        styles.questionSourceBadge,
                        q.isDynamic ? styles.questionSourceDynamic : styles.questionSourceDefault,
                      ]}
                    >
                      <Text
                        style={[
                          styles.questionSourceText,
                          q.isDynamic ? styles.questionSourceTextDynamic : styles.questionSourceTextDefault,
                        ]}
                      >
                        {q.isDynamic ? "CRIADA PELO PROFESSOR" : "EMENTA PADRÃO"}
                      </Text>
                    </View>
                    <Text style={styles.questionXpTag}>+{q.xp} XP</Text>
                  </View>

                  {/* Botão de Excluir Apenas se for Questão Criada pelo Professor */}
                  {q.isDynamic && (
                    <TouchableOpacity
                      onPress={() => {
                        deleteCustomQuestion(q.id);
                        showToast("Questão dinâmica removida com sucesso!");
                      }}
                      style={styles.deleteQuestionBtn}
                    >
                      <Trash2 size={13} color="#f87171" />
                    </TouchableOpacity>
                  )}
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

      {/* ==================== MODAL: CRIAR NOVA QUESTÃO DINÂMICA ==================== */}
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
                <Text style={styles.modalHeaderTitle}>Nova Questão Dinâmica</Text>
                <Text style={styles.modalHeaderSubtitle}>
                  Trilha: {currentTrack.name} · Fase {selectedStageId}
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

              {/* Enunciado */}
              <InputCustom
                label="ENUNCIADO DA PERGUNTA"
                value={qQuestion}
                onChangeText={setQQuestion}
                placeholder="Ex: Em algoritmos, qual a finalidade da instrução RETORNE?"
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
                label="EXPLICAÇÃO PEDAGÓGICA (FEEDBACK DIDÁTICO)"
                value={qExplanation}
                onChangeText={setQExplanation}
                placeholder="Por que esta é a resposta correta? Explique o raciocínio..."
              />

              {/* XP Concedido */}
              <InputCustom
                label="XP CONCEDIDO"
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

  // Tabs Segmentadas
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
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabButtonActive: {
    backgroundColor: "#6b4ee8",
  },
  tabButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9487b0",
  },
  tabButtonTextActive: {
    color: "#ffffff",
    fontWeight: "800",
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
  resolveAlertButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#22c55e",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  resolveAlertText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#ffffff",
  },

  // Gestão de Trilhas
  sectionHeaderTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8,
  },
  trackScrollList: {
    gap: 8,
    paddingBottom: 4,
  },
  trackSelectCard: {
    backgroundColor: "#20133e",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    minWidth: 160,
  },
  trackSelectCardActive: {
    backgroundColor: "#6b4ee8",
    borderColor: "#8b5cf6",
  },
  trackSelectCardName: {
    fontSize: 12,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 2,
  },
  trackSelectCardNameActive: {
    color: "#ffffff",
  },
  trackSelectCardCategory: {
    fontSize: 9,
    color: "#a99bc4",
  },

  // Banner da Trilha Selecionada
  trackDetailBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#20133e",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  trackCategoryBadge: {
    backgroundColor: "rgba(107, 78, 232, 0.25)",
    alignSelf: "flex-start",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  trackCategoryBadgeText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8,
    fontWeight: "800",
    color: "#c4b5fd",
  },
  trackDetailBannerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ffffff",
  },
  trackDetailBannerSubtitle: {
    fontSize: 10,
    color: "#9487b0",
    marginTop: 2,
    lineHeight: 14,
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

  // Seletor de Fases da Trilha
  stagesSelectorBox: {
    gap: 6,
  },
  stagesSelectorLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#c4b5fd",
  },
  stagesChipsRow: {
    gap: 6,
    paddingBottom: 2,
  },
  stageChip: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  stageChipActive: {
    backgroundColor: "#6b4ee8",
    borderColor: "#8b5cf6",
  },
  stageChipText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#9487b0",
  },
  stageChipTextActive: {
    color: "#ffffff",
    fontWeight: "800",
  },

  // Container de Questões
  questionsContainer: {
    gap: 10,
  },
  questionsListHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionsCountText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#ffffff",
  },
  questionsHintText: {
    fontSize: 10,
    color: "#8a7d9e",
  },
  questionCard: {
    backgroundColor: "#20133e",
    borderRadius: 16,
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
  questionBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  questionSourceBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  questionSourceDefault: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  questionSourceDynamic: {
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.35)",
  },
  questionSourceText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8,
    fontWeight: "800",
  },
  questionSourceTextDefault: {
    color: "#a99bc4",
  },
  questionSourceTextDynamic: {
    color: "#4ade80",
  },
  questionXpTag: {
    fontSize: 9.5,
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

  // Modal de Criação de Questão
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
  modalActionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
});
