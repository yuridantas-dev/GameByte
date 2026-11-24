import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  Lock,
  Check,
  Gamepad2,
  Crown,
  Play,
  X,
  Sparkles,
  Zap,
  ChevronRight,
  Code2,
  BrainCircuit,
  Wifi,
  ShieldCheck,
  Layers,
  Cloud,
  Cpu,
  GraduationCap,
  BookOpen,
  Lightbulb,
  Terminal,
  Bug,
  CheckCircle,
  AlertTriangle,
} from "lucide-react-native";
import { useApp } from "../context/AppContext";
import { tracksData, trackStagesData, quizQuestionsData } from "../data/mockData";
import { Track, TrackStage } from "../types";
import { HeartDisplay } from "../components/HeartDisplay";
import { ButtonCustom } from "../components/ButtonCustom";
import { getStageGameData, CodeBlock, BugHunterLine } from "../data/gameData";

const { width: screenWidth } = Dimensions.get("window");
const isSmallDevice = screenWidth < 375;

export function TelaTrilhas() {
  const {
    selectedTrackId,
    setSelectedTrackId,
    unlockedStages,
    unlockNextStage,
    addXp,
    getTrackProgress,
    isTrackUnlocked,
    lives,
    loseLife,
    setShowOutOfLivesModal,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<"all" | "professional" | "fundamental">("all");
  const [activeStage, setActiveStage] = useState<TrackStage | null>(null);
  const [modalTab, setModalTab] = useState<"study" | "quiz">("study");

  // Game Sub-modes: "puzzle" (Montar Código) | "bug" (Caça ao Bug) | "quiz" (Quiz)
  const [gameSubMode, setGameSubMode] = useState<"puzzle" | "bug" | "quiz">("puzzle");

  // Code Puzzle state
  const [placedBlocks, setPlacedBlocks] = useState<CodeBlock[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<CodeBlock[]>([]);
  const [puzzleSuccess, setPuzzleSuccess] = useState(false);
  const [puzzleErrorMsg, setPuzzleErrorMsg] = useState<string | null>(null);

  // Bug Hunter state
  const [selectedBugLine, setSelectedBugLine] = useState<number | null>(null);
  const [bugSolved, setBugSolved] = useState(false);
  const [bugWrongFeedback, setBugWrongFeedback] = useState<string | null>(null);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizSuccess, setQuizSuccess] = useState(false);

  const selectedTrack = tracksData.find((t) => t.id === selectedTrackId);
  const stageGame =
    activeStage && selectedTrackId
      ? getStageGameData(selectedTrackId, activeStage.id, activeStage.title)
      : null;

  const initStageGames = (stage: TrackStage) => {
    if (!selectedTrackId) return;
    const game = getStageGameData(selectedTrackId, stage.id, stage.title);
    const shuffled = [...game.puzzle.blocks].sort(() => Math.random() - 0.5);
    setAvailableBlocks(shuffled);
    setPlacedBlocks([]);
    setPuzzleSuccess(false);
    setPuzzleErrorMsg(null);

    setSelectedBugLine(null);
    setBugSolved(false);
    setBugWrongFeedback(null);

    setCurrentQuestionIndex(0);
    setCorrectCount(0);
    setSelectedOption(null);
    setAnswerSubmitted(false);
    setQuizFinished(false);
    setQuizSuccess(false);
  };

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case "BrainCircuit":
        return <BrainCircuit size={20} color="#ffffff" />;
      case "Wifi":
        return <Wifi size={20} color="#ffffff" />;
      case "ShieldCheck":
        return <ShieldCheck size={20} color="#ffffff" />;
      case "Layers":
        return <Layers size={20} color="#ffffff" />;
      case "Cloud":
        return <Cloud size={20} color="#ffffff" />;
      case "Cpu":
        return <Cpu size={20} color="#ffffff" />;
      case "Terminal":
        return <Terminal size={20} color="#ffffff" />;
      default:
        return <Code2 size={20} color="#ffffff" />;
    }
  };

  const handleStageClick = (stage: TrackStage) => {
    const currentUnlocked = unlockedStages[selectedTrackId!] || 1;
    if (stage.id > currentUnlocked) {
      return;
    }
    setActiveStage(stage);
    setModalTab("study");
    initStageGames(stage);
  };

  const handleStartChallenge = () => {
    if (lives <= 0) {
      setShowOutOfLivesModal(true);
      return;
    }
    setModalTab("quiz");
  };

  const handleTabChange = (tab: "study" | "quiz") => {
    if (tab === "quiz" && lives <= 0) {
      setShowOutOfLivesModal(true);
      return;
    }
    setModalTab(tab);
  };

  // Puzzle Handlers
  const handlePlaceBlock = (block: CodeBlock) => {
    if (puzzleSuccess) return;
    setAvailableBlocks((prev) => prev.filter((b) => b.id !== block.id));
    setPlacedBlocks((prev) => [...prev, block]);
    setPuzzleErrorMsg(null);
  };

  const handleRemoveBlock = (block: CodeBlock) => {
    if (puzzleSuccess) return;
    setPlacedBlocks((prev) => prev.filter((b) => b.id !== block.id));
    setAvailableBlocks((prev) => [...prev, block]);
    setPuzzleErrorMsg(null);
  };

  const handleResetPuzzle = () => {
    if (!stageGame) return;
    const shuffled = [...stageGame.puzzle.blocks].sort(() => Math.random() - 0.5);
    setAvailableBlocks(shuffled);
    setPlacedBlocks([]);
    setPuzzleSuccess(false);
    setPuzzleErrorMsg(null);
  };

  const handleExecutePuzzle = () => {
    if (!stageGame || placedBlocks.length === 0 || !activeStage || !selectedTrackId) return;

    const isMatch =
      placedBlocks.length === stageGame.puzzle.correctOrder.length &&
      placedBlocks.every((b, idx) => b.id === stageGame.puzzle.correctOrder[idx]);

    if (isMatch) {
      setPuzzleSuccess(true);
      setPuzzleErrorMsg(null);
      unlockNextStage(selectedTrackId, activeStage.id);
      addXp(activeStage.xp);
    } else {
      setPuzzleSuccess(false);
      const alive = loseLife(0.5);
      setPuzzleErrorMsg(
        "Erro de execução! A ordem dos blocos está incorreta. Você perdeu meio coração (-0.5 vida). Tente reorganizar a lógica!"
      );
      if (!alive) {
        setShowOutOfLivesModal(true);
      }
    }
  };

  // Bug Hunter Handlers
  const handleTapBugLine = (line: BugHunterLine) => {
    if (bugSolved || !stageGame || !activeStage || !selectedTrackId) return;
    setSelectedBugLine(line.lineNum);

    if (line.isBug) {
      setBugSolved(true);
      setBugWrongFeedback(null);
      unlockNextStage(selectedTrackId, activeStage.id);
      addXp(activeStage.xp);
    } else {
      const alive = loseLife(0.5);
      setBugWrongFeedback(
        `A linha ${line.lineNum} está correta! Você perdeu meio coração (-0.5 vida). Inspecione com cuidado a sintaxe das outras linhas!`
      );
      if (!alive) {
        setShowOutOfLivesModal(true);
      }
    }
  };

  // Quiz Handlers
  const handleAnswerSubmit = () => {
    if (!selectedOption || !selectedTrackId || !activeStage) return;
    const questions = quizQuestionsData[selectedTrackId]?.[activeStage.id] || [];
    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;

    setAnswerSubmitted(true);
    if (selectedOption === currentQ.correct) {
      setCorrectCount((prev) => prev + 1);
      setQuizSuccess(true);
    } else {
      setQuizSuccess(false);
      const alive = loseLife(0.5);
      if (!alive) {
        setShowOutOfLivesModal(true);
      }
    }
  };

  const handleNextQuestion = () => {
    if (!selectedTrackId || !activeStage) return;
    const questions = quizQuestionsData[selectedTrackId]?.[activeStage.id] || [];

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setAnswerSubmitted(false);
      setQuizSuccess(false);
    } else {
      setQuizFinished(true);
      const isPassed = correctCount + (quizSuccess ? 1 : 0) >= 1;
      if (isPassed) {
        unlockNextStage(selectedTrackId, activeStage.id);
        addXp(activeStage.xp);
      }
    }
  };

  const handleCloseModal = () => {
    setActiveStage(null);
    setModalTab("study");
  };

  const fundamentalTracks = tracksData.filter((t) => t.category === "fundamental");
  const professionalTracks = tracksData.filter((t) => t.category === "professional");

  const renderTrackCard = (track: Track) => {
    const progress = getTrackProgress(track.id);
    const isUnlocked = isTrackUnlocked(track);

    return (
      <View key={track.id} style={styles.trackCardContainer}>
        {/* Card Gradient Header */}
        <LinearGradient
          colors={track.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardHeader}
        >
          <View style={styles.cardHeaderCircle} pointerEvents="none" />
          <View style={styles.cardIconBox}>
            {getTrackIcon(track.iconName)}
          </View>
          {track.category === "professional" && (
            <View style={styles.professionalBadge}>
              <Sparkles size={10} color="#ffd700" />
              <Text style={styles.professionalBadgeText}>ESPECIALIZAÇÃO</Text>
            </View>
          )}
        </LinearGradient>

        {/* Card Body */}
        <View style={styles.cardBody}>
          <View style={styles.cardTitleRow}>
            <View style={styles.cardTitleInfo}>
              <Text style={styles.cardTitle}>{track.name}</Text>
              <Text style={styles.cardLessons}>{track.lessons}</Text>
            </View>
            <View style={styles.cardXpBadge}>
              <Text style={styles.cardXpText}>+ {track.xp}</Text>
            </View>
          </View>

          {/* Target Career Role if Professional */}
          {track.targetRole && (
            <View style={styles.targetRoleBox}>
              <GraduationCap size={13} color="#bbaaff" />
              <Text style={styles.targetRoleText}>
                Carreira: <Text style={styles.targetRoleBold}>{track.targetRole}</Text>
              </Text>
            </View>
          )}

          {/* Prerequisite Info Badge */}
          {track.prerequisiteNames && track.prerequisiteNames.length > 0 && (
            <View
              style={[
                styles.prerequisiteBox,
                isUnlocked ? styles.prerequisiteBoxUnlocked : styles.prerequisiteBoxLocked,
              ]}
            >
              {isUnlocked ? (
                <>
                  <Check size={12} color="#4ade80" />
                  <Text style={styles.prerequisiteTextUnlocked}>
                    Pré-requisitos concluídos
                  </Text>
                </>
              ) : (
                <>
                  <Lock size={12} color="#fca5a5" />
                  <Text style={styles.prerequisiteTextLocked}>
                    Requer: {track.prerequisiteNames.join(" e ")} (100%)
                  </Text>
                </>
              )}
            </View>
          )}

          {/* Progress Bar */}
          <View style={styles.cardProgressContainer}>
            <View style={styles.cardProgressTextRow}>
              <Text style={styles.cardProgressLabel}>Progresso</Text>
              <Text style={styles.cardProgressPercent}>{progress}%</Text>
            </View>
            <View style={styles.cardProgressBarTrack}>
              <View
                style={[
                  styles.cardProgressBarFill,
                  { width: `${progress}%` },
                ]}
              />
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={[
              styles.cardActionButton,
              !isUnlocked && styles.cardActionButtonLocked,
            ]}
            disabled={!isUnlocked}
            onPress={() => setSelectedTrackId(track.id)}
            activeOpacity={0.85}
          >
            {isUnlocked ? (
              <>
                <Text style={styles.cardActionButtonText}>
                  {progress > 0 ? "Continuar Trilha" : "Começar Trilha"}
                </Text>
                <ChevronRight size={15} color="#ffffff" />
              </>
            ) : (
              <>
                <Lock size={14} color="#82769c" />
                <Text style={styles.cardActionLockedText}>
                  Complete os Pré-requisitos
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {!selectedTrackId ? (
        // 1. Tracks Overview with Categories
        <View>
          <View style={styles.headerBlock}>
            <Text style={styles.headerTagline}>SEU MAPA DE CARREIRA TECH</Text>
            <Text style={styles.headerTitle}>
              Trilhas & Especializações.
            </Text>
            <Text style={styles.headerSubtitle}>
              Estude os conceitos técnicos antes de cada fase e desbloqueie trilhas profissionalizantes de alto nível.
            </Text>

            {/* Filter Pills */}
            <View style={styles.filterRow}>
              <TouchableOpacity
                style={[styles.filterPill, activeFilter === "all" && styles.filterPillActive]}
                onPress={() => setActiveFilter("all")}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterText, activeFilter === "all" && styles.filterTextActive]}>
                  Todas
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.filterPill, activeFilter === "professional" && styles.filterPillActive]}
                onPress={() => setActiveFilter("professional")}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterText, activeFilter === "professional" && styles.filterTextActive]}>
                  🚀 Profissionalizantes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.filterPill, activeFilter === "fundamental" && styles.filterPillActive]}
                onPress={() => setActiveFilter("fundamental")}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterText, activeFilter === "fundamental" && styles.filterTextActive]}>
                  📚 Fundamentos
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section: Trilhas Profissionalizantes */}
          {(activeFilter === "all" || activeFilter === "professional") && (
            <View style={styles.categorySection}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryTagPro}>
                  <Text style={styles.categoryTagProText}>ESPECIALIZAÇÕES DE CARREIRA</Text>
                </View>
                <Text style={styles.categorySectionTitle}>Trilhas Profissionalizantes</Text>
                <Text style={styles.categorySectionDesc}>
                  Exigem conclusão prévia de matérias fundamentais para serem liberadas.
                </Text>
              </View>

              <View style={styles.cardsGrid}>
                {professionalTracks.map((track) => renderTrackCard(track))}
              </View>
            </View>
          )}

          {/* Section: Trilhas Fundamentais */}
          {(activeFilter === "all" || activeFilter === "fundamental") && (
            <View style={[styles.categorySection, { marginTop: 24 }]}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryTagBasic}>
                  <Text style={styles.categoryTagBasicText}>BASE ESSENCIAL</Text>
                </View>
                <Text style={styles.categorySectionTitle}>Trilhas Fundamentais</Text>
                <Text style={styles.categorySectionDesc}>
                  Conclua essas matérias para habilitar suas especializações.
                </Text>
              </View>

              <View style={styles.cardsGrid}>
                {fundamentalTracks.map((track) => renderTrackCard(track))}
              </View>
            </View>
          )}
        </View>
      ) : (
        // 2. Interactive Winding Map View
        selectedTrack && (
          <View>
            {/* Map Breadcrumb Header */}
            <View style={styles.mapHeaderRow}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setSelectedTrackId(null)}
                activeOpacity={0.8}
              >
                <ArrowLeft size={16} color="#ffffff" />
              </TouchableOpacity>

              <View style={styles.mapHeaderTitleBox}>
                <Text style={styles.mapHeaderTagline}>
                  {selectedTrack.category === "professional" ? "TRILHA PROFISSIONALIZANTE" : "TRILHA FUNDAMENTAL"}
                </Text>
                <Text style={styles.mapHeaderTitle}>{selectedTrack.name}</Text>
              </View>
            </View>

            {/* Map Progress Widget */}
            <View style={styles.mapProgressWidget}>
              <View style={styles.mapProgressWidgetTextRow}>
                <Text style={styles.mapProgressWidgetLabel}>Progresso da Trilha</Text>
                <Text style={styles.mapProgressWidgetPercent}>
                  {getTrackProgress(selectedTrack.id)}%
                </Text>
              </View>
              <View style={styles.mapProgressWidgetTrack}>
                <View
                  style={[
                    styles.mapProgressWidgetFill,
                    { width: `${getTrackProgress(selectedTrack.id)}%` },
                  ]}
                />
              </View>
            </View>

            {/* Study Callout Banner on Top of Map */}
            <View style={styles.studyBanner}>
              <BookOpen size={16} color="#ffd700" />
              <Text style={styles.studyBannerText}>
                Clique em qualquer fase desbloqueada para abrir o <Text style={styles.studyBannerHighlight}>Guia de Estudos</Text> antes do desafio!
              </Text>
            </View>

            {/* Winding Trail Board */}
            <View style={styles.trailBoard}>
              <View style={styles.trailCenterLine} />

              {(trackStagesData[selectedTrackId] || []).map((stage, idx) => {
                const currentUnlocked = unlockedStages[selectedTrackId] || 1;
                const isCompleted = stage.id < currentUnlocked;
                const isCurrent = stage.id === currentUnlocked;
                const isLocked = stage.id > currentUnlocked;

                const offset = Math.min(screenWidth * 0.12, 42);
                let horizontalOffset = 0;
                if (idx % 4 === 1) horizontalOffset = -offset;
                if (idx % 4 === 3) horizontalOffset = offset;

                return (
                  <View
                    key={stage.id}
                    style={[
                      styles.trailNodeWrapper,
                      { transform: [{ translateX: horizontalOffset }] },
                    ]}
                  >
                    <TouchableOpacity
                      style={[
                        styles.trailNodeButton,
                        isCompleted && styles.trailNodeCompleted,
                        isCurrent && styles.trailNodeCurrent,
                        isLocked && styles.trailNodeLocked,
                      ]}
                      onPress={() => handleStageClick(stage)}
                      activeOpacity={0.85}
                    >
                      {isCompleted && <Check size={24} color="#ffffff" strokeWidth={3} />}
                      {isCurrent && (
                        stage.type === "boss" ? (
                          <Crown size={24} color="#ffffff" />
                        ) : (
                          <Gamepad2 size={24} color="#ffffff" />
                        )
                      )}
                      {isLocked && <Lock size={18} color="#6d5e94" />}

                      {/* Level Number Badge */}
                      <View style={styles.nodeBadge}>
                        <Text style={styles.nodeBadgeText}>{stage.id}</Text>
                      </View>
                    </TouchableOpacity>

                    {/* Stage Title */}
                    <View style={styles.nodeLabelBox}>
                      <Text style={styles.nodeLabelTitle} numberOfLines={1}>{stage.title}</Text>
                      <Text style={styles.nodeLabelType}>{stage.type.toUpperCase()}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )
      )}

      {/* 3. Stage Detail & Study Guide / Quiz Modal */}
      <Modal
        visible={!!activeStage}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* Modal Header Top Bar with Lives & Stage Info */}
            <View style={styles.modalTopBar}>
              <View style={styles.modalTopStageTag}>
                <Text style={styles.modalTopStageTagText}>
                  FASE {activeStage?.id || 1} · {selectedTrack?.short || "Trilha"}
                </Text>
              </View>

              <View style={styles.modalTopRightGroup}>
                {/* Lives Hearts Pill */}
                <View style={styles.modalLivesPill}>
                  <HeartDisplay lives={lives} size={13} showText />
                </View>

                {/* Close Button */}
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={handleCloseModal}
                  activeOpacity={0.7}
                >
                  <X size={16} color="#aaa0c2" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Modal Navigation Tabs (Guia de Estudo vs Jogar Desafio) */}
            {activeStage && (
              <View style={styles.modalTabsRow}>
                <TouchableOpacity
                  style={[styles.modalTabButton, modalTab === "study" && styles.modalTabButtonActive]}
                  onPress={() => handleTabChange("study")}
                  activeOpacity={0.7}
                >
                  <BookOpen size={13} color={modalTab === "study" ? "#ffffff" : "#a69abf"} />
                  <Text style={[styles.modalTabText, modalTab === "study" && styles.modalTabTextActive]}>
                    Guia de Estudo
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalTabButton, modalTab === "quiz" && styles.modalTabButtonActive]}
                  onPress={() => handleTabChange("quiz")}
                  activeOpacity={0.7}
                >
                  <Gamepad2 size={13} color={modalTab === "quiz" ? "#ffffff" : "#a69abf"} />
                  <Text style={[styles.modalTabText, modalTab === "quiz" && styles.modalTabTextActive]}>
                    Jogar Fase (+{activeStage.xp} XP)
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              {activeStage && (
                modalTab === "study" ? (
                  // --- 📖 TAB: GUIA DE ESTUDO SIMPLIFICADO & TÉCNICO ---
                  <View style={styles.studyTabContent}>
                    {/* Header Badges */}
                    <View style={styles.modalBadgesRow}>
                      <View style={styles.stageTypePill}>
                        <Text style={styles.stageTypePillText}>
                          FASE {activeStage.id} · {activeStage.type.toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.stageXpPill}>
                        <Sparkles size={11} color="#ffd700" />
                        <Text style={styles.stageXpPillText}>+{activeStage.xp} XP</Text>
                      </View>
                    </View>

                    <Text style={styles.modalTitle}>{activeStage.title}</Text>
                    
                    {/* Simplified Executive Summary */}
                    {activeStage.study && (
                      <View style={styles.cleanSummaryBox}>
                        <Text style={styles.cleanSummaryText}>
                          {activeStage.study.summary}
                        </Text>
                      </View>
                    )}

                    {/* Key Technical Concepts in Clean Cards */}
                    {activeStage.study && (
                      <View style={styles.cleanConceptsSection}>
                        <View style={styles.sectionHeaderRow}>
                          <Text style={styles.sectionHeaderTitle}>CONCEITOS FUNDAMENTAIS</Text>
                          <Text style={styles.sectionHeaderCount}>
                            {activeStage.study.keyPoints.length} pontos
                          </Text>
                        </View>

                        {activeStage.study.keyPoints.map((point, index) => {
                          const parsed = (() => {
                            if (typeof point === "object" && point.term) {
                              return { term: point.term, desc: point.desc };
                            }
                            const str = String(point);
                            const colonIdx = str.indexOf(":");
                            if (colonIdx !== -1) {
                              return {
                                term: str.substring(0, colonIdx).trim(),
                                desc: str.substring(colonIdx + 1).trim(),
                              };
                            }
                            return { term: `Item ${index + 1}`, desc: str };
                          })();

                          return (
                            <View key={index} style={styles.cleanConceptCard}>
                              <View style={styles.cleanConceptPill}>
                                <Text style={styles.cleanConceptPillText}>
                                  {parsed.term}
                                </Text>
                              </View>
                              <Text style={styles.cleanConceptDesc}>
                                {parsed.desc}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    )}

                    {/* Code Snippet / Commands Card */}
                    {activeStage.study?.codeSnippet && (
                      <View style={styles.cleanCodeBox}>
                        <View style={styles.cleanCodeHeader}>
                          <Terminal size={12} color="#a78bfa" />
                          <Text style={styles.cleanCodeHeaderText}>CÓDIGO / COMANDO PRÁTICO</Text>
                        </View>
                        <Text style={styles.cleanCodeText}>
                          {activeStage.study.codeSnippet}
                        </Text>
                      </View>
                    )}

                    {/* Visual 7-Layer OSI Stack */}
                    {activeStage.study?.osiLayers && activeStage.study.osiLayers.length > 0 && (
                      <View style={styles.osiStackContainer}>
                        <View style={styles.sectionHeaderRow}>
                          <Text style={styles.sectionHeaderTitle}>📶 MAPA VISUAL DAS 7 CAMADAS OSI</Text>
                          <Text style={styles.sectionHeaderCount}>Topo ➔ Físico</Text>
                        </View>
                        <View style={styles.osiStackList}>
                          {activeStage.study.osiLayers.map((layer) => (
                            <View
                              key={layer.num}
                              style={[
                                styles.osiLayerCard,
                                { borderLeftColor: layer.color || "#8b5cf6" },
                              ]}
                            >
                              <View style={styles.osiLayerHeaderRow}>
                                <View
                                  style={[
                                    styles.osiLayerNumPill,
                                    { backgroundColor: layer.color || "#8b5cf6" },
                                  ]}
                                >
                                  <Text style={styles.osiLayerNumText}>C{layer.num}</Text>
                                </View>
                                <Text style={styles.osiLayerNameText}>{layer.name}</Text>
                                <View style={styles.osiLayerProtocolsPill}>
                                  <Text style={styles.osiLayerProtocolsText}>
                                    {layer.protocols}
                                  </Text>
                                </View>
                              </View>
                              <Text style={styles.osiLayerDescText}>{layer.desc}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Mascot Tip Box */}
                    {activeStage.study?.mascotTip && (
                      <View style={styles.cleanTipCard}>
                        <Lightbulb size={16} color="#ffd700" style={styles.tipIcon} />
                        <View style={styles.tipTextBox}>
                          <Text style={styles.cleanTipTitle}>Dica Prática</Text>
                          <Text style={styles.cleanTipDesc}>
                            {activeStage.study.mascotTip}
                          </Text>
                        </View>
                      </View>
                    )}

                    {/* Action Button to start Quiz directly after studying (Critério 4: Componentização) */}
                    <ButtonCustom
                      title="Entendi! Fazer Desafio"
                      onPress={handleStartChallenge}
                      icon={<Play size={14} color="#ffffff" fill="#ffffff" />}
                      style={styles.cleanStudyReadyCustom}
                    />
                  </View>
                ) : (
                  // --- 🎮 TAB: JOGOS & DESAFIOS PRÁTICOS ---
                  <View style={styles.gamesTabContainer}>
                    {/* Game Mode Switcher */}
                    <View style={styles.gameModeSelector}>
                      <TouchableOpacity
                        style={[
                          styles.gameModeBtn,
                          gameSubMode === "puzzle" && styles.gameModeBtnActive,
                        ]}
                        onPress={() => setGameSubMode("puzzle")}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.gameModeBtnText,
                            gameSubMode === "puzzle" && styles.gameModeBtnTextActive,
                          ]}
                        >
                          🧩 Montar Código
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.gameModeBtn,
                          gameSubMode === "bug" && styles.gameModeBtnActive,
                        ]}
                        onPress={() => setGameSubMode("bug")}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.gameModeBtnText,
                            gameSubMode === "bug" && styles.gameModeBtnTextActive,
                          ]}
                        >
                          🐛 Caça ao Bug
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.gameModeBtn,
                          gameSubMode === "quiz" && styles.gameModeBtnActive,
                        ]}
                        onPress={() => setGameSubMode("quiz")}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.gameModeBtnText,
                            gameSubMode === "quiz" && styles.gameModeBtnTextActive,
                          ]}
                        >
                          ⚡ Quiz Tático
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* ==================== 1. MINI-GAME: MONTAR CÓDIGO (PUZZLE) ==================== */}
                    {gameSubMode === "puzzle" && stageGame && (
                      <View style={styles.gameContentBox}>
                        <View style={styles.gamePromptCard}>
                          <View style={styles.gamePromptHeader}>
                            <Terminal size={14} color="#a78bfa" />
                            <Text style={styles.gamePromptTitle}>{stageGame.puzzle.title}</Text>
                          </View>
                          <Text style={styles.gamePromptDesc}>
                            {stageGame.puzzle.objective}
                          </Text>
                        </View>

                        {/* Placed Blocks Slot Area */}
                        <View style={styles.assemblyArea}>
                          <View style={styles.assemblyHeaderRow}>
                            <Text style={styles.assemblyHeaderText}>
                              SEQUÊNCIA DE EXECUÇÃO ({placedBlocks.length}/{stageGame.puzzle.blocks.length})
                            </Text>
                            {placedBlocks.length > 0 && !puzzleSuccess && (
                              <TouchableOpacity onPress={handleResetPuzzle}>
                                <Text style={styles.assemblyResetText}>Limpar</Text>
                              </TouchableOpacity>
                            )}
                          </View>

                          {placedBlocks.length === 0 ? (
                            <View style={styles.emptyAssemblyBox}>
                              <Text style={styles.emptyAssemblyText}>
                                Toque nos blocos abaixo para posicioná-los aqui na ordem correta de execução.
                              </Text>
                            </View>
                          ) : (
                            <View style={styles.placedBlocksList}>
                              {placedBlocks.map((block, idx) => (
                                <TouchableOpacity
                                  key={block.id}
                                  style={[
                                    styles.placedBlockItem,
                                    puzzleSuccess && styles.placedBlockItemSuccess,
                                  ]}
                                  onPress={() => handleRemoveBlock(block)}
                                  activeOpacity={0.7}
                                  disabled={puzzleSuccess}
                                >
                                  <View style={styles.blockIndexBadge}>
                                    <Text style={styles.blockIndexText}>{idx + 1}</Text>
                                  </View>
                                  <Text style={styles.placedBlockCodeText}>{block.text}</Text>
                                  {!puzzleSuccess && <X size={12} color="#a69aba" />}
                                </TouchableOpacity>
                              ))}
                            </View>
                          )}
                        </View>

                        {/* Available Blocks Bank */}
                        {!puzzleSuccess && (
                          <View style={styles.blocksBankArea}>
                            <Text style={styles.blocksBankHeaderText}>BLOCOS DISPONÍVEIS:</Text>
                            {availableBlocks.length === 0 ? (
                              <Text style={styles.allPlacedText}>
                                Todos os blocos foram posicionados! Clique em Executar para testar.
                              </Text>
                            ) : (
                              <View style={styles.availableBlocksList}>
                                {availableBlocks.map((block) => (
                                  <TouchableOpacity
                                    key={block.id}
                                    style={styles.availableBlockButton}
                                    onPress={() => handlePlaceBlock(block)}
                                    activeOpacity={0.7}
                                  >
                                    <Text style={styles.availableBlockCodeText}>
                                      {block.text}
                                    </Text>
                                  </TouchableOpacity>
                                ))}
                              </View>
                            )}
                          </View>
                        )}

                        {/* Error Feedback */}
                        {puzzleErrorMsg && !puzzleSuccess && (
                          <View style={styles.gameErrorBanner}>
                            <AlertTriangle size={16} color="#ef4444" />
                            <Text style={styles.gameErrorText}>{puzzleErrorMsg}</Text>
                          </View>
                        )}

                        {/* Success Terminal Execution Output */}
                        {puzzleSuccess && (
                          <View style={styles.terminalSuccessBox}>
                            <View style={styles.terminalHeader}>
                              <View style={styles.terminalDotsRow}>
                                <View style={[styles.terminalDot, { backgroundColor: "#ef4444" }]} />
                                <View style={[styles.terminalDot, { backgroundColor: "#eab308" }]} />
                                <View style={[styles.terminalDot, { backgroundColor: "#22c55e" }]} />
                              </View>
                              <Text style={styles.terminalHeaderTitle}>node index.js (Sucesso!)</Text>
                            </View>
                            <Text style={styles.terminalOutputText}>{stageGame.puzzle.outputPreview}</Text>
                            <View style={styles.terminalExplanationRow}>
                              <CheckCircle size={14} color="#4ade80" />
                              <Text style={styles.terminalExplanationText}>
                                {stageGame.puzzle.explanation}
                              </Text>
                            </View>

                            <View style={styles.gameRewardBadge}>
                              <Zap size={14} color="#facc15" fill="#facc15" />
                              <Text style={styles.gameRewardText}>+{activeStage.xp} XP Conquistados!</Text>
                            </View>
                          </View>
                        )}

                        {/* Action Buttons */}
                        <View style={styles.gameActionButtonsRow}>
                          <TouchableOpacity
                            style={styles.gameReviewButton}
                            onPress={() => handleTabChange("study")}
                            activeOpacity={0.7}
                          >
                            <BookOpen size={13} color="#a69abf" />
                            <Text style={styles.gameReviewText}>Rever Teoria</Text>
                          </TouchableOpacity>

                          {!puzzleSuccess ? (
                            <TouchableOpacity
                              style={[
                                styles.gameExecuteButton,
                                placedBlocks.length === 0 && styles.gameExecuteButtonDisabled,
                              ]}
                              disabled={placedBlocks.length === 0}
                              onPress={handleExecutePuzzle}
                              activeOpacity={0.8}
                            >
                              <Play size={13} color="#ffffff" fill="#ffffff" />
                              <Text style={styles.gameExecuteText}>▶ Executar Código</Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={styles.gameFinishButton}
                              onPress={handleCloseModal}
                              activeOpacity={0.8}
                            >
                              <Text style={styles.gameFinishText}>Continuar no Mapa</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    )}

                    {/* ==================== 2. MINI-GAME: CAÇA AO BUG ==================== */}
                    {gameSubMode === "bug" && stageGame && (
                      <View style={styles.gameContentBox}>
                        <View style={styles.gamePromptCard}>
                          <View style={styles.gamePromptHeader}>
                            <Bug size={14} color="#f87171" />
                            <Text style={styles.gamePromptTitle}>{stageGame.bugHunter.title}</Text>
                          </View>
                          <Text style={styles.gamePromptDesc}>
                            {stageGame.bugHunter.objective}
                          </Text>
                        </View>

                        {/* IDE Code Inspection Window */}
                        <View style={styles.ideWindow}>
                          <View style={styles.ideHeader}>
                            <View style={styles.terminalDotsRow}>
                              <View style={[styles.terminalDot, { backgroundColor: "#ef4444" }]} />
                              <View style={[styles.terminalDot, { backgroundColor: "#eab308" }]} />
                              <View style={[styles.terminalDot, { backgroundColor: "#22c55e" }]} />
                            </View>
                            <Text style={styles.ideHeaderTitle}>
                              editor.{stageGame.bugHunter.language === "python" ? "py" : "js"}
                            </Text>
                            <View style={styles.ideLanguageTag}>
                              <Text style={styles.ideLanguageText}>
                                {stageGame.bugHunter.language.toUpperCase()}
                              </Text>
                            </View>
                          </View>

                          {/* Code Lines as Interactive Tappable Rows */}
                          <View style={styles.ideLinesContainer}>
                            {stageGame.bugHunter.lines.map((line) => {
                              const isSelected = selectedBugLine === line.lineNum;
                              const isThisBug = line.isBug;
                              const isSolvedBug = isSelected && isThisBug;
                              const isWrongGuess = isSelected && !isThisBug;

                              return (
                                <TouchableOpacity
                                  key={line.lineNum}
                                  style={[
                                    styles.ideLineRow,
                                    isSolvedBug && styles.ideLineRowBugFound,
                                    isWrongGuess && styles.ideLineRowWrongGuess,
                                  ]}
                                  onPress={() => handleTapBugLine(line)}
                                  activeOpacity={0.7}
                                  disabled={bugSolved}
                                >
                                  <Text
                                    style={[
                                      styles.ideLineNumber,
                                      isSolvedBug && styles.ideLineNumberBug,
                                    ]}
                                  >
                                    {line.lineNum}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.ideLineCode,
                                      isSolvedBug && styles.ideLineCodeBugFound,
                                      isWrongGuess && styles.ideLineCodeWrong,
                                    ]}
                                  >
                                    {line.code}
                                  </Text>
                                  {isSolvedBug && <Bug size={14} color="#22c55e" />}
                                  {isWrongGuess && <X size={14} color="#f87171" />}
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </View>

                        {/* Wrong Guess Banner */}
                        {bugWrongFeedback && !bugSolved && (
                          <View style={styles.gameErrorBanner}>
                            <AlertTriangle size={16} color="#ef4444" />
                            <Text style={styles.gameErrorText}>{bugWrongFeedback}</Text>
                          </View>
                        )}

                        {/* Bug Squashed Success Card */}
                        {bugSolved && (
                          <View style={styles.terminalSuccessBox}>
                            <View style={styles.bugSuccessHeader}>
                              <CheckCircle size={18} color="#4ade80" />
                              <Text style={styles.bugSuccessTitle}>Bug Eliminado com Sucesso!</Text>
                            </View>
                            <Text style={styles.bugSuccessDesc}>
                              {stageGame.bugHunter.bugExplanation}
                            </Text>

                            <View style={styles.bugFixBox}>
                              <Text style={styles.bugFixLabel}>LINHA CORRIGIDA:</Text>
                              <Text style={styles.bugFixCode}>{stageGame.bugHunter.fixPreview}</Text>
                            </View>

                            <View style={styles.gameRewardBadge}>
                              <Zap size={14} color="#facc15" fill="#facc15" />
                              <Text style={styles.gameRewardText}>+{activeStage.xp} XP Conquistados!</Text>
                            </View>
                          </View>
                        )}

                        {/* Action Buttons */}
                        <View style={styles.gameActionButtonsRow}>
                          <TouchableOpacity
                            style={styles.gameReviewButton}
                            onPress={() => handleTabChange("study")}
                            activeOpacity={0.7}
                          >
                            <BookOpen size={13} color="#a69abf" />
                            <Text style={styles.gameReviewText}>Rever Teoria</Text>
                          </TouchableOpacity>

                          {bugSolved ? (
                            <TouchableOpacity
                              style={styles.gameFinishButton}
                              onPress={handleCloseModal}
                              activeOpacity={0.8}
                            >
                              <Text style={styles.gameFinishText}>Continuar no Mapa</Text>
                            </TouchableOpacity>
                          ) : (
                            <View style={styles.ideHintBox}>
                              <Text style={styles.ideHintText}>
                                Toque na linha com erro para eliminar o bug!
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    )}

                    {/* ==================== 3. MINI-GAME: QUIZ TÁTICO ==================== */}
                    {gameSubMode === "quiz" && (
                      <View>
                        {quizFinished ? (
                          // Results View
                          <View style={styles.resultsContainer}>
                            <View style={styles.resultsIconBox}>
                              <Sparkles size={28} color="#4ade80" />
                            </View>
                            <Text style={styles.resultsTitle}>Quiz Concluído!</Text>
                            <Text style={styles.resultsSubtitle}>
                              Parabéns! Você aplicou seus estudos com sucesso e somou XP na sua carreira.
                            </Text>

                            <View style={styles.resultsXpBadge}>
                              <Zap size={15} color="#ffd700" fill="#ffd700" />
                              <Text style={styles.resultsXpText}>+ {activeStage.xp} XP</Text>
                            </View>

                            <TouchableOpacity
                              style={styles.resultsContinueButton}
                              onPress={handleCloseModal}
                              activeOpacity={0.85}
                            >
                              <Text style={styles.resultsContinueText}>Continuar no Mapa</Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          // Question Active View
                          (() => {
                            const questions =
                              quizQuestionsData[selectedTrackId!]?.[activeStage.id] || [];
                            const currentQ = questions[currentQuestionIndex];
                            if (!currentQ) {
                              return (
                                <View style={styles.resultsContainer}>
                                  <View style={styles.resultsIconBox}>
                                    <Sparkles size={28} color="#4ade80" />
                                  </View>
                                  <Text style={styles.resultsTitle}>Desafio Prático</Text>
                                  <Text style={styles.resultsSubtitle}>
                                    Conteúdo estudado com sucesso! Complete a etapa para avançar no mapa.
                                  </Text>
                                  <TouchableOpacity
                                    style={styles.resultsContinueButton}
                                    onPress={() => {
                                      unlockNextStage(selectedTrackId!, activeStage.id);
                                      addXp(activeStage.xp);
                                      handleCloseModal();
                                    }}
                                    activeOpacity={0.85}
                                  >
                                    <Text style={styles.resultsContinueText}>
                                      Concluir Etapa (+{activeStage.xp} XP)
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              );
                            }

                            return (
                              <View>
                                {/* Progress Header */}
                                <View style={styles.quizProgressRow}>
                                  <Text style={styles.quizProgressText}>
                                    PERGUNTA {currentQuestionIndex + 1} DE {questions.length}
                                  </Text>
                                  <Text style={styles.quizScoreText}>
                                    Acertos: {correctCount}
                                  </Text>
                                </View>

                                <View style={styles.quizProgressBarTrack}>
                                  <View
                                    style={[
                                      styles.quizProgressBarFill,
                                      {
                                        width: `${
                                          ((currentQuestionIndex + 1) / questions.length) * 100
                                        }%`,
                                      },
                                    ]}
                                  />
                                </View>

                                <Text style={styles.questionText}>{currentQ.question}</Text>

                                {/* Options */}
                                <View style={styles.optionsList}>
                                  {currentQ.options.map((opt) => {
                                    const isSelected = selectedOption === opt;
                                    let optionStyle = styles.optionButton;
                                    let optionTextStyle = styles.optionText;

                                    if (answerSubmitted) {
                                      if (opt === currentQ.correct) {
                                        optionStyle = styles.optionButtonCorrect;
                                        optionTextStyle = styles.optionTextCorrect;
                                      } else if (isSelected && opt !== currentQ.correct) {
                                        optionStyle = styles.optionButtonWrong;
                                        optionTextStyle = styles.optionTextWrong;
                                      } else {
                                        optionStyle = styles.optionButtonDisabled;
                                      }
                                    } else if (isSelected) {
                                      optionStyle = styles.optionButtonSelected;
                                      optionTextStyle = styles.optionTextSelected;
                                    }

                                    return (
                                      <TouchableOpacity
                                        key={opt}
                                        style={optionStyle}
                                        disabled={answerSubmitted}
                                        onPress={() => setSelectedOption(opt)}
                                        activeOpacity={0.8}
                                      >
                                        <Text style={optionTextStyle}>{opt}</Text>
                                      </TouchableOpacity>
                                    );
                                  })}
                                </View>

                                {/* Feedback & Detailed Technical Explanation */}
                                {answerSubmitted && (
                                  <View
                                    style={[
                                      styles.explanationBox,
                                      quizSuccess
                                        ? styles.explanationBoxSuccess
                                        : styles.explanationBoxWrong,
                                    ]}
                                  >
                                    <View style={styles.explanationHeaderRow}>
                                      {quizSuccess ? (
                                        <Check size={16} color="#4ade80" strokeWidth={3} />
                                      ) : (
                                        <X size={16} color="#f87171" strokeWidth={3} />
                                      )}
                                      <Text
                                        style={[
                                          styles.explanationStatusTitle,
                                          quizSuccess
                                            ? styles.explanationStatusSuccess
                                            : styles.explanationStatusWrong,
                                        ]}
                                      >
                                        {quizSuccess
                                          ? "Resposta Correta!"
                                          : `Incorreto (-0.5 Vida)! Resposta: ${currentQ.correct}`}
                                      </Text>
                                    </View>

                                    {currentQ.explanation ? (
                                      <View style={styles.explanationInnerBox}>
                                        <View style={styles.explanationReasonHeader}>
                                          <Lightbulb size={12} color="#ffd700" />
                                          <Text style={styles.explanationReasonTitle}>
                                            POR QUE ESTA É A RESPOSTA?
                                          </Text>
                                        </View>
                                        <Text style={styles.explanationReasonText}>
                                          {currentQ.explanation}
                                        </Text>
                                      </View>
                                    ) : null}
                                  </View>
                                )}

                                {/* Bottom Action */}
                                <View style={styles.quizFooter}>
                                  <TouchableOpacity
                                    style={styles.quizGiveUpButton}
                                    onPress={() => handleTabChange("study")}
                                  >
                                    <Text style={styles.quizGiveUpText}>Revisar Estudo</Text>
                                  </TouchableOpacity>

                                  {!answerSubmitted ? (
                                    <TouchableOpacity
                                      style={[
                                        styles.quizSubmitButton,
                                        !selectedOption && styles.quizSubmitButtonDisabled,
                                      ]}
                                      disabled={!selectedOption}
                                      onPress={handleAnswerSubmit}
                                    >
                                      <Text style={styles.quizSubmitText}>
                                        Enviar Resposta
                                      </Text>
                                    </TouchableOpacity>
                                  ) : (
                                    <TouchableOpacity
                                      style={styles.quizSubmitButton}
                                      onPress={handleNextQuestion}
                                    >
                                      <Text style={styles.quizSubmitText}>
                                        {currentQuestionIndex + 1 === questions.length
                                          ? "Ver Resultado"
                                          : "Próxima Questão"}
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              </View>
                            );
                          })()
                        )}
                      </View>
                    )}
                  </View>
                )
              )}
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 110,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },

  // Overview Header
  headerBlock: {
    marginBottom: 16,
  },
  headerTagline: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 9,
    fontWeight: "800",
    color: "#a996ff",
    letterSpacing: 1.4,
  },
  headerTitle: {
    fontSize: isSmallDevice ? 20 : 22,
    lineHeight: isSmallDevice ? 24 : 26,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.5,
    marginTop: 4,
  },
  headerSubtitle: {
    fontSize: 11.5,
    lineHeight: 16,
    color: "#aaa0bf",
    marginTop: 4,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 12,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  filterPillActive: {
    backgroundColor: "#6b4be0",
    borderColor: "#6b4be0",
  },
  filterText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#aaa0bf",
  },
  filterTextActive: {
    color: "#ffffff",
  },

  // Sections
  categorySection: {
    marginTop: 10,
  },
  categoryHeader: {
    marginBottom: 10,
  },
  categoryTagPro: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(225, 29, 72, 0.15)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 4,
  },
  categoryTagProText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#fb7185",
    letterSpacing: 1,
  },
  categoryTagBasic: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(116, 76, 226, 0.15)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 4,
  },
  categoryTagBasicText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#c4b2ff",
    letterSpacing: 1,
  },
  categorySectionTitle: {
    fontSize: 16.5,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  categorySectionDesc: {
    fontSize: 11,
    color: "#9e94b5",
    marginTop: 1,
  },

  // Cards Grid
  cardsGrid: {
    gap: 12,
    marginTop: 6,
  },
  trackCardContainer: {
    backgroundColor: "#211440",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },
  cardHeader: {
    position: "relative",
    height: 80,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  cardHeaderCircle: {
    position: "absolute",
    right: -20,
    bottom: -25,
    width: 95,
    height: 95,
    borderRadius: 48,
    borderWidth: 16,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  cardIconBox: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  professionalBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  professionalBadgeText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#ffd700",
    letterSpacing: 0.8,
  },
  cardBody: {
    padding: 14,
  },
  cardTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  cardTitle: {
    fontSize: 15.5,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  cardLessons: {
    fontSize: 10.5,
    color: "#aa9fbe",
    marginTop: 1,
  },
  cardXpBadge: {
    backgroundColor: "#33245d",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  cardXpText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 9,
    fontWeight: "800",
    color: "#c4b5ff",
  },

  // Target Role & Prerequisites
  targetRoleBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginTop: 8,
  },
  targetRoleText: {
    fontSize: 10.5,
    color: "#aaa0c0",
  },
  targetRoleBold: {
    fontWeight: "800",
    color: "#e2d9ff",
  },
  prerequisiteBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 6,
  },
  prerequisiteBoxUnlocked: {
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.25)",
  },
  prerequisiteBoxLocked: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.25)",
  },
  prerequisiteTextUnlocked: {
    fontSize: 10,
    fontWeight: "700",
    color: "#86efac",
  },
  prerequisiteTextLocked: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fca5a5",
  },

  // Progress Bar
  cardProgressContainer: {
    marginTop: 10,
  },
  cardProgressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  cardProgressLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#aa9fbe",
  },
  cardProgressPercent: {
    fontSize: 10,
    fontWeight: "700",
    color: "#ffffff",
  },
  cardProgressBarTrack: {
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },
  cardProgressBarFill: {
    height: "100%",
    borderRadius: 2.5,
    backgroundColor: "#a58bff",
  },

  // Action Button
  cardActionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#6a49dd",
    borderRadius: 14,
    paddingVertical: 10,
    marginTop: 12,
  },
  cardActionButtonLocked: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  cardActionButtonText: {
    fontSize: 11.5,
    fontWeight: "800",
    color: "#ffffff",
  },
  cardActionLockedText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#82769c",
  },

  // Map View
  mapHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  mapHeaderTagline: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#a996ff",
    letterSpacing: 1.2,
  },
  mapHeaderTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  mapProgressWidget: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  mapProgressWidgetTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  mapProgressWidgetLabel: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#aaa0bf",
  },
  mapProgressWidgetPercent: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#8b5cf6",
  },
  mapProgressWidgetTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },
  mapProgressWidgetFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#8b5cf6",
  },
  studyBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(107, 75, 224, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.3)",
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
  },
  studyBannerText: {
    flex: 1,
    fontSize: 10.5,
    color: "#dcd6eb",
    lineHeight: 14,
  },

  // Trail Board
  trailBoard: {
    position: "relative",
    alignItems: "center",
    paddingVertical: 14,
    minHeight: 460,
  },
  trailCenterLine: {
    position: "absolute",
    top: 15,
    bottom: 15,
    width: 2,
    backgroundColor: "rgba(115, 82, 223, 0.3)",
    borderStyle: "dashed",
    borderRadius: 1,
  },
  trailNodeWrapper: {
    marginVertical: 14,
    alignItems: "center",
    zIndex: 2,
  },
  trailNodeButton: {
    position: "relative",
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  trailNodeCompleted: {
    backgroundColor: "#22c55e",
  },
  trailNodeCurrent: {
    backgroundColor: "#8b5cf6",
    borderWidth: 3.5,
    borderColor: "rgba(167, 139, 250, 0.45)",
  },
  trailNodeLocked: {
    backgroundColor: "#241a42",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  nodeBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#1b0d3e",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  nodeBadgeText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 9,
    fontWeight: "800",
    color: "#bbaaff",
  },
  nodeLabelBox: {
    marginTop: 4,
    alignItems: "center",
    maxWidth: 120,
  },
  nodeLabelTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
  },
  nodeLabelType: {
    fontSize: 8.5,
    color: "#9387a7",
    letterSpacing: 1,
    marginTop: 1,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
  },
  modalCard: {
    position: "relative",
    width: "100%",
    maxWidth: 440,
    maxHeight: "88%",
    backgroundColor: "#1e133e",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 18,
  },
  modalCloseButton: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  modalTabsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
    paddingRight: 32,
  },
  modalTabButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
  },
  modalTabButtonActive: {
    backgroundColor: "#6b4be0",
    borderColor: "#6b4be0",
  },
  modalTabText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#a69abf",
  },
  modalTabTextActive: {
    color: "#ffffff",
  },

  modalBadgesRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 8,
  },
  stageTypePill: {
    backgroundColor: "rgba(139, 92, 246, 0.2)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  stageTypePillText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#a78bfa",
  },
  stageXpPill: {
    backgroundColor: "rgba(255, 215, 0, 0.12)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  stageXpPillText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#f5c463",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.3,
  },

  // Study Tab Clean Modern Styles
  studyTabContent: {
    paddingTop: 4,
  },
  cleanSummaryBox: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#8b5cf6",
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 12,
  },
  cleanSummaryText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#e2ddf2",
    fontWeight: "500",
  },
  cleanConceptsSection: {
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionHeaderTitle: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 9,
    fontWeight: "800",
    color: "#a78bfa",
    letterSpacing: 1,
  },
  sectionHeaderCount: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    color: "#8c7fa8",
  },
  cleanConceptCard: {
    backgroundColor: "#1b1433",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 12,
    padding: 11,
    marginBottom: 7,
  },
  cleanConceptPill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(139, 92, 246, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.35)",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginBottom: 6,
  },
  cleanConceptPillText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#c4b5fd",
    letterSpacing: 0.2,
  },
  cleanConceptDesc: {
    fontSize: 11.5,
    lineHeight: 16.5,
    color: "#d1c9e3",
  },
  cleanCodeBox: {
    backgroundColor: "#0d081f",
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.25)",
    borderRadius: 12,
    padding: 11,
    marginBottom: 10,
  },
  cleanCodeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
    paddingBottom: 4,
  },
  cleanCodeHeaderText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#a78bfa",
    letterSpacing: 0.8,
  },
  cleanCodeText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 10.5,
    lineHeight: 15,
    color: "#86efac",
  },
  cleanTipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "rgba(255, 215, 0, 0.07)",
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.18)",
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
  },
  cleanTipTitle: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#ffd700",
  },
  cleanTipDesc: {
    fontSize: 10.5,
    lineHeight: 14.5,
    color: "#f5ecc2",
    marginTop: 2,
  },
  cleanStudyReadyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#7c3aed",
    borderRadius: 14,
    paddingVertical: 12,
    marginTop: 6,
    marginBottom: 10,
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  cleanStudyReadyButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#ffffff",
  },

  // Quiz Mode
  quizProgressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  quizProgressText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 9,
    fontWeight: "800",
    color: "#b9aaff",
  },
  quizScoreText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 9,
    fontWeight: "800",
    color: "#ffffff",
  },
  quizProgressBarTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginBottom: 14,
    overflow: "hidden",
  },
  quizProgressBarFill: {
    height: "100%",
    backgroundColor: "#8b5cf6",
  },
  questionText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: 19,
    marginBottom: 14,
  },
  optionsList: {
    gap: 7,
  },
  optionButton: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    padding: 11,
  },
  optionButtonSelected: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#9f85ff",
    backgroundColor: "rgba(115, 82, 223, 0.2)",
    padding: 11,
  },
  optionButtonCorrect: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#22c55e",
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    padding: 11,
  },
  optionButtonWrong: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    padding: 11,
  },
  optionButtonDisabled: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
    backgroundColor: "rgba(255, 255, 255, 0.01)",
    padding: 11,
    opacity: 0.5,
  },
  optionText: {
    fontSize: 11.5,
    color: "#dcd6eb",
  },
  optionTextSelected: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#ffffff",
  },
  optionTextCorrect: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#86efac",
  },
  optionTextWrong: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#fca5a5",
  },
  // OSI Layers Visual Stack Styles
  osiStackContainer: {
    backgroundColor: "#130d29",
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.25)",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  osiStackList: {
    gap: 7,
    marginTop: 4,
  },
  osiLayerCard: {
    backgroundColor: "#1c1438",
    borderRadius: 10,
    borderLeftWidth: 3.5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    padding: 9,
  },
  osiLayerHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  osiLayerNumPill: {
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  osiLayerNumText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 9,
    fontWeight: "900",
    color: "#ffffff",
  },
  osiLayerNameText: {
    flex: 1,
    fontSize: 11,
    fontWeight: "800",
    color: "#ffffff",
  },
  osiLayerProtocolsPill: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
  },
  osiLayerProtocolsText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "700",
    color: "#a78bfa",
  },
  osiLayerDescText: {
    fontSize: 10.5,
    lineHeight: 15,
    color: "#c9c2dc",
  },

  // Quiz Detailed Explanation Box
  explanationBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 11,
    marginTop: 12,
  },
  explanationBoxSuccess: {
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    borderColor: "rgba(34, 197, 94, 0.3)",
  },
  explanationBoxWrong: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  explanationHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  explanationStatusTitle: {
    fontSize: 12,
    fontWeight: "800",
  },
  explanationStatusSuccess: {
    color: "#4ade80",
  },
  explanationStatusWrong: {
    color: "#f87171",
  },
  explanationInnerBox: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 8,
    padding: 9,
    marginTop: 4,
  },
  explanationReasonHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 4,
  },
  explanationReasonTitle: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#ffd700",
    letterSpacing: 0.6,
  },
  explanationReasonText: {
    fontSize: 11,
    lineHeight: 16,
    color: "#f3effa",
  },

  feedbackCorrect: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4ade80",
    textAlign: "center",
    marginTop: 10,
  },
  feedbackWrong: {
    fontSize: 11,
    fontWeight: "700",
    color: "#f87171",
    textAlign: "center",
    marginTop: 10,
  },
  quizFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.06)",
    paddingTop: 12,
  },
  quizGiveUpButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  quizGiveUpText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#c9c1df",
  },
  quizSubmitButton: {
    backgroundColor: "#7352df",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 12,
  },
  quizSubmitButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  quizSubmitText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#ffffff",
  },

  // Results View
  resultsContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  resultsIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(74, 222, 128, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  resultsTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#ffffff",
    marginTop: 10,
  },
  resultsSubtitle: {
    fontSize: 11.5,
    color: "#aaa0c0",
    textAlign: "center",
    marginTop: 4,
    lineHeight: 16,
  },
  resultsXpBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255, 215, 0, 0.15)",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 12,
    marginBottom: 16,
  },
  resultsXpText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 12,
    fontWeight: "800",
    color: "#f5c463",
  },
  resultsContinueButton: {
    width: "100%",
    backgroundColor: "#22c55e",
    borderRadius: 14,
    paddingVertical: 11,
    alignItems: "center",
  },
  resultsContinueText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#ffffff",
  },

  // Modal Top Bar with Lives
  modalTopBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  modalTopStageTag: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  modalTopStageTagText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: "#c4b5fd",
    letterSpacing: 0.5,
  },
  modalTopRightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  modalLivesPill: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },

  // Games Tab & Mode Switcher
  gamesTabContainer: {
    paddingTop: 4,
  },
  gameModeSelector: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 3,
    marginBottom: 12,
  },
  gameModeBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  gameModeBtnActive: {
    backgroundColor: "#6b4be0",
  },
  gameModeBtnText: {
    fontSize: 9.5,
    fontWeight: "700",
    color: "#a69abf",
  },
  gameModeBtnTextActive: {
    color: "#ffffff",
  },

  // Game Prompts
  gameContentBox: {
    gap: 8,
  },
  gamePromptCard: {
    backgroundColor: "#1e1338",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 14,
    padding: 11,
    marginBottom: 8,
  },
  gamePromptHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  gamePromptTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#ffffff",
  },
  gamePromptDesc: {
    fontSize: 10.5,
    color: "#c4badb",
    lineHeight: 15,
  },

  // Assembly Area
  assemblyArea: {
    backgroundColor: "rgba(15, 8, 38, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
  },
  assemblyHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  assemblyHeaderText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#a78bfa",
    letterSpacing: 0.5,
  },
  assemblyResetText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fca5a5",
  },
  emptyAssemblyBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyAssemblyText: {
    fontSize: 10.5,
    color: "#8b80a6",
    textAlign: "center",
    lineHeight: 15,
  },
  placedBlocksList: {
    gap: 6,
  },
  placedBlockItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28194a",
    borderWidth: 1,
    borderColor: "rgba(167, 139, 250, 0.35)",
    borderRadius: 10,
    padding: 9,
    gap: 8,
  },
  placedBlockItemSuccess: {
    borderColor: "#22c55e",
    backgroundColor: "rgba(34, 197, 94, 0.15)",
  },
  blockIndexBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#6b4ee8",
    alignItems: "center",
    justifyContent: "center",
  },
  blockIndexText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#ffffff",
  },
  placedBlockCodeText: {
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 11,
    color: "#ffffff",
  },

  // Blocks Bank
  blocksBankArea: {
    marginBottom: 10,
  },
  blocksBankHeaderText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#9487b0",
    marginBottom: 6,
  },
  allPlacedText: {
    fontSize: 10.5,
    color: "#a7f3d0",
    fontStyle: "italic",
    paddingVertical: 4,
  },
  availableBlocksList: {
    gap: 6,
  },
  availableBlockButton: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 10,
    padding: 9,
  },
  availableBlockCodeText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 11,
    color: "#e2ddf5",
  },

  // Game Errors & Success
  gameErrorBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.35)",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  gameErrorText: {
    flex: 1,
    fontSize: 10.5,
    fontWeight: "600",
    color: "#fca5a5",
    lineHeight: 15,
  },
  terminalSuccessBox: {
    backgroundColor: "#0a0518",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.4)",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  terminalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
    paddingBottom: 6,
    marginBottom: 8,
  },
  terminalDotsRow: {
    flexDirection: "row",
    gap: 4,
  },
  terminalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  terminalHeaderTitle: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 9,
    fontWeight: "700",
    color: "#94a3b8",
  },
  terminalOutputText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 11,
    color: "#4ade80",
    lineHeight: 16,
    marginBottom: 8,
  },
  terminalExplanationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  terminalExplanationText: {
    flex: 1,
    fontSize: 10.5,
    color: "#d1fae5",
    lineHeight: 14,
  },
  gameRewardBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(250, 204, 21, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.3)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  gameRewardText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#fde047",
  },
  gameActionButtonsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  gameReviewButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingVertical: 10,
  },
  gameReviewText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#a69abf",
  },
  gameExecuteButton: {
    flex: 1.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#7c3aed",
    borderRadius: 12,
    paddingVertical: 10,
  },
  gameExecuteButtonDisabled: {
    backgroundColor: "rgba(124, 58, 237, 0.35)",
  },
  gameExecuteText: {
    fontSize: 11.5,
    fontWeight: "800",
    color: "#ffffff",
  },
  gameFinishButton: {
    flex: 1.4,
    backgroundColor: "#22c55e",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  gameFinishText: {
    fontSize: 11.5,
    fontWeight: "800",
    color: "#ffffff",
  },

  // IDE Window (Bug Hunter)
  ideWindow: {
    backgroundColor: "#0f0826",
    borderWidth: 1,
    borderColor: "rgba(141, 117, 243, 0.25)",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 10,
  },
  ideHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.06)",
  },
  ideHeaderTitle: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 9.5,
    fontWeight: "700",
    color: "#b8add1",
  },
  ideLanguageTag: {
    backgroundColor: "rgba(168, 85, 247, 0.2)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ideLanguageText: {
    fontSize: 8.5,
    fontWeight: "800",
    color: "#d8b4fe",
  },
  ideLinesContainer: {
    padding: 6,
  },
  ideLineRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 8,
  },
  ideLineRowBugFound: {
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    borderWidth: 1,
    borderColor: "#22c55e",
  },
  ideLineRowWrongGuess: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  ideLineNumber: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 10,
    color: "#6b5e87",
    width: 18,
    textAlign: "right",
  },
  ideLineNumberBug: {
    color: "#4ade80",
    fontWeight: "800",
  },
  ideLineCode: {
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 11,
    color: "#f1f5f9",
  },
  ideLineCodeBugFound: {
    color: "#86efac",
    fontWeight: "800",
  },
  ideLineCodeWrong: {
    color: "#fca5a5",
  },
  bugSuccessHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  bugSuccessTitle: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "#4ade80",
  },
  bugSuccessDesc: {
    fontSize: 11,
    color: "#d1fae5",
    lineHeight: 15,
    marginBottom: 8,
  },
  bugFixBox: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderLeftWidth: 3,
    borderLeftColor: "#22c55e",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  bugFixLabel: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#86efac",
    marginBottom: 2,
  },
  bugFixCode: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 10.5,
    color: "#ffffff",
  },
  ideHintBox: {
    flex: 1.4,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  ideHintText: {
    fontSize: 9.5,
    color: "#9487b0",
    textAlign: "center",
  },
  cardTitleInfo: {
    flex: 1,
  },
  mapHeaderTitleBox: {
    flex: 1,
    marginLeft: 10,
  },
  studyBannerHighlight: {
    fontWeight: "800",
    color: "#ffffff",
  },
  tipIcon: {
    marginTop: 1,
  },
  tipTextBox: {
    flex: 1,
  },
  cleanStudyReadyCustom: {
    marginTop: 6,
    marginBottom: 10,
    width: "100%",
  },
});
