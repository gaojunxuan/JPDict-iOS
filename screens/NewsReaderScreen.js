import React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationEvents } from "react-navigation";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";

const JPDICT_API_KEY = Constants.manifest.extra.JPDICT_API_KEY;

export default class NewsReaderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uri: "" };
  }
  componentDidMount() {
    var newsId = this.props.navigation.getParam("newsId", "0");
    var img = this.props.navigation.getParam("img", "0");
    this.setState({
      uri: `https://jpdictapi.terra-incognita.dev/api/GetFormattedEasyNews?code=${JPDICT_API_KEY}&id=${newsId}&img=${img}`,
    });
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title", "新闻"),
    headerStyle: {
      backgroundColor: "white",
    },
    headerTintColor: "black",
  });
  render() {
    var newsId = this.props.navigation.getParam("newsId", "0");
    var img = this.props.navigation.getParam("img", "0");
    return (
      <View style={{ flex: 1, backgroundColor: "#f8f5e9" }}>
        <StatusBar barStyle="dark-content"></StatusBar>
        <WebView
          style={{ flex: 1, backgroundColor: "#f8f5e9" }}
          source={{ uri: this.state.uri }}
        ></WebView>
      </View>
    );
  }
}
