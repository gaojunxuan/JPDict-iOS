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
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import HideableView from "./HideableView";
import TouchableBounce from "react-native/Libraries/Components/Touchable/TouchableBounce";
import { Audio } from "expo-av";

const radioPlayer = new Audio.Sound();

export const RadioPlayer = ({ url }) => {
  const [radioPosition, setRadioPosition] = useState(0);
  const [radioPaused, setRadioPaused] = useState(true);
  const [radioLoaded, setRadioLoaded] = useState(false);
  const [isSliderDragging, setIsSliderDragging] = useState(false);

  async function onSlidingComplete(value) {
    var status = await radioPlayer.getStatusAsync();
    radioPlayer.setPositionAsync(value * status.durationMillis);
    setIsSliderDragging(false);
  }

  async function load(src) {
    if (src != null && src != "") {
      try {
        await radioPlayer.unloadAsync();
        await radioPlayer.loadAsync({
          uri: src,
        });
        await radioPlayer.playAsync();
        radioPlayer.setOnPlaybackStatusUpdate((status) => {
          setRadioLoaded(status.isLoaded);
          setRadioPaused(!status.isPlaying);
          if (!isSliderDragging)
            setRadioPosition(
              status.positionMillis / status.playableDurationMillis
            );
        });
      } catch (error) {
        console.warn(error);
      }
    }
  }

  useEffect(() => {
    load(url);
  }, [url]);

  return (
    <View>
      {radioLoaded && (
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
              name={radioPaused ? "ios-play" : "ios-pause"}
            ></Ionicons>
          </TouchableOpacity>
          <Slider
            style={{ flex: 0.95, marginLeft: 12 }}
            minimumTrackTintColor="#00b294"
            value={isNaN(radioPosition) ? 0 : radioPosition}
            onSlidingStart={() => {
              if (isSliderDragging == false) setIsSliderDragging(true);
            }}
            onSlidingComplete={onSlidingComplete}
          ></Slider>
        </View>
      )}
    </View>
  );
};
