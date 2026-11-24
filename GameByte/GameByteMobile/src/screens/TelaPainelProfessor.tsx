import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Users,
  AlertTriangle,
  GraduationCap,
  Search,
  CheckCircle2,
  Clock,
  Check,
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react-native";
import { useApp } from "../context/AppContext";
import { avatars3DData } from "../data/mockData";

type TurmaFilter = "all" | "ADS 1" | "ADS 2" | "ADS 3";

interface TurmaInfo {
  id: TurmaFilter;
  label: string;
  semester: string;
  description: string;
}

const turmasList: TurmaInfo[] = [
  {
    id: "all",
    label: "Todas as Turmas",
    semester: "Geral",
    description: "Visão consolidada de todos os semestres",
  },
  {
    id: "ADS 1",
    label: "ADS 1",
    semester: "1º Semestre",
    description: "Algoritmos e Lógica de Programação",
  },
  {
    id: "ADS 2",
    label: "ADS 2",
    semester: "2º Semestre",
    description: "Desenvolvimento Web e Banco de Dados",
  },
  {
    id: "ADS 3",
    label: "ADS 3",
    semester: "3º Semestre",
    description: "Programação com Python e Engenharia",
  },
];

export function TelaPainelProfessor() {
  const { classStudents, recordStudentActivity } = useApp();

  // Seleção de Turma (ADS 1, ADS 2, ADS 3 ou Todas)
  const [selectedTurma, setSelectedTurma] = useState<TurmaFilter>("all");

  // Filtros de Frequência e Busca
  const [filterMode, setFilterMode] = useState<"all" | "infrequent" | "frequent">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Helper de Toast
  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Alunos pertencentes à turma selecionada
  const studentsOfTurma = classStudents.filter((student) => {
    if (selectedTurma === "all") return true;
    return student.turma === selectedTurma;
  });

  // Métricas da Turma Selecionada
  const totalTurmaStudents = studentsOfTurma.length;
  const infrequentStudents = studentsOfTurma.filter((s) => s.lastActiveDaysAgo > 7);
  const frequentStudents = studentsOfTurma.filter((s) => s.lastActiveDaysAgo <= 7);
  const frequencyRate =
    totalTurmaStudents > 0
      ? Math.round((frequentStudents.length / totalTurmaStudents) * 100)
      : 100;

  // Filtragem final com busca e modo de frequência
  const filteredStudents = studentsOfTurma.filter((student) => {
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

  const currentTurmaMeta =
    turmasList.find((t) => t.id === selectedTurma) || turmasList[0];

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

        <Text style={styles.headerTitle}>Gestão de Turmas & Frequência</Text>
        <Text style={styles.headerSubtitle}>
          Análise e Desenvolvimento de Sistemas · Acompanhamento por Semestre
        </Text>

        {/* Métricas Rápidas de Frequência da Turma Selecionada */}
        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Users size={16} color="#38bdf8" />
            <Text style={styles.kpiValue}>{totalTurmaStudents}</Text>
            <Text style={styles.kpiLabel}>ALUNOS</Text>
          </View>

          <View style={styles.kpiCard}>
            <CheckCircle2 size={16} color="#4ade80" />
            <Text style={styles.kpiValue}>{frequentStudents.length}</Text>
            <Text style={styles.kpiLabel}>FREQUENTES</Text>
          </View>

          <View
            style={[
              styles.kpiCard,
              infrequentStudents.length > 0 && styles.kpiCardDanger,
            ]}
          >
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
            <Text style={styles.kpiLabel}>EM RISCO (&gt;7d)</Text>
          </View>

          <View style={styles.kpiCard}>
            <Clock size={16} color="#facc15" />
            <Text style={styles.kpiValue}>{frequencyRate}%</Text>
            <Text style={styles.kpiLabel}>FREQ. MÉDIA</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Seção 1: Seleção de Turma / Semestre */}
      <View style={styles.turmaSection}>
        <View style={styles.sectionHeaderRow}>
          <BookOpen size={16} color="#a78bfa" />
          <Text style={styles.sectionTitle}>Selecione a Turma</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Filtre os alunos de acordo com o semestre letivo matriculado:
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.turmaChipsContainer}
        >
          {turmasList.map((turma) => {
            const isSelected = selectedTurma === turma.id;
            const turmaStudentCount =
              turma.id === "all"
                ? classStudents.length
                : classStudents.filter((s) => s.turma === turma.id).length;
            const turmaInfrequentCount =
              turma.id === "all"
                ? classStudents.filter((s) => s.lastActiveDaysAgo > 7).length
                : classStudents.filter(
                    (s) => s.turma === turma.id && s.lastActiveDaysAgo > 7
                  ).length;

            return (
              <TouchableOpacity
                key={turma.id}
                style={[
                  styles.turmaCard,
                  isSelected && styles.turmaCardSelected,
                ]}
                onPress={() => setSelectedTurma(turma.id)}
                activeOpacity={0.8}
              >
                <View style={styles.turmaCardTop}>
                  <Text
                    style={[
                      styles.turmaCardLabel,
                      isSelected && styles.turmaCardLabelSelected,
                    ]}
                  >
                    {turma.label}
                  </Text>
                  {turmaInfrequentCount > 0 && (
                    <View style={styles.turmaAlertDot}>
                      <Text style={styles.turmaAlertDotText}>
                        {turmaInfrequentCount}
                      </Text>
                    </View>
                  )}
                </View>

                <Text
                  style={[
                    styles.turmaCardSemester,
                    isSelected && styles.turmaCardSemesterSelected,
                  ]}
                >
                  {turma.semester}
                </Text>

                <View style={styles.turmaCardFooter}>
                  <Users
                    size={11}
                    color={isSelected ? "#e9d5ff" : "#94a3b8"}
                  />
                  <Text
                    style={[
                      styles.turmaCardCountText,
                      isSelected && styles.turmaCardCountTextSelected,
                    ]}
                  >
                    {turmaStudentCount} alunos
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Banner Informativo da Turma Ativa */}
      <View style={styles.turmaBanner}>
        <View style={styles.turmaBannerIconBox}>
          <Layers size={16} color="#c4b5fd" />
        </View>
        <View style={styles.turmaBannerMeta}>
          <Text style={styles.turmaBannerTitle}>
            Turma Selecionada: {currentTurmaMeta.label} ({currentTurmaMeta.semester})
          </Text>
          <Text style={styles.turmaBannerDesc}>
            {currentTurmaMeta.description} · {totalTurmaStudents} alunos matriculados
          </Text>
        </View>
      </View>

      {/* Seção 2: Busca e Filtros de Frequência */}
      <View style={styles.searchAndFiltersSection}>
        <View style={styles.searchBox}>
          <Search size={15} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder={`Buscar alunos em ${currentTurmaMeta.label}...`}
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterPillsRow}>
          <TouchableOpacity
            style={[
              styles.filterPill,
              filterMode === "all" && styles.filterPillActive,
            ]}
            onPress={() => setFilterMode("all")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterPillText,
                filterMode === "all" && styles.filterPillTextActive,
              ]}
            >
              Todos ({totalTurmaStudents})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              filterMode === "infrequent" && styles.filterPillDangerActive,
            ]}
            onPress={() => setFilterMode("infrequent")}
            activeOpacity={0.7}
          >
            <AlertTriangle
              size={12}
              color={filterMode === "infrequent" ? "#ffffff" : "#f87171"}
            />
            <Text
              style={[
                styles.filterPillText,
                filterMode === "infrequent" && styles.filterPillDangerTextActive,
              ]}
            >
              Em Risco ({infrequentStudents.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              filterMode === "frequent" && styles.filterPillSuccessActive,
            ]}
            onPress={() => setFilterMode("frequent")}
            activeOpacity={0.7}
          >
            <CheckCircle2
              size={12}
              color={filterMode === "frequent" ? "#ffffff" : "#4ade80"}
            />
            <Text
              style={[
                styles.filterPillText,
                filterMode === "frequent" && styles.filterPillSuccessTextActive,
              ]}
            >
              Frequentes ({frequentStudents.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Seção 3: Lista de Alunos e Frequência */}
      <View style={styles.studentsListSection}>
        {filteredStudents.length === 0 ? (
          <View style={styles.emptyStateBox}>
            <Users size={32} color="#64748b" />
            <Text style={styles.emptyStateTitle}>Nenhum aluno encontrado</Text>
            <Text style={styles.emptyStateDesc}>
              Ajuste o termo de busca ou selecione outro filtro de frequência para visualizar os alunos.
            </Text>
          </View>
        ) : (
          filteredStudents.map((student) => {
            const isInfrequent = student.lastActiveDaysAgo > 7;

            return (
              <View
                key={student.id}
                style={[
                  styles.studentCard,
                  isInfrequent && styles.studentCardInfrequent,
                ]}
              >
                <View style={styles.studentCardTopRow}>
                  <Image
                    source={getAvatarImage(student.avatarId)}
                    style={styles.studentAvatar}
                    resizeMode="cover"
                  />

                  <View style={styles.studentMainMeta}>
                    <View style={styles.studentNameLine}>
                      <Text style={styles.studentName}>{student.name}</Text>
                      {isInfrequent && (
                        <View style={styles.badgeDangerMini}>
                          <AlertTriangle size={10} color="#ef4444" />
                          <Text style={styles.badgeDangerMiniText}>
                            &gt;7d sem acesso
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.studentEmail}>{student.email}</Text>

                    {/* Chips de Identificação do Aluno */}
                    <View style={styles.studentChipsRow}>
                      <View style={styles.studentTurmaBadge}>
                        <Text style={styles.studentTurmaBadgeText}>
                          {student.turma} · {student.semester}º Semestre
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.frequencyStatusBadge,
                          isInfrequent
                            ? styles.frequencyStatusBadgeDanger
                            : styles.frequencyStatusBadgeSuccess,
                        ]}
                      >
                        {isInfrequent ? (
                          <AlertTriangle size={10} color="#f87171" />
                        ) : (
                          <CheckCircle2 size={10} color="#4ade80" />
                        )}
                        <Text
                          style={[
                            styles.frequencyStatusBadgeText,
                            isInfrequent
                              ? styles.frequencyStatusBadgeTextDanger
                              : styles.frequencyStatusBadgeTextSuccess,
                          ]}
                        >
                          {student.lastActiveDaysAgo === 0
                            ? "Ativo hoje"
                            : student.lastActiveDaysAgo === 1
                            ? "Ativo ontem"
                            : `Ativo há ${student.lastActiveDaysAgo} dias`}
                        </Text>
                      </View>

                      <View style={styles.studentXpBadge}>
                        <Text style={styles.studentXpBadgeText}>
                          Nv. {student.level} · {student.xp.toLocaleString("pt-BR")} XP
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Nota / Observação Pedagógica */}
                {student.notes && (
                  <View style={styles.studentNotesBox}>
                    <Text style={styles.studentNotesText}>
                      Observação: {student.notes}
                    </Text>
                  </View>
                )}

                {/* Linha de Ação do Professor: Registrar Presença / Suporte */}
                <View style={styles.studentActionsRow}>
                  <TouchableOpacity
                    style={[
                      styles.registerPresenceBtn,
                      isInfrequent && styles.registerPresenceBtnHighlight,
                    ]}
                    onPress={() => {
                      recordStudentActivity(student.id);
                      showToast(
                        `Presença e atendimento confirmados para ${student.name}.`
                      );
                    }}
                    activeOpacity={0.8}
                  >
                    <Check size={14} color="#ffffff" />
                    <Text style={styles.registerPresenceBtnText}>
                      {isInfrequent
                        ? "Registrar Presença / Contato Pedagógico"
                        : "Confirmar Presença em Aula"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </View>
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
    paddingBottom: 120,
    maxWidth: 900,
    width: "100%",
    alignSelf: "center",
  },

  // Toast
  toastContainer: {
    position: "absolute",
    top: 14,
    left: 20,
    right: 20,
    backgroundColor: "#1e133d",
    borderWidth: 1,
    borderColor: "#4ade80",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  toastText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#e2e8f0",
    flex: 1,
  },

  // Header Hero
  headerHero: {
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
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
    gap: 6,
    backgroundColor: "rgba(250, 204, 21, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.35)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeDocenteText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#facc15",
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -0.4,
    marginTop: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#c4b5fd",
    marginTop: 4,
    lineHeight: 16,
  },

  // KPIs
  kpiRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  kpiCardDanger: {
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    borderColor: "rgba(239, 68, 68, 0.35)",
  },
  kpiValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#ffffff",
    marginTop: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  kpiValueDanger: {
    color: "#f87171",
  },
  kpiLabel: {
    fontSize: 8.5,
    fontWeight: "800",
    color: "#94a3b8",
    marginTop: 2,
    textAlign: "center",
  },

  // Seção de Turmas
  turmaSection: {
    marginBottom: 14,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: "#94a3b8",
    marginBottom: 10,
  },
  turmaChipsContainer: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 2,
  },
  turmaCard: {
    width: 140,
    backgroundColor: "#211440",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 12,
  },
  turmaCardSelected: {
    backgroundColor: "#311863",
    borderColor: "#a855f7",
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  turmaCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  turmaCardLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#e2e8f0",
  },
  turmaCardLabelSelected: {
    color: "#ffffff",
  },
  turmaAlertDot: {
    backgroundColor: "#ef4444",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  turmaAlertDotText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#ffffff",
  },
  turmaCardSemester: {
    fontSize: 10.5,
    color: "#94a3b8",
    marginTop: 2,
    fontWeight: "600",
  },
  turmaCardSemesterSelected: {
    color: "#c4b5fd",
  },
  turmaCardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  turmaCardCountText: {
    fontSize: 10,
    color: "#94a3b8",
    fontWeight: "700",
  },
  turmaCardCountTextSelected: {
    color: "#e9d5ff",
  },

  // Banner Informativo da Turma Ativa
  turmaBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(124, 58, 237, 0.12)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(124, 58, 237, 0.25)",
    padding: 12,
    marginBottom: 16,
    gap: 12,
  },
  turmaBannerIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(124, 58, 237, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  turmaBannerMeta: {
    flex: 1,
  },
  turmaBannerTitle: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "#ffffff",
  },
  turmaBannerDesc: {
    fontSize: 11,
    color: "#c4b5fd",
    marginTop: 2,
  },

  // Busca e Filtros
  searchAndFiltersSection: {
    marginBottom: 14,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#211440",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    gap: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 12.5,
  },
  filterPillsRow: {
    flexDirection: "row",
    gap: 8,
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#211440",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  filterPillActive: {
    backgroundColor: "#5b21b6",
    borderColor: "#7c3aed",
  },
  filterPillDangerActive: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    borderColor: "#ef4444",
  },
  filterPillSuccessActive: {
    backgroundColor: "rgba(74, 222, 128, 0.2)",
    borderColor: "#4ade80",
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94a3b8",
  },
  filterPillTextActive: {
    color: "#ffffff",
  },
  filterPillDangerTextActive: {
    color: "#f87171",
  },
  filterPillSuccessTextActive: {
    color: "#4ade80",
  },

  // Lista de Alunos
  studentsListSection: {
    gap: 10,
  },
  studentCard: {
    backgroundColor: "#211440",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 14,
  },
  studentCardInfrequent: {
    borderColor: "rgba(239, 68, 68, 0.4)",
    backgroundColor: "rgba(33, 20, 64, 0.98)",
  },
  studentCardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  studentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#160d2e",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  studentMainMeta: {
    flex: 1,
  },
  studentNameLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  studentName: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.2,
  },
  badgeDangerMini: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(239, 68, 68, 0.18)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeDangerMiniText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#f87171",
  },
  studentEmail: {
    fontSize: 11,
    color: "#94a3b8",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginTop: 2,
  },
  studentChipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  studentTurmaBadge: {
    backgroundColor: "rgba(168, 85, 247, 0.15)",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(168, 85, 247, 0.3)",
  },
  studentTurmaBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#d8b4fe",
  },
  frequencyStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  frequencyStatusBadgeSuccess: {
    backgroundColor: "rgba(74, 222, 128, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(74, 222, 128, 0.25)",
  },
  frequencyStatusBadgeDanger: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  frequencyStatusBadgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
  frequencyStatusBadgeTextSuccess: {
    color: "#4ade80",
  },
  frequencyStatusBadgeTextDanger: {
    color: "#f87171",
  },
  studentXpBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  studentXpBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#cbd5e1",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  studentNotesBox: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#7c3aed",
  },
  studentNotesText: {
    fontSize: 11,
    color: "#cbd5e1",
    lineHeight: 15,
    fontStyle: "italic",
  },
  studentActionsRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  registerPresenceBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#4f46e5",
    paddingVertical: 9,
    borderRadius: 10,
  },
  registerPresenceBtnHighlight: {
    backgroundColor: "#b91c1c",
  },
  registerPresenceBtnText: {
    fontSize: 11.5,
    fontWeight: "800",
    color: "#ffffff",
  },

  // Empty State
  emptyStateBox: {
    backgroundColor: "#211440",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 30,
    alignItems: "center",
    marginTop: 10,
  },
  emptyStateTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#ffffff",
    marginTop: 12,
  },
  emptyStateDesc: {
    fontSize: 11.5,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 16,
  },
});
