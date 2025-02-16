import React, { useState, useEffect } from "react";
import { Shadow } from "react-native-shadow-2";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar as RNStatusBar,
  Platform,
} from "react-native";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { homeViewModel } from "../js/homeViewModel";

const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);

const HomeScreen = ({ navigation }) => {
  const { habits, loading, getCurrentWeek, toggleDay } = homeViewModel();

  const handleCheckPress = (habit) => {
    const currentDates = habit.completedDates || [];
    toggleDay(habit.id, currentDates);
  };

  const renderDay = (date, completedDates = []) => {
    const dayAbbreviation = date.toLocaleDateString("en-US", {
      weekday: "short",
    });
    const dateStr = date.toISOString().split("T")[0];
    const isToday = new Date().toDateString() === date.toDateString();
    const isCompleted = completedDates.includes(dateStr);

    return (
      <View style={styles.dayContainer} key={date.toString()}>
        <Text style={styles.dayConText}>{dayAbbreviation}</Text>
        <View
          style={[
            styles.backroundDate,
            isCompleted && styles.backroundDateGreen,
          ]}
        >
          <Text
            style={
              isCompleted
                ? styles.backroundDateTextGreen
                : styles.backroundDateText
            }
          >
            {date.getDate()}
          </Text>
        </View>
      </View>
    );
  };

  const iconMapping = {
    sport_blue: require("../assets/icons/sport.png"),
    book_blue: require("../assets/icons/book.png"),
    school_blue: require("../assets/icons/school.png"),
    star_blue: require("../assets/icons/star.png"),
    soccer_blue: require("../assets/icons/soccer.png"),
    yoga_blue: require("../assets/icons/yoga.png"),
    hiking_blue: require("../assets/icons/hiking.png"),
    code_blue: require("../assets/icons/code.png"),
    park_blue: require("../assets/icons/park.png"),
    food_blue: require("../assets/icons/food.png"),
  };

  const Container = Platform.select({
    web: View,
    default: SafeAreaView,
  });

  return (
    <Container style={styles.container}>
      <View style={styles.firstHeader}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("Settings")}
          activeOpacity={0.6}
        >
          <Image
            style={styles.headerButtonIcon}
            source={require("../assets/icons/settings.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.secondHeader}>
        <Text style={styles.headerTitle}>Habits</Text>
      </View>
      {loading ? (
        <View style={styles.shimmerContainer}>
          <ShimmerPlaceHolder
            style={styles.shimmer}
            shimmerColors={["#FFFFFF", "#E8E8E8", "#FFFFFF"]}
          />
          <ShimmerPlaceHolder
            style={styles.shimmer}
            shimmerColors={["#FFFFFF", "#E8E8E8", "#FFFFFF"]}
          />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          {habits.map((habit) => (
            <TouchableOpacity
              style={styles.habitContainer}
              key={habit.id}
              onPress={() => navigation.navigate("HabitDetail", { habitId: habit.id })}
              activeOpacity={0.6}
            >
              <View style={styles.habitConHeader}>
                <View style={styles.firstHabitConHeader}>
                  <Image
                    style={styles.firstHeaderConIcon}
                    source={iconMapping[habit.selectedIcon]}
                  />
                  <Text style={styles.firstHeaderConTitle}>{habit.title}</Text>
                </View>
                <View style={styles.secondHeaderConHeader}>
                  <View style={styles.secondHeaderConStreak}>
                    <Text
                      style={
                        habit.streak > 0
                          ? styles.secondHeaderConStreakTextActive
                          : styles.secondHeaderConStreakText
                      }
                    >
                      {habit.streak}
                    </Text>
                    <Image
                      style={styles.secondHeaderConStreakIcon}
                      source={
                        habit.streak > 0
                          ? require("../assets/icons/streak.png")
                          : require("../assets/icons/streak_grey.png")
                      }
                    />
                  </View>
                  <TouchableOpacity
                    style={
                      habit.completedDates?.includes(
                        new Date().toISOString().split("T")[0]
                      )
                        ? styles.secondHeaderConButtonActive
                        : styles.secondHeaderConButton
                    }
                    onPress={() => handleCheckPress(habit)}
                    activeOpacity={0.6}
                  >
                    <Image
                      style={styles.secondHeaderConIcon}
                      source={
                        habit.completedDates?.includes(
                          new Date().toISOString().split("T")[0]
                        )
                          ? require("../assets/icons/check.png")
                          : require("../assets/icons/check_grey.png")
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.dateContainer}>
                {getCurrentWeek().map((date) =>
                  date ? renderDay(date, habit.completedDates) : null
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={styles.fabContainer}>
        <Shadow
          distance={5}
          startColor="rgba(0, 0, 0, 0.03)"
          endColor="rgba(0, 0, 0, 0.01)"
          offset={[0, 0]}
        >
          <TouchableOpacity
            style={styles.FAB}
            onPress={() => navigation.navigate("AddHabit")}
            activeOpacity={0.6}
          >
            <Image
              style={styles.fabIcon}
              source={require("../assets/icons/add.png")}
            />
          </TouchableOpacity>
        </Shadow>
      </View>
      <StatusBar style="auto" />
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
    justifyContent: "flex-end",
    flexDirection: "row",
    backgroundColor: "transparent",
    marginTop: Platform.OS === "android" ? RNStatusBar.currentHeight || 0 : 0,
  },

  headerButton: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
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

  shimmerContainer: {
    height: "auto",
    width: "100%",
    maxWidth: 450,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },

  shimmer: {
    width: "100%",
    height: 142,
    borderRadius: 25,
  },

  mainContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },

  habitContainer: {
    height: "auto",
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 15,
  },

  habitConHeader: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  firstHabitConHeader: {
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 10,
  },

  firstHeaderConIcon: {
    height: 24,
    width: 24,
  },

  firstHeaderConTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#000000",
    includeFontPadding: false,
  },

  secondHeaderConHeader: {
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 15,
  },

  secondHeaderConStreak: {
    height: 24,
    width: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 2.5,
  },

  secondHeaderConStreakText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#D0D0D0",
    includeFontPadding: false,
  },

  secondHeaderConStreakTextActive: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#000000",
    includeFontPadding: false,
  },

  secondHeaderConStreakIcon: {
    height: 24,
    width: 24,
  },

  secondHeaderConButton: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    borderRadius: 30,
  },

  secondHeaderConButtonActive: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10EC29",
    borderRadius: 30,
  },

  secondHeaderConIcon: {
    height: 24,
    width: 24,
  },

  dateContainer: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 25,
  },

  dayContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  dayConText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#D0D0D0",
    includeFontPadding: false,
  },

  backroundDate: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    borderRadius: 30,
  },

  backroundDateGreen: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10EC29",
    borderRadius: 30,
  },

  backroundDateText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#818181",
    includeFontPadding: false,
  },

  backroundDateTextGreen: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#ffffff",
    includeFontPadding: false,
  },

  fabContainer: {
    position: "absolute",
    bottom: 20,
    left: Platform.select({
      web: 0,
      default: 20,
    }),
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  FAB: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 100,
  },

  fabIcon: {
    height: 60,
    width: 60,
  },
});

export default HomeScreen;
