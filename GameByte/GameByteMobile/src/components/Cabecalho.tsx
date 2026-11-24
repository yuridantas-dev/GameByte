import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { Zap } from "lucide-react-native";
import { useApp } from "../context/AppContext";
import { HeartDisplay } from "./HeartDisplay";

const appIconImage = require("../../assets/logo_clean_transparent.png");

export function Cabecalho() {
  const { levelInfo, lives, setShowOutOfLivesModal, setCurrentTab } = useApp();

  return (
    <View style={styles.headerContainer}>
      {/* Left: Logo */}
      <TouchableOpacity 
        style={styles.logoRow} 
        activeOpacity={0.8}
        onPress={() => setCurrentTab("home")}
      >
        <View style={styles.logoIconBox}>
          <Image source={appIconImage} style={styles.logoIcon} resizeMode="cover" />
        </View>
        <Text style={styles.logoText}>GameByte</Text>
      </TouchableOpacity>

      {/* Right: Lives Hearts, XP Badge with Level Bar & 3D Avatar */}
      <View style={styles.actionsRow}>
        {/* Lives Hearts Pill */}
        <TouchableOpacity
          style={[styles.livesPill, lives <= 0 && styles.livesPillDead]}
          activeOpacity={0.8}
          onPress={() => {
            if (lives <= 0) setShowOutOfLivesModal(true);
            else setCurrentTab("profile");
          }}
        >
          <HeartDisplay lives={lives} size={13} />
        </TouchableOpacity>

        {/* XP Pill with Level & Progress Bar */}
        <TouchableOpacity
          style={styles.xpPill}
          activeOpacity={0.8}
          onPress={() => setCurrentTab("profile")}
        >
          <View style={styles.xpTopRow}>
            <View style={styles.levelTag}>
              <Text style={styles.levelTagText}>Nv. {levelInfo.level}</Text>
            </View>
            <View style={styles.xpValueRow}>
              <Zap size={10} color="#f8c662" fill="#f8c662" />
              <Text style={styles.xpText}>
                {levelInfo.totalXp.toLocaleString("pt-BR")}/{levelInfo.levelMaxXp.toLocaleString("pt-BR")}
              </Text>
            </View>
          </View>

          {/* Micro Progress Bar */}
          <View style={styles.xpBarTrack}>
            <View style={[styles.xpBarFill, { width: `${levelInfo.progressPercent}%` }]} />
          </View>
        </TouchableOpacity>

        {/* 3D Avatar */}
        <TouchableOpacity
          style={[styles.avatarButton, { borderColor: levelInfo.currentAvatar.accentColor }]}
          onPress={() => setCurrentTab("profile")}
          activeOpacity={0.8}
        >
          <Image
            source={levelInfo.currentAvatar.image}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#160d2e",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.07)",
    zIndex: 10,
    width: "100%",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    flexShrink: 0,
  },
  logoIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#6b4ee8",
    overflow: "hidden",
  },
  logoIcon: {
    width: "100%",
    height: "100%",
  },
  logoText: {
    fontSize: 19,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },
  livesPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  livesPillDead: {
    backgroundColor: "rgba(100, 116, 139, 0.2)",
    borderColor: "rgba(100, 116, 139, 0.4)",
  },
  xpPill: {
    backgroundColor: "rgba(93, 66, 202, 0.35)",
    borderWidth: 1,
    borderColor: "rgba(141, 117, 243, 0.3)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    minWidth: 104,
  },
  xpTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    marginBottom: 2,
  },
  levelTag: {
    backgroundColor: "#6b4ee8",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  levelTagText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#ffffff",
  },
  xpValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  xpText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 9.5,
    fontWeight: "700",
    color: "#e9e4ff",
    letterSpacing: 0.2,
  },
  xpBarTrack: {
    width: "100%",
    height: 3.5,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 2,
    overflow: "hidden",
  },
  xpBarFill: {
    height: "100%",
    backgroundColor: "#f8c662",
    borderRadius: 2,
  },
  bellButton: {
    position: "relative",
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  noticeDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ffbf66",
  },
  avatarButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#1f153a",
    borderWidth: 1.5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
});
