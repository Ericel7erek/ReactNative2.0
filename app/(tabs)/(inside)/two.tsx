import { StyleSheet } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { TouchableOpacity, Pressable, FlatList } from "react-native";
import { useAuth } from "@/services/AuthContext";
import { router, Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useEffect, useState } from "react";
import { getEvents } from "@/services/Events.service";
import { logout } from "@/services/Auth.service";

export default function TabTwoScreen() {
    const colorScheme = useColorScheme();
    const { user, setUser } = useAuth();
    const [events, setEvents] = useState();
    useEffect(() => {
        getEvents().then((res) => setEvents(res));
    }, []);
    return (
        <View style={styles.container}>
            <Text
                onPress={() => {
                    logout;
                    setUser(null);
                    router.back();
                }}
            >
                LogOut
            </Text>
            <Text style={styles.title}>Listado de Eventos</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <Text>{user?.email}</Text>

            <Link href="/event" asChild>
                <TouchableOpacity
                    style={styles.evento}
                    onPress={() => (
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="user"
                                    size={25}
                                    color={Colors[colorScheme ?? "light"].text}
                                    style={{
                                        marginRight: 15,
                                        opacity: pressed ? 0.5 : 1,
                                    }}
                                />
                            )}
                        </Pressable>
                    )}
                >
                    <Text>Create Event</Text>
                </TouchableOpacity>
            </Link>

            <FlatList
                numColumns={1}
                data={events}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                backgroundColor: "red",
                                margin: 10,
                                padding: 10,
                            }}
                            onPress={() => {
                                router.push({
                                    pathname: `/details`,
                                    params: item,
                                });
                            }}
                        >
                            <Text>Name:{item.Name}</Text>
                            <Text>Date:{item.Date}</Text>
                            <Text>Location:{item.Location}</Text>
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
    evento: {
        backgroundColor: "red",
    },
});
