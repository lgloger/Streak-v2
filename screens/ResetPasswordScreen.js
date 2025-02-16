import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar as RNStatusBar,
  Platform,
} from "react-native";

import { ResetPasswordViewModel } from "../js/authManager";

const ResetPasswordScreen = ({ navigation }) => {
  const { email, setEmail, handleResetPassword } =
    ResetPasswordViewModel(navigation);

  const Container = Platform.select({
    web: View,
    default: SafeAreaView,
  });

  return (
    <Container style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Reset Password</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/icons/email.png")}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#000000"
            keyboardType="email-adress"
            selectionColor="#FFFFFF"
            cursorColor="#000000"
            caretHidden={false}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => handleResetPassword()}
            activeOpacity={0.6}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.helpContainer}>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.6}
          >
            <Text style={styles.helpText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
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
    color: "#000000",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingHorizontal: 15,
    gap: 10,
  },

  inputIcon: {
    height: 24,
    width: 24,
  },

  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#000000",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
  },

  buttonText: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: "#000000",
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
    color: "#000000",
    includeFontPadding: false,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default ResetPasswordScreen;
