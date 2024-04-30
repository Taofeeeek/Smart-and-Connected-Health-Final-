import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowLeft, PlayCircle } from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";

const Results = ({ route, navigation }) => {
  const { audiofile, symptomScore } = route.params;
  const [sound, setSound] = useState();

  console.log(symptomScore);
  console.log(audiofile);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: audiofile });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

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
        <Text style={{ fontSize: 20 }}>Results</Text>
        <View style={{ width: 70 }} />
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {/* <Text>Results</Text> */}
        <TouchableOpacity onPress={playSound}>
          <PlayCircle height={100} width={100} strokeWidth={1.2} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Results;

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
});
