import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async()=>{
    return{
      shouldPlaySound:false,
      shouldSetBadge:false,
      shouldShowAlert:true,
    }
  }
})

export default function App() {
  useEffect(()=>{
    const getPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    };
    getPermissions();
    const subscribe =Notifications.addNotificationReceivedListener((notification)=>{
      console.log("Notification received");
      console.log(notification);
      const name= notification.request.content.data.user;
      console.log(name);
      
    });

    const subscribe2 = Notifications.addNotificationResponseReceivedListener((response)=>{
      console.log("response recieved");
      console.log(response)
    });
    return()=>{
      subscribe.remove();
      subscribe2.remove();
    }
  })

  function getNotification(){
    Notifications.scheduleNotificationAsync({
      content:{
        title:"Notification at your disposal",
        body:"This is my First Notification",
        data:{user:"John"},
      },
      trigger:{
        seconds:3,
      }
    })
  }
  return (
    <View style={styles.container}>
      <Button title="Notify" onPress={getNotification}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
