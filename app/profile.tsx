// import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { StatusBar } from "expo-status-bar";
import {
    Platform,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/services/AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { EditProfile } from "@/services/Auth.service";

export default function ModalScreen() {
    const { user, setUser } = useAuth();
    const [image, setImage] = useState("");
    const [edit, SetEdit] = useState(true);
    const [date, setDate] = useState(new Date());
    const [name, setName] = useState("");

    const handleDateChange = () => {
        const currentDate = date;
        setDate(currentDate);
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    console.log(user);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity
                style={styles.edit}
                onPress={() => SetEdit(!edit)}
            >
                <Text>Edit</Text>
            </TouchableOpacity>

            {edit ? (
                <>
                    <View
                        style={styles.separator}
                        lightColor="#eee"
                        darkColor="rgba(255,255,255,0.1)"
                    />
                    <Text>Welcome {user.email}</Text>
                    <Text>Name</Text>
                    <Text>Birthday</Text>
                    {image && (
                        <Image source={{ uri: image }} style={styles.image} />
                    )}
                    <Button
                        title="Pick an image from camera roll"
                        onPress={pickImage}
                    />
                    {/* Use a light status bar on iOS to account for the black space above the modal */}
                    <StatusBar
                        style={Platform.OS === "ios" ? "light" : "auto"}
                    />
                </>
            ) : (
                <View>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={(e) => setName(e)}
                        placeholder="Write Your Name Here"
                        placeholderTextColor={"black"}
                    />

                    <Text style={styles.title}>Birthday</Text>
                    <DateTimePicker
                        mode="date"
                        value={date}
                        onChange={handleDateChange}
                        style={styles.datepicker}
                    />
                    <TouchableOpacity
                        style={styles.submit}
                        onPress={() => {
                            EditProfile(user.uid, name, user.email, date);
                        }}
                    >
                        <Text>Submit Data</Text>
                    </TouchableOpacity>
                </View>
            )}
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
        alignSelf: "center",
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
    edit: {
        padding: 20,
        backgroundColor: "red",
        alignSelf: "flex-end",
        marginRight: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
    },
    datepicker: {
        alignSelf: "center",
    },
    submit: {
        padding: 20,
        backgroundColor: "red",
        alignSelf: "center",
    },
});
