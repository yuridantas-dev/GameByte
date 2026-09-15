import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Home, LayoutGrid, Trophy, User } from "lucide-react-native";
import { useApp, ScreenTab } from "../context/AppContext";

export function MenuNavegacao() {
  const { currentTab, setCurrentTab } = useApp();

  const navItems: { tab: ScreenTab; label: string; icon: any }[] = [
    { tab: "home", label: "Início", icon: Home },
    { tab: "tracks", label: "Trilhas", icon: LayoutGrid },
    { tab: "ranking", label: "Ranking", icon: Trophy },
    { tab: "profile", label: "Perfil", icon: User },
  ];

  return (
    <View style={styles.navContainer}>
      {navItems.map(({ tab, label, icon: Icon }) => {
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
    paddingBottom: Platform.OS === "ios" ? 24 : 10,
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
});
