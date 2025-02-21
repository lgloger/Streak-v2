import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

export const iconMapping = {
  sport: require("../assets/icons/sport.png"),
  book: require("../assets/icons/book.png"),
  school: require("../assets/icons/school.png"),
  star: require("../assets/icons/star.png"),
  soccer: require("../assets/icons/soccer.png"),
  yoga: require("../assets/icons/yoga.png"),
  hiking: require("../assets/icons/hiking.png"),
  code: require("../assets/icons/code.png"),
  park: require("../assets/icons/park.png"),
  food: require("../assets/icons/food.png"),
};

const IconPickerModal = React.forwardRef(({ onIconSelect }, ref) => {
  return (
    <RBSheet
      ref={ref}
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
        {Object.keys(iconMapping).map((iconKey) => (
          <TouchableOpacity
            key={iconKey}
            onPress={() => onIconSelect(iconKey)}
            activeOpacity={0.6}
          >
            <Image
              style={styles.modalIcon}
              source={iconMapping[iconKey]}
            />
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