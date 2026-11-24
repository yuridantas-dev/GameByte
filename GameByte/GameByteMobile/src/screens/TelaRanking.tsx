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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Crown, Flame, Users, ChevronRight, X, Sparkles, ShieldCheck } from "lucide-react-native";
import { leaderboardData, avatars3DData } from "../data/mockData";
import { Avatar3D } from "../types";
import { useApp } from "../context/AppContext";
import { ButtonCustom } from "../components/ButtonCustom";

const { width: screenWidth } = Dimensions.get("window");
const isSmallDevice = screenWidth < 375;

export function TelaRanking() {
  const { totalXp, levelInfo } = useApp();
  const [period, setPeriod] = useState("Esta semana");
  const [inspectAvatar, setInspectAvatar] = useState<Avatar3D | null>(null);

  const getAvatarForUser = (avatarId?: number) => {
    return avatars3DData.find((a) => a.id === avatarId) || avatars3DData[0];
  };

  const podiumUsers = [
    {
      ...leaderboardData[1],
      avatar: getAvatarForUser(leaderboardData[1].avatarId),
      rank: 2,
      height: 95,
      colors: ["rgba(37, 27, 79, 0.8)", "rgba(30, 20, 66, 0.95)"] as [string, string],
      badgeBg: "rgba(203, 213, 225, 0.2)",
      badgeText: "#cbd5e1",
      ringColor: "rgba(148, 163, 184, 0.6)",
      emoji: "🥈",
    },
    {
      ...leaderboardData[0],
      avatar: getAvatarForUser(leaderboardData[0].avatarId),
      rank: 1,
      height: 125,
      colors: ["rgba(67, 45, 29, 0.9)", "rgba(39, 26, 16, 0.98)"] as [string, string],
      badgeBg: "rgba(255, 215, 0, 0.3)",
      badgeText: "#ffd700",
      ringColor: "#facc15",
      emoji: "👑",
    },
    {
      ...leaderboardData[2],
      avatar: getAvatarForUser(leaderboardData[2].avatarId),
      rank: 3,
      height: 75,
      colors: ["rgba(37, 27, 79, 0.8)", "rgba(30, 20, 66, 0.95)"] as [string, string],
      badgeBg: "rgba(205, 127, 50, 0.25)",
      badgeText: "#fca5a5",
      ringColor: "rgba(205, 127, 50, 0.6)",
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
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTagline}>CLASSIFICAÇÃO GAMIFICADA</Text>
            <Text style={styles.headerTitle}>Ranking da galera.</Text>
            <Text style={styles.headerSubtitle}>
              Toque em qualquer Avatar 3D para inspecionar seus detalhes e nível!
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

              {/* 3D Avatar Image */}
              <TouchableOpacity
                style={[
                  styles.podiumAvatar,
                  user.rank === 1 && styles.podiumAvatarFirst,
                  { borderColor: user.avatar.accentColor },
                ]}
                activeOpacity={0.8}
                onPress={() => setInspectAvatar(user.avatar)}
              >
                <Image
                  source={user.avatar.image}
                  style={styles.podiumAvatarImg}
                  resizeMode="cover"
                />
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
              </TouchableOpacity>

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

        {leaderboardData.map((user, index) => {
          const uAvatar = getAvatarForUser(user.avatarId);
          return (
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

              {/* 3D Avatar Image with inspect modal */}
              <TouchableOpacity
                style={[styles.tableAvatar, { borderColor: uAvatar.accentColor }]}
                activeOpacity={0.8}
                onPress={() => setInspectAvatar(uAvatar)}
              >
                <Image
                  source={uAvatar.image}
                  style={styles.tableAvatarImg}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <View style={styles.tableUserInfo}>
                <View style={styles.userNameRow}>
                  <Text style={styles.tableUserName} numberOfLines={1}>
                    {user.name}
                  </Text>
                  <View style={[styles.userLevelTag, { backgroundColor: uAvatar.accentColor + "25" }]}>
                    <Text style={[styles.userLevelTagText, { color: uAvatar.accentColor }]}>
                      Nv. {user.level || 1}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableUserStreakRow}>
                  <Flame size={10} color="#ff965e" fill="#ff965e" />
                  <Text style={styles.tableUserStreakText}>
                    {user.streak}d seguidos · {uAvatar.name}
                  </Text>
                </View>
              </View>

              <Text style={styles.tableUserXp}>{user.xp} XP</Text>
            </View>
          );
        })}

        {/* Current User Row */}
        <View style={styles.currentUserRow}>
          <Text style={styles.currentUserRank}>18</Text>
          <TouchableOpacity
            style={[styles.currentUserAvatar, { borderColor: levelInfo.currentAvatar.accentColor }]}
            activeOpacity={0.8}
            onPress={() => setInspectAvatar(levelInfo.currentAvatar)}
          >
            <Image
              source={levelInfo.currentAvatar.image}
              style={styles.tableAvatarImg}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View style={styles.currentUserInfo}>
            <View style={styles.userNameRow}>
              <Text style={styles.currentUserName}>Você · Marina</Text>
              <View style={[styles.userLevelTag, { backgroundColor: levelInfo.currentAvatar.accentColor + "25" }]}>
                <Text style={[styles.userLevelTagText, { color: levelInfo.currentAvatar.accentColor }]}>
                  Nv. {levelInfo.level}
                </Text>
              </View>
            </View>
            <Text style={styles.currentUserSubText} numberOfLines={1}>
              {levelInfo.currentAvatar.name} · {levelInfo.totalXp.toLocaleString("pt-BR")}/{levelInfo.levelMaxXp.toLocaleString("pt-BR")} XP
            </Text>
          </View>
          <Text style={styles.currentUserXp}>
            {totalXp.toLocaleString("pt-BR")} XP
          </Text>
        </View>
      </View>

      {/* 3D Avatar Inspection Modal */}
      <Modal
        visible={inspectAvatar !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setInspectAvatar(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setInspectAvatar(null)}
            >
              <X size={18} color="#ffffff" />
            </TouchableOpacity>

            {inspectAvatar && (
              <View style={styles.modalBodyCentered}>
                {/* 3D Avatar Image Big Render */}
                <View
                  style={[
                    styles.modalAvatarBox,
                    { borderColor: inspectAvatar.accentColor },
                  ]}
                >
                  <Image
                    source={inspectAvatar.image}
                    style={styles.modalAvatarImage}
                    resizeMode="cover"
                  />
                  <View
                    style={[
                      styles.modalLevelTag,
                      { backgroundColor: inspectAvatar.accentColor },
                    ]}
                  >
                    <Text style={styles.modalLevelTagText}>
                      NÍVEL {inspectAvatar.levelRequired}
                    </Text>
                  </View>
                </View>

                <Text style={styles.modalAvatarName}>{inspectAvatar.name}</Text>
                <Text style={styles.modalAvatarTitle}>{inspectAvatar.title}</Text>
                <Text style={styles.modalAvatarDesc}>{inspectAvatar.description}</Text>

                {/* Lore Card */}
                <View style={styles.modalLoreBox}>
                  <View style={styles.modalLoreHeader}>
                    <Sparkles size={14} color="#facc15" />
                    <Text style={styles.modalLoreTitle}>História & Habilidade</Text>
                  </View>
                  <Text style={styles.modalLoreText}>{inspectAvatar.lore}</Text>
                  <View style={styles.modalPerkBadge}>
                    <ShieldCheck size={14} color="#4ade80" />
                    <Text style={styles.modalPerkText}>{inspectAvatar.perk}</Text>
                  </View>
                </View>

                <ButtonCustom
                  title="Fechar Detalhes"
                  variant="secondary"
                  onPress={() => setInspectAvatar(null)}
                  style={styles.modalDismissCustom}
                />
              </View>
            )}
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1f153a",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    overflow: "hidden",
  },
  podiumAvatarFirst: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2.5,
  },
  podiumAvatarImg: {
    width: "100%",
    height: "100%",
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#160d2e",
    borderWidth: 1.5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  tableAvatarImg: {
    width: "100%",
    height: "100%",
  },
  tableAvatarText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#382448",
  },
  tableUserInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  userLevelTag: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  userLevelTagText: {
    fontSize: 8.5,
    fontWeight: "900",
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#160d2e",
    borderWidth: 2,
    overflow: "hidden",
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

  // Avatar Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(10, 5, 25, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    position: "relative",
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#20133e",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(141, 117, 243, 0.3)",
    padding: 22,
    alignItems: "center",
  },
  modalCloseBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  modalAvatarBox: {
    position: "relative",
    width: 110,
    height: 110,
    borderRadius: 28,
    borderWidth: 3,
    backgroundColor: "#160d2e",
    overflow: "hidden",
    marginTop: 6,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  modalAvatarImage: {
    width: "100%",
    height: "100%",
  },
  modalLevelTag: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 3,
    alignItems: "center",
  },
  modalLevelTagText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#0c0620",
    letterSpacing: 0.5,
  },
  modalAvatarName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -0.4,
  },
  modalAvatarTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#facc15",
    marginTop: 2,
  },
  modalAvatarDesc: {
    fontSize: 11,
    color: "#c9c2e0",
    textAlign: "center",
    lineHeight: 16,
    marginTop: 8,
    paddingHorizontal: 8,
  },
  modalLoreBox: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
    padding: 12,
    marginTop: 14,
  },
  modalLoreHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  modalLoreTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#facc15",
  },
  modalLoreText: {
    fontSize: 10.5,
    color: "#b9afd4",
    lineHeight: 15,
  },
  modalPerkBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(74, 222, 128, 0.12)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginTop: 8,
  },
  modalPerkText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#4ade80",
  },
  headerTitleBox: {
    flex: 1,
  },
  modalBodyCentered: {
    alignItems: "center",
    width: "100%",
  },
  modalDismissCustom: {
    width: "100%",
    marginTop: 18,
  },
});
