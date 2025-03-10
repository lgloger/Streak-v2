import * as Notifications from "expo-notifications";

async function displayScheduledNotifications() {
  const notifications = await Notifications.getScheduledNotificationsAsync();
  console.log("Notifications: " + JSON.stringify(notifications));
}

displayScheduledNotifications();

export const scheduleDailyNotification = async (habitId, title, time) => {
  const now = new Date();
  const notificationTime = new Date();
  notificationTime.setHours(time.hours);
  notificationTime.setMinutes(time.minutes);
  notificationTime.setSeconds(0);

  // If the notification time is in the past, schedule it for the next day
  if (notificationTime <= now) {
    notificationTime.setDate(notificationTime.getDate() + 1);
  }

  await Notifications.scheduleNotificationAsync({
    identifier: habitId,
    content: {
      title: "Habit Reminder",
      body: title,
      sound: true,
      data: { habitId },
    },
    trigger: {
      seconds: Math.floor((notificationTime.getTime() - now.getTime()) / 1000),
      repeats: true,
    },
  });
};

export const cancelScheduledNotification = async (habitId) => {
  await Notifications.cancelScheduledNotificationAsync(habitId);
};

export const setupNotificationHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};