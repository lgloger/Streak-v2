import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./AppNavigator";
import { lightTheme, darkTheme } from "./js/themes";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        if (theme.background) {
          await NavigationBar.setBackgroundColorAsync(theme.background);
        } else {
          console.error("Theme background is null or undefined");
        }
      } catch (error) {
        console.error("Error preparing the app:", error);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, [fontsLoaded, theme.background]);

  const onLayoutRootView = useCallback(async () => {
    if (appReady && fontsLoaded) {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error("Error hiding Splash Screen:", error);
      }
    }
  }, [appReady, fontsLoaded]);

  if (!appReady || !fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={[styles.container, { backgroundColor: theme.background }]}
        onLayout={onLayoutRootView}
      >
        <AppNavigator theme={theme} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
