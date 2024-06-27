import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    View,
} from "react-native";
import { useAuth } from "@/services/AuthContext";
import { router } from "expo-router";
import { createEvent } from "@/services/Events.service";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ModalScreen() {
    const { user } = useAuth();
    const [NombreDeEvento, setNombreDeEvento] = useState("");
    const [date, setDate] = useState(new Date());
    const [LugarDeEvento, setLugarDeEvento] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === "ios");
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Event</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>Event Name</Text>
            <TextInput
                style={styles.input}
                value={NombreDeEvento}
                onChangeText={(e) => setNombreDeEvento(e)}
            />
            <View style={styles.datePickerContainer}>
                <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={styles.datePickerButtonText}>
                        Select Event Date
                    </Text>
                </TouchableOpacity>
                <Text style={styles.selectedDateText}>
                    {date.toLocaleDateString()}
                </Text>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    mode="date"
                    value={date}
                    onChange={handleDateChange}
                />
            )}
            <Text style={styles.label}>Event Location</Text>
            <TextInput
                style={styles.input}
                value={LugarDeEvento}
                onChangeText={(e) => setLugarDeEvento(e)}
            />
            <TouchableOpacity
                style={styles.createButton}
                onPress={async () => {
                    await createEvent(
                        user.uid,
                        NombreDeEvento,
                        date,
                        LugarDeEvento
                    ).then((res) => console.log(res));
                    router.back();
                }}
            >
                <Text style={styles.createButtonText}>Create Event</Text>
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
        padding: 20,
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    separator: {
        marginVertical: 20,
        height: 1,
        width: "100%",
        backgroundColor: "#999",
    },
    label: {
        color: "white",
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        width: "100%",
        borderWidth: 1,
        borderColor: "#666",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    datePickerContainer: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginBottom: 10,
        gap: 20,
    },
    datePickerButton: {
        backgroundColor: "#1E90FF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    datePickerButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    selectedDateText: {
        fontSize: 16,
        color: "white",
    },
    createButton: {
        backgroundColor: "red", // Red color for create button
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    createButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
});
