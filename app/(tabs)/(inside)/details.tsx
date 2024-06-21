import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function details() {
    const item =useLocalSearchParams()
    console.log(item);
    
    return(
        <View>
            <Text style={{color:'white'}}>Eric</Text>
        </View>
    )
}