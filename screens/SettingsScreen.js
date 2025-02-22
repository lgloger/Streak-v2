import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar as RNStatusBar,
  Platform,
} from "react-native";
import { SignOutViewModel, DeleteAccountViewModel } from "../js/authManager";
import DeleteAccountModal from "../components/DeleteAccountModal";
import { getAuth } from "firebase/auth";
import packageJson from "../package.json";

const SettingsScreenScreen = ({ navigation }) => {
  const { handleSignOut } = SignOutViewModel(navigation);
  const { handleDeleteAccount } = DeleteAccountViewModel(navigation);
  const [email, setEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setEmail(user.email);
    }
  }, []);

  const Container = Platform.select({
    web: View,
    default: SafeAreaView,
  });

  return (
    <Container style={styles.container}>
      <View style={styles.firstHeader}>
        <TouchableOpacity
          style={styles.headerTextButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.headerButtonTitle}>Schließen</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondHeader}>
        <Text style={styles.headerTitle}>Einstellungen</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.settingsCon}>
          <Text style={styles.conTitle}>Account</Text>
          <View style={styles.settingsSecCon}>
            <View style={styles.headerButton}>
              <Image
                style={styles.headerButtonIcon}
                source={require("../assets/icons/email_blue.png")}
              />
            </View>
            <View style={styles.settingsTextCon}>
              <Text style={styles.settingsTitle}>Email</Text>
              <Text style={styles.settingsText}>{email}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.settingsCon}
            onPress={() => handleSignOut()}
            activeOpacity={0.6}
          >
            <View style={styles.settingsSecCon}>
              <View style={styles.headerButtonRed}>
                <Image
                  style={styles.headerButtonIcon}
                  source={require("../assets/icons/logout_red.png")}
                />
              </View>
              <Text style={styles.settingsTitle}>Ausloggen</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsCon}
            onPress={() => setIsModalVisible(true)}
            activeOpacity={0.6}
          >
            <View style={styles.settingsSecCon}>
              <View style={styles.headerButtonRed}>
                <Image
                  style={styles.headerButtonIcon}
                  source={require("../assets/icons/delete_red.png")}
                />
              </View>
              <Text style={styles.settingsTitle}>Account Löschen</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsCon} activeOpacity={0.6}>
          <Text style={styles.conTitle}>Über die App</Text>
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={() => handleSignOut()}
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={styles.headerButtonIcon}
                source={require("../assets/icons/about_blue.png")}
              />
            </View>
            <Text style={styles.settingsTitle}>Informationen</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.versionCon}>
        <Text style={styles.settingsText}>Streak {packageJson.version}</Text>
      </View>

      <DeleteAccountModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onDelete={(password) => handleDeleteAccount(password)}
        email={email}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },

  firstHeader: {
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "transparent",
    marginTop: Platform.OS === "android" ? RNStatusBar.currentHeight || 0 : 0,
  },

  headerTextButton: {
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
  },

  headerButtonTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#000000",
    includeFontPadding: false,
  },

  headerButton: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(107, 198, 255, 0.45)",
    borderRadius: 30,
  },

  headerButtonRed: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 107, 110, 0.45)",
    borderRadius: 30,
  },

  headerButtonIcon: {
    height: 24,
    width: 24,
  },

  secondHeader: {
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },

  headerTitle: {
    fontSize: 28,
    fontFamily: "Poppins-SemiBold",
    includeFontPadding: false,
  },

  mainContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 450,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 30,
  },

  settingsCon: {
    height: "auto",
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderRadius: 15,
  },

  settingsSecCon: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 10,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  conTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#D0D0D0",
    includeFontPadding: false,
    textAlign: "left",
    padding: 15,
  },

  settingsTextCon: {
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
  },

  settingsTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    lineHeight: 25.5,
    includeFontPadding: false,
  },

  settingsText: {
    fontSize: 12,
    fontFamily: "Poppins-Bold",
    lineHeight: 15.5,
    includeFontPadding: false,
  },

  versionCon: {
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#E8E8E8",
  },
});

export default SettingsScreenScreen;
