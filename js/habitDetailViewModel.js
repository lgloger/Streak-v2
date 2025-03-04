import { auth, db } from "../js/firebaseConfig";
import { doc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

const habitDetailViewModel = (habitId) => {
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = () => {};

    if (habitId) {
      const habitRef = doc(db, "users", userId, "habits", habitId);
      unsubscribe = onSnapshot(habitRef, (docSnapshot) => {
        if (!isMounted) return;

        if (docSnapshot.exists()) {
          setHabit({ id: docSnapshot.id, ...docSnapshot.data() });
        } else {
          console.log("Document not found");
        }
        setLoading(false);
      });
    }

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [habitId]);

  return { habit, loading };
};

const deleteHabitViewModel = async (habitId) => {
  const userId = auth.currentUser?.uid;
  const habitRef = doc(db, "users", userId, "habits", habitId);

  try {
    await deleteDoc(habitRef);
    console.log("Habit succressfully deleted");
  } catch {
    console.error("Error deleting habit:", error);
  }
};

const updateHabitColor = async (habitId, newColor) => {
  const userId = auth.currentUser?.uid;
  if (!userId || !habitId) return;

  const habitRef = doc(db, "users", userId, "habits", habitId);
  try {
    await updateDoc(habitRef, { color: newColor });
    console.log("Color updated successfully!");
  } catch (error) {
    console.error("Error updating color:", error);
  }
};

export { habitDetailViewModel, deleteHabitViewModel, updateHabitColor };
