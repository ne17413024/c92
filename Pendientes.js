import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Alert,
  ToastAndroid,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  StatusBar
} from "react-native";



export default class Pendientes extends Component {
  
  render() {
    return (
      <View style={styles.container}>
      <SafeAreaView style={styles.droidSafeArea} /> 
      <TouchableOpacity style={styles.TopButton} > 
        <Text style={styles.TextButton} > guardar </Text> 
      </TouchableOpacity>
      

    </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  TopButton: {
    height: 85,
    width: '100%',
    backgroundColor:'#38B6FF',
    
  },
  TextButton: {
    fontSize:30,
    fontWeight:'bold',
    marginTop:'5%',
    marginLeft:'65%'
    
  },
  droidSafeArea: {
    marginTop: Platform.OS=== "android"? StatusBar.currentHeight: 0
  },
  
});
