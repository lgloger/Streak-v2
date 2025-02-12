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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstHeader}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.headerButtonIcon}
            source={require("../assets/icons/arrow.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.secondHeader}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.settingsCon}>
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
        <TouchableOpacity style={styles.settingsCon} activeOpacity={0.6}>
          <View style={styles.headerButton}>
            <Image
              style={styles.headerButtonIcon}
              source={require("../assets/icons/about_blue.png")}
            />
          </View>
          <Text style={styles.settingsTitle}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsCon}
          onPress={() => handleSignOut()}
          activeOpacity={0.6}
        >
          <View style={styles.headerButtonRed}>
            <Image
              style={styles.headerButtonIcon}
              source={require("../assets/icons/logout_red.png")}
            />
          </View>
          <Text style={styles.settingsTitle}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsCon}
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.6}
        >
          <View style={styles.headerButtonRed}>
            <Image
              style={styles.headerButtonIcon}
              source={require("../assets/icons/delete_red.png")}
            />
          </View>
          <Text style={styles.settingsTitle}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      <DeleteAccountModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onDelete={(password) => handleDeleteAccount(password)}
        email={email}
      />
    </SafeAreaView>
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
    backgroundColor: "transparent",
  },

  headerTitle: {
    fontSize: 28,
    fontFamily: "Poppins-SemiBold",
    includeFontPadding: false,
  },

  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },

  settingsCon: {
    height: "auto",
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 10,
    borderRadius: 25,
    padding: 15,
  },

  settingsTextCon: {
    flex: 1,
    flexDirection: "column",
  },

  settingsTitle: {
    flex: 1,
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    includeFontPadding: false,
  },

  settingsText: {
    fontSize: 12,
    fontFamily: "Poppins-Bold",
    includeFontPadding: false,
  },
});

export default SettingsScreenScreen;
