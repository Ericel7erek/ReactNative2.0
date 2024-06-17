import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import {app} from '../../services/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

export default function TabOneScreen() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');


  function signUp() {
    const auth = getAuth(app);

    createUserWithEmailAndPassword(
        auth,
        email,
        pass
    )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
        
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <TextInput style={styles.input} value={email} onChangeText={(e)=>setEmail(e)} />
      <TextInput style={styles.input} secureTextEntry={true} value={pass} onChangeText={(e)=>setPass(e)} />

      <TouchableOpacity style={styles.touchable} onPress={signUp}>
      <Text>Hola</Text>
      </TouchableOpacity>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    width: "70%",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white"
  },
  touchable:{
    padding:10,
    color: 'white',
    backgroundColor: 'blue',
  },

});
