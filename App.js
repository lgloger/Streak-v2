import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import AppNavigator from "./AppNavigator";

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
    async function prepareApp() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setAppReady(true);
      }
    }
    prepareApp();
  }, [fontsLoaded]);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#E8E8E8");
  }, []);

  if (!appReady) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
