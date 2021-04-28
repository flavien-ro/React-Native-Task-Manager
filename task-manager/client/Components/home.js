import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default function Home({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"email": email,"password": password});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8080/api/auth/login", requestOptions)
      .then(response => response.text())
      .then(result => alert(result))
      .catch(error => alert(error));
  }
    return (
        <KeyboardAvoidingView style={styles.background}
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}>
          <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.background}>
          <View style={styles.container}>
            <View style={styles.homeSection}>
              <View style={styles.logoSection}>
                <Entypo name="tools" size={80} color="white"/>
                <Text h1 style={styles.title}>Welcome to your task manager application</Text>
              </View>
              <View>
                  <View>
                    <View style={styles.input}>
                      <Entypo name="email" size={24} color="white" />
                      <TextInput
                        name="email"
                        value={email}
                        onChangeText={(mail) => setEmail(mail)}
                        placeholder={'example@mail.com'}
                        placeholderTextColor="white"
                        style={styles.txtInput}
                      />
                    </View>
                    <View style={styles.input}>
                      <Entypo name="lock" size={24} color="white" />
                      <TextInput
                        name="password"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(pass) => setPassword(pass)}
                        placeholder={'Password'}
                        placeholderTextColor="white"
                        style={styles.txtInput}
                      />
                    </View>
                  </View>
                  <View style={styles.buttonSection}>
                    <Button
                      title={'Signin'}
                      color="#003399"
                      onPress={postData}
                    />
                  </View>
                  <View>
                    <Text style={{color: 'white', textAlign: 'center'}}>Don't have an account ?
                    <Text style={{fontWeight: 'bold'}} onPress={() => navigation.navigate('Register')}> Sign Up now</Text></Text>
                  </View>
                </View>
              </View>
            </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
  }
  
const styles = StyleSheet.create({
    background: {
      height: '100%',
      width: '100%',
    },
    container: {
      flex: 1,
      fontFamily: 'Montserrat',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    homeSection: {
      width: '100%',
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    logoSection: {
      alignItems: 'center',
      marginBottom: 50
    },
    title: {
      marginTop: 25,
      fontSize: 32,
      color: 'white',
      textAlign: 'center'
    },
    input: {
      display: 'flex',
      flexDirection: 'row',
      borderWidth: 2,
      borderColor: 'white',
      marginTop: 25,
      width: 275,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 25
    },
    txtInput: {
      color: 'white',
      width: 200,
      fontSize: 18,
      paddingHorizontal: 15,
    },
    buttonSection: {
      backgroundColor: 'white',
      marginVertical: 50,
      borderRadius: 25,
    },
  });
