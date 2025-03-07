import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { StatusBar } from "react-native";

export const iconMapping = {
  hiking: require("../assets/icons/hiking.png"),
  sport: require("../assets/icons/sport.png"),
  walk: require("../assets/icons/walk.png"),
  weight: require("../assets/icons/weight.png"),
  yoga: require("../assets/icons/yoga.png"),
  bike: require("../assets/icons/bike.png"),
  swim: require("../assets/icons/swim.png"),
  wheelchair: require("../assets/icons/wheelchair.png"),
  soccer: require("../assets/icons/soccer.png"),
  eco: require("../assets/icons/eco.png"),
  park: require("../assets/icons/park.png"),
  sun: require("../assets/icons/sun.png"),
  morning: require("../assets/icons/morning.png"),
  book: require("../assets/icons/book.png"),
  school: require("../assets/icons/school.png"),
  pc: require("../assets/icons/pc.png"),
  moon: require("../assets/icons/moon.png"),
  bed: require("../assets/icons/bed.png"),
  food: require("../assets/icons/food.png"),
  note: require("../assets/icons/note.png"),
  brush: require("../assets/icons/brush.png"),
  camera: require("../assets/icons/camera.png"),
  controller: require("../assets/icons/controller.png"),
  cut: require("../assets/icons/cut.png"),
  calendar: require("../assets/icons/calendar.png"),
  alarm: require("../assets/icons/alarm.png"),
  code: require("../assets/icons/code.png"),
  star: require("../assets/icons/star.png"),
};

const IconPickerModal = React.forwardRef(({ onIconSelect }, ref) => {
  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={true}
      height={"700"}
      onOpen={() => {
        setTimeout(() => {
          StatusBar.setBarStyle("light-content");
          StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.15)");
        }, 41);
      }}
      onClose={() => {
        StatusBar.setBarStyle("dark-content");
        StatusBar.setBackgroundColor("#F2F2F6");
      }}
      customStyles={{
        container: styles.bottomSheetContainer,
        wrapper: { backgroundColor: "rgba(0, 0, 0, 0.15)" },
        draggableIcon: { height: 0 },
      }}
    >
      <View style={styles.modalContent}>
        <View style={styles.manualDragHandle} />
        {Object.keys(iconMapping).map((iconKey) => (
          <TouchableOpacity
            key={iconKey}
            onPress={() => onIconSelect(iconKey)}
            activeOpacity={0.6}
          >
            <Image style={styles.modalIcon} source={iconMapping[iconKey]} />
          </TouchableOpacity>
        ))}
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
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

export default IconPickerModal;
