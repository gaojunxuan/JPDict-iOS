import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const NHKNewsScrollView = ({ data, navigation }) => {
  return (
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
        {data?.map((news) => (
          <View key={news.newsId} style={{ flexDirection: "row" }}>
            <View style={styles.shadowContainer}>
              <Image
                style={{ width: 140, height: 80, borderRadius: 8 }}
                source={{ uri: news.imageUri }}
                defaultSource={require("../assets/imgnotfound.png")}
              ></Image>
            </View>
            <View style={{ marginLeft: 12, marginRight: 16, marginTop: 4 }}>
              <Text style={{ fontSize: 18 }}>{news.title}</Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginTop: 8,
                  alignItems: "center",
                }}
                onPress={() => {
                  navigation.navigate("NewsReader", {
                    newsId: news.newsId,
                    img: news.imageUri,
                    title: news.title,
                  });
                }}
              >
                <Ionicons name="md-book" color="#00b294" size={18}></Ionicons>
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
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: "black",
    shadowRadius: 4,
    shadowOffset: {
      height: 1,
    },
    shadowOpacity: 0.3,
  },
});
