import { useState, useEffect } from "react";
import { auth, db } from "../js/firebaseConfig";
import {
  collection,
  query,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const homeViewModel = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid;

  const fetchHabits = (userId) => {
    try {
      const q = query(collection(db, "users", userId, "habits"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const habitsData = [];
        querySnapshot.forEach((doc) => {
          habitsData.push({ id: doc.id, ...doc.data() });
        });
        setHabits(habitsData);
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching habits:", error);
      setLoading(false);
    }
  };

  const toggleDay = async (habitId, completedDates) => {
    const today = new Date().toISOString().split("T")[0];
    const habitRef = doc(db, "users", userId, "habits", habitId);

    const newDates = completedDates.includes(today)
      ? completedDates.filter((d) => d !== today)
      : [...completedDates, today];

    const streak = calculateStreak(newDates);

    await updateDoc(habitRef, {
      completedDates: newDates,
      streak,
    });
  };

  const calculateStreak = (dates) => {
    const sorted = [...dates].sort();
    let streak = 0;
    let prevDate = new Date();

    for (let i = sorted.length - 1; i >= 0; i--) {
      const currDate = new Date(sorted[i]);
      if ((prevDate - currDate) / (1000 * 3600 * 24) <= 1) {
        streak++;
        prevDate = currDate;
      } else break;
    }
    return streak;
  };

  const getCurrentWeek = () => {
    const dates = [];
    const today = new Date();

    const monday = new Date(today);
    monday.setDate(
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
    );

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = fetchHabits(userId);
    return () => unsubscribe();
  }, [userId]);

  return { habits, loading, fetchHabits, getCurrentWeek, toggleDay };
};

export { homeViewModel };
