import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import TranslateScreen from './screens/TranslateScreen';
import { gray } from 'ansi-colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchScreen from './screens/SearchScreen';
import NotebookScreen from './screens/NotebookScreen';
import KanjiScreen from './screens/KanjiScreen';
import NewsReaderScreen from './screens/NewsReaderScreen';

/*export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}*/

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    NewsReader: NewsReaderScreen
  }
);

const TranslateStack = createStackNavigator(
  {
    Translate: TranslateScreen
  },
);

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    Result: ResultScreen,
    Kanji: KanjiScreen
  }
)

const NotebookStack = createStackNavigator(
  {
    Notebook: NotebookScreen,
    Result: ResultScreen,
    Kanji: KanjiScreen
  }
)

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        title: "主页"
      }
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        title: "查词"
      }
    },
    Notebook: {
      screen: NotebookStack,
      navigationOptions: {
        title: "生词本"
      }
    },
    Translate: {
      screen: TranslateStack,
      navigationOptions: {
        title: "翻译"
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#00b294',
      style: {
        backgroundColor: '#fafbfc'
      }
    },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Translate') {
          iconName = `ios-globe${focused ? '' : '-outline'}`;
        } else if (routeName === 'Search') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        } else if (routeName === 'Notebook') {
          iconName = `ios-bookmarks${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
