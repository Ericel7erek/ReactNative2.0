import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { TouchableOpacity, FlatList } from "react-native";
import { useAuth } from "@/services/AuthContext";
import { router, Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useEffect, useState } from "react";
import { getEvents } from "@/services/Events.service";
import { logout } from "@/services/Auth.service";

interface Event {
    id: string;
    Name: string;
    Date: {
        seconds: number;
        nanoseconds: number;
    };
    Location: string;
    userId: string;
}

export default function TabTwoScreen() {
    const colorScheme = useColorScheme();
    const { user, setUser } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        getEvents().then((res) => setEvents(res));
    }, []);

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

    const handleEventPress = (item: Event) => {
        router.push({
            pathname: `/details`,
            params: {
                eventId: item.id,
            },
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                    logout();
                    setUser(null);
                    router.back();
                }}
            >
                <Text style={styles.logoutButtonText}>LogOut</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Listado de Eventos</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <Text style={styles.emailText}>{user?.email}</Text>

            <Link href="/event" asChild>
                <TouchableOpacity style={styles.createEventButton}>
                    <Text style={styles.buttonText}>Create Event</Text>
                </TouchableOpacity>
            </Link>

            <FlatList
                numColumns={1}
                data={events}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <TouchableOpacity
                            style={styles.cardContent}
                            onPress={() => handleEventPress(item)}
                        >
                            <Text style={styles.cardTitle}>
                                Name: {item.Name || "Loading"}
                            </Text>
                            <Text style={styles.cardTitle}>
                                Date: {formatTimestamp(item.Date)}
                            </Text>
                            <Text style={styles.cardTitle}>
                                Location: {item.Location}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: Colors.dark.background,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: Colors.dark.text,
    },
    separator: {
        marginVertical: 20,
        height: 1,
        width: "80%",
        backgroundColor: "#ccc",
    },
    emailText: {
        fontSize: 16,
        marginBottom: 20,
        color: "white",
    },
    createEventButton: {
        backgroundColor: Colors.light.tint,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    logoutButton: {
        alignSelf: "flex-end",
        marginBottom: 10,
    },
    logoutButtonText: {
        color: Colors.light.tint,
        fontSize: 16,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: "#ffffff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: "100%",
    },
    cardContent: {
        flexDirection: "column",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: Colors.light.text,
    },
});
