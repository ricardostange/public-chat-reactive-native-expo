import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MessageInput from "./MessageInput";

type Message = {
  id: string;
  user: string;
  time: string;
  text: string;
};

export default function Chat({
  onSwitchScreen,
}: {
  onSwitchScreen: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "Alice",
      time: "15:41",
      text: "Hey everyone! How is your day going?",
    },
    {
      id: "2",
      user: "Bob",
      time: "15:51",
      text: "Going great! Just finished a big project at work 🎉",
    },
    {
      id: "3",
      user: "Charlie",
      time: "16:01",
      text: "That sounds awesome Bob! What kind of project was it?",
    },
  ]);

  // Handles sending button action
  const handleSend = (msg: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: String(prevMessages.length + 1),
        user: "You",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: msg,
      },
    ]);
  };

  // Handles rendering of card messages
  const renderItem = ({ item }: { item: Message }) => {
    if (item.user !== "You") {
      return (
        <View style={styles.messageContainer}>
          {/* Avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.user[0]}</Text>
          </View>

          {/* Message block */}
          <View style={styles.messageBlock}>
            <View style={styles.headerRow}>
              <Text style={styles.username}>{item.user}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <View style={styles.bubble}>
              <Text style={styles.message}>{item.text}</Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.messageContainer}>
        {/* Message block */}
        <View style={styles.messageBlock}>
          <View style={[styles.headerRow, { flexDirection: "row-reverse"}]}>
            <Text style={styles.username}>{item.user}</Text>
            <Text style={[styles.time, { marginRight: 6 }]}>{item.time}</Text>
          </View>
          <View style={[styles.bubble, {alignSelf: "flex-end", backgroundColor: "#000000ff"}]}>
            <Text style={[styles.message,{color:"#ffffff"}]}>{item.text}</Text>
          </View>
        </View>
        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.user[0]}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.top}>
        {/* Adds icon of arrow to the left */}
        <Ionicons
          onPress={onSwitchScreen}
          name="arrow-back"
          size={32}
          color="#000"
          style={{ marginRight: 8 }}
        />
        <View>
          <Text style={styles.chatName}>General</Text>
          <Text style={styles.messageCount}>7 messages</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS vs Android
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // adjust if you have a header
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.container}
        />
        <MessageInput onSend={handleSend} />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  top: {
    flex: 0,
    backgroundColor: "#ffffffff",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
    paddingLeft: 5,
  },
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000ff",
    fontFamily: "Inter",
  },
  messageCount: {
    fontSize: 14,
    color: "#666666ff",
  },
  main: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#000000ff",
  },
  container: {
    padding: 10,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-start",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarText: {
    fontWeight: "bold",
    color: "#333",
  },
  messageBlock: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  username: {
    fontWeight: "600",
    marginRight: 6,
  },
  time: {
    fontSize: 12,
    color: "gray",
  },
  bubble: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 10,
    marginTop: 2,
    alignSelf: "flex-start"
  },
  message: {
    fontSize: 15,
    color: "#333",
  },
});
