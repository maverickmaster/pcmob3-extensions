import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import AddScreen from "./screens/AddScreen";
import NotesScreen from "./screens/NotesScreen";
import NotesStack from "./screens/NotesStack";

const db = SQLite.openDatabase("notes.db");

const InnerStack = createStackNavigator();

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" mode="modal">
        <Stack.Screen name="Notes Stack" component={NotesStack} />
        <Stack.Screen name="Add Screen" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
