import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Zap, Target, Trophy, Flame, LogOut, Award, ShieldCheck, ChevronRight } from "lucide-react-native";
import { useApp } from "../context/AppContext";

const mascotProfile = require("../../assets/WhatsApp_Image_2026-08-21_at_12.07.41.jpeg");

export function TelaPerfil() {
  const { totalXp, logout } = useApp();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Card */}
      <View style={styles.profileCard}>
        {/* Background Mascot overlay */}
        <Image
          source={mascotProfile}
          style={styles.mascotBg}
          resizeMode="cover"
        />

        <View style={styles.profileHeaderRow}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>M</Text>
          </View>

          <View style={styles.profileMeta}>
            <Text style={styles.userName}>Marina Silva</Text>
            <Text style={styles.userRole}>Bootcamp ADS · Turma 2026.2</Text>

            <View style={styles.xpBadge}>
              <Zap size={12} color="#f8c662" fill="#f8c662" />
              <Text style={styles.xpBadgeText}>{totalXp.toLocaleString("pt-BR")} XP</Text>
            </View>
          </View>
        </View>

        {/* 3 Profile Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <View style={[styles.statIconBox, { backgroundColor: "#443475" }]}>
              <Target size={16} color="#ae9aff" />
            </View>
            <Text style={styles.statBoxLabel}>MISSÕES</Text>
            <Text style={styles.statBoxValue}>18</Text>
          </View>

          <View style={styles.statBox}>
            <View style={[styles.statIconBox, { backgroundColor: "#55472a" }]}>
              <Trophy size={16} color="#f6c768" />
            </View>
            <Text style={styles.statBoxLabel}>BADGES</Text>
            <Text style={styles.statBoxValue}>04</Text>
          </View>

          <View style={styles.statBox}>
            <View style={[styles.statIconBox, { backgroundColor: "#55304c" }]}>
              <Flame size={16} color="#ff9b73" fill="#ff9b73" />
            </View>
            <Text style={styles.statBoxLabel}>STREAK</Text>
            <Text style={styles.statBoxValue}>12</Text>
          </View>
        </View>
      </View>

      {/* Badges / Conquistas Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Suas Conquistas</Text>
      </View>

      <View style={styles.badgesList}>
        <View style={styles.badgeItem}>
          <View style={[styles.badgeIcon, { backgroundColor: "#4c2882" }]}>
            <Award size={20} color="#c4b2ff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.badgeName}>Primeiro Desafio</Text>
            <Text style={styles.badgeDesc}>Concluiu a primeira fase de ADS</Text>
          </View>
          <ShieldCheck size={18} color="#4ade80" />
        </View>

        <View style={styles.badgeItem}>
          <View style={[styles.badgeIcon, { backgroundColor: "#3a4a28" }]}>
            <Flame size={20} color="#a3e635" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.badgeName}>Fogo nos Estudos</Text>
            <Text style={styles.badgeDesc}>10 dias consecutivos de login e treino</Text>
          </View>
          <ShieldCheck size={18} color="#4ade80" />
        </View>
      </View>

      {/* Logout Action */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
        activeOpacity={0.8}
      >
        <LogOut size={16} color="#f87171" />
        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
      </TouchableOpacity>
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
    paddingBottom: 40,
    maxWidth: 900,
    width: "100%",
    alignSelf: "center",
  },

  // Profile Card
  profileCard: {
    position: "relative",
    backgroundColor: "#211440",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 20,
    overflow: "hidden",
  },
  mascotBg: {
    position: "absolute",
    right: -20,
    top: -20,
    width: 130,
    height: 130,
    borderRadius: 30,
    opacity: 0.35,
  },
  profileHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    zIndex: 2,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fdc8a9",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarLargeText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#5a2e44",
  },
  profileMeta: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.4,
  },
  userRole: {
    fontSize: 11.5,
    color: "#a69aba",
    marginTop: 2,
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 5,
    backgroundColor: "rgba(93, 66, 202, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(141, 117, 243, 0.3)",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
  },
  xpBadgeText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 10,
    fontWeight: "800",
    color: "#e9e4ff",
  },

  // Stats Row
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 18,
    padding: 12,
  },
  statIconBox: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statBoxLabel: {
    fontSize: 8.5,
    fontWeight: "800",
    color: "#a69bbf",
    letterSpacing: 1,
  },
  statBoxValue: {
    fontSize: 17,
    fontWeight: "800",
    color: "#ffffff",
    marginTop: 2,
  },

  // Section Header
  sectionHeader: {
    marginTop: 26,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.4,
  },

  // Badges
  badgesList: {
    gap: 10,
  },
  badgeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#211440",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 14,
    gap: 12,
  },
  badgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#ffffff",
  },
  badgeDesc: {
    fontSize: 10.5,
    color: "#968aa9",
    marginTop: 2,
  },

  // Logout
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.25)",
    borderRadius: 18,
    paddingVertical: 14,
    marginTop: 32,
  },
  logoutButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#f87171",
  },
});
