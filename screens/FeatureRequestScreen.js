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
import { getAuth } from "firebase/auth";

const FeatureRequestScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

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
        <Text style={styles.headerTitle}>Feature Request</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.categoryCon}>
          <TouchableOpacity
            style={styles.categoryButton}
            // onPress={}
            activeOpacity={0.6}
          >
            <Text style={styles.categoryButtonText}>Pending (0)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            // onPress={}
            activeOpacity={0.6}
          >
            <Text style={styles.categoryButtonText}>Planned (1)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            // onPress={}
            activeOpacity={0.6}
          >
            <Text style={styles.categoryButtonText}>Completed (0)</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.featureCon} activeOpacity={0.6}>
          <View style={styles.voteCon}>
            <Image
              style={styles.voteIcon}
              source={require("../assets/icons/vote.png")}
            />
            <Text style={styles.voteText}>3</Text>
          </View>
          <View style={styles.featureTextCon}>
            <Text style={styles.featureTitle}>Hello World 👋</Text>
            <Text style={styles.featureDescription}>
              Use this feedback entry as an example.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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

  categoryCon: {
    height: 35,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },

  categoryButton: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 7.5,
  },

  categoryButtonText: {
    fontSize: 13,
    fontFamily: "Poppins-Medium",
    color: "#818181",
    includeFontPadding: false,
    textAlign: "center",
  },

  featureCon: {
    height: 73,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    gap: 15,
  },

  voteCon: {
    height: "100%",
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  voteIcon: {
    height: 18,
    width: 18,
  },

  voteText: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#818181",
    includeFontPadding: false,
    textAlign: "center",
  },

  featureTextCon: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  featureTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#818181",
    includeFontPadding: false,
    textAlign: "center",
  },

  featureDescription: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#818181",
    includeFontPadding: false,
    textAlign: "center",
  },
});

export default FeatureRequestScreen;
