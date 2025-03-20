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
import * as MailComposer from "expo-mail-composer";

const SettingsScreen = ({ navigation, theme }) => {
  const { handleSignOut } = SignOutViewModel(navigation);
  const { handleDeleteAccount } = DeleteAccountViewModel(navigation);
  const [email, setEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const sendEmail = async () => {
    const supportEmail = "luca.kloger@gmail.com";
    const subject = "Streak - Support";
    const body = "Beschreiben sie ihr Anliegen";

    const result = await MailComposer.composeAsync({
      recipients: [supportEmail],
      subject: subject,
      body: body,
    });

    if (result.status === "sent") {
      console.log("Email sent successfully");
    } else {
      console.log("Email not sent");
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
    <Container
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.firstHeader}>
        <TouchableOpacity
          style={styles.headerTextButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={[styles.headerIcon, { tintColor: theme.headerText }]}
            source={require("../assets/icons/arrow.png")}
          />
          <Text style={[styles.headerButtonTitle, { color: theme.headerText }]}>
            Habits
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondHeader}>
        <Text style={[styles.headerTitle, { color: theme.headerText }]}>
          Settings
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.settingsCon,
            {
              backgroundColor: theme.secondary,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={sendEmail}
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={[styles.headerButtonIcon, { tintColor: theme.iconTint }]}
                source={require("../assets/icons/email.png")}
              />
            </View>
            <Text style={[styles.settingsTitle, { color: theme.headerText }]}>
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={() => navigation.navigate("FeatureRequest")}
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={[styles.headerButtonIcon, { tintColor: theme.iconTint }]}
                source={require("../assets/icons/roadmap.png")}
              />
            </View>
            <Text style={[styles.settingsTitle, { color: theme.headerText }]}>
              Roadmap
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.settingsCon,
            {
              backgroundColor: theme.secondary,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={() => handleSignOut()}
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={[styles.headerButtonIcon, { tintColor: theme.iconTint }]}
                source={require("../assets/icons/about.png")}
              />
            </View>
            <Text style={[styles.settingsTitle, { color: theme.headerText }]}>
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={() => handleSignOut()}
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={[styles.headerButtonIcon, { tintColor: theme.iconTint }]}
                source={require("../assets/icons/lock.png")}
              />
            </View>
            <Text style={[styles.settingsTitle, { color: theme.headerText }]}>
              Privacy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={() => handleSignOut()}
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={[styles.headerButtonIcon, { tintColor: theme.iconTint }]}
                source={require("../assets/icons/lawyer.png")}
              />
            </View>
            <Text style={[styles.settingsTitle, { color: theme.headerText }]}>
              Legal
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.settingsCon,
            {
              backgroundColor: theme.secondary,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={() => handleSignOut()}
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={[styles.headerButtonIcon, { tintColor: theme.iconTint }]}
                source={require("../assets/icons/logout.png")}
              />
            </View>
            <Text style={[styles.settingsTitle, { color: theme.headerText }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsSecCon}
            onPress={() => setIsModalVisible(true)} // Modal öffnen statt direkt handleSignOut
            activeOpacity={0.6}
          >
            <View style={styles.headerButton}>
              <Image
                style={[styles.headerButtonIcon, { tintColor: theme.iconTint }]}
                source={require("../assets/icons/delete.png")}
              />
            </View>
            <Text style={[styles.settingsTitle, { color: theme.headerText }]}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.versionCon, { backgroundColor: theme.background }]}>
        <Text style={[styles.settingsText, { color: theme.headerText }]}>
          Streak {packageJson.version}
        </Text>
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
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
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
    flexDirection: "row",
    gap: 2,
  },

  headerIcon: {
    height: 24,
    width: 24,
  },

  headerButtonTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
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
    gap: 15,
  },

  settingsCon: {
    height: "auto",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 15,
    gap: 15,
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
  },
});

export default SettingsScreen;
