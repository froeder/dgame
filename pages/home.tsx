import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { styles } from "./styles";
import { List, Button } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";

export default class home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { rank: null };
  }

  componentDidMount() {
    console.log("Perdi");
    this.refresh();
    AsyncStorage.getItem("@user").then((response) => console.log(response));
  }

  onPress = async () => {
    console.log("entrei");
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

export type Props = {};

export type State = {
  rank?: Array<{ id: number; name: string; date: string }>;
};
