import { supabase } from '@/utils/supabase';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import Header from './Header';
import MyButton from './MyButton';
import MyTextInput from './MyTextInput';

interface AddCuriosityCardProps {
  visible: boolean;
  onDismiss: () => void;
  onTrigger: () => void;
}

const AddCuriosityCard: React.FC<AddCuriosityCardProps> = ({ visible, onDismiss, onTrigger }) => {
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');

  return (
    <Portal>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <Dialog
          visible={visible}
          onDismiss={onDismiss}
          style={{ backgroundColor: 'white', marginBottom: Platform.OS === 'android' ? 100 : 0 }}
        >
          <Dialog.Content>
            <View>
              <Header isHeading={true}>Add Curiosity Project</Header>
              <Header isHeading={false}>Project Title</Header>
              <MyTextInput onChangeText={(text) => setTitle(text)} />

              <View style={{ paddingVertical: 30 }}>
                <Header isHeading={false}>Project Details</Header>
                <MyTextInput isBig={true} onChangeText={(text) => setDesc(text)} />
              </View>

              <MyButton
                icon=""
                onPress={async () => {
                  const response = await supabase.from('Curiosity').insert([
                    {
                      title: title,
                      description: desc,
                    },
                  ]);
                  console.log(response);
                  console.log('Added new Project');
                  onTrigger();
                  onDismiss(); 
                  setTitle('');
                  setDesc('');
                }}
              >
                Add to Queue
              </MyButton>
            </View>
          </Dialog.Content>
        </Dialog>
      </KeyboardAvoidingView>
    </Portal>
  );
};

export default AddCuriosityCard;
