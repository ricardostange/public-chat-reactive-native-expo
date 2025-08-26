import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Chat from "./(tabs)/Chat";
import Rooms from "./(tabs)/Rooms";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useState } from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [currentScreen, setCurrentScreen] = useState<"chat" | "rooms">("chat");

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={theme}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
       {currentScreen === "chat" ? (
          <Chat onSwitchScreen={() => setCurrentScreen("rooms")} />
        ) : (
          <Rooms onSwitchScreen={() => setCurrentScreen("chat")} />
        )}
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "SpaceMono",
  },
});
