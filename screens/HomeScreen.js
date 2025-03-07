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

const HabitHeader = ({ habit }) => (
  <View style={styles.habitConHeader}>
    <View style={styles.firstHabitConHeader}>
      <View style={[styles.firstHeaderCon, { backgroundColor: habit.color }]}>
        <Image
          style={styles.firstHeaderConIcon}
          source={iconMapping[habit.selectedIcon]}
        />
      </View>
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
      </View>
    </View>
  </View>
);

const Habit = ({ habit, navigation, renderDay, getCurrentWeek }) => (
  <TouchableOpacity
    style={styles.habitContainer}
    key={habit.id}
    onPress={() => navigation.navigate("HabitDetail", { habitId: habit.id })}
    activeOpacity={0.6}
  >
    <HabitHeader habit={habit} />
    <View style={styles.dateContainer}>
      {getCurrentWeek().map((date, index) =>
        date ? renderDay(date, habit.completedDates, habit, index) : null
      )}
    </View>
  </TouchableOpacity>
);

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
          <Text style={styles.headerButtonTitle}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("AddHabit")}
          activeOpacity={0.6}
        >
          <Text style={styles.headerButtonTitle}>Add Habit</Text>
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
            <Habit
              key={habit.id}
              habit={habit}
              navigation={navigation}
              renderDay={renderDay}
              getCurrentWeek={getCurrentWeek}
            />
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
    backgroundColor: "#F2F2F6",
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

  headerButton: {
    height: 40,
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
    gap: 3,
    borderRadius: 30,
  },

  headerButtonTitle: {
    fontSize: 17,
    color: "#0C79FE",
    fontFamily: "Poppins-Medium",
    includeFontPadding: false,
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
    height: 116,
    borderRadius: 12,
  },

  habitContainer: {
    height: "auto",
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
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

  firstHeaderCon: {
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  firstHeaderConIcon: {
    height: 18,
    width: 18,
  },

  firstHeaderConTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
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
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    overflow: "hidden",
    marginRight: 6,
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

  dateContainer: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
  },

  dayContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },

  dayConText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#8E8E92",
    includeFontPadding: false,
  },

  backroundDate: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    borderRadius: 30,
  },

  backroundDateActive: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },

  backroundDateText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#8E8E92",
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