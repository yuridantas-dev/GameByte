import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Lock } from "lucide-react-native";
import { useApp } from "../context/AppContext";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const isSmallDevice = screenWidth < 375;

const mascotImage = require("../../assets/mascote_transparent.png");
const appIconImage = require("../../assets/WhatsApp_Image_2026-08-21_at_12.09.51__1_.jpeg");

export function TelaLogin() {
  const { login } = useApp();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login();
    }, 600);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#160d2e" translucent={false} />

      {/* Ambient background glow effects */}
      <View style={styles.glowTop} pointerEvents="none" />
      <View style={styles.glowBottom} pointerEvents="none" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.cardContainer}>
          {/* Top Hero Section */}
          <LinearGradient
            colors={["#754fdf", "#5535b7", "#2c165d"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroSection}
          >
            {/* Decorative background geometric rings */}
            <View style={styles.decorativeRingTop} pointerEvents="none" />
            <View style={styles.decorativeRingBottom} pointerEvents="none" />

            {/* Logo */}
            <View style={styles.logoRow}>
              <View style={styles.logoIconBox}>
                <Image
                  source={appIconImage}
                  style={styles.logoIcon}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.logoText}>GameByte</Text>
            </View>

            {/* Hero Copy */}
            <View style={styles.heroTextContainer}>
              <Text style={styles.tagline}>SEU GAME DE APRENDIZADO</Text>
              <Text style={styles.heroTitle}>
                Aprender pode ser o seu melhor{" "}
                <Text style={styles.highlightText}>jogo.</Text>
              </Text>
              <Text style={styles.heroDescription} numberOfLines={3}>
                Domine habilidades, conclua missões e suba no ranking com a sua turma.
              </Text>
            </View>

            {/* Mascot Image with responsive positioning */}
            <View style={styles.mascotBox} pointerEvents="none">
              <Image
                source={mascotImage}
                style={styles.mascotImage}
                resizeMode="contain"
              />
            </View>
          </LinearGradient>

          {/* Bottom Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.welcomeBadge}>BOAS-VINDAS</Text>
            <Text style={styles.formTitle}>Entre e continue sua jornada.</Text>
            <Text style={styles.formSubtitle}>
              Use a sua conta institucional para acessar suas trilhas e seu progresso.
            </Text>

            {/* Google Login Button */}
            <TouchableOpacity
              style={[
                styles.googleButton,
                loading && styles.googleButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              <View style={styles.googleIconBadge}>
                <Text style={styles.googleIconLetter}>G</Text>
              </View>
              <Text style={styles.googleButtonText}>
                {loading ? "Conectando..." : "Continuar com Google"}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ACESSO SEGURO</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Security Notice Card */}
            <View style={styles.securityCard}>
              <Lock size={15} color="#b5a2ff" style={styles.securityIcon} />
              <Text style={styles.securityText}>
                Ao entrar, você concorda com os termos de uso e a política de privacidade do GameByte.
              </Text>
            </View>

            {/* Footer Support Link */}
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Ainda não tem acesso? </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.footerLink}>Fale com sua instituição</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#160d2e",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#20113f",
    alignSelf: "center",
    overflow: "hidden",
  },

  // Glows
  glowTop: {
    position: "absolute",
    top: -50,
    left: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#6944df",
    opacity: 0.28,
  },
  glowBottom: {
    position: "absolute",
    bottom: -60,
    right: -50,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#963c94",
    opacity: 0.22,
  },

  // Hero Section
  heroSection: {
    position: "relative",
    paddingTop: Platform.OS === "ios" ? 28 : 20,
    paddingHorizontal: 20,
    paddingBottom: 24,
    minHeight: isSmallDevice ? 230 : 260,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
  },
  decorativeRingTop: {
    position: "absolute",
    top: -30,
    right: -40,
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 22,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  decorativeRingBottom: {
    position: "absolute",
    bottom: -70,
    left: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 24,
    borderColor: "rgba(196, 178, 255, 0.14)",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    zIndex: 3,
  },
  logoIconBox: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#6b4ee8",
    overflow: "hidden",
    shadowColor: "#5e43dd",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
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
  heroTextContainer: {
    marginTop: 14,
    maxWidth: isSmallDevice ? "56%" : "60%",
    zIndex: 2,
  },
  tagline: {
    fontSize: 8.5,
    fontWeight: "800",
    color: "#dfd6ff",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: isSmallDevice ? 19 : 22,
    lineHeight: isSmallDevice ? 23 : 26,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  highlightText: {
    color: "#f6c768",
  },
  heroDescription: {
    fontSize: 10.5,
    lineHeight: 15,
    color: "#e2d9ff",
    opacity: 0.92,
    marginTop: 6,
  },
  mascotBox: {
    position: "absolute",
    right: -20,
    bottom: -15,
    width: isSmallDevice ? 180 : 210,
    height: isSmallDevice ? 180 : 210,
    zIndex: 1,
  },
  mascotImage: {
    width: "100%",
    height: "100%",
  },

  // Form Section
  formSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
  },
  welcomeBadge: {
    fontSize: 9.5,
    fontWeight: "800",
    color: "#a997ff",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  formTitle: {
    fontSize: isSmallDevice ? 21 : 23,
    lineHeight: isSmallDevice ? 25 : 27,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  formSubtitle: {
    fontSize: 12,
    lineHeight: 17,
    color: "#aaa0c1",
    marginTop: 6,
  },

  // Google Button
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginTop: 22,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  googleButtonDisabled: {
    opacity: 0.7,
  },
  googleIconBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4285f4",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIconLetter: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
  },
  googleButtonText: {
    color: "#281a4a",
    fontSize: 13.5,
    fontWeight: "700",
  },

  // Divider
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  dividerText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#776b91",
    letterSpacing: 1.2,
  },

  // Security Card
  securityCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#302051",
    borderWidth: 1,
    borderColor: "rgba(128, 102, 222, 0.22)",
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
  securityIcon: {
    marginTop: 1,
  },
  securityText: {
    flex: 1,
    fontSize: 10.5,
    lineHeight: 15,
    color: "#bbb0ce",
  },

  // Footer
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  footerText: {
    fontSize: 10.5,
    color: "#837799",
  },
  footerLink: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#b7a5ff",
  },
});
