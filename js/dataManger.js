import { useState } from "react";
import { auth, db } from "../js/firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { ToastAndroid } from "react-native";

const addHabitViewModel = (navigation) => {
  const [selectedIcon, setSelectedIcon] = useState("walk");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState('#2EE23E');
  const userId = auth.currentUser?.uid;

  const addHabit = async () => {
    const Ref = doc(db, "users", userId, "habits", title);

    try {
      const habitSnapshot = await getDoc(Ref);
      if (habitSnapshot.exists()) {
        ToastAndroid.show("Habit Already Exists", ToastAndroid.SHORT);
        return;
      }

      await setDoc(Ref, {
        title,
        selectedIcon,
        color,
        completedDates: [],
        streak: 0,
        createdAt: serverTimestamp(),
      });

      navigation.navigate("Home");
    } catch (error) {
      console.log("Saving Data Failed", error.message);
    }
  };

  return {
    selectedIcon,
    setSelectedIcon,
    title,
    setTitle,
    color,
    setColor,
    addHabit,
  };
};
export { addHabitViewModel };
