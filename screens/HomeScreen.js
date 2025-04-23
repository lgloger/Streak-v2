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
import { Animated } from "react-native";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { homeViewModel } from "../js/homeViewModel";
import { iconMapping } from "../components/iconMapping";
import { AnimatedStreakText } from "../components/AnimatedText";

const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);

const HabitHeader = ({ habit, theme }) => (
  <View style={styles.habitConHeader}>
    <View style={styles.firstHabitConHeader}>
      <View style={[styles.firstHeaderCon, { backgroundColor: theme.iconBackground }]}>
        <Image
          style={[styles.firstHeaderConIcon, { tintColor: theme.iconTint }]}
          source={iconMapping[habit.selectedIcon]}
        />
      </View>
      <Text style={[styles.firstHeaderConTitle, { color: theme.headerText }]}>
        {habit.title}
      </Text>
    </View>
    <View style={styles.secondHeaderConHeader}>
      <View style={styles.secondHeaderConStreak}>
        <AnimatedStreakText
          streak={habit.streak}
          isTodayCompleted={habit.completedDates?.includes(
            new Date().toISOString().split("T")[0]
          )}
          theme={theme}
        />
      </View>
    </View>
  </View>
);

const Habit = ({ habit, navigation, renderDay, getCurrentWeek, theme }) => (
  <TouchableOpacity
    style={[
      styles.habitContainer,
      { backgroundColor: theme.secondary, borderColor: theme.borderColor },
    ]}
    key={habit.id}
    onPress={() => navigation.navigate("HabitDetail", { habitId: habit.id })}
    activeOpacity={0.6}
  >
    <HabitHeader habit={habit} theme={theme} />
    <View style={styles.dateContainer}>
      {getCurrentWeek().map((date, index) =>
        date ? renderDay(date, habit.completedDates, habit, index, theme) : null
      )}
    </View>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation, theme }) => {
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

  const renderDay = (date, completedDates = [], habit, index, theme) => {
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
        <Text style={[styles.dayConText, { color: theme.text }]}>
          {dayAbbreviation}
        </Text>
        <View
          style={[
            styles.backroundDate,
            {
              backgroundColor: isCompleted ? theme.iconBackground: theme.secondary,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <Text
            style={[
              styles.backroundDateText,
              { color: isCompleted ? theme.text : theme.secondaryText },
            ]}
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
    <Container
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.firstHeader}></View>
      <View style={styles.secondHeader}>
        <Text style={[styles.headerTitle, { color: theme.headerText }]}>
          Habits
        </Text>
      </View>
      {loading ? (
        <View style={styles.shimmerContainer}>
          <ShimmerPlaceHolder
            style={[styles.shimmer, { borderColor: theme.borderColor }]}
            shimmerColors={[
              theme.background,
              theme.secondary,
              theme.background,
            ]}
          />
          <ShimmerPlaceHolder
            style={[styles.shimmer, { borderColor: theme.borderColor }]}
            shimmerColors={[
              theme.background,
              theme.secondary,
              theme.background,
            ]}
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
              theme={theme}
            />
          ))}
        </ScrollView>
      )}
      <View style={styles.bottomHeader}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("Settings")}
          activeOpacity={0.6}
        >
          <Text style={[styles.headerButtonTitle, { color: theme.headerText }]}>
            Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("AddHabit")}
          activeOpacity={0.6}
        >
          <Text style={[styles.headerButtonTitle, { color: theme.headerText }]}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style={theme.background === "#1D1E20" ? "light" : "dark"} />
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

  bottomHeader: {
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "transparent",
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
    flex: 1,
    width: "100%",
    maxWidth: 450,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },

  shimmer: {
    width: "100%",
    height: 116,
    borderRadius: 24,
    borderWidth: 1,
  },

  habitContainer: {
    height: "auto",
    width: "100%",
    maxWidth: 450,
    borderRadius: 24,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
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
    marginRight: 3,
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
    includeFontPadding: false,
  },

  backroundDate: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
  },

  backroundDateText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    includeFontPadding: false,
  },
});

export default HomeScreen;
