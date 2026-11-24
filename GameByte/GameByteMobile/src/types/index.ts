export interface StudyPoint {
  term: string;
  desc: string;
}

export interface OsiLayerInfo {
  num: number;
  name: string;
  protocols: string;
  desc: string;
  color: string;
}

export interface StudyContent {
  summary: string;
  keyPoints: (string | StudyPoint)[];
  codeSnippet?: string;
  mascotTip: string;
  osiLayers?: OsiLayerInfo[];
}

export interface TrackStage {
  id: number;
  title: string;
  type: "lesson" | "quiz" | "challenge" | "boss";
  xp: number;
  description: string;
  study?: StudyContent;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: string;
  explanation?: string;
}

export interface Track {
  id: string;
  name: string;
  short: string;
  lessons: string;
  category: "fundamental" | "professional";
  prerequisites?: string[];
  prerequisiteNames?: string[];
  targetRole?: string;
  iconName: string;
  gradient: [string, string];
  soft: string;
  xp: string;
}

export interface LeaderboardUser {
  name: string;
  xp: string;
  streak: number;
  initials: string;
  tone: [string, string];
  level?: number;
  avatarId?: number;
}

export interface Avatar3D {
  id: number;
  levelRequired: number;
  name: string;
  title: string;
  description: string;
  image: any;
  tag: string;
  accentColor: string;
  borderGradient: [string, string];
  perk: string;
  lore: string;
}

export interface LevelInfo {
  level: number;
  title: string;
  totalXp: number;
  levelMinXp: number;
  levelMaxXp: number;
  currentLevelXp: number;
  levelXpCap: number;
  progressPercent: number;
  nextLevelTotalXp: number;
  currentAvatar: Avatar3D;
  unlockedAvatars: Avatar3D[];
  allAvatars: Avatar3D[];
}
