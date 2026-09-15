import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { Zap, Bell } from "lucide-react-native";
import { useApp } from "../context/AppContext";

const appIconImage = require("../../assets/logo_clean_transparent.png");

export function Cabecalho() {
  const { totalXp, currentTab, setCurrentTab } = useApp();
  const [hasNotice, setHasNotice] = useState(true);

  const getBreadcrumb = () => {
    switch (currentTab) {
      case "ranking":
        return "Ranking";
      case "tracks":
        return "Trilhas";
      case "profile":
        return "Perfil";
      default:
        return "Início";
    }
  };

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

      {/* Center: Breadcrumb (visible on wider screens / web) */}
      {Platform.OS === "web" && (
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbMuted}>Bootcamp ADS</Text>
          <Text style={styles.breadcrumbSeparator}>›</Text>
          <Text style={styles.breadcrumbActive}>{getBreadcrumb()}</Text>
        </View>
      )}

      {/* Right: XP Badge, Notification Bell & Avatar */}
      <View style={styles.actionsRow}>
        {/* XP Pill */}
        <View style={styles.xpPill}>
          <Zap size={13} color="#f8c662" fill="#f8c662" />
          <Text style={styles.xpText}>{totalXp.toLocaleString("pt-BR")} XP</Text>
        </View>

        {/* Bell Button */}
        <TouchableOpacity
          style={styles.bellButton}
          onPress={() => setHasNotice(!hasNotice)}
          activeOpacity={0.7}
        >
          <Bell size={17} color="#c9c1df" />
          {hasNotice && <View style={styles.noticeDot} />}
        </TouchableOpacity>

        {/* Avatar */}
        <TouchableOpacity
          style={styles.avatarButton}
          onPress={() => setCurrentTab("profile")}
          activeOpacity={0.8}
        >
          <Text style={styles.avatarLetter}>M</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(22, 13, 46, 0.95)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.07)",
    zIndex: 10,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoIconBox: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#6b4ee8",
    overflow: "hidden",
  },
  logoIcon: {
    width: "100%",
    height: "100%",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.6,
  },
  logoTextHighlight: {
    fontWeight: "400",
    color: "#f6c768",
  },
  breadcrumb: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  breadcrumbMuted: {
    fontSize: 12,
    color: "#a399bf",
  },
  breadcrumbSeparator: {
    fontSize: 14,
    color: "#a399bf",
  },
  breadcrumbActive: {
    fontSize: 12,
    fontWeight: "700",
    color: "#edeaff",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  xpPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(93, 66, 202, 0.35)",
    borderWidth: 1,
    borderColor: "rgba(141, 117, 243, 0.3)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  xpText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 10.5,
    fontWeight: "700",
    color: "#e9e4ff",
    letterSpacing: 0.5,
  },
  bellButton: {
    position: "relative",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  noticeDot: {
    position: "absolute",
    top: 7,
    right: 7,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#ffbf66",
  },
  avatarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fdc8a9",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarLetter: {
    fontSize: 14,
    fontWeight: "800",
    color: "#5a2e44",
  },
});
