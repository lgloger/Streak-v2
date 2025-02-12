import { useState } from "react";
import { auth, db } from "../js/firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { ToastAndroid } from "react-native";

const addHabitViewModel = (navigation) => {
  const [selectedIcon, setSelectedIcon] = useState("sport_blue");
  const [title, setTitle] = useState("");
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
    addHabit,
  };
};
export { addHabitViewModel };
