import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/services/AuthContext";
import { getEventById, inviteUserToEvent } from "@/services/Events.service";
import { EventType } from "@/common/Event_type";
import { getUsers } from "@/services/User.service";
import { UserType } from "@/common/User_type";

export default function Details() {
    const { user } = useAuth();
    const [event, setEvent] = useState<EventType>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const eventId = useLocalSearchParams().eventId;
    const [usersDb, setUsersDb] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await getEventById(eventId);
                setEvent(eventData);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const userList = await getUsers();
                setUsersDb(userList);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        if (eventId) {
            fetchEvent();
            fetchUsers();
        }
    }, [eventId]);

    const handleInvite = async (userId: string) => {
        try {
            await inviteUserToEvent(eventId, userId);
            console.log("Usuario invitado con éxito.");
        } catch (error) {
            console.error("Error inviting user to event:", error);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleEventPress = () => {
        toggleModal();
    };

    if (!event) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading event details...</Text>
            </View>
        );
    }

    const formatTimestamp = (timestamp: {
        seconds: number;
        nanoseconds: number;
    }) => {
        if (
            timestamp &&
            typeof timestamp.seconds === "number" &&
            typeof timestamp.nanoseconds === "number"
        ) {
            const date = new Date(
                timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
            );
            return date.toLocaleString();
        }
        return "";
    };

    const isEventCreator = event.userId === user.uid;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Event Details</Text>
            <Text style={styles.text}>Event Name: {event.Name}</Text>
            <Text style={styles.text}>
                Event Date: {formatTimestamp(event.Date)}
            </Text>
            <Text style={styles.text}>Event Location: {event.Location}</Text>

            <FlatList
                numColumns={1}
                data={event.users}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.userItem}>{item.name}</Text>
                    </View>
                )}
            />

            {isEventCreator && (
                <TouchableOpacity
                    style={styles.inviteButton}
                    onPress={handleEventPress}
                >
                    <Text style={styles.buttonText}>Invite People</Text>
                </TouchableOpacity>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Invite People</Text>
                        <FlatList
                            numColumns={1}
                            data={usersDb}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.inviteContainer}>
                                    <Text style={styles.userItem}>
                                        {item.email}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.inviteButton}
                                        onPress={() => handleInvite(item.id)}
                                    >
                                        <Text style={styles.buttonText}>
                                            Invite
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        <Pressable
                            style={[styles.button, styles.modalButton]}
                            onPress={toggleModal}
                        >
                            <Text style={styles.buttonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
    },
    loadingText: {
        color: "white",
        fontSize: 18,
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    text: {
        color: "white",
        fontSize: 16,
        marginBottom: 5,
    },
    userItem: {
        color: "black",
        fontSize: 16,
        marginBottom: 5,
    },
    inviteButton: {
        backgroundColor: "blue",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    // Estilos para el modal
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        width: "80%",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalButton: {
        marginTop: 20,
        backgroundColor: "blue",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    button: {
        alignItems: "center",
    },
    inviteContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },
});
