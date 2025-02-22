import React, { useState } from "react";
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
import { iconMapping } from "../components/IconPickerModal";

const HabitDetailScreen = ({ route, navigation }) => {
  const { habitId } = route.params || {};

  const { habit, loading } = habitDetailViewModel(habitId);
  const { description, setDescription, updateDescription } =
    descriptionViewModel(habitId);

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
  const isTodayCompleted = habit.completedDates?.includes(today);

  const deleteHabitModal = () =>
    Alert.alert(
      "Delete Habit",
      "Deleting this habit is irreversible. All associated data will be permanently lost and cannot be restored.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
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
        <Text style={styles.firstHeaderTitle}>{habit.title}</Text>
        <TouchableOpacity
          style={styles.headerButtonRed}
          onPress={deleteHabitModal}
          activeOpacity={0.6}
        >
          <Image
            style={styles.headerButtonIcon}
            source={require("../assets/icons/delete_red.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.habitContainer, { marginTop: 45 }]}>
        <Text style={styles.conTitle}>Habit</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.habitActivityCon}>{renderHabitActivities()}</View>
        </ScrollView>
        <View style={styles.secondHeader}>
          <View style={styles.secHeaderfirstCon}>
            <View style={styles.inputButton}>
              <Image
                style={styles.inputIcon}
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
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.conTitle}>Description</Text>
          <TextInput
            style={styles.descriptionText}
            onChangeText={setDescription}
            onBlur={() => updateDescription(description)}
            onSubmitEditing={() => updateDescription(description)}
            value={description}
            placeholder="Add a Description..."
            placeholderTextColor="#000000"
            keyboardType="default"
            selectionColor="#FFFFFF"
            cursorColor="#000000"
            caretHidden={false}
            multiline={true}
            blurOnSubmit={true}
            returnKeyType="done"
          />
        </View>
        <View style={styles.habitContainer}>
          <Text style={styles.conTitle}>Color</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: "#2EE23E" },
                habit.color === "#2EE23E" && styles.selectedColorButton,
              ]}
              onPress={() => {updateHabitColor(habitId, "#2EE23E")}}
              activeOpacity={0.6}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: "#FF1E1E" },
                habit.color === "#FF1E1E" && styles.selectedColorButton,
              ]}
              onPress={() => updateHabitColor(habitId, "#FF1E1E")}
              activeOpacity={0.6}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: "#1DC8E4" },
                habit.color === "#1DC8E4" && styles.selectedColorButton,
              ]}
              onPress={() => updateHabitColor(habitId, "#1DC8E4")}
              activeOpacity={0.6}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: "#A51DE4" },
                habit.color === "#A51DE4" && styles.selectedColorButton,
              ]}
              onPress={() => updateHabitColor(habitId, "#A51DE4")}
              activeOpacity={0.6}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: "#FF901E" },
                habit.color === "#FF901E" && styles.selectedColorButton,
              ]}
              onPress={() => updateHabitColor(habitId, "#FF901E")}
              activeOpacity={0.6}
            ></TouchableOpacity>
          </View>
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
    backgroundColor: "#E8E8E8",
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
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
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

  firstHeaderTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#000000",
    includeFontPadding: false,
  },

  habitContainer: {
    height: "auto",
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#ffffff",
    alignItems: "left",
    justifyContent: "center",
    borderRadius: 25,
    padding: 15,
    gap: 15,
  },

  conTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#D0D0D0",
    includeFontPadding: false,
    textAlign: "left",
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

  secondHeader: {
    height: 50,
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
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    borderRadius: 30,
  },

  inputIcon: {
    height: 28,
    width: 28,
  },

  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    includeFontPadding: false,
    lineHeight: 50,
    backgroundColor: "#E8E8E8",
    borderRadius: 15,
    paddingHorizontal: 10,
  },

  secondHeaderConStreak: {
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 7,
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
    textAlign: "left",
  },

  colorContainer: {
    height: "auto",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  colorButton: {
    height: 40,
    width: 40,
    borderRadius: 30,
  },

  selectedColorButton: {
    borderWidth: 5,
    borderColor: "#E8E8E8",
  },
});

export default HabitDetailScreen;
