import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";

export const AnimatedStreakText = ({ streak, isTodayCompleted }) => {
  const prevStreakRef = useRef(streak);
  const animateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (streak === prevStreakRef.current) return;

    const direction = streak > prevStreakRef.current ? -1 : 1;
    const newYValue = direction * 24;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 110,
        useNativeDriver: true,
      }),
      Animated.timing(animateY, {
        toValue: newYValue,
        duration: 110,
        useNativeDriver: true,
      }),
    ]).start(() => {
      prevStreakRef.current = streak;
      animateY.setValue(-newYValue);
      opacity.setValue(0);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [streak]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.streakText,
          {
            opacity,
            transform: [{ translateY: animateY }],
          },
        ]}
      >
        {streak}
      </Animated.Text>

      <Animated.Text
        style={[
          styles.streakText,
          isTodayCompleted && styles.streakTextActive,
          {
            position: "absolute",
            opacity: Animated.subtract(1, opacity),
            transform: [{ translateY: animateY }],
          },
        ]}
      >
        {prevStreakRef.current}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    alignItems: "center",
    overflow: "hidden",
  },

  streakText: {
    fontSize: 28,
    fontFamily: "Poppins-SemiBold",
    color: "#000000",
    includeFontPadding: false,
  },
});