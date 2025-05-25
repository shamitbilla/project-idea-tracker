import * as React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

const MyDefaultCard = () => (
  <View style={{padding : 20} }>
    <Card style={{ backgroundColor: 'white', padding : 20 }}>
        <Card.Content>
          <Text variant="bodyMedium" style={{ color: '#808080' }}>No Curiosity Projects in your queue</Text>
        </Card.Content>
      </Card>
  </View>
  
);

export default MyDefaultCard;