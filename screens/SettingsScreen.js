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
import * as MailComposer from 'expo-mail-composer';

const SettingsScreenScreen = ({ navigation }) => {
  const { handleSignOut } = SignOutViewModel(navigation);
  const { handleDeleteAccount } = DeleteAccountViewModel(navigation);
  const [email, setEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const sendEmail = async () => {
    const supportEmail = 'luca.kloger@gmail.com';
    const subject = 'Streak - Support';
    const body = 'Beschreiben sie ihr Anliegen';

    const result = await MailComposer.composeAsync({
      recipients: [supportEmail],
      subject: subject,
      body: body,
    });

    if (result.status === 'sent') {
      console.log('Email sent successfully');
    } else {
      console.log('Email not sent');
    }
  };

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
          <Text style={styles.headerButtonTitle}>Zurück</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondHeader}>
        <Text style={styles.headerTitle}>Einstellungen</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.settingsCon} activeOpacity={0.6}>
          <Text style={styles.conTitle}>Support</Text>
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={sendEmail}
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={styles.headerButtonIcon}
                source={require("../assets/icons/email.png")}
              />
            </View>
            <Text style={styles.settingsTitle}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={() => navigation.navigate("FeatureRequest")}
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={styles.headerButtonIcon}
                source={require("../assets/icons/roadmap.png")}
              />
            </View>
            <Text style={styles.settingsTitle}>Roadmap</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsCon} activeOpacity={0.6}>
          <Text style={styles.conTitle}>Informationen zur App</Text>
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={() => handleSignOut()}
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={styles.headerButtonIcon}
                source={require("../assets/icons/about.png")}
              />
            </View>
            <Text style={styles.settingsTitle}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={() => handleSignOut()}
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={styles.headerButtonIcon}
                source={require("../assets/icons/lock.png")}
              />
            </View>
            <Text style={styles.settingsTitle}>Datenschutz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={() => handleSignOut()}
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={styles.headerButtonIcon}
                source={require("../assets/icons/lawyer.png")}
              />
            </View>
            <Text style={styles.settingsTitle}>Rechtliches</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsCon}>
          <Text style={styles.conTitle}>Account</Text>
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={() => handleSignOut()}
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={styles.headerButtonIcon}
                source={require("../assets/icons/logout.png")}
              />
            </View>
            <Text style={styles.settingsTitle}>Ausloggen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={() => handleSignOut()}
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={styles.headerButtonIcon}
                source={require("../assets/icons/delete.png")}
              />
            </View>
            <Text style={styles.settingsTitle}>Account Löschen</Text>
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
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
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
    fontFamily: "Poppins-SemiBold",
    lineHeight: 25.5,
    includeFontPadding: false,
  },

  settingsText: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
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
