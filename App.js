import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import SurveryPage from "./SurveryPage";
import SurveryPage from "./SurveyPage2";
import AudioCapture from "./AudioCapture";
import Results from "./Results";
import NearestHospitals from "./Results2";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const InitialStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Survey"
  >
    <Stack.Screen name="Survey" component={SurveryPage} />
    <Stack.Screen name="AudioCapture" component={AudioCapture} />
    <Stack.Screen name="Results" component={NearestHospitals} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="InitialStack"
      >
        <Stack.Screen name="InitialStack" component={InitialStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
