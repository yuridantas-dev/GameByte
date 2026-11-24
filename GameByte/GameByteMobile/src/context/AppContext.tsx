import React, { createContext, useContext, useState } from "react";
import { Track, LevelInfo } from "../types";
import { getLevelInfo } from "../data/mockData";

export type ScreenTab = "home" | "tracks" | "ranking" | "profile";

interface AppContextType {
  isLoggedIn: boolean;
  setLoggedIn?: (loggedIn: boolean) => void;
  isAppLoading: boolean;
  loadingMessage: string;
  setAppLoading: (loading: boolean, message?: string) => void;
  login: () => void;
  logout: () => void;
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Iniciando o GameByte...");
  const [currentTab, setCurrentTab] = useState<ScreenTab>("home");
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [totalXp, setTotalXp] = useState(1500); // Começa com 1.500 XP (exemplo do usuário!)
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);
  const [lives, setLives] = useState(3.0); // 3 Corações cheios
  const maxLives = 3.0;
  const [showOutOfLivesModal, setShowOutOfLivesModal] = useState(false);
  const [rechargeHoursRemaining] = useState("04h 00m");
  const [unlockedStages, setUnlockedStages] = useState<Record<string, number>>({
    network: 1,
    logic: 1,
    web: 1,
    cybersecurity: 1,
    fullstack: 1,
    cloud: 1,
    ai: 1,
  });

  const levelInfo = getLevelInfo(totalXp, selectedAvatarId);

  const setAppLoading = (loading: boolean, message = "Carregando...") => {
    setLoadingMessage(message);
    setIsAppLoading(loading);
  };

  const login = () => {
    setIsAppLoading(true);
    setLoadingMessage("Conectando sua conta...");
    setTimeout(() => {
      setIsLoggedIn(true);
      setCurrentTab("home");
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
        setShowOutOfLivesModal(true);
      }
      return next;
    });
    return stillAlive;
  };

  const rechargeLives = () => {
    setLives(3.0);
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
        currentTab,
        setCurrentTab,
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
        setShowOutOfLivesModal,
        unlockedStages,
        unlockNextStage,
        getTrackProgress,
        isTrackCompleted,
        isTrackUnlocked,
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
