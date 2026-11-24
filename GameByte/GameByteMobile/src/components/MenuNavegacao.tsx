import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Home, LayoutGrid, Trophy, User, GraduationCap } from "lucide-react-native";
import { useApp, ScreenTab } from "../context/AppContext";

export function MenuNavegacao() {
  const { currentTab, setCurrentTab, userRole, classStudents } = useApp();

  const riskCount = classStudents.filter((s) => s.lastActiveDaysAgo > 7).length;

  const navItems: { tab: ScreenTab; label: string; icon: any; badge?: number }[] =
    userRole === "teacher"
      ? [
          { tab: "teacher" as ScreenTab, label: "Docente", icon: GraduationCap, badge: riskCount },
          { tab: "ranking" as ScreenTab, label: "Ranking", icon: Trophy },
          { tab: "profile" as ScreenTab, label: "Perfil", icon: User },
        ]
      : [
          { tab: "home" as ScreenTab, label: "Início", icon: Home },
          { tab: "tracks" as ScreenTab, label: "Trilhas", icon: LayoutGrid },
          { tab: "ranking" as ScreenTab, label: "Ranking", icon: Trophy },
          { tab: "profile" as ScreenTab, label: "Perfil", icon: User },
        ];

  return (
    <View style={styles.navContainer}>
      {navItems.map(({ tab, label, icon: Icon, badge }) => {
        const isActive = currentTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            style={styles.navItem}
            onPress={() => setCurrentTab(tab)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconBox, isActive && styles.iconBoxActive]}>
              <Icon
                size={18}
                color={isActive ? "#ffffff" : "#9184aa"}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {badge !== undefined && badge > 0 && (
                <View style={styles.riskBadgeDot}>
                  <Text style={styles.riskBadgeDotText}>{badge}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(24, 13, 51, 0.98)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 24 : 18,
    zIndex: 20,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 64,
  },
  iconBox: {
    width: 38,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
  },
  iconBoxActive: {
    backgroundColor: "#5e40d3",
    shadowColor: "#5e40d3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9184aa",
  },
  navLabelActive: {
    color: "#b9a7ff",
  },
  riskBadgeDot: {
    position: "absolute",
    top: -3,
    right: -3,
    backgroundColor: "#ef4444",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: "#180d33",
  },
  riskBadgeDotText: {
    fontSize: 8.5,
    fontWeight: "900",
    color: "#ffffff",
  },
});
