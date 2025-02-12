import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar as RNStatusBar,
  Platform,
} from "react-native";

const EmailSentScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Email sent</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHeader}>You're almost there!</Text>
          <Text style={styles.text}>
            You should already have an email from us in your inbox.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.6}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },

  textContainer: {
    height: "auto",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 15,
    gap: 5,
  },

  textHeader: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#000000",
    includeFontPadding: false,
  },

  text: {
    fontSize: 14,
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
});

export default EmailSentScreen;
