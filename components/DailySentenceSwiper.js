import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export const DailySentenceSwiper = ({ data }) => {
  let images = [ require('../assets/0.jpg'), require('../assets/1.jpg'), require('../assets/2.jpg') ];
  return (
    <View>
      <Swiper height={250} showsPagination={false}>
        {images.map((item, key) => {
          return (
            <ImageBackground key={key} imageStyle={styles.roundImage} style={styles.carouselItem} source={images[key]}>
              <ActivityIndicator animating={data.length < 1} size="small" color="white" style={{ position: 'absolute', alignSelf: 'center', marginTop: 125 }}/>
              <Text style={{color: 'white', fontSize: 16, textAlign: 'center', marginLeft: 24, marginRight: 24, lineHeight: 24 }}>{data[key]?.sentence}</Text>
              <Text style={{color: 'rgba(255, 255, 255, 0.5)', fontSize: 12, textAlign: 'center', marginLeft: 32, marginRight: 32, marginTop: 8, lineHeight: 20 }}>{data[key]?.trans}</Text>
              <View style={{ flexDirection: 'row', opacity: (data.length < 1 ? 0 : 1) }}>
                  <TouchableOpacity disabled={data.length < 1} onPress={async() => {
                      try {
                          await audioPlayer.unloadAsync();
                          await audioPlayer.loadAsync({ uri: data[key]?.audio });
                          await audioPlayer.playAsync();
                      } catch(error) {
                          console.warn(error);
                      }
                  }}>
                      <Ionicons name="ios-volume-high" color="white" size={26} style={{ marginTop: 8 }}>
                      </Ionicons>
                  </TouchableOpacity>
              </View>
            </ImageBackground>
          );
        })}
      </Swiper>
    </View>
  )
}

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
const swiperWidth = windowWidth - ( gutter * 4 );

const styles = StyleSheet.create({
  roundImage: {
    borderRadius: 10
  },
  input: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginTop: 24,
    marginRight: 24,
    marginBottom: 24,
    paddingBottom: 8,
    fontSize: 18,
    justifyContent: 'flex-start',
  },
  carouselItem: { 
    marginTop: 12,
    width: swiperWidth, 
    height: itemHeight, 
    backgroundColor: '#00b294', 
    flexDirection: 'column',
    borderRadius: 10, 
    shadowColor: 'black',
    shadowRadius: 6,
    shadowOffset:
    {
        height: 2
    },
    shadowOpacity: 0.3,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  shadowContainer: {
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset:
    {
        height: 1
    },
    shadowOpacity: 0.3,
  }
});