import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function AddScreen({ navigation }) {
  const [text, setText] = useState("");

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <Text style={{ fontSize: 24 }}>What do you want to add?</Text>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={(input) => setText(input)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Notes", { text })}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttond}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
      <Text>{text.toUpperCase()}</Text>
      <Text style={{ marginTop: 40, color: "grey" }}>
        This is what you typed:
      </Text>
      <Text style={{ color: "#333", marginTop: 10 }}>{text}</Text>
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
  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 80,
  },
  buttond: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 80,
  },
  buttonText: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
