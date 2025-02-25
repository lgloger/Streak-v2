import React, { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar as RNStatusBar,
  Platform,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Animated } from "react-native";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { homeViewModel } from "../js/homeViewModel";
import { iconMapping } from "../components/IconPickerModal";
import { AnimatedStreakText } from "../components/AnimatedText";

const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);

const HomeScreen = ({ navigation }) => {
  const { habits, loading, getCurrentWeek, toggleDay } = homeViewModel();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  const handleCheckPress = (habit) => {
    const currentDates = habit.completedDates || [];
    toggleDay(habit.id, currentDates);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const renderDay = (date, completedDates = [], habit, index) => {
    const dayAbbreviation = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const dateStr = date.toISOString().split("T")[0];
    const isCompleted = completedDates.includes(dateStr);

    const opacity = fadeAnim.interpolate({
      inputRange: [index * (1 / 7), (index + 1) * (1 / 7)],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    const scale = fadeAnim.interpolate({
      inputRange: [index * (1 / 7), (index + 1) * (1 / 7)],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[styles.dayContainer, { opacity, transform: [{ scale }] }]}
        key={date.toString()}
      >
        <Text style={styles.dayConText}>{dayAbbreviation}</Text>
        <View
          style={[
            styles.backroundDate,
            isCompleted && { backgroundColor: habit.color },
          ]}
        >
          <Text
            style={
              isCompleted
                ? styles.backroundDateTextActive
                : styles.backroundDateText
            }
          >
            {date.getDate()}
          </Text>
        </View>
      </Animated.View>
    );
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
          <Text style={styles.headerButtonTitle}>Einstellungen</Text>
          <Image
            style={styles.headerButtonIcon}
            source={require("../assets/icons/settings.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("AddHabit")}
          activeOpacity={0.6}
        >
          <Image
            style={styles.headerButtonIcon}
            source={require("../assets/icons/add.png")}
          />
          <Text style={styles.headerButtonTitle}>Add</Text>
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
        <ScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{ alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        >
          {habits.map((habit) => (
            <TouchableOpacity
              style={styles.habitContainer}
              key={habit.id}
              onPress={() =>
                navigation.navigate("HabitDetail", { habitId: habit.id })
              }
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
                    <AnimatedStreakText
                      streak={habit.streak}
                      isTodayCompleted={habit.completedDates?.includes(
                        new Date().toISOString().split("T")[0]
                      )}
                    />
                    <Image
                      style={styles.secondHeaderConStreakIcon}
                      source={
                        habit.streak > 0 &&
                        habit.completedDates?.includes(
                          new Date().toISOString().split("T")[0]
                        )
                          ? require("../assets/icons/streak.png")
                          : require("../assets/icons/streak_grey.png")
                      }
                    />
                  </View>
                  <TouchableOpacity
                    style={[
                      habit.completedDates?.includes(
                        new Date().toISOString().split("T")[0]
                      )
                        ? [
                            styles.secondHeaderConButtonActive,
                            { backgroundColor: habit.color },
                          ]
                        : styles.secondHeaderConButton,
                    ]}
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
                {getCurrentWeek().map((date, index) =>
                  date
                    ? renderDay(date, habit.completedDates, habit, index)
                    : null
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <StatusBar style="dark" />
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
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    paddingHorizontal: 10,
    gap: 3,
    borderRadius: 30,
  },

  headerButtonTitle: {
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
    includeFontPadding: false,
    marginHorizontal: 5,
  },

  headerButtonIcon: {
    height: 22,
    width: 22,
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
    gap: 30,
  },

  shimmer: {
    width: "100%",
    height: 142,
    borderRadius: 15,
  },

  habitContainer: {
    height: "auto",
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
  },

  habitConHeader: {
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
    fontFamily: "Poppins-SemiBold",
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
    overflow: 'hidden',
  },

  secondHeaderConStreakIcon: {
    height: 24,
    width: 24,
  },

  secondHeaderConButton: {
    height: 30,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
  },

  secondHeaderConButtonActive: {
    height: 30,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
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

  backroundDateActive: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },

  backroundDateText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#818181",
    includeFontPadding: false,
  },

  backroundDateTextActive: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#ffffff",
    includeFontPadding: false,
  },
});

export default HomeScreen;