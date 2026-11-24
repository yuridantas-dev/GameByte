import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import { HeartCrack, Clock, BookOpen, RotateCcw, X } from "lucide-react-native";
import { useApp } from "../context/AppContext";
import { ButtonCustom } from "./ButtonCustom";

export function OutOfLivesModal() {
  const {
    showOutOfLivesModal,
    setShowOutOfLivesModal,
    rechargeLives,
    rechargeHoursRemaining,
    setCurrentTab,
  } = useApp();

  if (!showOutOfLivesModal) return null;

  return (
    <Modal
      visible={showOutOfLivesModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowOutOfLivesModal(false)}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setShowOutOfLivesModal(false)}
          >
            <X size={18} color="#ffffff" />
          </TouchableOpacity>

          {/* Broken Heart Icon */}
          <View style={styles.iconBox}>
            <HeartCrack size={42} color="#ef4444" />
          </View>

          <Text style={styles.title}>Vidas Esgotadas! 💔</Text>
          <Text style={styles.subtitle}>
            Você perdeu todos os seus 3 corações nos desafios. É hora de fazer uma pausa para recarregar as baterias mentais!
          </Text>

          {/* Recharge Countdown Box */}
          <View style={styles.timerCard}>
            <View style={styles.timerHeader}>
              <Clock size={16} color="#f87171" />
              <Text style={styles.timerHeaderTitle}>TEMPO DE RECARGA</Text>
            </View>
            <Text style={styles.timerValue}>{rechargeHoursRemaining}</Text>
            <Text style={styles.timerSubtext}>
              Seus 3 corações serão totalmente restaurados para novas tentativas.
            </Text>
          </View>

          {/* Study Suggestion Box */}
          <View style={styles.tipBox}>
            <BookOpen size={16} color="#ffd700" />
            <Text style={styles.tipText}>
              Dica: Enquanto espera, você pode revisar a teoria no{" "}
              <Text style={styles.tipBoldText}>Guia de Estudos</Text> sem gastar vidas!
            </Text>
          </View>

          {/* Actions with Reusable ButtonCustom */}
          <ButtonCustom
            title="Recarregar Vidas (Modo Teste)"
            variant="success"
            onPress={rechargeLives}
            icon={<RotateCcw size={15} color="#ffffff" />}
            style={styles.modalActionBtn}
          />

          <ButtonCustom
            title="Voltar para o Início"
            variant="secondary"
            onPress={() => {
              setShowOutOfLivesModal(false);
              setCurrentTab("home");
            }}
            style={styles.modalDismissBtn}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(10, 5, 25, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    zIndex: 9999,
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#20123d",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(239, 68, 68, 0.35)",
    padding: 22,
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  iconBox: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 2,
    borderColor: "rgba(239, 68, 68, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 21,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -0.4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "#cbbfe6",
    textAlign: "center",
    lineHeight: 17,
    marginTop: 6,
    paddingHorizontal: 8,
  },
  timerCard: {
    width: "100%",
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    padding: 14,
    alignItems: "center",
    marginTop: 16,
  },
  timerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  timerHeaderTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#fca5a5",
    letterSpacing: 0.8,
  },
  timerValue: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 24,
    fontWeight: "900",
    color: "#f87171",
    letterSpacing: 1,
    marginVertical: 4,
  },
  timerSubtext: {
    fontSize: 10,
    color: "#b9aacf",
    textAlign: "center",
  },
  tipBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.07)",
    padding: 10,
    marginTop: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 10.5,
    color: "#d1c4e9",
    lineHeight: 15,
  },
  tipBoldText: {
    color: "#ffffff",
    fontWeight: "800",
  },
  modalActionBtn: {
    marginTop: 16,
  },
  modalDismissBtn: {
    marginTop: 8,
  },
});
