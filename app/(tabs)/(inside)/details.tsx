import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function details() {
    const item =useLocalSearchParams()
    console.log(item);
    
    return(
        <View>
            <Text style={{color:'white'}}>Event:{item.Name}</Text>
            <Text style={{color:'white'}}>Date of the Event:{item.Date}</Text>
            <Text style={{color:'white'}}>Location of the Event:{item.Location}</Text>
        </View>
    )
}