import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface MyButtonProps {
    children: React.ReactNode;
    height?: number;
    width?: number;
    icon : 'plus' | ''
    onPress?: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ children, height, width, onPress, icon = 'plus' }) => (
    <View style={{padding: 5}}>
        <Button
                style={{
                    backgroundColor: 'black',
                    height: height, // Set a specific height
                    width: width,  // Set the same width to make it square
                    justifyContent: 'center',
                    alignItems: 'center',
                borderRadius: 12,
                    
                }}
                icon={icon} mode="contained" onPress={onPress} textColor='white'>
            <Text style={{color:'#FFFFFF'}}>{ children }</Text>
        </Button>
    </View>
   
);

export default MyButton;