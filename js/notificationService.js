import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function scheduleHabitNotification(habitId, title, time) {
  try {
    await cancelHabitNotification(habitId);

    const trigger = {
      hour: time.getHours(),
      minute: time.getMinutes(),
      repeats: true,
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Habit Reminder",
        body: `Time to work on: ${title}`,
        data: { habitId },
      },
      trigger,
    });

    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    throw error;
  }
}

export async function cancelHabitNotification(habitId) {
  try {
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    
    const matchingNotifications = scheduledNotifications.filter(
      notif => notif.content.data?.habitId === habitId
    );

    await Promise.all(
      matchingNotifications.map(notif => 
        Notifications.cancelScheduledNotificationAsync(notif.identifier)
      )
    );
  } catch (error) {
    console.error('Error cancelling notification:', error);
    throw error;
  }
}

export async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}