import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar as RNStatusBar,
  Platform,
} from "react-native";

import { SigninViewModel } from "../js/authManager";

const LoginScreen = ({ navigation, theme }) => {
  const { email, setEmail, password, setPassword, handleSignin } =
    SigninViewModel(navigation);

  const Container = Platform.select({
    web: View,
    default: SafeAreaView,
  });

  return (
    <Container
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.headerContainer}>
        <Text style={[styles.headerTitle, { color: theme.headerText }]}>
          Sign In
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.secondary,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <Image
            source={require("../assets/icons/email.png")}
            style={[styles.inputIcon, { tintColor: theme.iconTint }]}
          />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor={theme.text}
            keyboardType="email-address"
            selectionColor={theme.text}
            cursorColor={theme.text}
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.secondary,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <Image
            source={require("../assets/icons/password.png")}
            style={[styles.inputIcon, { tintColor: theme.iconTint }]}
          />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor={theme.text}
            keyboardType="default"
            selectionColor={theme.text}
            cursorColor={theme.text}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                backgroundColor: theme.iconBackground,
                borderColor: theme.borderColor,
              },
            ]}
            onPress={() => handleSignin()}
            activeOpacity={0.6}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.helpContainer}>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate("Signup")}
            activeOpacity={0.6}
          >
            <Text style={[styles.helpText, { color: theme.text }]}>
              Create account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate("ResetPassword")}
            activeOpacity={0.6}
          >
            <Text style={[styles.helpText, { color: theme.text }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style={theme.background === "#1D1E20" ? "light" : "dark"} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingHorizontal: 20,
  },

  headerContainer: {
    height: 60,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop:
      Platform.OS === "android" ? (RNStatusBar.currentHeight || 0) + 60 : 60,
    marginBottom: 60,
  },

  headerTitle: {
    fontSize: 28,
    fontFamily: "Poppins-SemiBold",
    includeFontPadding: false,
  },

  mainContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },

  inputContainer: {
    height: 60,
    width: "100%",
    maxWidth: 450,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    paddingHorizontal: 15,
    gap: 10,
    borderWidth: 1,
  },

  inputIcon: {
    height: 24,
    width: 24,
  },

  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    includeFontPadding: false,
  },

  buttonContainer: {
    height: "auto",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  continueButton: {
    height: 60,
    width: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    borderWidth: 1,
  },

  buttonText: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    includeFontPadding: false,
  },

  helpContainer: {
    height: "auto",
    width: 185,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    gap: 5,
  },

  helpText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    includeFontPadding: false,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
