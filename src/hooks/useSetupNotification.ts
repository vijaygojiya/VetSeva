import {
  createAllRequiredNotificationChannels,
  displayForegroundNotification,
  requestNotificationPermission,
} from '@/services';
import {fireMsg, subscribeNotificationTopics} from '@/services/firebase';
import {useEffect} from 'react';

const useSetupNotification = () => {
  useEffect(() => {
    requestNotificationPermission().then(() => {
      createAllRequiredNotificationChannels();
      subscribeNotificationTopics();
    });
    const unsubscribe = fireMsg.onMessage(displayForegroundNotification);

    return unsubscribe;
  }, []);

  return null;
};

export default useSetupNotification;
