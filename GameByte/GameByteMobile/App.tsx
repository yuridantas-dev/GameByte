import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, Platform, StatusBar as RNStatusBar } from "react-native";
import { AppProvider, useApp } from "./src/context/AppContext";
import { Cabecalho } from "./src/components/Cabecalho";
import { MenuNavegacao } from "./src/components/MenuNavegacao";
import { TelaLogin } from "./src/screens/TelaLogin";
import { TelaInicio } from "./src/screens/TelaInicio";
import { TelaTrilhas } from "./src/screens/TelaTrilhas";
import { TelaRanking } from "./src/screens/TelaRanking";
import { TelaPerfil } from "./src/screens/TelaPerfil";
import { TelaCarregamento } from "./src/screens/TelaCarregamento";

function MainApp() {
  const { isLoggedIn, isAppLoading, loadingMessage, setAppLoading, currentTab } = useApp();

  if (isAppLoading) {
    return (
      <TelaCarregamento
        mensagem={loadingMessage}
        duration={2200}
        onFinish={() => setAppLoading(false)}
      />
    );
  }

  if (!isLoggedIn) {
    return <TelaLogin />;
  }

  const renderScreen = () => {
    switch (currentTab) {
      case "tracks":
        return <TelaTrilhas />;
      case "ranking":
        return <TelaRanking />;
      case "profile":
        return <TelaPerfil />;
      default:
        return <TelaInicio />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <RNStatusBar barStyle="light-content" backgroundColor="#160d2e" translucent={false} />
      <Cabecalho />
      <View style={styles.screenContainer}>{renderScreen()}</View>
      <MenuNavegacao />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AppProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <MainApp />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#160d2e",
    ...(Platform.OS === "web"
      ? { minHeight: "100vh" as any, width: "100%" }
      : {}),
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#160d2e",
    paddingTop: 0,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#160d2e",
  },
});
