import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import ToggleSwitch from "rn-toggle-switch";
import { useNavigation } from "@react-navigation/native";
import RadioButtonRN from "radio-buttons-react-native";
import { StatusBar } from "expo-status-bar";

const SurveryPage = () => {
  const navigation = useNavigation();
  const [symptomList, setSymptomList] = useState([]);
  const [headache, setHeadache] = useState(false);
  const [dizzy, setDizzy] = useState(false);
  const [nausea, setNausea] = useState(false);
  const [noise, setNoise] = useState(false);
  const [sleep, setSleep] = useState(false);
  const [fatigue, setFatigue] = useState(false);
  const [irritated, setIrritated] = useState(false);
  const [depressed, setDepressed] = useState(false);
  const [headacheScore, setHeadacheScore] = useState(0);
  const [dizzyScore, setDizzyScore] = useState(0);
  const [nauseaScore, setNauseaScore] = useState(0);
  const [noiseScore, setNoiseScore] = useState(0);
  const [sleepScore, setSleepScore] = useState(0);
  const [fatigueScore, setFatigueScore] = useState(0);
  const [irritateScore, setIrritatedScore] = useState(0);
  const [depressedScore, setDepressedScore] = useState(0);
  const [symptomScore, setSymptomScore] = useState(0);

  useEffect(() => {
    setSymptomScore(
      headacheScore +
        dizzyScore +
        noiseScore +
        nauseaScore +
        sleepScore +
        fatigueScore +
        irritateScore +
        depressedScore
    );
  }, [
    headacheScore,
    dizzyScore,
    noiseScore,
    nauseaScore,
    sleepScore,
    fatigueScore,
    irritateScore,
    depressedScore,
  ]);

  const handlePress = () => {
    navigation.navigate("AudioCapture", { symptomScore });
    console.log(symptomScore);
  };
  const data = [
    {
      label: "Yes",
    },
    {
      label: "No",
    },
    {
      label: "Sometimes",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.textHeader}>Symptom Survey</Text>
      <Text style={{ marginBottom: 20 }}>(Please complete the form below)</Text>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <View style={styles.listitems}>
          <Text style={styles.listText}>Do you get headaches?</Text>
          <RadioButtonRN
            data={data}
            selectedBtn={(e) => {
              //   console.log(e.label);
              setHeadache(true);
              if (e.label == "Yes") {
                setHeadacheScore(1);
              }
              if (e.label == "No") {
                setHeadacheScore(0);
              }
              if (e.label == "Sometimes") {
                setHeadacheScore(0.5);
              }
              console.log(headacheScore);
            }}
            box={false}
            textStyle={{ color: "white" }}
            activeColor={"#ffbf00"}
          />
        </View>
        <View style={styles.listitems}>
          <Text style={styles.listText}>Do you get dizzy?</Text>
          <RadioButtonRN
            data={data}
            selectedBtn={(e) => {
              //   console.log(e);
              setDizzy(true);
              if (e.label == "Yes") {
                setDizzyScore(1);
              }
              if (e.label == "No") {
                setDizzyScore(0);
              }
              if (e.label == "Sometimes") {
                setDizzyScore(0.5);
              }
            }}
            box={false}
            textStyle={{ color: "white" }}
            activeColor={"#ffbf00"}
          />
        </View>
        <View style={styles.listitems}>
          <Text style={styles.listText}>Do you get nauseous?</Text>
          <RadioButtonRN
            data={data}
            selectedBtn={(e) => {
              //   console.log(e);
              setNausea(true);
              if (e.label == "Yes") {
                setNauseaScore(1);
              }
              if (e.label == "No") {
                setNauseaScore(0);
              }
              if (e.label == "Sometimes") {
                setNauseaScore(0.5);
              }
            }}
            box={false}
            textStyle={{ color: "white" }}
            activeColor={"#ffbf00"}
          />
        </View>
        <View style={styles.listitems}>
          <Text style={styles.listText}>Are you sentitive to noise?</Text>
          <RadioButtonRN
            data={data}
            selectedBtn={(e) => {
              //   console.log(e);
              setNoise(true);
              if (e.label == "Yes") {
                setNoiseScore(1);
              }
              if (e.label == "No") {
                setNoiseScore(0);
              }
              if (e.label == "Sometimes") {
                setNoiseScore(0.5);
              }
            }}
            box={false}
            textStyle={{ color: "white" }}
            activeColor={"#ffbf00"}
          />
        </View>
        <View style={styles.listitems}>
          <Text style={styles.listText}>Do you have sleep disturbances?</Text>
          <RadioButtonRN
            data={data}
            selectedBtn={(e) => {
              //   console.log(e);
              setSleep(true);
              if (e.label == "Yes") {
                setSleepScore(1);
              }
              if (e.label == "No") {
                setSleepScore(0);
              }
              if (e.label == "Sometimes") {
                setSleepScore(0.5);
              }
            }}
            box={false}
            textStyle={{ color: "white" }}
            activeColor={"#ffbf00"}
          />
        </View>
        <View style={styles.listitems}>
          <Text style={styles.listText}>Do you get easily fatigued?</Text>
          <RadioButtonRN
            data={data}
            selectedBtn={(e) => {
              //   console.log(e);
              setFatigue(true);
              if (e.label == "Yes") {
                setFatigueScore(1);
              }
              if (e.label == "No") {
                setFatigueScore(0);
              }
              if (e.label == "Sometimes") {
                setFatigueScore(0.5);
              }
            }}
            box={false}
            textStyle={{ color: "white" }}
            activeColor={"#ffbf00"}
          />
        </View>
        <View style={styles.listitems}>
          <Text style={styles.listText}>Do you get easily irritated?</Text>
          <RadioButtonRN
            data={data}
            selectedBtn={(e) => {
              //   console.log(e);
              setIrritated(true);
              if (e.label == "Yes") {
                setIrritatedScore(1);
              }
              if (e.label == "No") {
                setIrritatedScore(0);
              }
              if (e.label == "Sometimes") {
                setIrritatedScore(0.5);
              }
            }}
            box={false}
            textStyle={{ color: "white" }}
            activeColor={"#ffbf00"}
          />
        </View>
        <View style={styles.listitems}>
          <Text style={styles.listText}>Do you get depressed?</Text>
          <RadioButtonRN
            data={data}
            selectedBtn={(e) => {
              //   console.log(e);
              setDepressed(true);
              if (e.label == "Yes") {
                setDepressedScore(1);
              }
              if (e.label == "No") {
                setDepressedScore(0);
              }
              if (e.label == "Sometimes") {
                setDepressedScore(0.5);
              }
            }}
            box={false}
            textStyle={{ color: "white" }}
            activeColor={"#ffbf00"}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              headache &&
              dizzy &&
              nausea &&
              noise &&
              sleep &&
              fatigue &&
              irritated &&
              depressed
                ? "#ffbf00"
                : "grey",
          },
        ]}
        onPress={handlePress}
        disabled={
          headache &&
          dizzy &&
          nausea &&
          noise &&
          sleep &&
          fatigue &&
          irritated &&
          depressed
            ? false
            : true
        }
      >
        <Text style={[styles.text, { color: "white" }]}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SurveryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // backgroundColor: "#1c284e",
    backgroundColor: "white",
    alignItems: "center",
    // justifyContent: "center",
  },
  top: { height: 40, width: "100%", backgroundColor: "blue" },
  textHeader: {
    fontSize: 40,
    marginTop: 20,
    textAlign: "center",
    // color: "white",
  },
  text: {
    fontSize: 25,
    // color: "white"
  },
  list: { width: "100%", height: 600, paddingHorizontal: 20 },
  listitems: {
    width: "100%",
    justifyContent: "space-between",
    // alignItems: "center",
    marginBottom: 10,
    borderRadius: 1,
    padding: 10,
    backgroundColor: "#006747",
  },
  listText: { paddingLeft: 12, color: "white" },
  button: {
    height: 50,
    width: "90%",
    alignItems: "center",
    backgroundColor: "#CFC493",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 50,
  },
});
