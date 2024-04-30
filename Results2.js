// console.log("API Response:", response.data);
//AIzaSyCpnWeRAQTeTUSsvKisTKCU6IarJV0ulM4

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import * as Linking from "expo-linking";
import { ArrowLeft } from "react-native-feather";
import bullImg from "./Bull.jpg";

const NearestHospitals = ({ route, navigation }) => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true); // Combined loading state
  const [currentLocation, setCurrentLocation] = useState(null);
  const { audiofile, symptomScore } = route.params;

  useEffect(() => {
    const loadHospitals = async () => {
      setLoading(true); // Start loading
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
        const fetchedHospitals = await fetchHospitals(
          location.coords.latitude,
          location.coords.longitude
        );
        setHospitals(fetchedHospitals);
      } catch (error) {
        console.error("Failed to fetch hospitals:", error);
        setHospitals([]);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadHospitals();
  }, []);

  const fetchHospitals = async (latitude, longitude) => {
    const apiKey = "AIzaSyCpnWeRAQTeTUSsvKisTKCU6IarJV0ulM4";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      // console.log("API Response:", response.data);
      // Sort hospitals based on distance before returning
      const sortedHospitals = response.data.results.sort((a, b) => {
        const distanceA = calculateDistance(
          latitude,
          longitude,
          a.geometry.location.lat,
          a.geometry.location.lng
        );
        const distanceB = calculateDistance(
          latitude,
          longitude,
          b.geometry.location.lat,
          b.geometry.location.lng
        );
        return distanceA - distanceB;
      });
      return sortedHospitals;
    } catch (error) {
      console.error("Failed to fetch hospitals:", error);
      return [];
    }
  };

  const openNavigation = (destination) => {
    const { latitude, longitude } = destination.geometry.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Survey");
          }}
          style={styles.backButton}
        >
          <ArrowLeft color={"#0b6623"} />
          <Text style={styles.backButtonText}>Retake</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>Results</Text>
        <View style={{ width: 75 }} />
      </View>
      {loading ? ( // Display activity indicator if loading
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#006747" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {symptomScore > 5 && (
            <View
              style={{
                zIndex: 1,
                width: "80%",
                paddingHorizontal: 50,
                backgroundColor: "red",
                alignSelf: "center",
                height: 250,
                justifyContent: "center",
                borderRadius: 1,
                marginTop: 10,
              }}
            >
              <Text
                style={{ fontSize: 30, textAlign: "center", color: "white" }}
              >
                Based on your results, we highly recommend that you visit a
                doctor for suspected concussion
              </Text>
            </View>
          )}
          {symptomScore > 2 && symptomScore <= 5 && (
            <View
              style={{
                zIndex: 1,
                width: "80%",
                paddingHorizontal: 50,
                backgroundColor: "#ffbf00",
                alignSelf: "center",
                height: 250,
                justifyContent: "center",
                borderRadius: 1,
                marginTop: 10,
              }}
            >
              <Text
                style={{ fontSize: 30, textAlign: "center", color: "white" }}
              >
                Based on your results, we recommend that you visit a doctor for
                suspected concussion
              </Text>
            </View>
          )}
          {symptomScore <= 2 && (
            <View style={{ flex: 1, alignItems: "center" }}>
              <View
                style={{
                  zIndex: 1,
                  width: "80%",
                  paddingHorizontal: 50,
                  backgroundColor: "#006747",
                  alignSelf: "center",
                  height: 270,
                  justifyContent: "center",
                  borderRadius: 1,
                  marginTop: 30,
                }}
              >
                <Text
                  style={{ fontSize: 30, textAlign: "center", color: "white" }}
                >
                  Based on your results, we do not recommend that you visit a
                  doctor for suspected concussion
                </Text>
              </View>
              <Image
                source={bullImg}
                resizeMode="cover"
                style={{
                  height: 300,
                  width: 300,
                  borderRadius: 150,
                  marginTop: 40,
                }}
              />
            </View>
          )}
          {symptomScore > 2 && (
            <View style={{ flex: 1 }}>
              <View style={{ borderBottomWidth: 1, borderColor: "grey" }}>
                <Text style={styles.headerText}>Nearest Hospitals</Text>
              </View>
              <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                {hospitals.length > 0 ? (
                  hospitals.map((hospital, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.hospitalItem}
                      onPress={() => openNavigation(hospital)}
                    >
                      <Text style={styles.hospitalName}>{hospital.name}</Text>
                      {currentLocation && (
                        <Text style={styles.distanceText}>
                          {calculateDistance(
                            currentLocation.latitude,
                            currentLocation.longitude,
                            hospital.geometry.location.lat,
                            hospital.geometry.location.lng
                          ).toFixed(2)}{" "}
                          km
                        </Text>
                      )}
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text>No hospitals found.</Text>
                )}
              </ScrollView>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 40,
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
  },
  backButtonText: { fontSize: 18 },
  headerText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 30,
  },
  hospitalItem: {
    padding: 10,
    flexDirection: "row",
    width: "90%",
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  hospitalName: {
    maxWidth: 275,
    fontSize: 18,
    color: "#006747",
  },
  distanceText: {
    fontSize: 18,
    color: "#CFC493",
  },
});

export default NearestHospitals;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: "100%",
//     // backgroundColor: "#1c284e",
//     backgroundColor: "white",
//     alignItems: "center",
//     // justifyContent: "center",
//     paddingHorizontal: 10,
//   },
//   top: {
//     height: 40,
//     width: "100%",
//     // backgroundColor: "white",
//     paddingHorizontal: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   textHeader: { fontSize: 36, textAlign: "center" },
//   textBox: {
//     width: "90%",
//     height: 350,
//     backgroundColor: "white",
//     borderRadius: 20,
//     marginVertical: 20,
//     padding: 20,
//     shadowColor: "grey",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 2.22,
//     shadowRadius: 5.22,

//     elevation: 3,
//   },
//   backButton: {
//     // backgroundColor: "#0b6623",
//     width: 80,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 5,
//     flexDirection: "row",
//   },
//   backButtonText: { fontSize: 18 },
//   outerRecordButton: {
//     height: 100,
//     width: 100,
//     borderColor: "red",
//     // backgroundColor: "red",
//     borderRadius: 50,
//     borderWidth: 2,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   innerRecordButton: {
//     height: "92%",
//     width: "92%",
//     borderRadius: 50,
//     backgroundColor: "red",
//   },
//   text: {
//     fontSize: 25,
//     // color: "white"
//   },
//   button: {
//     height: 50,
//     width: "90%",
//     alignItems: "center",
//     backgroundColor: "#ffbf00",
//     justifyContent: "center",
//     borderRadius: 5,
//   },
// });

// export default NearestHospitals;
