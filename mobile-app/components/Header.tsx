import * as React from 'react';
import { Text } from 'react-native-paper';

interface HeaderProps {
    children: React.ReactNode,
    isHeading: boolean,
    textAlign?: 'left' | 'right' | 'center' | 'justify'; 
    
}

const Header: React.FC<HeaderProps> = ({ children, isHeading, textAlign = 'left'} : HeaderProps) => (
    <Text variant="bodyMedium" style={{
        fontSize: isHeading ? 24 : 18,
        fontFamily: 'serif',
        textAlign: textAlign,
        fontWeight: isHeading?'bold':'500',
        color: 'black',
        paddingVertical: isHeading ? 15 : 5,
        paddingBottom:isHeading?30:10
    }}>
        { children}
    </Text>
  
);

export default Header;