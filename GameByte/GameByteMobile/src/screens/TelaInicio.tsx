import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Flame, Zap, Trophy, Play, Award, Sparkles, Compass } from "lucide-react-native";
import { useApp } from "../context/AppContext";

const { width: screenWidth } = Dimensions.get("window");
const isSmallDevice = screenWidth < 375;

const mascotCelebrate = require("../../assets/mascote_transparent.png");

export function TelaInicio() {
  const { totalXp, setCurrentTab, setSelectedTrackId } = useApp();

  const handleStartTracks = () => {
    setSelectedTrackId(null);
    setCurrentTab("tracks");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Hero Card */}
      <LinearGradient
        colors={["#5e3ed2", "#3d277f", "#2c165d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >
        <View style={styles.heroDecorativeRing} pointerEvents="none" />

        <View style={styles.heroTextContainer}>
          <Text style={styles.heroDate}>QUINTA · 21 DE AGOSTO</Text>
          <Text style={styles.heroTitle}>
            Bom te ver de volta,{"\n"}Marina <Text style={styles.heroSparkle}>✦</Text>
          </Text>
        </View>

        <View style={styles.heroMascotBox} pointerEvents="none">
          <Image
            source={mascotCelebrate}
            style={styles.heroMascot}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      {/* 2. Three Stat Badges */}
      <View style={styles.statsRow}>
        {/* Streak */}
        <View style={styles.statCard}>
          <View style={[styles.statIconBox, { backgroundColor: "#55304c" }]}>
            <Flame size={16} color="#ff9b73" fill="#ff9b73" />
          </View>
          <Text style={styles.statLabel}>SEQUÊNCIA</Text>
          <Text style={styles.statValue} numberOfLines={1}>12 dias</Text>
        </View>

        {/* Total XP */}
        <View style={styles.statCard}>
          <View style={[styles.statIconBox, { backgroundColor: "#55472a" }]}>
            <Zap size={16} color="#f6c768" fill="#f6c768" />
          </View>
          <Text style={styles.statLabel}>XP TOTAL</Text>
          <Text style={styles.statValue} numberOfLines={1}>{totalXp.toLocaleString("pt-BR")}</Text>
        </View>

        {/* Position */}
        <View style={styles.statCard}>
          <View style={[styles.statIconBox, { backgroundColor: "#443475" }]}>
            <Trophy size={16} color="#ae9aff" />
          </View>
          <Text style={styles.statLabel}>POSIÇÃO</Text>
          <Text style={styles.statValue} numberOfLines={1}>#18</Text>
        </View>
      </View>

      {/* 3. Section: Sua Jornada de Aprendizado */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Sua jornada de aprendizado</Text>
        <Text style={styles.sectionSubtitle}>Escolha um desafio e suba de nível</Text>
      </View>

      <View style={styles.journeyGrid}>
        {/* Main Challenge Card */}
        <LinearGradient
          colors={["#4d2daa", "#2a1367", "#120531"]}
          style={styles.challengeCard}
        >
          <View style={styles.challengeBadge}>
            <Text style={styles.challengeBadgeText}>💡 MAPA DE CARREIRA</Text>
          </View>
          <Text style={styles.challengeTitle}>
            Pronto para escolher sua trilha profissionalizante?
          </Text>
          <Text style={styles.challengeDesc}>
            Conclua as matérias fundamentais para desbloquear especializações em Cibersegurança, Full Stack, Cloud e Inteligência Artificial no GameByte.
          </Text>

          <TouchableOpacity
            style={styles.challengeButton}
            onPress={handleStartTracks}
            activeOpacity={0.85}
          >
            <Compass size={14} color="#200e54" />
            <Text style={styles.challengeButtonText}>Explorar Trilhas</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Next Achievement Card */}
        <View style={styles.achievementCard}>
          <View style={styles.achievementHeader}>
            <View style={styles.achievementIconBox}>
              <Award size={18} color="#472c11" />
            </View>
            <View>
              <Text style={styles.achievementTopText}>Quase lá!</Text>
              <Text style={styles.achievementSubText}>Próxima conquista</Text>
            </View>
          </View>

          <Text style={styles.achievementName}>Exploradora de dados</Text>
          <Text style={styles.achievementProgressCount}>3/5 conquistas</Text>

          <View style={styles.achievementBarTrack}>
            <View style={[styles.achievementBarFill, { width: "60%" }]} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#160d2e",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },

  // Hero Card
  heroCard: {
    position: "relative",
    borderRadius: 24,
    padding: 18,
    minHeight: isSmallDevice ? 135 : 150,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(133, 108, 233, 0.25)",
  },
  heroDecorativeRing: {
    position: "absolute",
    top: -40,
    right: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 16,
    borderColor: "rgba(157, 135, 243, 0.2)",
  },
  heroTextContainer: {
    maxWidth: isSmallDevice ? "58%" : "62%",
    zIndex: 2,
  },
  heroDate: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 9,
    fontWeight: "700",
    color: "#d5caff",
    letterSpacing: 1.4,
  },
  heroTitle: {
    fontSize: isSmallDevice ? 18 : 20,
    lineHeight: isSmallDevice ? 22 : 24,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.5,
    marginTop: 6,
  },
  heroSparkle: {
    color: "#f6c768",
  },
  heroMascotBox: {
    position: "absolute",
    right: -20,
    bottom: -15,
    width: isSmallDevice ? 145 : 165,
    height: isSmallDevice ? 145 : 165,
    zIndex: 1,
  },
  heroMascot: {
    width: "100%",
    height: "100%",
  },

  // 3 Stats
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.045)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 18,
    padding: 10,
  },
  statIconBox: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 8,
    fontWeight: "800",
    color: "#a69bbf",
    letterSpacing: 1,
  },
  statValue: {
    fontSize: isSmallDevice ? 13.5 : 15,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.3,
    marginTop: 2,
  },

  // Section Headers
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.4,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: "#9e94b5",
    marginTop: 1,
  },

  // Journey Grid
  journeyGrid: {
    gap: 12,
  },
  challengeCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 18,
  },
  challengeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 191, 102, 0.15)",
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  challengeBadgeText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 8.5,
    fontWeight: "800",
    color: "#ffc67a",
    letterSpacing: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: 20,
    letterSpacing: -0.3,
  },
  challengeDesc: {
    fontSize: 11.5,
    lineHeight: 16,
    color: "#aaa0c0",
    marginTop: 4,
    marginBottom: 14,
  },
  challengeButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    backgroundColor: "#ffbf66",
    borderRadius: 14,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  challengeButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#200e54",
  },

  // Achievement Card
  achievementCard: {
    backgroundColor: "#211440",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 22,
    padding: 16,
  },
  achievementHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  achievementIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#f2bb5e",
    alignItems: "center",
    justifyContent: "center",
  },
  achievementTopText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#ffffff",
  },
  achievementSubText: {
    fontSize: 9.5,
    color: "#a79abb",
  },
  achievementName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ffffff",
    marginTop: 10,
  },
  achievementProgressCount: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 9.5,
    color: "#f5c463",
    marginTop: 2,
    marginBottom: 6,
  },
  achievementBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.09)",
    overflow: "hidden",
  },
  achievementBarFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#f3bd5d",
  },
});
