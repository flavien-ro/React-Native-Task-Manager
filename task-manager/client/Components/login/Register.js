import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default function Register({navigation}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Posting request to see if can login
    const postData = () => {
        var data = JSON.stringify({"name": name, "email": email, "password": password});

        var config = {
          method: 'post',
          url: 'https://react-native-task-manager.herokuapp.com/api/auth/register',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        axios(config)
        .then(function (response) {
          const message = (JSON.stringify(response.data));
          if (response.data.res) {
            navigation.navigate('Home');
            alert('User successfully created');
          } else {
            alert(message);
          }
        })
        .catch(function (error) {
          alert('Email already exists'); 
        });
    }


    return (
      <KeyboardAvoidingView style={styles.background}
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}>
        <View style={styles.background}>
          <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.background}>
          <View style={styles.container}>
            <View style={styles.homeSection}>
              <View style={styles.logoSection}>
                <Entypo name="tools" size={80} color="white"/>
                <Text h1 style={styles.title}>Create account</Text>
              </View>
              <View>
                  <View>
                    <View style={styles.input}>
                      <AntDesign name="user" size={24} color="white" />
                      <TextInput
                        name="name"
                        value={name}
                        onChangeText={(UserName) => setName(UserName)}
                        placeholder={'Your name'}
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        style={styles.txtInput}
                      />
                    </View>
                    <View style={styles.input}>
                      <Entypo name="email" size={24} color="white" />
                      <TextInput
                        name="email"
                        value={email}
                        onChangeText={(mail) => setEmail(mail)}
                        autoCapitalize='none'
                        placeholder={'example@mail.com'}
                        placeholderTextColor="rgba(255,255,255,0.3)"
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
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        style={styles.txtInput}
                      />
                    </View>
                  </View>
                  <View style={styles.buttonSection}>
                    <Button
                      title={'Register'}
                      color="#003399"
                      onPress={postData}
                    />
                  </View>
                </View>
                <Text style={{color: 'white', textAlign: 'center'}} onPress={() => navigation.navigate('Home')}>
                    Already have acount ? <Text style={{fontWeight: 'bold'}}> Click here to login</Text>
                </Text>
              </View>
            </View>
            </LinearGradient>
        </View>
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
  