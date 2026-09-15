import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Crown, Flame, Users, ChevronRight } from "lucide-react-native";
import { leaderboardData } from "../data/mockData";
import { useApp } from "../context/AppContext";

const { width: screenWidth } = Dimensions.get("window");
const isSmallDevice = screenWidth < 375;

export function TelaRanking() {
  const { totalXp } = useApp();
  const [period, setPeriod] = useState("Esta semana");

  const podiumUsers = [
    {
      ...leaderboardData[1],
      rank: 2,
      height: 95,
      colors: ["rgba(37, 27, 79, 0.8)", "rgba(30, 20, 66, 0.95)"] as [string, string],
      badgeBg: "rgba(203, 213, 225, 0.2)",
      badgeText: "#cbd5e1",
      ringColor: "rgba(148, 163, 184, 0.4)",
      emoji: "🥈",
    },
    {
      ...leaderboardData[0],
      rank: 1,
      height: 125,
      colors: ["rgba(67, 45, 29, 0.9)", "rgba(39, 26, 16, 0.98)"] as [string, string],
      badgeBg: "rgba(255, 215, 0, 0.3)",
      badgeText: "#ffd700",
      ringColor: "rgba(255, 215, 0, 0.5)",
      emoji: "👑",
    },
    {
      ...leaderboardData[2],
      rank: 3,
      height: 75,
      colors: ["rgba(37, 27, 79, 0.8)", "rgba(30, 20, 66, 0.95)"] as [string, string],
      badgeBg: "rgba(205, 127, 50, 0.25)",
      badgeText: "#fca5a5",
      ringColor: "rgba(205, 127, 50, 0.4)",
      emoji: "🥉",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerBlock}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTagline}>CLASSIFICAÇÃO ADS</Text>
            <Text style={styles.headerTitle}>Ranking da galera.</Text>
            <Text style={styles.headerSubtitle}>
              Cada missão concluída soma XP. Acompanhe seu lugar entre os alunos.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.periodButton}
            onPress={() =>
              setPeriod(period === "Esta semana" ? "Este mês" : "Esta semana")
            }
            activeOpacity={0.7}
          >
            <Text style={styles.periodButtonText}>{period}</Text>
            <ChevronRight size={12} color="#d7d1e5" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Podium Display */}
      <View style={styles.podiumContainer}>
        <View style={styles.podiumGlow} pointerEvents="none" />

        <View style={styles.podiumRow}>
          {podiumUsers.map((user) => (
            <View key={user.name} style={styles.podiumColumn}>
              {/* Crown or Medal */}
              <View style={styles.podiumEmojiBox}>
                {user.rank === 1 ? (
                  <Crown size={22} color="#f5c463" fill="#f5c463" />
                ) : (
                  <Text style={styles.podiumEmoji}>{user.emoji}</Text>
                )}
              </View>

              {/* Avatar */}
              <View
                style={[
                  styles.podiumAvatar,
                  user.rank === 1 && styles.podiumAvatarFirst,
                  { borderColor: user.ringColor },
                ]}
              >
                <Text style={styles.podiumAvatarText}>{user.initials}</Text>
                <View
                  style={[
                    styles.podiumRankBadge,
                    { backgroundColor: user.badgeBg },
                  ]}
                >
                  <Text
                    style={[styles.podiumRankText, { color: user.badgeText }]}
                  >
                    {user.rank}
                  </Text>
                </View>
              </View>

              {/* User Name & XP */}
              <Text style={styles.podiumUserName} numberOfLines={1}>
                {user.name.split(" ")[0]}
              </Text>
              <Text
                style={[
                  styles.podiumUserXp,
                  user.rank === 1 && styles.podiumUserXpGold,
                ]}
              >
                {user.xp} XP
              </Text>

              {/* Pedestal Block */}
              <LinearGradient
                colors={user.colors}
                style={[styles.podiumPedestal, { height: user.height }]}
              >
                <Text style={styles.podiumPedestalRank}>#{user.rank}</Text>
                <View style={styles.podiumStreakBadge}>
                  <Flame size={10} color="#ff965e" fill="#ff965e" />
                  <Text style={styles.podiumStreakText}>{user.streak}d</Text>
                </View>
              </LinearGradient>
            </View>
          ))}
        </View>
      </View>

      {/* Full Leaderboard Table */}
      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>Tabela completa</Text>
          <Users size={15} color="#a795da" />
        </View>

        {leaderboardData.map((user, index) => (
          <View
            key={user.name}
            style={[
              styles.tableRow,
              index < leaderboardData.length - 1 && styles.tableRowBorder,
            ]}
          >
            <Text style={styles.tableRankNum}>
              {index < 9 ? `0${index + 1}` : index + 1}
            </Text>

            <View style={styles.tableAvatar}>
              <Text style={styles.tableAvatarText}>{user.initials}</Text>
            </View>

            <View style={styles.tableUserInfo}>
              <Text style={styles.tableUserName} numberOfLines={1}>
                {user.name}
              </Text>
              <View style={styles.tableUserStreakRow}>
                <Flame size={10} color="#ff965e" fill="#ff965e" />
                <Text style={styles.tableUserStreakText}>
                  {user.streak} dias de sequência
                </Text>
              </View>
            </View>

            <Text style={styles.tableUserXp}>{user.xp} XP</Text>
          </View>
        ))}

        {/* Current User Row */}
        <View style={styles.currentUserRow}>
          <Text style={styles.currentUserRank}>18</Text>
          <View style={styles.currentUserAvatar}>
            <Text style={styles.currentUserAvatarText}>M</Text>
          </View>
          <View style={styles.currentUserInfo}>
            <Text style={styles.currentUserName}>Você · Marina</Text>
            <Text style={styles.currentUserSubText} numberOfLines={1}>
              Faltam 620 XP para o top 10
            </Text>
          </View>
          <Text style={styles.currentUserXp}>
            {totalXp.toLocaleString("pt-BR")} XP
          </Text>
        </View>
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 36,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },

  // Header Block
  headerBlock: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
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
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.5,
    marginTop: 3,
  },
  headerSubtitle: {
    fontSize: 11.5,
    lineHeight: 16,
    color: "#a69bbd",
    marginTop: 4,
  },
  periodButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.09)",
    backgroundColor: "rgba(255, 255, 255, 0.045)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 2,
  },
  periodButtonText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#d7d1e5",
  },

  // Podium
  podiumContainer: {
    position: "relative",
    marginVertical: 10,
    alignItems: "center",
  },
  podiumGlow: {
    position: "absolute",
    top: 25,
    width: 240,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(107, 75, 224, 0.15)",
  },
  podiumRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 8,
    width: "100%",
  },
  podiumColumn: {
    flex: 1,
    alignItems: "center",
  },
  podiumEmojiBox: {
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  podiumEmoji: {
    fontSize: 18,
  },
  podiumAvatar: {
    position: "relative",
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#fdc8a9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  podiumAvatarFirst: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2.5,
  },
  podiumAvatarText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#372247",
  },
  podiumRankBadge: {
    position: "absolute",
    bottom: -3,
    right: -3,
    width: 17,
    height: 17,
    borderRadius: 8.5,
    alignItems: "center",
    justifyContent: "center",
  },
  podiumRankText: {
    fontSize: 9.5,
    fontWeight: "900",
  },
  podiumUserName: {
    fontSize: 11.5,
    fontWeight: "800",
    color: "#ffffff",
    marginTop: 6,
  },
  podiumUserXp: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 9.5,
    fontWeight: "800",
    color: "#cbd5e1",
    marginTop: 1,
  },
  podiumUserXpGold: {
    color: "#ffd700",
  },
  podiumPedestal: {
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    paddingTop: 8,
    marginTop: 6,
  },
  podiumPedestalRank: {
    fontSize: 12,
    fontWeight: "900",
    color: "rgba(255, 255, 255, 0.6)",
  },
  podiumStreakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginTop: 4,
  },
  podiumStreakText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "700",
    color: "#af9fc3",
  },

  // Table
  tableCard: {
    backgroundColor: "#211440",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.07)",
  },
  tableTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 11,
    gap: 10,
  },
  tableRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  tableRankNum: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 10.5,
    fontWeight: "700",
    color: "#9a8fb1",
    width: 18,
  },
  tableAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#c8defa",
    alignItems: "center",
    justifyContent: "center",
  },
  tableAvatarText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#382448",
  },
  tableUserInfo: {
    flex: 1,
  },
  tableUserName: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#f4f0ff",
  },
  tableUserStreakRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 1,
  },
  tableUserStreakText: {
    fontSize: 9.5,
    color: "#968aa9",
  },
  tableUserXp: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 11,
    fontWeight: "800",
    color: "#f1c668",
  },

  // Current User Row
  currentUserRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#342461",
    borderTopWidth: 1,
    borderTopColor: "rgba(128, 100, 230, 0.3)",
    gap: 10,
  },
  currentUserRank: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 10.5,
    fontWeight: "900",
    color: "#c7b8ff",
    width: 18,
  },
  currentUserAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fdc8a9",
    alignItems: "center",
    justifyContent: "center",
  },
  currentUserAvatarText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#5a2e44",
  },
  currentUserInfo: {
    flex: 1,
  },
  currentUserName: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "#ffffff",
  },
  currentUserSubText: {
    fontSize: 9.5,
    color: "#c7b8ff",
    opacity: 0.8,
  },
  currentUserXp: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 11.5,
    fontWeight: "900",
    color: "#f1c668",
  },
});
