import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import EmailSentScreen from "./screens/EmailSentScreen";
import HomeScreen from "./screens/HomeScreen";
import HabitDetailScreen from "./screens/HabitDetailScreen";
import AddHabitScreen from "./screens/AddHabitsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import FeatureRequestScreen from "./screens/FeatureRequestScreen";
import { auth } from "./js/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { StyleSheet, ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();

const AppNavigator = ({ theme }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={[loadingStyles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator
          size="large"
          color={theme.text}
          style={{ marginBottom: 10 }}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Home" : "Login"}
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen name="Signup">
          {(props) => <SignupScreen {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen name="ResetPassword">
          {(props) => <ResetPasswordScreen {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen name="EmailSent">
          {(props) => <EmailSentScreen {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen name="AddHabit">
          {(props) => <AddHabitScreen {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen name="HabitDetail">
          {(props) => <HabitDetailScreen {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {(props) => <SettingsScreen {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen name="FeatureRequest">
          {(props) => <FeatureRequestScreen {...props} theme={theme} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default AppNavigator;