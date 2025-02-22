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
import { iconMapping } from "../components/IconPickerModal";
import * as Haptics from "expo-haptics";

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
  return (
    <Container style={styles.container}>
      <View style={styles.firstHeader}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.firstHeaderTitle}>Schließen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={deleteHabitModal}
          activeOpacity={0.6}
        >
          <Text style={styles.firstHeaderTitle}>Löschen</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.habitContainer, { marginTop: 30 }]}>
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
      <View style={styles.habitContainer}>
        <Text style={styles.conTitle}>Farbe Wählen</Text>
        <View style={styles.colorContainer}>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: "#2EE23E" }]}
            onPress={() => {
              updateHabitColor(habitId, "#2EE23E");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.6}
          ></TouchableOpacity>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: "#FF1E1E" }]}
            onPress={() => {
              updateHabitColor(habitId, "#FF1E1E");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.6}
          ></TouchableOpacity>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: "#1DC8E4" }]}
            onPress={() => {
              updateHabitColor(habitId, "#1DC8E4");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.6}
          ></TouchableOpacity>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: "#A51DE4" }]}
            onPress={() => {
              updateHabitColor(habitId, "#A51DE4");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.6}
          ></TouchableOpacity>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: "#FFEC21" }]}
            onPress={() => {
              updateHabitColor(habitId, "#FFEC21");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.6}
          ></TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.conTitle}>Notizen</Text>
          <TextInput
            style={styles.descriptionText}
            onChangeText={setDescription}
            onBlur={() => updateDescription(description)}
            onSubmitEditing={() => updateDescription(description)}
            value={description}
            placeholder="Schreibe eine Notiz..."
            placeholderTextColor="#818181"
            keyboardType="default"
            selectionColor="#FFFFFF"
            cursorColor="#000000"
            caretHidden={false}
            multiline={true}
            blurOnSubmit={true}
            returnKeyType="done"
          />
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
    gap: 30,
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
  },

  firstHeaderTitle: {
    fontSize: 16,
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
    borderRadius: 15,
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
    fontSize: 16,
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
    borderRadius: 15,
    padding: 15,
  },

  descriptionText: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#818181",
    includeFontPadding: false,
    textAlign: "left",
  },

  colorContainer: {
    height: "auto",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },

  colorButton: {
    height: 35,
    width: 35,
    borderRadius: 30,
  },
});

export default HabitDetailScreen;
