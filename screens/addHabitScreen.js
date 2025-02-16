import React, { useState, useEffect } from "react";
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
import RBSheet from "react-native-raw-bottom-sheet";

const AddHabitScreen = ({ navigation }) => {
  const { selectedIcon, setSelectedIcon, title, setTitle, addHabit } =
    addHabitViewModel(navigation);

  const refRBSheet = React.createRef();

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    refRBSheet.current.close();
  };

  const iconMapping = {
    sport_blue: require("../assets/icons/sport_blue.png"),
    book_blue: require("../assets/icons/book_blue.png"),
    school_blue: require("../assets/icons/school_blue.png"),
    star_blue: require("../assets/icons/star_blue.png"),
    soccer_blue: require("../assets/icons/soccer_blue.png"),
    yoga_blue: require("../assets/icons/yoga_blue.png"),
    hiking_blue: require("../assets/icons/hiking_blue.png"),
    code_blue: require("../assets/icons/code_blue.png"),
    park_blue: require("../assets/icons/park_blue.png"),
    food_blue: require("../assets/icons/food_blue.png"),
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
            {Array.from({ length: 100 }).map((_, index) => (
              <View key={index} style={styles.habitActivity}></View>
            ))}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => refRBSheet.current.open()}
            activeOpacity={0.6}
          >
            <Image
              style={styles.headerButtonIcon}
              source={iconMapping[selectedIcon]}
            />
          </TouchableOpacity>
          {title === "" && <Text style={styles.placeholder}>Untitled</Text>}
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
            placeholderTextColor="#000000"
            keyboardType="text"
            selectionColor="#FFFFFF"
            cursorColor="#000000"
            caretHidden={false}
          />
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        height={300}
        customStyles={{
          container: styles.bottomSheetContainer,
          wrapper: { backgroundColor: "rgba(0, 0, 0, 0.15)" },
          draggableIcon: { height: 0 },
        }}
      >
        <View style={styles.modalContent}>
          <View style={styles.manualDragHandle} />
          <TouchableOpacity
            onPress={() => handleIconSelect("sport_blue")}
            activeOpacity={0.6}
          >
            <Image
              style={styles.modalIcon}
              source={require("../assets/icons/sport_blue.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleIconSelect("hiking_blue")}
            activeOpacity={0.6}
          >
            <Image
              style={styles.modalIcon}
              source={require("../assets/icons/hiking_blue.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleIconSelect("yoga_blue")}
            activeOpacity={0.6}
          >
            <Image
              style={styles.modalIcon}
              source={require("../assets/icons/yoga_blue.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleIconSelect("soccer_blue")}
            activeOpacity={0.6}
          >
            <Image
              style={styles.modalIcon}
              source={require("../assets/icons/soccer_blue.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleIconSelect("school_blue")}
            activeOpacity={0.6}
          >
            <Image
              style={styles.modalIcon}
              source={require("../assets/icons/school_blue.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleIconSelect("book_blue")}
            activeOpacity={0.6}
          >
            <Image
              style={styles.modalIcon}
              source={require("../assets/icons/book_blue.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleIconSelect("code_blue")}
            activeOpacity={0.6}
          >
            <Image
              style={styles.modalIcon}
              source={require("../assets/icons/code_blue.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleIconSelect("star_blue")}
            activeOpacity={0.6}
          >
            <Image
              style={styles.modalIcon}
              source={require("../assets/icons/star_blue.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleIconSelect("park_blue")}
            activeOpacity={0.6}
          >
            <Image
              style={styles.modalIcon}
              source={require("../assets/icons/park_blue.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleIconSelect("food_blue")}
            activeOpacity={0.6}
          >
            <Image
              style={styles.modalIcon}
              source={require("../assets/icons/food_blue.png")}
            />
          </TouchableOpacity>
        </View>
      </RBSheet>
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

  placeholder: {
    position: "absolute",
    top: 8,
    left: 54,
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#000000",
  },

  input: {
    flex: 1,
    height: "100%",
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#000000",
    includeFontPadding: false,
  },

  bottomSheetContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 35,
  },

  modalContent: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    paddingHorizontal: 20,
    flexWrap: "wrap",
    gap: 20,
  },

  manualDragHandle: {
    width: 43,
    height: 5,
    position: "absolute",
    top: -20,
    left: "49.5%",
    backgroundColor: "#E8E8E8",
    borderRadius: 3,
  },

  modalIcon: {
    height: 40,
    width: 40,
  },
});

export default AddHabitScreen;
