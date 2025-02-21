import { useState, useEffect } from "react";
import { auth, db } from "../js/firebaseConfig";
import {
  collection,
  query,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import * as Haptics from 'expo-haptics';

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

  const toggleDay = async (habitId, completedDates, lastValidStreak) => {
    const today = new Date().toISOString().split("T")[0];
    const habitRef = doc(db, "users", userId, "habits", habitId);
  
    let newDates;
    let newStreak;
  
    if (completedDates.includes(today)) {
      newDates = completedDates.filter((d) => d !== today);
  
      const tempStreak = calculateStreak(newDates);
  
      newStreak = tempStreak < lastValidStreak ? lastValidStreak : tempStreak;
    } else {
      newDates = [...completedDates, today];
  
     
      newStreak = calculateStreak(newDates);
    }
  
    await updateDoc(habitRef, {
      completedDates: newDates,
      streak: newStreak,
    });
  };
  
  const calculateStreak = (dates) => {
    if (dates.length === 0) return 0;
  
    const sorted = dates.map((d) => new Date(d)).sort((a, b) => b - a);
    let streak = 1;
    let prevDate = sorted[0];
  
    for (let i = 1; i < sorted.length; i++) {
      const currDate = sorted[i];
      const diffDays = (prevDate - currDate) / (1000 * 3600 * 24);
  
      if (diffDays === 1) {
        streak++;
      } else if (diffDays > 1) {
        break;
      }
  
      prevDate = currDate;
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
