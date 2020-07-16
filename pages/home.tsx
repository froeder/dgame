import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { styles } from "./styles";
import { List, Button } from "react-native-paper";

export default class home extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    console.log("Perdi");
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ marginBottom: 20 }}></View>
        <View style={styles.card}>
          <FlatList
            data={[
              { id: 1, name: "Jhonatan" },
              { id: 2, name: "Carlos" },
            ]}
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
