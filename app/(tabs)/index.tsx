import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { signUp, signIn, logout, getUserById } from '../../services/api';
import { useAuth } from '../../services/AuthContext';
import { router } from 'expo-router';

export default function TabOneScreen() {
  const { user, setUser } = useAuth();
  const [Switch, setSwitch] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPass, setRegisterPass] = useState('');
  const [error, setError] = useState('');
  console.log(user);

  const handleSignUp = async () => {
    try {
      await signUp(registerEmail.toLowerCase(), registerPass)
        .then(res => {
          console.log(res);
          if (res.includes('weak-password')) {
            setError('weak Password at least 6 characters')
          }

          else if (!res.includes('invalid')) {
            setSwitch(!Switch);
          } else {
            setError('Error during sign up');

          }
        }
        )
    } catch (error) {
      console.error(error);
      setError('Error during sign up');
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn(email.toLowerCase(), pass)
        .then(res => {
          if (!res.includes('invalid')) {
            getUserById(res).then(userdata => setUser(userdata))

          } else {
            setError('Error during sign in');
          }
        })
    } catch (error) {
      console.error(error);
      setError('Error during sign in');
    }
  };

  useEffect(() => {
    if (user !== null) {
      router.push('(inside)/two')
    }
  }, [user])

  return (
    <View style={styles.container}>
      <TouchableOpacity><Text onPress={logout}>Hello</Text></TouchableOpacity>
      {Switch ? (
        <>
          <Text style={styles.title}>SignUp</Text>
          <TextInput
            style={styles.input}
            value={registerEmail}
            onChangeText={(e) => setRegisterEmail(e)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={registerPass}
            onChangeText={(e) => setRegisterPass(e)}
          />
          <TouchableOpacity style={styles.touchable} onPress={handleSignUp}>
            <Text>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable} onPress={() => setSwitch(!Switch)}>
            <Text>Login?</Text>
          </TouchableOpacity>
          <Text style={{ color: 'red' }}>{error}</Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={pass}
            onChangeText={(e) => setPass(e)}
          />
          <TouchableOpacity style={styles.touchable} onPress={handleSignIn}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable} onPress={() => setSwitch(!Switch)}>
            <Text>Create Account?</Text>
          </TouchableOpacity>
          <Text style={{ color: 'red' }}>{error}</Text>
        </>
      )}
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
  input: {
    height: 40,
    width: "70%",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white"
  },
  touchable: {
    padding: 10,
    color: 'white',
    backgroundColor: 'blue',
  },
});
