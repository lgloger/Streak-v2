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
import * as Haptics from "expo-haptics";
import { iconMapping } from "../components/iconMapping";
import { ScrollView } from "react-native-gesture-handler";

const Header = ({ navigation, addHabit }) => (
  <View style={styles.firstHeader}>
    <TouchableOpacity
      style={styles.headerButton}
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.firstHeaderTitle}>Cancel</Text>
    </TouchableOpacity>
    <Text style={styles.firstHeaderTitleBlack}>New Habit</Text>
    <TouchableOpacity
      style={styles.headerButton}
      onPress={() => addHabit()}
      activeOpacity={0.6}
    >
      <Text style={styles.firstHeaderTitle}>Done</Text>
    </TouchableOpacity>
  </View>
);

const ColorButton = ({ color, setColor }) => (
  <TouchableOpacity
    style={[styles.colorButton, { backgroundColor: color }]}
    onPress={() => {
      setColor(color);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }}
    activeOpacity={0.6}
  />
);

const IconButton = ({ icon, setSelectedIcon }) => (
  <TouchableOpacity
    style={styles.iconButton}
    onPress={() => {
      setSelectedIcon(icon);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }}
    activeOpacity={0.6}
  >
    <Image style={styles.iconImage} source={iconMapping[icon]} />
  </TouchableOpacity>
);

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

  const Container = Platform.select({
    web: View,
    default: SafeAreaView,
  });

  return (
    <Container style={styles.container}>
      <Header navigation={navigation} addHabit={addHabit} />
      <ScrollView style={styles.scrollCon}>
        <View style={styles.mainContainer}>
          <View style={styles.habitContainer}>
            <View style={styles.iconPickerContainer}>
              <View
                style={[
                  styles.inputButton,
                  { backgroundColor: color, shadowColor: color },
                ]}
              >
                <Image
                  style={styles.inputIcon}
                  source={iconMapping[selectedIcon] || iconMapping["star"]}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { color: color }]}
                onChangeText={setTitle}
                value={title}
                placeholderTextColor="#818181"
                placeholder="Habit Title"
                keyboardType="text"
                selectionColor="#FFFFFF"
                cursorColor="rgba(75, 106, 234, 0.8)"
                maxLength={12}
                caretHidden={false}
              />
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
                <ColorButton key={color} color={color} setColor={setColor} />
              ))}
            </View>
          </View>
          <View style={styles.habitContainer}>
            <View style={styles.iconContainer}>
              {Object.keys(iconMapping).map((icon) => (
                <IconButton
                  key={icon}
                  icon={icon}
                  setSelectedIcon={setSelectedIcon}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
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
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 2,
  },

  firstHeaderTitle: {
    fontSize: 17,
    color: "#0C79FE",
    fontFamily: "Poppins-Regular",
    includeFontPadding: false,
  },

  firstHeaderTitleBlack: {
    fontSize: 17,
    color: "#000000",
    fontFamily: "Poppins-Regular",
    includeFontPadding: false,
    position: "absolute",
    left: "37%",
  },

  scrollCon: {
    flex: 1,
    width: "100%",
  },

  mainContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 450,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    marginTop: 60,
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
    gap: 20,
  },

  iconPickerContainer: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
    height: 56,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 10,
  },

  inputButton: {
    height: 96,
    width: 96,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 48,
    shadowColor: "#5DC466",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 15,
  },

  inputIcon: {
    height: 56,
    width: 56,
  },

  input: {
    flex: 1,
    height: "100%",
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    includeFontPadding: false,
    backgroundColor: "#E8E8E8",
    borderRadius: 15,
    paddingHorizontal: 10,
    textAlign: "center",
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

  iconContainer: {
    height: "auto",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
    padding: 10,
    borderRadius: 12,
  },

  iconButton: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E4E4E5",
    borderRadius: 20,
  },

  iconImage: {
    height: 24,
    width: 24,
    tintColor: "#474848",
  },
});

export default AddHabitsScreen;
