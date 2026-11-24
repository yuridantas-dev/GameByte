import React, { createContext, useContext, useState, useEffect } from "react";
import { Track, LevelInfo, UserRole, ClassStudent, CreatedQuestion } from "../types";
import { getLevelInfo, initialClassStudents, initialCreatedQuestions } from "../data/mockData";

export type ScreenTab = "home" | "tracks" | "ranking" | "profile" | "teacher";

interface AppContextType {
  isLoggedIn: boolean;
  setLoggedIn?: (loggedIn: boolean) => void;
  isAppLoading: boolean;
  loadingMessage: string;
  setAppLoading: (loading: boolean, message?: string) => void;
  login: () => void;
  logout: () => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentTab: ScreenTab;
  setCurrentTab: (tab: ScreenTab) => void;
  selectedTrackId: string | null;
  setSelectedTrackId: (trackId: string | null) => void;
  totalXp: number;
  addXp: (amount: number) => void;
  levelInfo: LevelInfo;
  selectedAvatarId: number | null;
  setSelectedAvatarId: (id: number) => void;
  lives: number;
  maxLives: number;
  loseLife: (amount?: number) => boolean;
  rechargeLives: () => void;
  rechargeHoursRemaining: string;
  showOutOfLivesModal: boolean;
  setShowOutOfLivesModal: (show: boolean) => void;
  unlockedStages: Record<string, number>;
  unlockNextStage: (trackId: string, currentStageId: number) => void;
  getTrackProgress: (trackId: string) => number;
  isTrackCompleted: (trackId: string) => boolean;
  isTrackUnlocked: (track: Track) => boolean;
  classStudents: ClassStudent[];
  recordStudentActivity: (studentId: string) => void;
  resetStudentXp: (studentId: string, newXp: number) => void;
  createdQuestions: CreatedQuestion[];
  addCustomQuestion: (question: Omit<CreatedQuestion, "id" | "createdAt">) => void;
  deleteCustomQuestion: (questionId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Iniciando o GameByte...");
  const [currentTab, setCurrentTab] = useState<ScreenTab>("home");
  const [userRole, setUserRole] = useState<UserRole>("student");
  const [classStudents, setClassStudents] = useState<ClassStudent[]>(initialClassStudents);
  const [createdQuestions, setCreatedQuestions] = useState<CreatedQuestion[]>(initialCreatedQuestions);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [totalXp, setTotalXp] = useState(1500); // Começa com 1.500 XP (exemplo do usuário!)
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);
  const [lives, setLives] = useState(3.0); // 3 Corações cheios
  const maxLives = 3.0;
  const [showOutOfLivesModal, setShowOutOfLivesModal] = useState(false);
  const [rechargeEndTime, setRechargeEndTime] = useState<number | null>(null);
  const [rechargeHoursRemaining, setRechargeHoursRemaining] = useState("04h 00m 00s");
  const [unlockedStages, setUnlockedStages] = useState<Record<string, number>>({
    network: 1,
    logic: 1,
    web: 1,
    cybersecurity: 1,
    fullstack: 1,
    cloud: 1,
    ai: 1,
  });

