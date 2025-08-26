import { Ionicons } from "@expo/vector-icons"; // if using Expo
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function MessageInput({ onSend }: { onSend: (message: string) => void }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim().length > 0) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Message #general"
        placeholderTextColor="#555"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Ionicons name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#f8f8f8",
  },
  input: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 15,
    color: "#333",
  },
  button: {
    marginLeft: 8,
    backgroundColor: "#6b6b6b",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});