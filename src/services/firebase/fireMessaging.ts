import messaging from '@react-native-firebase/messaging';

export const fireMsg = messaging();

export const subscribeNotificationTopics = async () => {
  return fireMsg.subscribeToTopic('test');
};
