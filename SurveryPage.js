import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import ToggleSwitch from "rn-toggle-switch";
import { useNavigation } from "@react-navigation/native";

const SurveryPage = () => {
  const navigation = useNavigation();
  const [symptomList, setSymptomList] = useState([]);
  const handlePress = () => {
    navigation.navigate("AudioCapture", { symptomList });
  };

  useEffect;

  const handleToggle = (symptom) => {
    if (symptomList.includes(symptom)) {
      symptomList.splice(symptomList.indexOf(symptom), 1);
      // console.log(symptomList);
    } else {
      symptomList.push(symptom);
      // console.log(symptomList);
    }
  };

  const toggleSwitch = (
    <ToggleSwitch
      text={{
        on: "Yes",
        off: "No",
        activeTextColor: "white",
        inactiveTextColor: "#B7B8BA",
      }}
      textStyle={{ fontWeight: "bold", fontSize: 18 }}
      color={{
        indicator: "white",
        active: "#0b6623",
        inactive: "rgba( 247, 247, 247, 1)",
        activeBorder: "#e9e9e9",
        inactiveBorder: "#E9E9E9",
      }}
      active={false}
      disabled={false}
      width={80}
      radius={25}
      onValueChange={(val) => {
        handleToggle(val);
      }}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>Symptom Survey</Text>
      <Text style={{ marginBottom: 30 }}>(Please select all that apply)</Text>
      <View style={styles.list}>
        <View style={styles.listitems}>
          <Text style={styles.text}>Headache</Text>
          <ToggleSwitch
            text={{
              on: "Yes",
              off: "No",
              activeTextColor: "white",
              inactiveTextColor: "#B7B8BA",
            }}
            textStyle={{ fontWeight: "bold", fontSize: 18 }}
            color={{
              indicator: "white",
              active: "#0b6623",
              inactive: "rgba( 247, 247, 247, 1)",
              activeBorder: "#e9e9e9",
              inactiveBorder: "#E9E9E9",
            }}
            active={false}
            disabled={false}
            width={80}
            radius={25}
            onValueChange={() => {
              handleToggle("Headache");
            }}
          />
        </View>
        <View style={styles.listitems}>
          <Text style={styles.text}>Dizziness</Text>
          <ToggleSwitch
            text={{
              on: "Yes",
              off: "No",
              activeTextColor: "white",
              inactiveTextColor: "#B7B8BA",
            }}
            textStyle={{ fontWeight: "bold", fontSize: 18 }}
            color={{
              indicator: "white",
              active: "#0b6623",
              inactive: "rgba( 247, 247, 247, 1)",
              activeBorder: "#e9e9e9",
              inactiveBorder: "#E9E9E9",
            }}
            active={false}
            disabled={false}
            width={80}
            radius={25}
            onValueChange={() => {
              handleToggle("Diziness");
            }}
          />
        </View>
        <View style={styles.listitems}>
          <Text style={styles.text}>Nausea</Text>
          <ToggleSwitch
            text={{
              on: "Yes",
              off: "No",
              activeTextColor: "white",
              inactiveTextColor: "#B7B8BA",
            }}
            textStyle={{ fontWeight: "bold", fontSize: 18 }}
            color={{
              indicator: "white",
              active: "#0b6623",
              inactive: "rgba( 247, 247, 247, 1)",
              activeBorder: "#e9e9e9",
              inactiveBorder: "#E9E9E9",
            }}
            active={false}
            disabled={false}
            width={80}
            radius={25}
            onValueChange={() => {
              handleToggle("Nausea");
            }}
          />
        </View>
        <View style={styles.listitems}>
          <Text style={styles.text}>Noise sensitivity</Text>
          <ToggleSwitch
            text={{
              on: "Yes",
              off: "No",
              activeTextColor: "white",
              inactiveTextColor: "#B7B8BA",
            }}
            textStyle={{ fontWeight: "bold", fontSize: 18 }}
            color={{
              indicator: "white",
              active: "#0b6623",
              inactive: "rgba( 247, 247, 247, 1)",
              activeBorder: "#e9e9e9",
              inactiveBorder: "#E9E9E9",
            }}
            active={false}
            disabled={false}
            width={80}
            radius={25}
            onValueChange={() => {
              handleToggle("Noise sensitivity");
            }}
          />
        </View>
        <View style={styles.listitems}>
          <Text style={styles.text}>Sleep disturbance</Text>
          <ToggleSwitch
            text={{
              on: "Yes",
              off: "No",
              activeTextColor: "white",
              inactiveTextColor: "#B7B8BA",
            }}
            textStyle={{ fontWeight: "bold", fontSize: 18 }}
            color={{
              indicator: "white",
              active: "#0b6623",
              inactive: "rgba( 247, 247, 247, 1)",
              activeBorder: "#e9e9e9",
              inactiveBorder: "#E9E9E9",
            }}
            active={false}
            disabled={false}
            width={80}
            radius={25}
            onValueChange={() => {
              handleToggle("Sleep disturbance");
            }}
          />
        </View>
        <View style={styles.listitems}>
          <Text style={styles.text}>Fatigue</Text>
          <ToggleSwitch
            text={{
              on: "Yes",
              off: "No",
              activeTextColor: "white",
              inactiveTextColor: "#B7B8BA",
            }}
            textStyle={{ fontWeight: "bold", fontSize: 18 }}
            color={{
              indicator: "white",
              active: "#0b6623",
              inactive: "rgba( 247, 247, 247, 1)",
              activeBorder: "#e9e9e9",
              inactiveBorder: "#E9E9E9",
            }}
            active={false}
            disabled={false}
            width={80}
            radius={25}
            onValueChange={() => {
              handleToggle("Fatigue");
            }}
          />
        </View>
        <View style={styles.listitems}>
          <Text style={styles.text}>Irritated</Text>
          <ToggleSwitch
            text={{
              on: "Yes",
              off: "No",
              activeTextColor: "white",
              inactiveTextColor: "#B7B8BA",
            }}
            textStyle={{ fontWeight: "bold", fontSize: 18 }}
            color={{
              indicator: "white",
              active: "#0b6623",
              inactive: "rgba( 247, 247, 247, 1)",
              activeBorder: "#e9e9e9",
              inactiveBorder: "#E9E9E9",
            }}
            active={false}
            disabled={false}
            width={80}
            radius={25}
            onValueChange={() => {
              handleToggle("Irritated");
            }}
          />
        </View>
        <View style={styles.listitems}>
          <Text style={styles.text}>Depressed</Text>
          <ToggleSwitch
            text={{
              on: "Yes",
              off: "No",
              activeTextColor: "white",
              inactiveTextColor: "#B7B8BA",
            }}
            textStyle={{ fontWeight: "bold", fontSize: 18 }}
            color={{
              indicator: "white",
              active: "#0b6623",
              inactive: "rgba( 247, 247, 247, 1)",
              activeBorder: "#e9e9e9",
              inactiveBorder: "#E9E9E9",
            }}
            active={false}
            disabled={false}
            width={80}
            radius={25}
            onValueChange={() => {
              handleToggle("Depressed");
            }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
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
  list: { width: "100%", paddingHorizontal: 20 },
  listitems: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
