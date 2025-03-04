import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar as RNStatusBar,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import {
  habitDetailViewModel,
  deleteHabitViewModel,
  descriptionViewModel,
  updateHabitColor,
} from "../js/habitDetailViewModel";
import { homeViewModel } from "../js/homeViewModel";
import { iconMapping } from "../components/IconPickerModal";
import * as Haptics from "expo-haptics";

const HabitDetailScreen = ({ route, navigation }) => {
  const { habitId } = route.params || {};

  const { toggleDay } = homeViewModel();
  const { habit } = habitDetailViewModel(habitId);

  if (!habit) {
    return (
      <View style={loadingStyles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#000000"
          style={{ marginBottom: 10 }}
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
      "Habit Löschen",
      "Das Löschen dieses Habit ist unwiderruflich. Alle zugehörigen Daten werden dauerhaft gelöscht und können nicht wiederhergestellt werden.",
      [
        {
          text: "Abbrechen",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Löschen",
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
      <View style={[styles.habitContainer, { marginTop: 45 }]}>
        <View style={styles.habitContainerActivityBtnCon}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.habitActivityCon}>
              {renderHabitActivities()}
            </View>
          </ScrollView>
          <TouchableOpacity
            style={[
              habit.completedDates?.includes(
                new Date().toISOString().split("T")[0]
              )
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
                habit.completedDates?.includes(
                  new Date().toISOString().split("T")[0]
                )
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
            <Text style={styles.secondHeaderConStreakText}>{habit.streak}</Text>
          </View>
        </View>
      </View>
      <View style={styles.habitContainer}>
        <View style={styles.colorContainer}>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: "#F14C3C" }]}
            onPress={() => {
              updateHabitColor(habitId, "#F14C3C");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.6}
          ></TouchableOpacity>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: "#FFA033" }]}
            onPress={() => {
              updateHabitColor(habitId, "#FFA033");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.6}
          ></TouchableOpacity>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: "#F7CE45" }]}
            onPress={() => {
              updateHabitColor(habitId, "#F7CE45");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.6}
          ></TouchableOpacity>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: "#5DC466" }]}
            onPress={() => {
              updateHabitColor(habitId, "#5DC466");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.6}
          ></TouchableOpacity>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: "#0C79FE" }]}
            onPress={() => {
              updateHabitColor(habitId, "#0C79FE");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.6}
          ></TouchableOpacity>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: "#B67AD5" }]}
            onPress={() => {
              updateHabitColor(habitId, "#B67AD5");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.6}
          ></TouchableOpacity>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: "#998667" }]}
            onPress={() => {
              updateHabitColor(habitId, "#998667");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.6}
          ></TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

const loadingStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F6",
    padding: 10,
  },

  loadingText: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#000000",
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
    fontFamily: "Poppins-Medium",
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
