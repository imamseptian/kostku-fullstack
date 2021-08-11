import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = (onRegister) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {
        console.log('[FCMService] Permission rejected ', error);
      });
  };

  getToken = (onRegister) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('[FCMService] User does not have a device token');
        }
      })
      .catch((error) => {
        console.log('[FCMService] getToken rejected', error);
      });
  };

  requestPermission = (onRegister) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        console.log('[FCMService] Request Permission rejected ', error);
      });
  };

  deleteToken = () => {
    console.log('[FCMService] delete Token');
    messaging()
      .deleteToken()
      .catch((error) => {
        console.log('[FCMService] Delete TOken error');
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    //   when the app running but in background

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        '[FCMService] onNotificationOpenedApp Notification caused app to open',
      );
      if (remoteMessage) {
        const notification = remoteMessage;
        console.log('[FCMService] isi remoteMessage', remoteMessage);
        // const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    });

    // when the app is opened from a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log(
          '[FCMService] getInitialNotification Notification caused app to Open',
        );

        if (remoteMessage) {
          // const notification = remoteMessage.notification;
          // const notification = remoteMessage;
          console.log('notif ini berisi', remoteMessage);
          onOpenNotification(remoteMessage);
        }
      });

    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log('[FCMService] A new FCM Message arrived!', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.data.notification;
        } else {
          notification = remoteMessage;
        }
        onNotification(notification);
      }
    });

    // Triggered when have new token
    messaging().onTokenRefresh((fcmToken) => {
      console.log('[FCMService] New token refresh : ', fcmToken);
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    this.messageListener();
  };

  subscribeToTopic = ($topic) => {
    console.log('[FCMSERVICE SUBS]==>', $topic);
    messaging()
      .subscribeToTopic($topic)
      .then(() => console.log('Subscribed to topic!'));
  };

  unsubscribeToTopic = ($topic) => {
    console.log('[FCMSERVICE UNSUBS]==>', $topic);
    messaging()
      .unsubscribeFromTopic($topic)
      .then(() => console.log('Unsubscribed fom the topic!'));
  };
}

export const fcmService = new FCMService();
