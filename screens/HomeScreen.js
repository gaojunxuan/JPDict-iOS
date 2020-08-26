import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Slider,
  Platform,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { SearchBar } from "react-native-elements";
import Swiper from "react-native-swiper";
import TouchableBounce from "react-native/Libraries/Components/Touchable/TouchableBounce";
import { HttpRequestHelper } from "../helpers/HttpRequestHelper";
import { QueryHelper } from "../helpers/QueryHelper";
import HideableView from "../components/HideableView";
import { DailySentenceSwiper } from "../components/DailySentenceSwiper";
import { NHKNewsScrollView } from "../components/NHKNewsScrollView";
import { RadioSelector } from "../components/RadioSelector";
import Colors from "../constants/Colors";

const horizontalMargin = 20;
const slideWidth = 280;
const sliderWidth = Dimensions.get("window").width;
const windowWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;
const contentOffset = (sliderWidth - itemWidth) / 2;

const gutter = 12;
const swiperWidth = windowWidth - gutter * 4;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "主页",
    headerStyle: {
      backgroundColor: "#00b294",
    },
    headerTintColor: "white",
  };
  setNavigationOptions() {
    this.props.navigation.setOptions({
      title: "主页",
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
      headerTintColor: "white",
    });
  }

  constructor(props) {
    super(props);
    this.setNavigationOptions();
    QueryHelper.prepareDb();
    this.state = {
      dailySentence: [],
      easyNews: [],
      radioNews: [],
      radioPosition: 0,
      radioPaused: true,
      radioLoaded: false,
    };
  }

  async componentDidMount() {
    let dailySentence = await HttpRequestHelper.getDailySentences();
    this.setState({ dailySentence: dailySentence });
    let easyNews = await HttpRequestHelper.getEasyNews();
    this.setState({ easyNews: easyNews });
    let radioNews = await HttpRequestHelper.getNHKRadioNews();
    this.setState({ radioNews: radioNews });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TouchableOpacity
          style={{
            backgroundColor: "#d9d9d9",
            opacity: 0.5,
            borderRadius: 4,
            height: 36,
            marginLeft: 24,
            marginRight: 24,
            marginBottom: 24,
            justifyContent: "center",
          }}
          activeOpacity={1}
          onPress={() => {
            this.props.navigation.navigate("Search");
          }}
        >
          <View
            style={{
              marginLeft: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name={`ios-search`} size={14} color="gray"></Ionicons>
            <Text style={{ fontSize: 14, marginLeft: 8, color: "gray" }}>
              点击开始查词
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.ineerContainer}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginLeft: 24,
              marginBottom: 12,
            }}
          >
            每日一句
          </Text>
          <View style={{ overflow: "visible" }}>
            <DailySentenceSwiper data={this.state.dailySentence} />
          </View>
        </View>
        <View style={styles.ineerContainer}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginLeft: 24,
              marginBottom: 16,
              marginTop: -12,
            }}
          >
            NHK 新闻
          </Text>
        </View>
        <NHKNewsScrollView
          data={this.state.easyNews}
          navigation={this.props.navigation}
        />
        <View style={styles.ineerContainer}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginLeft: 24,
              marginBottom: 16,
              marginTop: 12,
            }}
          >
            NHK Radio News
          </Text>
          <RadioSelector data={this.state.radioNews} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  ineerContainer: {
    marginBottom: 12,
  },
  input: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginTop: 24,
    marginRight: 24,
    marginBottom: 24,
    paddingBottom: 8,
    fontSize: 18,
    justifyContent: "flex-start",
  },
  carouselItem: {
    marginTop: 12,
    width: swiperWidth,
    height: itemHeight,
    backgroundColor: "#00b294",
    flexDirection: "column",
    borderRadius: 10,
    shadowColor: "black",
    shadowRadius: 6,
    shadowOffset: {
      height: 2,
    },
    shadowOpacity: 0.3,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  shadowContainer: {
    shadowColor: "black",
    shadowRadius: 4,
    shadowOffset: {
      height: 1,
    },
    shadowOpacity: 0.3,
  },
});
