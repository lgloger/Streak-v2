import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar as RNStatusBar,
  Platform,
} from "react-native";
import { habitDetailViewModel } from "../js/habitDetailViewModel";

const HabitDetailScreen = ({ route, navigation }) => {
  const { habitId } = route.params || {};

  const { habit, loading } = habitDetailViewModel(habitId);

  if (!habit) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Habit not found</Text>
      </View>
    );
  }

  const formattedDate =
    habit?.createdAt?.toDate?.()?.toLocaleDateString() || "Unknown date";

  const Container = Platform.select({
    web: View,
    default: SafeAreaView,
  });

  return (
    <Container style={styles.container}>
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
        <TouchableOpacity
          style={styles.headerButtonRed}
          onPress={() => addHabit()}
          activeOpacity={0.6}
        >
          <Image
            style={styles.headerButtonIcon}
            source={require("../assets/icons/delete_red.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.secondHeader}>
        <Text style={styles.headerTitle}>{habit.title}</Text>
      </View>
    </Container>
    // <View style={styles.container}>
    //   <Text style={styles.title}>{habit.title}</Text>
    //   <Text>Streak: {habit.streak}</Text>
    //   <Text>Created at: {formattedDate}</Text>
    // </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default HabitDetailScreen;
