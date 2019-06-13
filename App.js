import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import TranslateScreen from './screens/TranslateScreen';
import { gray } from 'ansi-colors';
import SearchScreen from './screens/SearchScreen';
import NotebookScreen from './screens/NotebookScreen';
import KanjiScreen from './screens/KanjiScreen';
import NewsReaderScreen from './screens/NewsReaderScreen';
import TabBarIcon from './components/TabBarIcon';

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
HomeStack.navigationOptions = {
  tabBarLabel: '主页',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const TranslateStack = createStackNavigator(
  {
    Translate: TranslateScreen
  },
);
TranslateStack.navigationOptions = {
  tabBarLabel: '翻译',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-globe' : 'md-globe'}
    />
  ),
};

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    Result: ResultScreen,
    Kanji: KanjiScreen
  }
)
SearchStack.navigationOptions = {
  tabBarLabel: '查词',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ),
};

const NotebookStack = createStackNavigator(
  {
    Notebook: NotebookScreen,
    Result: ResultScreen,
    Kanji: KanjiScreen
  }
)
NotebookStack.navigationOptions = {
  tabBarLabel: '生词本',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'}
    />
  ),
};

const AppNavigator = createBottomTabNavigator(
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
    
  }
);
export default createBottomTabNavigator({
  HomeStack,
  SearchStack,
  NotebookStack,
  TranslateStack
}, 
{
  tabBarOptions: {
    activeTintColor: '#00b294',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
