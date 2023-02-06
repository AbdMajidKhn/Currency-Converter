import { View,StyleSheet, TouchableOpacity,Text } from "react-native";
const CurrencyListItem=({symbol,onPress,color,backgroundColor})=>(
    <TouchableOpacity
    style={[styles.container,{backgroundColor}]}
    onPress={onPress}>
        <Text style={[styles.title,{color}]}>{symbol}</Text>
    </TouchableOpacity>
)
const styles=StyleSheet.create({
    container:{
        padding:20,
        margin:12,
justifyContent:'center',
alignItems:'center',
backgroundColor:'white'
    },
    title:{
        fontSize:24,
        fontWeight:'600',
        color:'black',
        textAlign:'center'
    },
});
export default CurrencyListItem;