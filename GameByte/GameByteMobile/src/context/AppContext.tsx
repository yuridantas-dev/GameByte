import React, { createContext, useContext, useState } from "react";
import { Track } from "../types";

export type ScreenTab = "home" | "tracks" | "ranking" | "profile";

interface AppContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  currentTab: ScreenTab;
  setCurrentTab: (tab: ScreenTab) => void;
  selectedTrackId: string | null;
  setSelectedTrackId: (trackId: string | null) => void;
  totalXp: number;
  addXp: (amount: number) => void;
  unlockedStages: Record<string, number>;
  unlockNextStage: (trackId: string, currentStageId: number) => void;
  getTrackProgress: (trackId: string) => number;
  isTrackCompleted: (trackId: string) => boolean;
  isTrackUnlocked: (track: Track) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState<ScreenTab>("home");
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [totalXp, setTotalXp] = useState(1240);
  const [unlockedStages, setUnlockedStages] = useState<Record<string, number>>({
    network: 1,
    logic: 1,
    web: 1,
    cybersecurity: 1,
    fullstack: 1,
    cloud: 1,
    ai: 1,
  });

  const login = () => {
    setIsLoggedIn(true);
    setCurrentTab("home");
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const addXp = (amount: number) => {
    setTotalXp((prev) => prev + amount);
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
        login,
        logout,
        currentTab,
        setCurrentTab,
        selectedTrackId,
        setSelectedTrackId,
        totalXp,
        addXp,
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
