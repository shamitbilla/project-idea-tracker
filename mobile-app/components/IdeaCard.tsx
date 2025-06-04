import React, { useRef } from "react";
import { View, Text, Animated, Dimensions, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import MyButton from "./MyButton";
import { useRouter } from "expo-router";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface IdeaCardProps {
  id: number;
  title?: string;
  description?: string;
  onSlideLeft?: (id: number) => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({
  id,
  title = "Title",
  description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  onSlideLeft,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const slideLeft = () => {
    Animated.timing(translateX, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onSlideLeft) onSlideLeft(id);
      translateX.setValue(0);
    });
  };

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          transform: [{ translateX }],
        },
      ]}
    >
      <View style={styles.borderLeft} />
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text
            style={styles.link}
            onPress={() => {
              router.push("https://www.youtube.com")
            }}
          >
            Wanna Check it out?
          </Text>
          <View style={{ paddingTop: 20 }}>
            <MyButton icon="plus" onPress={slideLeft} backgroundColor="#000000">
              Add new Project
            </MyButton>
          </View>
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
  },
  borderLeft: {
    width: 5,
    backgroundColor: "#007BFF",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    elevation: 2,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  title: {
    fontSize: 19,
    fontFamily: "serif",
    fontWeight: "bold",
    color: "black",
    paddingBottom: 20,
  },
  description: {
    color: "#808080",
  },
  link: {
    color: "#007BFF",
    paddingTop: 20,
  },
});

export default IdeaCard;
