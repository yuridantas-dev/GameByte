import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Heart } from "lucide-react-native";

interface HeartDisplayProps {
  lives: number;
  maxLives?: number;
  size?: number;
  showText?: boolean;
}

export function HeartDisplay({
  lives,
  maxLives = 3,
  size = 15,
  showText = false,
}: HeartDisplayProps) {
  const renderSingleHeart = (index: number) => {
    const fullThreshold = index + 1.0;
    const halfThreshold = index + 0.5;

    if (lives >= fullThreshold) {
      // Coração 100% Cheio
      return <Heart key={index} size={size} color="#ef4444" fill="#ef4444" />;
    } else if (lives >= halfThreshold) {
      // Meio Coração (Corte visual de 50%)
      return (
        <View key={index} style={{ width: size, height: size, position: "relative" }}>
          <Heart size={size} color="#64748b" fill="rgba(255,255,255,0.08)" />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: size / 2,
              height: size,
              overflow: "hidden",
            }}
          >
            <Heart size={size} color="#ef4444" fill="#ef4444" />
          </View>
        </View>
      );
    } else {
      // Coração Vazio
      return (
        <Heart
          key={index}
          size={size}
          color="#64748b"
          fill="rgba(255,255,255,0.08)"
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heartsRow}>
        {[0, 1, 2].map((i) => renderSingleHeart(i))}
      </View>
      {showText && (
        <Text style={styles.livesText}>
          {lives.toFixed(1).replace(".0", "")} / {maxLives}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  heartsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  livesText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#fca5a5",
    fontFamily: "monospace",
  },
});
