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
  ScrollView,
  Alert,
} from "react-native";
import {
  habitDetailViewModel,
  deleteHabitViewModel,
  updateHabitColor,
} from "../js/habitDetailViewModel";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { homeViewModel } from "../js/homeViewModel";
import { iconMapping } from "../components/iconMapping";
import * as Haptics from "expo-haptics";
import { AnimatedStreakText } from "../components/AnimatedText";

const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);

const Header = ({ navigation, deleteHabitModal }) => (
  <View style={styles.firstHeader}>
    <TouchableOpacity
      style={styles.headerButton}
      onPress={() => navigation.goBack()}
    >
      <Image
        style={styles.headerIcon}
        source={require("../assets/icons/arrow.png")}
      />
      <Text style={styles.firstHeaderTitle}>Habits</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.headerButton}
      onPress={deleteHabitModal}
      activeOpacity={0.6}
    >
      <Text style={styles.firstHeaderTitle}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const ColorButton = ({ color, habitId }) => (
  <TouchableOpacity
    style={[styles.colorButton, { backgroundColor: color }]}
    onPress={() => {
      updateHabitColor(habitId, color);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }}
    activeOpacity={0.6}
  />
);

const HabitDetailScreen = ({ route, navigation }) => {
  const { habitId } = route.params || {};

  const { toggleDay } = homeViewModel();
  const { habit } = habitDetailViewModel(habitId);

  if (!habit) {
    return (
      <View style={styles.shimmerContainer}>
        <ShimmerPlaceHolder
          style={styles.shimmerOne}
          shimmerColors={["#FFFFFF", "#E8E8E8", "#FFFFFF"]}
        />
        <ShimmerPlaceHolder
          style={styles.shimmer}
          shimmerColors={["#FFFFFF", "#E8E8E8", "#FFFFFF"]}
        />
      </View>
    );
  }

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
                isCompleted && { backgroundColor: habit.color },
              ]}
            />
          );
        })}
      </View>
    ));
  };

  const today = new Date().toISOString().split("T")[0];

  const deleteHabitModal = () =>
    Alert.alert(
      "Delete Habit",
      "Deleting this habit is irreversible. All associated data will be permanently deleted and cannot be recovered.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            await deleteHabitViewModel(habitId);
            navigation.goBack();
          },
        },
      ]
    );

  const handleCheckPress = (habit) => {
    const currentDates = habit.completedDates || [];
    toggleDay(habit.id, currentDates);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Container style={styles.container}>
      <Header navigation={navigation} deleteHabitModal={deleteHabitModal} />
      <View style={[styles.habitContainer, { marginTop: 45 }]}>
        <View style={styles.habitContainerActivityBtnCon}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.habitActivityCon}>
              {renderHabitActivities()}
            </View>
          </ScrollView>
          <TouchableOpacity
            style={[
              habit.completedDates?.includes(today)
                ? [
                    styles.secondHeaderConButton,
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
                habit.completedDates?.includes(today)
                  ? require("../assets/icons/check.png")
                  : require("../assets/icons/check_grey.png")
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.secondHeader}>
          <View style={styles.secHeaderfirstCon}>
            <View
              style={[styles.inputButton, { backgroundColor: habit.color }]}
            >
              <Image
                style={styles.inputIcon}
                source={iconMapping[habit.selectedIcon]}
              />
            </View>
            <Text style={styles.headerTitle}>{habit.title}</Text>
          </View>
          <View style={styles.secondHeaderConStreak}>
            <AnimatedStreakText
              streak={habit.streak}
              isTodayCompleted={habit.completedDates?.includes(today)}
            />
          </View>
        </View>
      </View>
      <View style={styles.habitContainer}>
        <View style={styles.colorContainer}>
          {[
            "#F14C3C",
            "#FFA033",
            "#F7CE45",
            "#5DC466",
            "#0C79FE",
            "#B67AD5",
            "#998667",
            "#474848",
          ].map((color) => (
            <ColorButton key={color} color={color} habitId={habitId} />
          ))}
        </View>
      </View>
    </Container>
  );
};

const loadingStyles = StyleSheet.create({
  shimmerContainer: {
    height: "auto",
    width: "100%",
    maxWidth: 450,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },

  shimmerOne: {
    width: "100%",
    height: 170,
    borderRadius: 12,
  },

  shimmer: {
    width: "100%",
    height: 60,
    borderRadius: 12,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F6",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    gap: 15,
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

  firstHeaderTitle: {
    fontSize: 17,
    color: "#0C79FE",
    fontFamily: "Poppins-SemiBold",
    includeFontPadding: false,
  },

  habitContainer: {
    height: "auto",
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#ffffff",
    alignItems: "left",
    justifyContent: "center",
    borderRadius: 12,
    padding: 10,
    gap: 15,
  },

  habitContainerActivityBtnCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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

  secondHeaderConButton: {
    height: "102",
    width: "45",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    borderRadius: 6,
  },

  secondHeaderConIcon: {
    height: 28,
    width: 28,
  },

  secondHeader: {
    height: "auto",
    width: "100%",
    maxWidth: 450,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 10,
  },

  secHeaderfirstCon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  inputButton: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },

  inputIcon: {
    height: 18,
    width: 18,
  },

  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#000000",
    includeFontPadding: false,
  },

  secondHeaderConStreak: {
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 6,
  },

  secondHeaderConStreakText: {
    fontSize: 28,
    fontFamily: "Poppins-SemiBold",
    color: "#000000",
    includeFontPadding: false,
  },

  colorContainer: {
    height: "auto",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
  },

  colorButton: {
    height: 40,
    width: 40,
    borderRadius: 30,
  },
});

export default HabitDetailScreen;