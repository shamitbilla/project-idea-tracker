import AddCuriosityCard from "@/components/AddCuriosityCard";
import CuriosityCard from "@/components/CuriosityCard";
import MyButton from "@/components/MyButton";
import { supabase } from "@/utils/supabase";
import * as React from 'react';
import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";


export default function Index() {
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [projectCount, setProjectCount] = useState<number>(69);
  const [trigger, setTrigger] = useState<Boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
     const getCuriosity = async () => {
      try {
        console.log("Hello laddoos")
        const response =  await supabase
        .from('Curiosity')
        .select('*', { count: 'exact', head: true })
        .eq('completed', false);

        setProjectCount(response.count ?? 0);
          
      }
      catch {
        console.log("error fetching data");
       }
      
                
    };

    getCuriosity();
  },[trigger]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
        
      }}
    >
      <Text
        style={{
          fontSize: 24, // Tailwind's text-2xl
          fontFamily: 'serif', // Built-in serif
          textAlign: 'center',
          fontWeight: 'bold', // optional
          color:'black'
        }}
      >
        Curie
      </Text>
      <Text
        style={{
          fontSize: 16, // Tailwind's text-2xl
          fontFamily: 'serif', // Built-in serif
          textAlign: 'center',
          fontWeight: 'semibold', // optional
          color:'black'
        }}
      >
        The Curiosity Tracker app
      </Text>
      <CuriosityCard trigger={trigger} onTrigger={() => { setTrigger(prev => !prev) }}></CuriosityCard>
      <MyButton icon='plus' onPress={() => setDialogVisible(true)}>Add new Project</MyButton>
      <Text style={{ color: '#808080', padding: 10 }}>{projectCount} more projects in queue</Text>
      <View style={{paddingTop : 60}}>
        <MyButton icon='lightbulb-on-outline' onPress={() => router.push("/ideas")} backgroundColor="#FAF9F6" textColor="black">Give me ideas</MyButton>
      </View>
      
      <AddCuriosityCard visible={dialogVisible} onDismiss={() => setDialogVisible(false)} onTrigger={()=>{setTrigger(prev => !prev)}} />
      
    </View>
  );
}