import React, {useEffect} from 'react';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import PushNotification from 'react-native-push-notification';
import {Platform, View, Button} from 'react-native';

const YourComponent = () => {
  useEffect(() => {
    checkNotificationPermission();
  });

  const checkNotificationPermission = async () => {
    try {
      const status = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

      if (status !== RESULTS.GRANTED) {
        requestNotificationPermission();
      }
    } catch (error) {
      console.warn('Error checking notification permission:', error);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const status = await request(PERMISSIONS.IOS.SIRI);

      if (status === RESULTS.GRANTED) {
        console.log('Notification permission granted');
        createChannel();
      } else {
        console.log('Notification permission denied');
        createChannel();
      }
    } catch (error) {
      console.warn('Error requesting notification permission:', error);
    }
  };

  const createChannel = () => {
    // Check if running on Android
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'channel_id_example_01', // Choose a unique channel id
          channelName: 'default',
          channelDescription: 'Your Channel Description',
          soundName: 'default',
          importance: 4,
          vibrate: true,
        },
        created => console.log(`Channel created: ${created}`),
      );
    }
  };

  const sendNotification = () => {
    PushNotification.localNotification({
      channelId: 'channel_id_example_01', // Use the same channel id you created
      title: 'My Notification Title',
      message: 'Hello, this is a local notification!',
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Send Notification" onPress={sendNotification} />
    </View>
  );
};

export default YourComponent;
