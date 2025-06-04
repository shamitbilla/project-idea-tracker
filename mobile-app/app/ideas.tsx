import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import IdeaCard from "@/components/IdeaCard";

export default function Ideas() {
  const router = useRouter();

  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Idea #1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error sapiente similique perspiciatis.",
    },
    {
      id: 2,
      title: "Idea #2",
      description:
        "Ipsum ex consectetur quis veniam cillum in voluptate anim culpa officia cillum minim.",
    },
    {
      id: 3,
      title: "Idea #3",
      description:
        "Cupidatat dolore officia veniam occaecat cupidatat. Et deserunt tempor voluptate labore consequat.",
    },
    {
      id: 4,
      title: "Idea #4",
      description:
        "Asperiores totam natus eos iusto fugit? Error sapiente similique perspiciatis repudiandae corrupti eaque.",
    },
  ]);

  function onCardSlide(id: number) {
    setCards((prevCards) => {
      // Remove the card that slid
      const newCards = prevCards.filter((card) => card.id !== id);
      // Find max id to generate new id
      const maxId = Math.max(...prevCards.map((c) => c.id));
      // Add a new card at the bottom
      newCards.push({
        id: maxId + 1,
        title: `Idea #${maxId + 1}`,
        description: "New idea description loaded dynamically.",
      });
      return newCards;
    });
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 75,
        alignItems: "center",
        paddingBottom: 50,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontFamily: "serif",
          textAlign: "center",
          fontWeight: "bold",
          color: "black",
        }}
      >
        Curie
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontFamily: "serif",
          textAlign: "center",
          fontWeight: "600",
          color: "black",
        }}
      >
        The Curiosity Tracker app
      </Text>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          marginTop: 10,
        }}
      >
        <IconButton
          icon="arrow-left"
          iconColor="black"
          size={24}
          onPress={() => router.back()}
        />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "serif",
            fontWeight: "bold",
            color: "black",
            paddingVertical: 3,
          }}
        >
          Project Ideas
        </Text>
      </View>

      <View style={{ gap: 10, width: "100%", paddingHorizontal: 20 }}>
        {cards.map((card) => (
          <IdeaCard
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            onSlideLeft={onCardSlide}
          />
        ))}
      </View>
    </ScrollView>
  );
}
