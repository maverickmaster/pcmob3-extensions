import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const db = SQLite.openDatabase("notes.db");
console.log(FileSystem.documentDirectory);

export default function NotesScreen({ navigation, route }) {
  const [notes, setNotes] = useState([
    //{ title: "Walk the cat", done: false, id: "0" },
    //{ title: "Feed the elephant", done: false, id: "1" },
  ]);

  function refreshNotes() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes",
        null,
        (txObj, { rows: { _array } }) => setNotes(_array),
        (txObj, error) => console.log(`Error: ${error}`)
      );
    });
  }

  //This is to delete task from database
  function deleteItem(id) {
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM notes where id=?`, [id]);
      },
      null,
      refreshNotes
    );
  }

  // This is to set up the database on first run
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS notes
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          done INT)
        `
        );
      },
      null,
      refreshNotes
    );
  }, []);

  // This is to set up the top right button
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

  // This is to set up the top left button
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={resetNote}>
          <FontAwesome5
            name="remove-format"
            size={24}
            color="black"
            style={{
              color: "#f55",
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  });

  // Monitor route.params for changes and add items to the database
  useEffect(() => {
    if (route.params?.text) {
      db.transaction(
        (tx) => {
          tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [
            route.params.text,
          ]);
        },
        null,
        refreshNotes
      );
    }
  }, [route.params?.text]);

  function addNote() {
    navigation.navigate("Add Screen");
    //const newNote = {
    //title: "Sample new note",
    //done: false,
    //id: notes.length.toString(),
    //};
    //setNotes([...notes, newNote]);
  }

  //This reset to hid Notes
  function resetNote() {
    setNotes([]);
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity>
        <View
          style={{
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
          <Ionicons
            name="remove-circle-sharp"
            size={20}
            color="firebrick"
            onPress={() => deleteItem(item.id)}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
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
