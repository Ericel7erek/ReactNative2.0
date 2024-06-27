<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, Button, TextInput, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateUser, getUserById } from '../services/api';
import { useEffect, useState } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/services/AuthContext';
=======
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Image, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
>>>>>>> 9c978fed7338e4739f79c9c64160775fbeec2c36

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/services/AuthContext";

export default function ModalScreen() {
<<<<<<< HEAD
  const { user, setUser } = useAuth()
  const [image, setImage] = useState(null);
  const [userObject, setUserObject] = useState({ name: '', birthday: '', city: '' });


  console.log(userObject);
  console.log(user.uid);
=======
    const { user, setUser } = useAuth();
    const [image, setImage] = useState(null);
>>>>>>> 9c978fed7338e4739f79c9c64160775fbeec2c36

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

<<<<<<< HEAD
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Profile</Text>
      <Pressable onPress={() => updateUser(user.uid, userObject)} style={styles.button}><Text style={styles.textButton}>Save</Text></Pressable>
      <TextInput
        placeholder='Name'
        style={styles.textInput}
        value={userObject.name}
        onChangeText={(e) => setUserObject({ ...userObject, name: e })}
      />
      <TextInput
        placeholder='Birthday'
        style={styles.textInput}
        value={userObject.birthday}
        onChangeText={(e) => setUserObject({ ...userObject, birthday: e })}
      />
      <TextInput
        placeholder='City'
        style={styles.textInput}
        value={userObject.city}
        onChangeText={(e) => setUserObject({ ...userObject, city: e })}
      />
      <Pressable onPress={pickImage} style={styles.button}><Text style={styles.textButton}>Pick an image from camera roll</Text></Pressable>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>Welcome {user.email}</Text>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
  image: {
    width: 200,
    height: 200,
  },
  textInput: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  textButton: {
    color: 'white',
  }
=======
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text>Name</Text>
            <Text>Birthday</Text>
            <Text>City</Text>
            <Button
                title="Pick an image from camera roll"
                onPress={pickImage}
            />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <Text>Wlcome {user.email}</Text>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    image: {
        width: 200,
        height: 200,
    },
>>>>>>> 9c978fed7338e4739f79c9c64160775fbeec2c36
});
