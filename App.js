import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("notes.db");

function NotesScreen({ navigation }) {
  const [notes, setNotes] = useState([
    { title: "Walk the cat", done: false, id: "0" },
    { title: "Feed the elephant", done: false, id: "1" },
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Ionicons
            name="ios-create-outline"
            size={30}
            color="black"
            style={{
              color: "#f55",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  });

  function addNote() {
    navigation.navigate("Add Screen");
    //const newNote = {
    //title: "Sample new note",
    //done: false,
    //id: notes.length.toString(),
    //};
    //setNotes([...notes, newNote]);
  }

  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={notes}
        renderItem={renderItem}
      />
    </View>
  );
}

const InnerStack = createStackNavigator();

function NotesStack() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          headerTitle: "Notes App",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
          headerStyle: {
            height: 120,
            backgroundColor: "yellow",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
          },
        }}
      />
    </InnerStack.Navigator>
  );
}

function AddScreen({ navigation }) {
  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <Text style={{ fontSize: 24 }}>This is the add screen</Text>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "orange",
          borderRadius: 5,
          marginTop: 30,
        }}
        onPress={() => navigation.goBack()}
      >
        <Text>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" mode="modal">
        <Stack.Screen name="Notes Stack" component={NotesStack} />
        <Stack.Screen name="Add Screen" component={AddScreen} />
        <Stack.Screen
          name="Notes"
          component={NotesScreen}
          options={{
            title: "Notes, a Todo App",
            headerStyle: {
              backgroundColor: "yellow",
              height: 100,
              shadowColor: "black",
              shadowOpacity: 0.2,
              shadowRadius: 5,
            },
            headerTintColor: "#f55",
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
