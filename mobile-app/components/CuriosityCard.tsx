import { supabase } from '@/utils/supabase';
import * as React from 'react';
import { useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

type Curiosity = {
  id: number;
  title: string;
  date: string;
  description: string;
};

interface CuriosityCardProps {
  trigger: Boolean;
  onTrigger: () => void;
}

const CuriosityCard: React.FC<CuriosityCardProps> = ({ trigger, onTrigger }) => {
  const [index, setIndex] = useState(0);
  const [curiosity, setCuriosity] = useState<Curiosity[]>([]);
  const translateX = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const getCuriosity = async () => {
      try {
        console.log('Using Effects');
        const response = await supabase
          .from('Curiosity')
          .select('*')
          .eq('completed', false);

        if (response.body) {
          response.body.forEach((element) => {
            const dateObj = new Date(element.created_at);

            const day = dateObj.getDate().toString().padStart(2, '0');
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const year = dateObj.getFullYear();

            const formattedDate = `${day}/${month}/${year}`;
            element.date = formattedDate;
          });
          setCuriosity(response.body);
        }
      } catch {
        console.log('error fetching data');
      }
    };

    getCuriosity();
  }, [trigger]);

  const animateCard = (
    direction: 'left' | 'right',
    onComplete?: () => void
  ) => {
    Animated.timing(translateX, {
      toValue: direction === 'left' ? -500 : 500,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      translateX.setValue(direction === 'left' ? 500 : -500);
      setIndex((prev) => (prev + 1 < curiosity.length ? prev + 1 : 0));
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (onComplete) onComplete();
      });
    });
  };

  const completeCuriosity = async (card: Curiosity) => {
    try {
      console.log('Using Effects');
      const response = await supabase
        .from('Curiosity')
        .update({ completed: true })
        .eq('id', card.id);

      onTrigger();
      console.log('done');
    } catch {
      console.log('error fetching data');
    }
  };

  const card = curiosity[index];

  return (
    <View style={{ padding: 20 }}>
      {!card ? (
        <Text>Loading...</Text> // or a spinner/loading indicator
      ) : (
        <Animated.View style={{ transform: [{ translateX }] }}>
          <Card style={{ backgroundColor: 'white', padding: 20 }}>
            <Card.Content>
              <View style={{ paddingBottom: 20 }}>
                <View style={{ paddingBottom: 5 }}>
                  <Text
                    style={{ color: '#000000', fontWeight: 'bold', fontSize: 20 }}
                  >
                    {card.title}
                  </Text>
                </View>
                <View style={{ paddingBottom: 5 }}>
                  <Text style={{ color: '#808080', fontSize: 16 }}>
                    Added on {card.date}
                  </Text>
                </View>
              </View>
              <View style={{ paddingBottom: 20 }}>
                <View style={{ paddingBottom: 20 }}>
                  <Text style={{ color: '#000000', fontSize: 16 }}>
                    {card.description}
                  </Text>
                </View>
                <View
                  style={{
                    paddingBottom: 5,
                    paddingHorizontal: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    onPress={() => {
                      animateCard('left');
                      console.log('bruh');
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: 120,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      borderColor: '#D3D3D3',
                    }}
                    icon="delete"
                    mode="outlined"
                    textColor="#E52020"
                  >
                    <Text style={{ color: '#E52020' }}>Skip</Text>
                  </Button>
                  <Button
                    onPress={() => {
                      animateCard('right', () => {
                        completeCuriosity(card);
                      });
                    }}
                    style={{
                      backgroundColor: 'white',
                      width: 120,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      borderColor: '#D3D3D3',
                    }}
                    icon="check"
                    mode="outlined"
                    textColor="#73EC8B"
                  >
                    <Text style={{ color: '#73EC8B' }}>Complete</Text>
                  </Button>
                </View>
              </View>
            </Card.Content>
          </Card>
        </Animated.View>
      )}
    </View>
  );
};

export default CuriosityCard;
