import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default class ScanScreen extends React.Component{
constructor(){
    super()
    this.state={
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal'
    }
}
getCameraPermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
        hasCameraPermissions:status==="granted",
        buttonState:"clicked"

    })
}
handleBarCodeScanned=async({data,type})=>{
this.setState({
    scanned:true,
    scannedData:data,
    buttonState:"normal"

})
}
render(){
    const hasCameraPermissions=this.state.hasCameraPermissions;
    const scanned=this.state.scanned;
    const buttonState=this.state.buttonState;
    <Image source={{
        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg"}}
        style={{width:20, height:50}}/>
    if(buttonState==="clicked"&& hasCameraPermissions){
        return(
            <BarCodeScanner
            onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            />
        )
    }
    else if (buttonState==="normal"){
        return(
            <View style={styles.container}>
            <Text style={styles.displayText}>{
                hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
            }</Text>
            <TouchableOpacity onPress={this.getCameraPermissions} style={styles.scanButton} title="BarCode Scanner">
            <Text style={styles.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>
            </View>
        )
    }
    
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayText: {
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    buttonText: {
        fontSize: 15,
        textAlign: "center",
        marginTop: 10

    },
    scanButton: {
        backgroundColor: '#66BB6A',
        padding: 10,
        margin: 10,
        width: 50,
        borderWidth: 1.5,
        borderLeftWidth: 0
    }
})