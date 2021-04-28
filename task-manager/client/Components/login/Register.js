import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

export default function Register({navigation}) {
    return (
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
                        // value={this.state.username}
                        // onChangeText={(username) => this.setState({ username })}
                        placeholder={'Username'}
                        placeholderTextColor="white"
                        style={styles.txtInput}
                      />
                    </View>
                    <View style={styles.input}>
                      <Entypo name="email" size={24} color="white" />
                      <TextInput
                        // value={this.state.username}
                        // onChangeText={(username) => this.setState({ username })}
                        placeholder={'example@mail.com'}
                        placeholderTextColor="white"
                        style={styles.txtInput}
                      />
                    </View>
                    <View style={styles.input}>
                      <Entypo name="lock" size={24} color="white" />
                      <TextInput
                        // value={this.state.username}
                        // onChangeText={(username) => this.setState({ username })}
                        placeholder={'Password'}
                        placeholderTextColor="white"
                        style={styles.txtInput}
                      />
                    </View>
                  </View>
                  <View style={styles.buttonSection}>
                    <Button
                      title={'Register'}
                      color="#003399"
                      // onPress={this.onLogin.bind(this)}
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
      fontSize: 18,
      paddingHorizontal: 15,
    },
    buttonSection: {
      backgroundColor: 'white',
      marginVertical: 50,
      borderRadius: 25,
    },
  });
  