import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import EmailSentScreen from "./screens/EmailSentScreen";
import HomeScreen from "./screens/HomeScreen";
import HabitDetailScreen from "./screens/HabitDetailScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AddHabitScreen from "./screens/AddHabitsScreen";
import { auth } from "./js/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";

const Stack = createStackNavigator();

const AppNavigator = () => {
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
      <View style={loadingStyles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#000000"
          style={{ marginBottom: 10 }}
        />
        <Text style={loadingStyles.loadingText}>Logging in</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Home" : "Login"}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureDirection: "horizontal",
          transitionSpec: {
            open: { animation: "timing", config: { duration: 250 } },
            close: { animation: "timing", config: { duration: 250 } },
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="EmailSent" component={EmailSentScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HabitDetail" component={HabitDetailScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="AddHabit" component={AddHabitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const loadingStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    padding: 10,
  },

  loadingText: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#000000",
  },
});

export default AppNavigator;
