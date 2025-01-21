import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const notifications = [
  {
    id: "1",
    title: "Cameron Blake",
    description: "Your Order Placed",
    timestamp: "25 Mints ago",
  },
  {
    id: "2",
    title: "Your Payment Success! Get Invoice",
    description: "",
    timestamp: "12 Mints ago",
  },
  {
    id: "3",
    title: "Track your Order Now",
    description: "",
    timestamp: "Just Now",
  },
  {
    id: "4",
    title: "Restaurant Name",
    description: '"Chicken Briyani"',
    timestamp: "1 Hour ago",
  },
  {
    id: "5",
    title: "Lorem Ipsum is simply dummy text of the printing",
    description: "",
    timestamp: "25 Mints ago",
  },
  {
    id: "6",
    title:
      "There are many variations of Lorem Ipsum available, but the majority",
    description: "",
    timestamp: "25 Mints ago",
  },
];

const NotificationItem = ({ title, description, timestamp }:any) => (
  <View style={styles.notificationContainer}>
    <Image
      source={{ uri: "https://w0.peakpx.com/wallpaper/874/459/HD-wallpaper-waiting-for-tomorrow-imge-nature-tomorrow-waiting.jpg" }}
      style={styles.icon}
    />
    <View style={styles.textContainer}>

      <Text style={styles.title}>{title}</Text>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  </View>
);

export default function NotificationScreen() {
  return (
    <FlatList
      data={notifications}
      renderItem={({ item }) => (
        <NotificationItem
          title={item.title}
          description={item.description}
          timestamp={item.timestamp}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  icon: { width: 40, height: 40, marginRight: 10, borderRadius:50 },
  textContainer: { flex: 1 },
  title: { fontWeight: "bold" },
  description: { color: "#555" },
  timestamp: { color: "#aaa" },
});
