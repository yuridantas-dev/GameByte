import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";

interface ButtonCustomProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "google" | "danger" | "success";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function ButtonCustom({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}: ButtonCustomProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryBtn;
      case "google":
        return styles.googleBtn;
      case "danger":
        return styles.dangerBtn;
      case "success":
        return styles.successBtn;
      default:
        return styles.primaryBtn;
    }
  };

  const getVariantTextStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryText;
      case "google":
        return styles.googleText;
      case "danger":
        return styles.dangerText;
      case "success":
        return styles.successText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.baseBtn,
        getVariantStyle(),
        (disabled || loading) && styles.disabledBtn,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === "secondary" ? "#7c3aed" : "#ffffff"} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.baseText, getVariantTextStyle(), textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseBtn: {
    width: "100%",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  baseText: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  primaryBtn: {
    backgroundColor: "#6b4ee8",
    shadowColor: "#6b4ee8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryText: {
    color: "#ffffff",
  },
  secondaryBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  secondaryText: {
    color: "#ffffff",
  },
  googleBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  googleText: {
    color: "#ffffff",
  },
  dangerBtn: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.35)",
  },
  dangerText: {
    color: "#f87171",
  },
  successBtn: {
    backgroundColor: "#22c55e",
  },
  successText: {
    color: "#ffffff",
  },
  disabledBtn: {
    opacity: 0.6,
  },
});
