import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface MyButtonProps {
  children: React.ReactNode;
  height?: number;
  width?: number;
  icon: 'plus' | '' | 'lightbulb-on-outline';
  onPress?: () => void;
  backgroundColor?: string; // New prop
  textColor?: string;       // New prop
}

const MyButton: React.FC<MyButtonProps> = ({
  children,
  height,
  width,
  onPress,
  icon,
  backgroundColor = 'black',  // default
  textColor = '#FFFFFF'       // default
}) => (
  <View style={{ padding: 5 }}>
    <Button
      style={{
        backgroundColor,
        height,
        width,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
      }}
      icon={icon}
      mode="contained"
      onPress={onPress}
      textColor={textColor} // Paper's textColor prop
    >
      <Text style={{ color: textColor }}>{children}</Text>
    </Button>
  </View>
);

export default MyButton;
