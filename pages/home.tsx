import React, { Component } from "react";
import { Text, View, FlatList, AsyncStorage } from "react-native";
import { styles } from "./styles";
import { List, Button } from "react-native-paper";
import * as firebase from "firebase";
import "firebase/firestore";

import uuid from "react-native-uuid";

import moment from "moment";

export default class home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { id: "" };
  }

  async componentDidMount() {
    this.refresh();
    AsyncStorage.getItem("@user").then((response) => {
      if (response) {
        let res = JSON.parse(response);

        this.setState({
          id: res.id || 1,
          nome: res.name,
          cidade: res.location,
        });
      }
    });
  }

  setHighScore = (highscore: any): void => {
    const db = firebase.firestore();
    db.collection("highscore").doc(uuid.v1()).set(highscore);
  };

  onPress = async () => {
    const date = moment.now();
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

  refresh = async () => {
    const db = firebase.firestore();
    let snapshot = db.collection("highscore").get();
    let dados = (await snapshot).docs.map((doc) => doc.data());
    console.log(dados);
  };

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
  document?: string;
  highscore?: {
    id: string;
    nome: string;
    criado_em: string;
    cidade: string;
  };
  scores?: [];
};
