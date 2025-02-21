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

const AddHabitsScreen = ({ navigation }) => {
  const { selectedIcon, setSelectedIcon, title, setTitle, addHabit } =
    addHabitViewModel(navigation);

  const refRBSheet = React.createRef();

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    refRBSheet.current.close();
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
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}
        >
          <Image
            style={styles.headerButtonIcon}
            source={require("../assets/icons/arrow.png")}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Habit</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => addHabit()}
          activeOpacity={0.6}
        >
          <Image
            style={styles.headerButtonIcon}
            source={require("../assets/icons/save.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.secondHeader}></View>
      <View style={styles.mainContainer}>
        <View style={styles.habitContainer}>
          <View style={styles.habitActivityCon}>
            {Array.from({ length: 131 }).map((_, index) => (
              <View key={index} style={styles.habitActivity}></View>
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
                source={iconMapping[selectedIcon] || iconMapping["star_blue"]}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={setTitle}
              value={title}
              placeholderTextColor="#000000"
              placeholder="Untitled"
              keyboardType="text"
              selectionColor="#FFFFFF"
              cursorColor="#000000"
              caretHidden={false}
            />
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
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(107, 198, 255, 0.45)",
    borderRadius: 30,
  },

  headerButtonIcon: {
    height: 24,
    width: 24,
  },

  headerTitle: {
    fontSize: 18,
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
    gap: 15,
  },

  habitContainer: {
    height: "auto",
    width: "100%",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    padding: 15,
    gap: 15,
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
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#000000",
    includeFontPadding: false,
    backgroundColor: "#E8E8E8",
    borderRadius: 15,
    paddingHorizontal: 10,
  },
});

export default AddHabitsScreen;
