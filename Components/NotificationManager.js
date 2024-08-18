/**
 * This notification manager is used to set a notification for a todo 1h later.
 */
import React from 'react'
import { View, Text, Pressable } from 'react-native'
import * as Notifications from "expo-notifications";

function NotificationManager(props) {
    const scheduleNotificationHandler = async () => {
        try {
          if (await verifyPermissions()) {
            let identifier = await Notifications.scheduleNotificationAsync({
              content: {
                title: 'Set 1h notification',
                body: 'You have set a 1h reminder for this todo',
              },
              trigger: {
                seconds: 5,
                // date: new Date(Date.now() + 30 * 60 * 1000), // Trigger 30 minutes from now
              },
            });
            console.log('notification scheduled:', identifier);
          } else {
            console.log('permissions for notification are not granted');
          }
        } catch (err) {
          console.log('error scheduling notification:', err);
        }
      };
}

export default NotificationManager;