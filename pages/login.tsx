import React, { Component } from "react";
import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { styles } from "./styles";
import AsyncStorage from "@react-native-community/async-storage";

export class login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { text: "", location: "" };
  }

  setName = async (name: string) => {
    await AsyncStorage.setItem(
      "@user",
      JSON.stringify({ name: this.state.text, location: this.state.location })
    );
    this.props.setHasUser(true);
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ flex: 1, height: "100%", justifyContent: "center" }}>
          <TextInput
            label="Nome"
            value={this.state.text}
            onChangeText={(text) => this.setState({ text: text })}
          />
          <TextInput
            style={{ marginTop: 20 }}
            label="Cidade / Estado"
            value={this.state.location}
            onChangeText={(text) => this.setState({ location: text })}
          />
          <Button
            mode="contained"
            color="green"
            style={{ marginTop: 40 }}
            onPress={() => this.setName()}
          >
            <Text>Salvar</Text>
          </Button>
        </View>
      </View>
    );
  }
}

type Props = {
  setHasUser: Function;
};

type State = {
  text: string;
  location: string;
};

export default login;
