import React from 'react';
import { View, Button, Text, StyleSheet, Dimensions, ScrollView, Image, ImageBackground, StatusBar, ActivityIndicator, TouchableOpacity, TouchableHighlight, Animated } from 'react-native';
import { ENTRIES1 } from '../components/entries'
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo'
import { SearchBar } from 'react-native-elements';
import Expo, { SQLite } from 'expo';
import Swiper from 'react-native-swiper';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import { HttpRequestHelper } from '../helpers/HttpRequestHelper';
import { QueryHelper } from '../helpers/QueryHelper';

const horizontalMargin = 20;
const slideWidth = 280;
const sliderWidth = Dimensions.get("window").width;
const windowWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;
const contentOffset = (sliderWidth - itemWidth) / 2;
const audioPlayer = new Audio.Sound();

const gutter = 12;
const swiperWidth = windowWidth - ( gutter * 4 );

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: '主页',
        headerStyle: {
            backgroundColor: '#00b294',
        },
        headerTintColor: 'white',
    };

    constructor(props) {
        super(props);
        QueryHelper.prepareDb();
        this.state = { dailySentence: [], easyNews: [], radioNews: [] };
        console.log(Expo.FileSystem.documentDirectory);
    }

    componentDidMount() {
        HttpRequestHelper.getDailySentences((result) => { this.setState({ dailySentence: result }) });
        HttpRequestHelper.getEasyNews((result) => this.setState({ easyNews: result }));
        HttpRequestHelper.getNHKRadioNews((result) => { this.setState({ radioNews: result })});
    }

    render () {
        var images = [ require('../assets/0.jpg'), require('../assets/1.jpg'), require('../assets/2.jpg') ];
        return (
           <ScrollView style={styles.container}>
               <StatusBar barStyle='light-content'/>
               <TouchableOpacity style={{ backgroundColor: '#d9d9d9', opacity: 0.5, borderRadius: 4, height: 36, marginLeft: 24, marginRight: 24, marginBottom: 24, justifyContent: 'center'}} activeOpacity={1} onPress={() => {
                   this.props.navigation.navigate('Search');
               }}>
                   <View style={{ marginLeft: 8, flexDirection: 'row' }}>
                        <Ionicons name='ios-search' size={14} color='gray'></Ionicons>
                        <Text style={{ fontSize: 14, marginLeft: 8, color: 'gray' }}>点击开始查词</Text>
                   </View>
               </TouchableOpacity>
               <View style={styles.ineerContainer}>
                    <Text style={{fontSize: 24, fontWeight: 'bold', marginLeft: 24, marginBottom: 12}}>每日一句</Text>
                    <View style={{ overflow: 'visible' }}>
                        <Swiper height={250} showsPagination={false}>
                            <ImageBackground imageStyle={{ borderRadius: 10 }} style={styles.carouselItem} source={images[0]}>
                                <ActivityIndicator animating={this.state.dailySentence.length < 1} size="small" color="white" style={{ position: 'absolute', alignSelf: 'center', marginTop: 125 }}/>
                                <Text style={{color: 'white', fontSize: 16, textAlign: 'center', marginLeft: 12, marginRight: 12 }}>{Object(this.state.dailySentence[0]).sentence}</Text>
                                <Text style={{color: 'rgba(255, 255, 255, 0.5)', fontSize: 12, textAlign: 'center', marginLeft: 16, marginRight: 16, marginTop: 8}}>{Object(this.state.dailySentence[0]).trans}</Text>
                                <View style={{ flexDirection: 'row', opacity: (this.state.dailySentence.length < 1 ? 0 : 1) }}>
                                    <TouchableOpacity disabled={this.state.dailySentence.length < 1} onPress={async() => {
                                        try {
                                            await audioPlayer.unloadAsync();
                                            await audioPlayer.loadAsync({ uri: Object(this.state.dailySentence[0]).audio });
                                            await audioPlayer.playAsync();
                                        } catch(error) {
                                            console.warn(error);
                                        }
                                    }}>
                                        <Ionicons name="ios-volume-up" color="white" size={32} style={{ marginTop: 8 }}>
                                        </Ionicons>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        
                            <ImageBackground imageStyle={{ borderRadius: 10 }} style={styles.carouselItem} source={images[1]}>
                                <ActivityIndicator animating={this.state.dailySentence.length < 2} size="small" color="white" style={{ position: 'absolute', alignSelf: 'center', marginTop: 125 }}/>
                                <Text style={{color: 'white', fontSize: 16, textAlign: 'center', marginLeft: 12, marginRight: 12 }}>{Object(this.state.dailySentence[1]).sentence}</Text>
                                <Text style={{color: 'rgba(255, 255, 255, 0.5)', fontSize: 12, textAlign: 'center', marginLeft: 16, marginRight: 16, marginTop: 8}}>{Object(this.state.dailySentence[1]).trans}</Text>
                                <View style={{ flexDirection: 'row', opacity: (this.state.dailySentence.length < 2 ? 0 : 1) }}>
                                    <TouchableOpacity disabled={this.state.dailySentence.length < 2} onPress={async() => {
                                        try {
                                            await audioPlayer.unloadAsync();
                                            await audioPlayer.loadAsync({ uri: Object(this.state.dailySentence[1]).audio });
                                            await audioPlayer.playAsync();
                                        } catch(error) {
                                            console.warn(error);
                                        }
                                    }}>
                                        <Ionicons name="ios-volume-up" color="white" size={32} style={{ marginTop: 8 }}>
                                        </Ionicons>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>

                            <ImageBackground imageStyle={{ borderRadius: 10 }} style={styles.carouselItem} source={images[2]}>
                                <ActivityIndicator animating={this.state.dailySentence.length < 3} size="small" color="white" style={{ position: 'absolute', alignSelf: 'center', marginTop: 125 }}/>
                                <Text style={{color: 'white', fontSize: 16, textAlign: 'center', marginLeft: 12, marginRight: 12 }}>{Object(this.state.dailySentence[2]).sentence}</Text>
                                <Text style={{color: 'rgba(255, 255, 255, 0.5)', fontSize: 12, textAlign: 'center', marginLeft: 16, marginRight: 16, marginTop: 8}}>{Object(this.state.dailySentence[2]).trans}</Text>
                                <View style={{ flexDirection: 'row', opacity: (this.state.dailySentence.length < 3 ? 0 : 1) }}>
                                    <TouchableOpacity disabled={this.state.dailySentence.length < 3} onPress={async() => {
                                        try {
                                            await audioPlayer.unloadAsync();
                                            await audioPlayer.loadAsync({ uri: Object(this.state.dailySentence[2]).audio });
                                            await audioPlayer.playAsync();
                                        } catch(error) {
                                            console.warn(error);
                                        }
                                    }}>
                                        <Ionicons name="ios-volume-up" color="white" size={32} style={{ marginTop: 8 }}>
                                        </Ionicons>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        </Swiper>
                    </View>
               </View>
               <View style={styles.ineerContainer}>
                    <Text style={{fontSize: 24, fontWeight: 'bold', marginLeft: 24, marginBottom: 16, marginTop: -12 }}>NHK 新闻</Text>
                    <ScrollView horizontal={true} style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 12 }}>
                        <View style={{ flexDirection: 'row', paddingRight: 24 }}>
                            {this.state.easyNews.map((news) => (
                                <View key={news.newsId} style={{ flexDirection: 'row' }}>
                                    <View style={styles.shadowContainer}>
                                        <Image style={{ width: 140, height: 80, borderRadius: 8, }}source={{ uri: news.imageUri }} defaultSource={require('../assets/imgnotfound.png')}>
                                        </Image>
                                    </View>
                                    <View style={{ marginLeft: 12, marginRight: 16, marginTop: 4 }}>
                                        <Text style={{ fontSize: 18 }}>{news.title}</Text>
                                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }} onPress={() => {
                                            this.props.navigation.navigate('NewsReader', { newsId: news.newsId, img: news.imageUri, title: news.title });
                                        }}>
                                            <Ionicons name='ios-book-outline' color='#00b294' size={18}></Ionicons>
                                            <Text style={{ color: '#00b294', fontSize: 16, marginLeft: 8}}>阅读</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
               </View>
               <View style={styles.ineerContainer}>
                    <Text style={{fontSize: 24, fontWeight: 'bold', marginLeft: 24, marginBottom: 16, marginTop: 12 }}>NHK Radio News</Text>
                    <ScrollView horizontal={true} style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 42 }}>
                        <View style={{ flexDirection: 'row', paddingRight: 24 }}>
                            {this.state.radioNews.map((news) => (
                                <TouchableBounce key={news.title} style={{ marginRight: 8 }}>
                                    <View style={{ borderRadius: 8, backgroundColor: '#00b294', padding: 12, flexDirection: 'row' }}>
                                        <Ionicons name="ios-volume-up" color="white" size={32} style={{ marginTop: 8 }}/>
                                        <View style={{ justifyContent: 'center', marginLeft: 12 }}>
                                            <Text style={{ color: 'white', fontSize: 18 }}>{news.title}</Text>
                                            <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}>{news.startdate}</Text>
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

const styles = StyleSheet.create(
    {
        container: {
            paddingTop: 32,
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white',
        },
        ineerContainer: {
            marginBottom: 12,
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
    }
)