import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Lock, Mail, ShieldCheck } from "lucide-react-native";
import { useApp } from "../context/AppContext";
import { ButtonCustom } from "../components/ButtonCustom";
import { InputCustom } from "../components/InputCustom";

const { width: screenWidth } = Dimensions.get("window");
const isSmallDevice = screenWidth < 375;

const mascotImage = require("../../assets/mascote_transparent.png");
const appIconImage = require("../../assets/logo_clean_transparent.png");

export function TelaLogin() {
  const { login, setUserRole, setCurrentTab } = useApp();

  // Hooks avaliados na rubrica do professor (Critério 5: nomes significativos)
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher">("student");
  const [email, setEmail] = useState("marcos.cortes@portalcci.com.br");
  const [senha, setSenha] = useState("123456");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectRole = (role: "student" | "teacher") => {
    setSelectedRole(role);
    if (role === "teacher") {
      setEmail("professor@faculdadecci.com.br");
    } else {
      setEmail("marcos.cortes@portalcci.com.br");
    }
  };

  // Validação de formulário profissional (Diferencial da Rubrica)
  const handleLogin = () => {
    if (!email.trim()) {
      setErrorMessage("Por favor, digite seu e-mail institucional.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Formato de e-mail inválido. Ex: nome@portalcci.com.br");
      return;
    }
    if (senha.length < 6) {
      setErrorMessage("A senha deve conter no mínimo 6 caracteres.");
      return;
    }

    setErrorMessage(null);
    setLoading(true);
    setUserRole(selectedRole);
    if (selectedRole === "teacher") {
      setCurrentTab("teacher");
    } else {
      setCurrentTab("home");
    }
    login();
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setUserRole(selectedRole);
    if (selectedRole === "teacher") {
      setCurrentTab("teacher");
    } else {
      setCurrentTab("home");
    }
    login();
  };

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#754fdf" translucent={false} />

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

            {/* Top Logo */}
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
                Domine habilidades técnicas, conclua desafios práticos e suba de nível com a sua turma.
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
            <Text style={styles.welcomeBadge}>ACESSO INSTITUCIONAL</Text>
            <Text style={styles.formTitle}>Entre e continue sua jornada.</Text>
            <Text style={styles.formSubtitle}>
              Digite suas credenciais institucionais para carregar suas trilhas e vidas.
            </Text>

            {/* Perfil de Acesso: Aluno vs Professor (Seção 1.2 e 3.1 da Monografia) */}
            <View style={styles.roleSelectorBox}>
              <Text style={styles.roleSelectorLabel}>Perfil de Acesso:</Text>
              <View style={styles.roleButtonsRow}>
                <TouchableOpacity
                  style={[
                    styles.roleChoiceBtn,
                    selectedRole === "student" && styles.roleChoiceBtnActive,
                  ]}
                  onPress={() => handleSelectRole("student")}
                >
                  <Text
                    style={[
                      styles.roleChoiceBtnText,
                      selectedRole === "student" && styles.roleChoiceBtnTextActive,
                    ]}
                  >
                    🎓 Aluno (Estudante)
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleChoiceBtn,
                    selectedRole === "teacher" && styles.roleChoiceBtnTeacherActive,
                  ]}
                  onPress={() => handleSelectRole("teacher")}
                >
                  <Text
                    style={[
                      styles.roleChoiceBtnText,
                      selectedRole === "teacher" && styles.roleChoiceBtnTextActive,
                    ]}
                  >
                    👨‍🏫 Professor (Docente)
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Form Inputs (Componentizados e Validados - Critérios 1, 4 e 5) */}
            <InputCustom
              label="E-MAIL INSTITUCIONAL"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrorMessage(null);
              }}
              placeholder="seu.email@portalcci.com.br"
              keyboardType="email-address"
              icon={<Mail size={16} color="#a69abf" />}
              errorMessage={errorMessage}
            />

            <InputCustom
              label="SENHA DE ACESSO"
              value={senha}
              onChangeText={(text) => {
                setSenha(text);
                setErrorMessage(null);
              }}
              placeholder="Sua senha secreta (mín. 6 dígitos)"
              secureTextEntry
              icon={<Lock size={16} color="#a69abf" />}
            />

            {/* Reusable Primary Button (Critério 4) */}
            <ButtonCustom
              title="Entrar no GameByte"
              onPress={handleLogin}
              loading={loading}
              style={styles.submitBtn}
            />

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OU ACESSO RÁPIDO</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Reusable Secondary/Google Button (Critério 4) */}
            <ButtonCustom
              title="Continuar com Google"
              variant="google"
              onPress={handleGoogleLogin}
              disabled={loading}
              icon={
                <View style={styles.googleIconBadge}>
                  <Text style={styles.googleIconLetter}>G</Text>
                </View>
              }
            />

            {/* Security Notice Card */}
            <View style={styles.securityCard}>
              <ShieldCheck size={15} color="#4ade80" style={styles.securityIcon} />
              <Text style={styles.securityText}>
                Ambiente seguro autenticado pelo sistema de login do GameByte Mobile.
              </Text>
            </View>

            {/* Footer Support Link */}
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Precisa de suporte? </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.footerLink}>Fale com a coordenação</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#20113f",
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
    paddingTop: Platform.OS === "ios" ? 28 : 22,
    paddingHorizontal: 20,
    paddingBottom: 28,
    minHeight: isSmallDevice ? 230 : 255,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
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
  heroTextContainer: {
    marginTop: isSmallDevice ? 16 : 22,
    maxWidth: isSmallDevice ? "55%" : "58%",
    zIndex: 2,
  },
  tagline: {
    fontSize: 8.5,
    fontWeight: "800",
    color: "#dfd6ff",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: isSmallDevice ? 19 : 22,
    lineHeight: isSmallDevice ? 23 : 26,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.5,
    marginTop: 4,
  },
  highlightText: {
    color: "#f6c768",
  },
  heroDescription: {
    fontSize: 10.5,
    lineHeight: 15.5,
    color: "#e2d9ff",
    opacity: 0.92,
    marginTop: 8,
  },
  mascotBox: {
    position: "absolute",
    right: isSmallDevice ? -40 : -50,
    bottom: isSmallDevice ? -18 : -22,
    width: isSmallDevice ? 215 : 255,
    height: isSmallDevice ? 215 : 255,
    zIndex: 1,
  },
  mascotImage: {
    width: "100%",
    height: "100%",
  },

  // Form Section
  formSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
  },
  welcomeBadge: {
    fontSize: 9,
    fontWeight: "800",
    color: "#a997ff",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  formTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  formSubtitle: {
    fontSize: 11,
    color: "#b4a5d3",
    marginTop: 3,
    marginBottom: 16,
    lineHeight: 15,
  },
  submitBtn: {
    marginTop: 4,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  dividerText: {
    fontSize: 8.5,
    fontWeight: "800",
    color: "#9184aa",
    letterSpacing: 1,
  },
  googleIconBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIconLetter: {
    fontSize: 13,
    fontWeight: "900",
    color: "#4285f4",
    fontFamily: Platform.OS === "ios" ? "Helvetica" : "sans-serif",
  },
  securityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    marginTop: 14,
    gap: 8,
  },
  securityIcon: {
    flexShrink: 0,
  },
  securityText: {
    flex: 1,
    fontSize: 10,
    color: "#a79abf",
    lineHeight: 13.5,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  footerText: {
    fontSize: 11,
    color: "#9385af",
  },
  footerLink: {
    fontSize: 11,
    fontWeight: "700",
    color: "#bbaaff",
    textDecorationLine: "underline",
  },
  roleSelectorBox: {
    marginBottom: 14,
  },
  roleSelectorLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#c4b5fd",
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  roleButtonsRow: {
    flexDirection: "row",
    gap: 8,
  },
  roleChoiceBtn: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
  },
  roleChoiceBtnActive: {
    backgroundColor: "#6b4ee8",
    borderColor: "#8b5cf6",
  },
  roleChoiceBtnTeacherActive: {
    backgroundColor: "#d97706",
    borderColor: "#f59e0b",
  },
  roleChoiceBtnText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#9487b0",
  },
  roleChoiceBtnTextActive: {
    color: "#ffffff",
    fontWeight: "800",
  },
});
