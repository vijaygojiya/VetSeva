import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export const requestNotificationPermission = async () => {
  return notifee.requestPermission({sound: true, badge: true});
};

export const createAllRequiredNotificationChannels = async () => {
  await notifee.createChannels([
    {
      id: 'default',
      name: 'Default Channel',
      sound: 'default',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    },
  ]);
};

export const displayForegroundNotification = async (
  dataNoti: FirebaseMessagingTypes.RemoteMessage,
) => {
  const {notification, data = {}} = dataNoti;
  try {
    await notifee.displayNotification({
      title: notification?.title,
      body: notification?.body,
      data: data,
      android: {
        channelId: notification?.android?.channelId ?? 'default',
        // smallIcon: 'ic_stat_name',
        pressAction: {
          id: 'default',
        },
      },
    });
  } catch (error) {
    console.log(
      'Something went wrong for displaying the notification in foreground state',
      error,
    );
  }
};
