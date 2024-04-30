import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
// import * as Icon from "react-native-feather";
import { ArrowLeft } from "react-native-feather";
import { Audio } from "expo-av";

const AudioCapture = ({ route }) => {
  const navigation = useNavigation();
  const { symptomScore } = route.params;
  const [recording, setRecording] = React.useState(false);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [audiofile, setAudio] = React.useState();

  const handlePress = () => {
    navigation.navigate("Results", { audiofile, symptomScore });
  };

  async function startRecording() {
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setAudio(uri);
    console.log("Recording stopped and stored at", uri);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <ArrowLeft color={"#0b6623"} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>Audio Analysis</Text>
        <View style={{ width: 60 }} />
      </View>
      <Text style={styles.textHeader}>
        Press record and repeat the following words
      </Text>
      <View style={styles.textBox}>
        <Text style={{ fontSize: 25, marginBottom: 10, color: "white" }}>
          Participate
        </Text>
        <Text style={{ fontSize: 25, marginBottom: 10, color: "white" }}>
          Application
        </Text>
        <Text style={{ fontSize: 25, marginBottom: 10, color: "white" }}>
          Education
        </Text>
        <Text style={{ fontSize: 25, marginBottom: 10, color: "white" }}>
          Difficulty
        </Text>
        <Text style={{ fontSize: 25, marginBottom: 10, color: "white" }}>
          Congratulations
        </Text>
        <Text style={{ fontSize: 25, marginBottom: 10, color: "white" }}>
          Mathematical
        </Text>
        <Text style={{ fontSize: 25, marginBottom: 10, color: "white" }}>
          Possibility
        </Text>
        <Text style={{ fontSize: 25, marginBottom: 10, color: "white" }}>
          Opportunity
        </Text>
      </View>
      <View style={{ marginTop: 10, marginBottom: 50, alignItems: "center" }}>
        <TouchableOpacity
          style={styles.outerRecordButton}
          onPress={recording ? stopRecording : startRecording}
        >
          <View style={styles.innerRecordButton} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, color: recording ? "red" : "green" }}>
          {recording ? "Stop Recording" : "Start Recording"}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: audiofile ? "#ffbf00" : "grey" },
        ]}
        onPress={handlePress}
        disabled={audiofile ? false : true}
      >
        <Text style={[styles.text, { color: "white" }]}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AudioCapture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // backgroundColor: "#1c284e",
    backgroundColor: "white",
    alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 10,
  },
  top: {
    height: 40,
    width: "100%",
    // backgroundColor: "white",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textHeader: { fontSize: 36, textAlign: "center" },
  textBox: {
    width: "90%",
    height: 350,
    backgroundColor: "#006747",
    borderRadius: 5,
    marginVertical: 20,
    padding: 20,
    // shadowColor: "grey",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 2.22,
    // shadowRadius: 5.22,

    elevation: 3,
  },
  backButton: {
    // backgroundColor: "#0b6623",
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
  },
  backButtonText: { fontSize: 18 },
  outerRecordButton: {
    height: 100,
    width: 100,
    borderColor: "red",
    // backgroundColor: "red",
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  innerRecordButton: {
    height: "92%",
    width: "92%",
    borderRadius: 50,
    backgroundColor: "red",
  },
  text: {
    fontSize: 25,
    // color: "white"
  },
  button: {
    height: 50,
    width: "90%",
    alignItems: "center",
    backgroundColor: "#ffbf00",
    justifyContent: "center",
    borderRadius: 5,
  },
});
