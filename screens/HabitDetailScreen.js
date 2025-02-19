import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar as RNStatusBar,
  Platform,
  ScrollView,
} from "react-native";
import { habitDetailViewModel } from "../js/habitDetailViewModel";

const HabitDetailScreen = ({ route, navigation }) => {
  const { habitId } = route.params || {};

  const { habit, loading } = habitDetailViewModel(habitId);

  const [description, setDescription] = useState("");

  if (!habit) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Habit not found</Text>
      </View>
    );
  }

  const iconMapping = {
    sport_blue: require("../assets/icons/sport_blue.png"),
    book_blue: require("../assets/icons/book_blue.png"),
    school_blue: require("../assets/icons/school_blue.png"),
    star_blue: require("../assets/icons/star_blue.png"),
    soccer_blue: require("../assets/icons/soccer_blue.png"),
    yoga_blue: require("../assets/icons/yoga_blue.png"),
    hiking_blue: require("../assets/icons/hiking_blue.png"),
    code_blue: require("../assets/icons/code_blue.png"),
    park_blue: require("../assets/icons/park_blue.png"),
    food_blue: require("../assets/icons/food_blue.png"),
  };

  const Container = Platform.select({
    web: View,
    default: SafeAreaView,
  });

  const getDaysInCurrentYear = () => {
    const year = new Date().getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
  };

  const getDateForDay = (dayOfYear) => {
    const date = new Date(new Date().getFullYear(), 0);
    date.setDate(dayOfYear);
    return date.toISOString().split("T")[0];
  };

  const renderHabitActivities = () => {
    const totalDays = getDaysInCurrentYear();
    const daysPerRow = 7;
    const rows = Math.ceil(totalDays / daysPerRow);

    return Array.from({ length: rows }).map((_, rowIndex) => (
      <View key={rowIndex} style={styles.habitActivityRow}>
        {Array.from({ length: daysPerRow }).map((_, dayIndex) => {
          const dayOfYear = rowIndex * daysPerRow + dayIndex + 1;
          if (dayOfYear > totalDays) return null;

          const date = getDateForDay(dayOfYear);
          const isCompleted = habit.completedDates.includes(date);

          return (
            <View
              key={dayOfYear}
              style={[
                styles.habitActivity,
                isCompleted && styles.habitActivityCompleted,
              ]}
            />
          );
        })}
      </View>
    ));
  };

  const today = new Date().toISOString().split("T")[0];
  const isTodayCompleted = habit.completedDates?.includes(today);

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
      <View style={styles.habitContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.habitActivityCon}>{renderHabitActivities()}</View>
        </ScrollView>
      </View>
      <View style={styles.secondHeader}>
        <View style={styles.secHeaderfirstCon}>
          <View style={styles.headerButton}>
            <Image
              style={styles.headerButtonIcon}
              source={iconMapping[habit.selectedIcon]}
            />
          </View>
          <Text style={styles.headerTitle}>{habit.title}</Text>
        </View>
        <View
          style={
            isTodayCompleted
              ? styles.secondHeaderConStreakGrey
              : styles.secondHeaderConStreak
          }
        >
          <Text
            style={
              isTodayCompleted
                ? styles.secondHeaderConStreakTextActive
                : styles.secondHeaderConStreakText
            }
          >
            {habit.streak}
          </Text>
          <Image
            style={styles.secondHeaderConStreakIcon}
            source={
              isTodayCompleted
                ? require("../assets/icons/streak.png")
                : require("../assets/icons/streak_grey.png")
            }
          />
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.descriptionText}
            onChangeText={setDescription}
            value={description}
            placeholder="Test"
            placeholderTextColor="#000000"
            keyboardType="default"
            selectionColor="#FFFFFF"
            cursorColor="#000000"
            caretHidden={false}
          />
        </View>
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

  habitContainer: {
    height: "auto",
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    padding: 15,
    marginTop: 60,
  },

  habitActivityCon: {
    height: "auto",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },

  habitActivityRow: {
    gap: 3,
  },

  habitActivity: {
    height: 12,
    width: 12,
    backgroundColor: "#E8E8E8",
    borderRadius: 3,
  },

  habitActivityCompleted: {
    backgroundColor: "#10EC29",
  },

  secondHeader: {
    height: 60,
    width: "100%",
    maxWidth: 450,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "transparent",
    marginTop: 10,
    marginBottom: 10,
  },

  secHeaderfirstCon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  headerTitle: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    includeFontPadding: false,
  },

  secondHeaderConStreak: {
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 7,
    borderRadius: 5,
    gap: 2.5,
  },

  secondHeaderConStreakGrey: {
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 7,
    gap: 2.5,
  },

  secondHeaderConStreakText: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#D0D0D0",
    includeFontPadding: false,
  },

  secondHeaderConStreakTextActive: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#000000",
    includeFontPadding: false,
  },

  secondHeaderConStreakIcon: {
    height: 24,
    width: 24,
  },

  mainContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },

  descriptionContainer: {
    height: "auto",
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 15,
  },

  descriptionText: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    includeFontPadding: false,
  },
});

export default HabitDetailScreen;
