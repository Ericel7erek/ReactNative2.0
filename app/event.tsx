import { StatusBar } from "expo-status-bar";
import {
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/services/AuthContext";
import { useState } from "react";
import { router } from "expo-router";
import { createEvent } from "@/services/Events.service";

export default function ModalScreen() {
    const { user, setUser } = useAuth();
    const [NombreDeEvento, setNombreDeEvento] = useState("");
    const [FechaDeEvento, setFechaDeEvento] = useState("");
    const [LugarDeEvento, setLugarDeEvento] = useState("");
    console.log(user.uid);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Event</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <Text>Event Name:</Text>
            <TextInput
                style={styles.input}
                value={NombreDeEvento}
                onChangeText={(e) => setNombreDeEvento(e)}
            />
            <Text>Event Date:</Text>
            <TextInput
                style={styles.input}
                value={FechaDeEvento}
                onChangeText={(e) => setFechaDeEvento(e)}
            />
            <Text>Event Location:</Text>
            <TextInput
                style={styles.input}
                value={LugarDeEvento}
                onChangeText={(e) => setLugarDeEvento(e)}
            />
            <TouchableOpacity
                style={styles.evento}
                onPress={async () => {
                    await createEvent(
                        user.uid,
                        NombreDeEvento,
                        FechaDeEvento,
                        LugarDeEvento
                    ).then((res) => console.log(res));
                    router.back();
                }}
            >
                <Text>Create Evento ?</Text>
            </TouchableOpacity>
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
    input: {
        height: 40,
        width: "40%",
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
    },
    evento: {
        backgroundColor: "red",
    },
});
