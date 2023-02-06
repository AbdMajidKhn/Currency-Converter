import React, { useState } from "react";
import { Text,StyleSheet,View,TextInput,Modal,TouchableOpacity, Button,FlatList } from "react-native";

import Currencies from "../models/Currencies";
import CurrencyListItem from "../components/CurrencyListItem";
import CurrencyItem from "../components/CurrencyItem";

const ConverterScreen=()=>{
    const[amountTextInput,setAmoutText]=useState("");
    const[currency,setCurrency]=useState("Select Currency");
    const[showModal,setShowModal]=useState(false)
    const[currencyDAta,setCurrencyData]=useState("")
    const[rates,setRates]=useState([]);

    const [selectedSymbol,setSelectedSymbol]=useState("USD");
    const[selectedrate,setSelectedRate]=useState(1);
    const getCurrencyRates=async()=>{
        try{
            const respose=await fetc(Constants.KfetchLatestRates+"?app_id="+Constants.KappId);
            const json=await respose.json();
            setCurrencyData(json);
            console.log(json.rates);

        }catch(error){
            console.error(error);
        }finally{
            
        }
        };
    const renderItem=({item})=>{
        const textcolor = item.symbol == selectedSymbol ? "black":"white";
        const backgroundColor=item.symbol==selectedSymbol ? "white":"black";
        return(
        <CurrencyListItem symbol={item.symbol}  backgroundColor={backgroundColor}
        color={textcolor} onPress={()=>{
                setSelectedSymbol(item.symbol);
                setSelectedRate(item.rate);


        }}/>
    )};
    const renderCurrencyItem=({item})=>{
        return(<CurrencyItem symbol={item.symbol} rate={item.rate}/>)
    };
    function calculateRates(){
        setShowModal(false);
        setCurrency(selectedSymbol);
        
        var rt=[]
        const sourceToUSD=amountTextInput/selectedrate;
        Currencies.forEach((item)=>{
            const val=item.rate*sourceToUSD;
            rt.push({symbol:item.symbol,rate:val});
        })
        setRates(rt);
    }
    const Currencylist=()=>(
        <View style={styles.CurrencyListConverter}>
            <View style={styles.toolBarContainer}>
                <Button  color="red" title="cancel"onPress={()=>{
                    setShowModal(false);
                }}/>
                <Button  color="red" title="Convert" onPress={()=>{
                    setShowModal(false);
                    calculateRates();
                }} />
            </View>
            <FlatList
            data={Currencies}
            keyExtractor={(item)=>item.symbol}
            renderItem={renderItem}/>
        </View>
    )
    return(
    <View style={styles.container}>
        <Text style={styles.text}>Currency Converter</Text>
        <TextInput 
        style={styles.InputFieldStyle} 
        value={amountTextInput}
       onChangeText={setAmoutText}
       placeholder="Enter your money"
       keyboardAppearance='number-pad'
       />
       <TouchableOpacity
       style={styles.InputFieldStyle}
       onPress={()=>{
        setShowModal(true)
       }}>
        <Text>{currency}</Text>
        </TouchableOpacity>
        <FlatList
        data={rates}
        renderItem={renderCurrencyItem}
        keyExtractor={(item)=>item.symbol}
        extraData={rates}
        />
        <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
              >
                <Currencylist/>
                </Modal>
    </View>)
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'pink'
    },
 text:{
    justifyContent:'center',
color:'grey',
alignItems:'center',
paddingLeft:100,
fontSize:25


 },
    InputFieldStyle:{
height:50,
marginTop:60,
marginStart:20,
marginEnd:20,
padding:12,
borderWidth:1,
borderRadius:12,
color:'black',
backgroundColor:'grey',
lineHeight:13

    },
    CurrencyListConverter:{
      flex:1,
      marginTop:100,
      backgroundColor:'gray'
    },
    toolBarContainer:{
height:60,
flexDirection:'row',
justifyContent:'space-around',
alignItems:'center',
    }
 

})
export default ConverterScreen;