import "react-native-gesture-handler";

import * as React from "react";
import { Button, View, Text, TouchableOpacity, Image } from "react-native";
import { Avatar } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { withAuthenticator } from "aws-amplify-react-native";

import Amplify from "@aws-amplify/core";
import config from "./aws-exports";
Amplify.configure(config);
import { Auth } from "aws-amplify";

import Home from "./pages/home";
import Profile from "./pages/profile";
import About from "./pages/about";
import Login from "./pages/login";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              "https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png",
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
    return <></>;
  }
}

function homeScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => (
            <View>
              <Avatar.Icon
                style={{ backgroundColor: "rgba(0,0,0,0)" }}
                size={54}
                icon="account"
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#254971", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function profileScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Perfil", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#254971", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function aboutScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="About">
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: "Sobre", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => (
            <View>
              <Avatar.Icon
                style={{ backgroundColor: "rgba(0,0,0,0)" }}
                size={54}
                icon="account"
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#254971", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#2D8B92",
          itemStyle: { marginVertical: 5 },
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{ drawerLabel: "Home" }}
          component={homeScreenStack}
        />
        <Drawer.Screen
          name="Profile"
          options={{ drawerLabel: "Perfil" }}
          component={profileScreenStack}
        />
        <Drawer.Screen
          name="About"
          options={{ drawerLabel: "Sobre" }}
          component={aboutScreenStack}
        />
        <Drawer.Screen
          name="Sair"
          options={{ drawerLabel: "Sair" }}
          component={signOut}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
