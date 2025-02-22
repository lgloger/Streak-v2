import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar as RNStatusBar,
  Platform,
} from "react-native";
import { addHabitViewModel } from "../js/dataManger";
import IconPickerModal from "../components/IconPickerModal";
import { iconMapping } from "../components/IconPickerModal";
import * as Haptics from "expo-haptics";

const AddHabitsScreen = ({ navigation }) => {
  const {
    selectedIcon,
    setSelectedIcon,
    title,
    setTitle,
    color,
    setColor,
    addHabit,
  } = addHabitViewModel(navigation);

  const refRBSheet = React.createRef();

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    refRBSheet.current.close();
  };

  const Container = Platform.select({
    web: View,
    default: SafeAreaView,
  });

  const activityStatus = [
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
  ];

  return (
    <Container style={styles.container}>
      <View style={styles.firstHeader}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}
        >
          <Text style={styles.headerTitle}>Schließen</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Neuer Habit</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => addHabit()}
          activeOpacity={0.6}
        >
          <Text style={styles.headerTitle}>Speichern</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondHeader}></View>
      <View style={styles.mainContainer}>
        <View style={styles.habitContainer}>
          <Text style={styles.conTitle}>Habit</Text>
          <View style={styles.habitActivityCon}>
            {activityStatus.map((isCompleted, index) => (
              <View
                key={index}
                style={[
                  styles.habitActivity,
                  { backgroundColor: isCompleted ? color : "#E8E8E8" },
                ]}
              ></View>
            ))}
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.inputButton}
              onPress={() => refRBSheet.current.open()}
              activeOpacity={0.6}
            >
              <Image
                style={styles.inputIcon}
                source={iconMapping[selectedIcon] || iconMapping["star"]}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={setTitle}
              value={title}
              placeholderTextColor="#818181"
              placeholder="Habit Titel"
              keyboardType="text"
              selectionColor="#FFFFFF"
              cursorColor="#000000"
              maxLength={11}
              caretHidden={false}
            />
          </View>
        </View>
        <View style={styles.habitContainer}>
          <Text style={styles.conTitle}>Farbe Wählen</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: "#2EE23E" }]}
              onPress={() => {
                setColor("#2EE23E");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              activeOpacity={0.6}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: "#FF1E1E" }]}
              onPress={() => {
                setColor("#FF1E1E");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              activeOpacity={0.6}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: "#1DC8E4" }]}
              onPress={() => {
                setColor("#1DC8E4");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              activeOpacity={0.6}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: "#A51DE4" }]}
              onPress={() => {
                setColor("#A51DE4");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              activeOpacity={0.6}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: "#FF901E" }]}
              onPress={() => {
                setColor("#FF901E");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              activeOpacity={0.6}
            ></TouchableOpacity>
          </View>
        </View>
      </View>
      <IconPickerModal ref={refRBSheet} onIconSelect={handleIconSelect} />
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
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#000000",
    includeFontPadding: false,
  },

  secondHeader: {
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "transparent",
  },

  mainContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 450,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 30,
  },

  habitContainer: {
    height: "auto",
    width: "100%",
    backgroundColor: "#ffffff",
    alignItems: "flex-start",
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

  habitActivity: {
    height: 12,
    width: 12,
    backgroundColor: "#E8E8E8",
    borderRadius: 3,
  },

  inputContainer: {
    position: "relative",
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
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

  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#000000",
    includeFontPadding: false,
    backgroundColor: "#E8E8E8",
    borderRadius: 15,
    paddingHorizontal: 10,
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

export default AddHabitsScreen;
