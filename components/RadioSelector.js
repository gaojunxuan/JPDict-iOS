import React, { useState, useEffect } from "react";
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
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HideableView from "./HideableView";
import TouchableBounce from "react-native/Libraries/Components/Touchable/TouchableBounce";
import { Audio } from "expo-av";
import { RadioPlayer } from "./RadioPlayer";

export const RadioSelector = ({ data }) => {
  const [url, setUrl] = useState("");
  return (
    <View>
      <RadioPlayer url={url} />
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
          {data?.map((news) => (
            <TouchableBounce
              key={news?.title}
              style={{ marginRight: 8 }}
              onPress={async () => {
                setUrl(news?.soundurl);
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
                    {news?.title}
                  </Text>
                  <Text
                    style={{
                      color: "rgba(255, 255, 255, 0.5)",
                      fontSize: 12,
                    }}
                  >
                    {news?.startdate}
                  </Text>
                </View>
              </View>
            </TouchableBounce>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
