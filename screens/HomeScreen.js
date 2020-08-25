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
//import Kuromoji from 'kuromoji'

const horizontalMargin = 20;
const slideWidth = 280;
const sliderWidth = Dimensions.get("window").width;
const windowWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;
const contentOffset = (sliderWidth - itemWidth) / 2;
const audioPlayer = new Audio.Sound();
const radioPlayer = new Audio.Sound();

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

  constructor(props) {
    super(props);
    QueryHelper.prepareDb();

    this.state = {
      dailySentence: [],
      easyNews: [],
      radioNews: [],
      radioPosition: 0,
      radioPaused: true,
      radioLoaded: false,
    };
    console.log(FileSystem.documentDirectory);
  }

  async componentDidMount() {
    let dailySentence = await HttpRequestHelper.getDailySentences();
    this.setState({ dailySentence: dailySentence });
    let easyNews = await HttpRequestHelper.getEasyNews();
    this.setState({ easyNews: easyNews });
    let radioNews = await HttpRequestHelper.getNHKRadioNews();
    this.setState({ radioNews: radioNews });
    radioPlayer.setOnPlaybackStatusUpdate((status) => {
      this.setState({
        radioPosition: status.positionMillis / status.playableDurationMillis,
        radioPaused: !status.isPlaying,
        radioLoaded: status.isLoaded,
      });
    });
  }

  async onSlidingComplete(value) {
    var status = await radioPlayer.getStatusAsync();
    radioPlayer.setPositionAsync(value * status.durationMillis);
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
          <ScrollView
            horizontal={true}
            style={{
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 8,
              paddingBottom: 12,
            }}
          >
            <View style={{ flexDirection: "row", paddingRight: 24 }}>
              {this.state.easyNews.map((news) => (
                <View key={news.newsId} style={{ flexDirection: "row" }}>
                  <View style={styles.shadowContainer}>
                    <Image
                      style={{ width: 140, height: 80, borderRadius: 8 }}
                      source={{ uri: news.imageUri }}
                      defaultSource={require("../assets/imgnotfound.png")}
                    ></Image>
                  </View>
                  <View
                    style={{ marginLeft: 12, marginRight: 16, marginTop: 4 }}
                  >
                    <Text style={{ fontSize: 18 }}>{news.title}</Text>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        marginTop: 8,
                        alignItems: "center",
                      }}
                      onPress={() => {
                        this.props.navigation.navigate("NewsReader", {
                          newsId: news.newsId,
                          img: news.imageUri,
                          title: news.title,
                        });
                      }}
                    >
                      <Ionicons
                        name="md-book"
                        color="#00b294"
                        size={18}
                      ></Ionicons>
                      <Text
                        style={{
                          color: "#00b294",
                          fontSize: 16,
                          marginLeft: 8,
                        }}
                      >
                        阅读
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

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
          <HideableView hide={!this.state.radioLoaded}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 26,
                marginRight: 24,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ flex: 0.05 }}
                onPress={async () => {
                  var status = await radioPlayer.getStatusAsync();
                  if (status.isLoaded) {
                    if (status.isPlaying) {
                      await radioPlayer.pauseAsync();
                    } else {
                      await radioPlayer.playAsync();
                    }
                  }
                }}
              >
                <Ionicons
                  size={32}
                  color="#00b294"
                  name={this.state.radioPaused ? "ios-play" : "ios-pause"}
                ></Ionicons>
              </TouchableOpacity>
              <Slider
                style={{ flex: 0.95, marginLeft: 12 }}
                minimumTrackTintColor="#00b294"
                value={this.state.radioPosition}
                onSlidingComplete={this.onSlidingComplete}
              ></Slider>
            </View>
          </HideableView>
          <ScrollView
            horizontal={true}
            style={{
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 8,
              paddingBottom: 64,
            }}
          >
            <View style={{ flexDirection: "row", paddingRight: 24 }}>
              {this.state.radioNews.map((news) => (
                <TouchableBounce
                  key={news.title}
                  style={{ marginRight: 8 }}
                  onPress={async () => {
                    try {
                      await radioPlayer.unloadAsync();
                      await radioPlayer.loadAsync({
                        uri: Object(news).soundurl,
                      });
                      await radioPlayer.playAsync();
                      this.setState({ radioPaused: false });
                    } catch (error) {
                      console.warn(error);
                    }
                  }}
                >
                  <View
                    style={{
                      borderRadius: 8,
                      backgroundColor: "#00b294",
                      padding: 12,
                      flexDirection: "row",
                    }}
                  >
                    <Ionicons
                      name="ios-volume-high"
                      color="white"
                      size={32}
                      style={{ marginTop: 8 }}
                    />
                    <View style={{ justifyContent: "center", marginLeft: 12 }}>
                      <Text style={{ color: "white", fontSize: 18 }}>
                        {news.title}
                      </Text>
                      <Text
                        style={{
                          color: "rgba(255, 255, 255, 0.5)",
                          fontSize: 12,
                        }}
                      >
                        {news.startdate}
                      </Text>
                    </View>
                  </View>
                </TouchableBounce>
              ))}
            </View>
          </ScrollView>
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
