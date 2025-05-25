import * as React from 'react';
import { TextInput } from 'react-native-paper';

interface MyTextInputProps {
  isBig?: boolean;
  onChangeText?: (text: string) => void;
}

const MyTextInput = ({ isBig = false, onChangeText }: MyTextInputProps) => {
  const [text, setText] = React.useState("");

  const handleChangeText = (text: string) => {
    setText(text);
    onChangeText?.(text); // Call parent-provided handler if exists
  };

  return (
    <TextInput
      value={text}
      onChangeText={handleChangeText}
      textColor="black"
      mode="outlined"
      multiline={isBig}
      numberOfLines={isBig ? 4 : 1}
      style={{
        backgroundColor: 'white',
        height: isBig ? 150 : 50,
      }}
    />
  );
};

export default MyTextInput;
