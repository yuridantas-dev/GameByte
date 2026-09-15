import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";

const logoImage = require("../../assets/logo_clean_transparent.png");

interface TelaCarregamentoProps {
  mensagem?: string;
  onFinish?: () => void;
  duration?: number;
}

export function TelaCarregamento({
  mensagem = "Carregando...",
  onFinish,
  duration = 2000,
}: TelaCarregamentoProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Fade in screen content
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // 2. Infinite smooth rotation loop for the encircling ring
    const spinLoop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinLoop.start();

    // 3. Completion timer if onFinish provided
    let timer: NodeJS.Timeout;
    if (onFinish) {
      timer = setTimeout(() => {
        onFinish();
      }, duration);
    }

    return () => {
      spinLoop.stop();
      if (timer) clearTimeout(timer);
    };
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#160d2e" translucent={false} />

      <Animated.View style={[styles.contentBox, { opacity: fadeAnim }]}>
        {/* Logo with Encircling Spinning Loader Ring */}
        <View style={styles.loaderCircleContainer}>
          {/* Background Subtle Track */}
          <View style={styles.spinnerTrack} />

          {/* Active Spinning Ring */}
          <Animated.View
            style={[
              styles.spinningRing,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          />

          {/* Logo Center */}
          <View style={styles.logoBox}>
            <Image
              source={logoImage}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Only "Carregando..." text below */}
        <Text style={styles.loadingText}>{mensagem}</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#160d2e",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },
  contentBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  loaderCircleContainer: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 24,
  },
  spinnerTrack: {
    position: "absolute",
    width: 136,
    height: 136,
    borderRadius: 68,
    borderWidth: 3,
    borderColor: "rgba(168, 85, 247, 0.15)",
  },
  spinningRing: {
    position: "absolute",
    width: 136,
    height: 136,
    borderRadius: 68,
    borderWidth: 3,
    borderColor: "transparent",
    borderTopColor: "#b78af7",
    borderRightColor: "#8b5cf6",
  },
  logoBox: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  loadingText: {
    fontSize: 14,
    color: "#bba8db",
    fontWeight: "600",
    letterSpacing: 0.8,
  },
});
