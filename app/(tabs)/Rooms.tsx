import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Rooms({
  onSwitchScreen,
}: {
  onSwitchScreen: () => void;
}) {
  const chatrooms = [
    { name: "General", description: "General discussion for everyone" },
    { name: "Random", description: "Random conversations and fun topics" },
    { name: "Tech Talk", description: "Discuss the latest in technology" },
    { name: "Gaming", description: "Video games, e-sports and gaming news" },
    { name: "Music", description: "Share and discover new music" },
  ];
  return (
    <View style={styles.main}>
      <View style={styles.top}>
          <Text style={styles.title}>Chat Rooms</Text>
          <Text style={styles.titleDescription}>Select a room to join the conversation</Text>
      </View>
      <View style={styles.divider} />
      {chatrooms.map((room, idx) => (
      <TouchableOpacity key={idx} style={styles.roomCard} onPress={onSwitchScreen}>
          <Text style={styles.title}>{room.name}</Text>
          <Text style={styles.titleDescription}>{room.description}</Text>
      </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  top: {
    flex: 0,
    backgroundColor: "#ffffffff",
    justifyContent: "flex-start",
    paddingTop: 12,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000ff",
  },
  titleDescription: {
    fontSize: 14,
    color: "#666666ff",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  roomCard: {
    backgroundColor: "#ffffffff",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 4,
    justifyContent: "space-between",
    minHeight: 80,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  }
});
