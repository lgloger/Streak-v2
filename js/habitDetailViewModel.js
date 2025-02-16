import { auth, db } from "../js/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

export const habitDetailViewModel = (habitId) => {
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