  // Temporizador em tempo real de 4 horas quando as vidas zeram
  useEffect(() => {
    if (!rechargeEndTime) return;

    const updateTimer = () => {
      const now = Date.now();
      const diffMs = rechargeEndTime - now;
      const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

      if (totalSeconds <= 0) {
        // 4 Horas concluídas: restaura vidas automaticamente
        setLives(3.0);
        setRechargeEndTime(null);
        setRechargeHoursRemaining("04h 00m 00s");
        setShowOutOfLivesModal(false);
      } else {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        setRechargeHoursRemaining(
          `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`
        );
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [rechargeEndTime]);

  const levelInfo = getLevelInfo(totalXp, selectedAvatarId);

  const handleSetCurrentTab = (tab: ScreenTab) => {
    if (userRole === "teacher" && (tab === "home" || tab === "tracks")) {
      setCurrentTab("teacher");
      return;
    }
    // Aluno sem vidas não pode acessar as trilhas
    if (userRole === "student" && tab === "tracks" && lives <= 0) {
      if (!rechargeEndTime) {
        setRechargeEndTime(Date.now() + 4 * 60 * 60 * 1000);
      }
      setShowOutOfLivesModal(true);
      return;
    }
    setCurrentTab(tab);
  };

  const handleSetShowOutOfLivesModal = (show: boolean) => {
    if (show && lives <= 0 && !rechargeEndTime) {
      setRechargeEndTime(Date.now() + 4 * 60 * 60 * 1000);
    }
    setShowOutOfLivesModal(show);
  };

  const handleSetUserRole = (role: UserRole) => {
    setUserRole(role);
    if (role === "teacher") {
      setCurrentTab("teacher");
    } else if (currentTab === "teacher") {
      setCurrentTab("home");
    }
  };

  const setAppLoading = (loading: boolean, message = "Carregando...") => {
    setLoadingMessage(message);
    setIsAppLoading(loading);
  };

  const login = () => {
    setIsAppLoading(true);
    setLoadingMessage("Conectando sua conta...");
    setTimeout(() => {
      setIsLoggedIn(true);
      setCurrentTab(userRole === "teacher" ? "teacher" : "home");
      setIsAppLoading(false);
    }, 1200);
  };

  const logout = () => {
    setIsAppLoading(true);
    setLoadingMessage("Desconectando...");
    setTimeout(() => {
      setIsLoggedIn(false);
      setIsAppLoading(false);
    }, 800);
  };

  const addXp = (amount: number) => {
    setTotalXp((prev) => prev + amount);
  };

  const loseLife = (amount = 0.5) => {
    let stillAlive = true;
    setLives((prev) => {
      const next = Math.max(0, Math.round((prev - amount) * 10) / 10);
      if (next <= 0) {
        stillAlive = false;
        setRechargeEndTime((curr) => curr || Date.now() + 4 * 60 * 60 * 1000);
        setShowOutOfLivesModal(true);
      }
      return next;
    });
    return stillAlive;
  };

  const rechargeLives = () => {
    setLives(3.0);
    setRechargeEndTime(null);
    setRechargeHoursRemaining("04h 00m 00s");
    setShowOutOfLivesModal(false);
  };

  const unlockNextStage = (trackId: string, currentStageId: number) => {
    setUnlockedStages((prev) => {
      const current = prev[trackId] || 1;
      if (currentStageId >= current) {
        return { ...prev, [trackId]: currentStageId + 1 };
      }
      return prev;
    });
  };

  const getTrackProgress = (trackId: string) => {
    const unlocked = unlockedStages[trackId] || 1;
    const completed = unlocked - 1;
    return Math.min(Math.round((completed / 5) * 100), 100);
  };

  const isTrackCompleted = (trackId: string) => {
    return getTrackProgress(trackId) >= 100;
  };

  const isTrackUnlocked = (track: Track) => {
    if (track.category === "fundamental" || !track.prerequisites || track.prerequisites.length === 0) {
      return true;
    }
    // Professional track requires all prerequisites to be completed (100%)
    return track.prerequisites.every((prereqId) => isTrackCompleted(prereqId));
  };

  // Funções do Painel do Professor (História de Usuário & Avaliação de Software)
  const recordStudentActivity = (studentId: string) => {
    setClassStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const nowTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
          return {
            ...s,
            lastActiveDaysAgo: 0,
            lastActiveDate: `Hoje às ${nowTime}`,
            riskOfDropout: false,
            streak: s.streak === 0 ? 1 : s.streak + 1,
          };
        }
        return s;
      })
    );
  };

  const resetStudentXp = (studentId: string, newXp: number) => {
    setClassStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            xp: newXp,
            level: Math.max(1, Math.floor(newXp / 2000) + 1),
          };
        }
        return s;
      })
    );
  };

  const addCustomQuestion = (newQ: Omit<CreatedQuestion, "id" | "createdAt">) => {
    const questionObj: CreatedQuestion = {
      ...newQ,
      id: `q-prof-${Date.now()}`,
      createdAt: new Date().toLocaleDateString("pt-BR"),
    };
    setCreatedQuestions((prev) => [questionObj, ...prev]);
  };

  const deleteCustomQuestion = (questionId: string) => {
    setCreatedQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn: setIsLoggedIn,
        isAppLoading,
        loadingMessage,
        setAppLoading,
        login,
        logout,
        userRole,
        setUserRole: handleSetUserRole,
        currentTab,
        setCurrentTab: handleSetCurrentTab,
        selectedTrackId,
        setSelectedTrackId,
        totalXp,
        addXp,
        levelInfo,
        selectedAvatarId,
        setSelectedAvatarId,
        lives,
        maxLives,
        loseLife,
        rechargeLives,
        rechargeHoursRemaining,
        showOutOfLivesModal,
        setShowOutOfLivesModal: handleSetShowOutOfLivesModal,
        unlockedStages,
        unlockNextStage,
        getTrackProgress,
        isTrackCompleted,
        isTrackUnlocked,
        classStudents,
        recordStudentActivity,
        resetStudentXp,
        createdQuestions,
        addCustomQuestion,
        deleteCustomQuestion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
