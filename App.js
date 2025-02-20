import React, { useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import AppNavigator from "./AppNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    console.log("fontsLoaded:", fontsLoaded)
    NavigationBar.setBackgroundColorAsync("#E8E8E8");
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    console.log("fontsLoaded:", fontsLoaded);
    if (fontsLoaded) {
      try {
        await SplashScreen.hideAsync();
        console.log("Splash Screen versteckt!");
      } catch (error) {
        console.error("Fehler beim Verstecken des Splash Screens:", error);
      }
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}  onLayout={onLayoutRootView}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
