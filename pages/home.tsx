import React, { Component } from "react";
import { Text, View, FlatList, AsyncStorage } from "react-native";
import { styles } from "./styles";
import { List, Button } from "react-native-paper";
import * as firebase from "firebase";
import "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyC28GF4RBlBhs3N3Wh_DxEGrabUIYrNX20",
  authDomain: "dgamebr-7d2c6.firebaseapp.com",
  databaseURL: "https://dgamebr-7d2c6.firebaseio.com",
  projectId: "dgamebr-7d2c6",
  storageBucket: "dgamebr-7d2c6.appspot.com",
  messagingSenderId: "620129159802",
  appId: "1:620129159802:web:36b45db3ff431b356e09c3",
  measurementId: "G-QRP68E4W2W",
};

if (!firebase.app) {
  firebase.initializeApp(firebaseConfig);
}

export default class home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { id: "" };
  }

  componentDidMount() {
    console.log("Perdi");
    this.refresh();
    AsyncStorage.getItem("@user").then((response) => {
      console.log(response.id || "asd");
      this.setState({
        id: response.id || "asd",
        nome: response.name,
        cidade: response.location,
      });
    });
  }

  setHighScore = (highscore: any): void => {
    const db = firebase.firestore();
    db.collection("highscore").doc("adsds").set(highscore);
  };

  onPress = async () => {
    const date = new Date();

    this.setHighScore({
      id: this.state.id,
      nome: this.state.nome,
      criado_em: date.toLocaleString(),
      cidade: this.state.cidade,
    });
    try {
      this.refresh();
    } catch (err) {
      console.log("error creating todo:", err);
    }
  };

  refresh = async () => {};

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ marginBottom: 20 }}>
          <Button mode="contained" color="green" onPress={this.onPress}>
            <Text>Perdi</Text>
          </Button>
        </View>
        <View style={styles.card}>
          <FlatList
            data={this.state.rank || []}
            keyExtractor={(item: Item) => parseInt(item.id)}
            renderItem={(item) => (
              <List.Item
                title={item.item.name}
                description={() => (
                  <View>
                    <Text>{item.item.name}</Text>
                  </View>
                )}
                left={(props) => (
                  <List.Icon
                    style={styles.circle}
                    icon="trophy"
                    color="white"
                  />
                )}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

export type Item = {
  id: number;
  name: string;
};

export type HighScore = {
  id: string;
  nome: string;
  criado_em: string;
  cidade: string;
};

export type Props = {};

export type State = {
  id?: string;
  cidade?: string;
  nome?: string;
  highscore?: {
    id: string;
    nome: string;
    criado_em: string;
    cidade: string;
  };
  scores?: Array<highscore>;
};
