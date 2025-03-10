import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, View, Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./AppNavigator";
import * as Notifications from 'expo-notifications';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Benachrichtigungsberechtigungen werden benötigt!");
      }
    };
    requestPermissions();

    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        console.log("Schriftarten geladen:", fontsLoaded);

        await NavigationBar.setBackgroundColorAsync("#F2F2F6");
      } catch (error) {
        console.error("Fehler beim Vorbereiten der App:", error);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appReady && fontsLoaded) {
      try {
        await SplashScreen.hideAsync();
        console.log("Splash Screen versteckt!");
      } catch (error) {
        console.error("Fehler beim Verstecken des Splash Screens:", error);
      }
    }
  }, [appReady, fontsLoaded]);

  if (!appReady || !fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <AppNavigator />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
