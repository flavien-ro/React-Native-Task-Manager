import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons'; 
import { useIsFocused } from "@react-navigation/native";
import moment from 'moment'

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

export default function TaskManager({ route, navigation }) {
    const { token, username, userId } = route.params;
    const [tasks, setTasks] = useState(null);
    const [del, setDel] = useState(false);
    const [mod, setMod] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        setDel(false);
        setMod(false);
        var config = {
          method: 'get',
          url: 'https://react-native-task-manager.herokuapp.com/api/task/get-tasks/' + JSON.parse(userId),
          headers: { 
            'auth-token': JSON.parse(token),
            'Content-Type': 'application/json'
          },
        };
        
        axios(config)
        .then(function (response) {
          setTasks(response.data);
        })
        .catch(function (error) {
          alert(error);
        });
    }, [isFocused, route, navigation, del, mod]);
  
    const deletePost = (id) => {
        setDel(false);
        var config = {
          method: 'delete',
          url: config.API_URL + 'api/task/' + id,
          headers: { 
            'auth-token': JSON.parse(token), 
            'Content-Type': 'application/json'
          },
        };
        axios(config)
        .then(function (response) {
          alert(JSON.stringify(response.data.message));
        })
        .catch(function (error) {
          console.log(error);
        });
        setDel(true);
    };

    const modifyPost = (id, name, description, begin, end) => {
        navigation.navigate('ModifyTask', {
          token: token,
          userId: userId,
          taskID: id,
          title: name,
          description: description,
          begin: begin,
          end: end
        });
        setMod(true);
    }

      return (
        <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.background}>
        <SafeAreaView style={styles.scrollView}>
        <ScrollView style={{flexGrow: 1}}>
        <KeyboardAvoidingView style={styles.background}
          enabled
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}>
          <View style={styles.background}>
            <TouchableOpacity style={{left: '30%', marginTop: 40, display: 'flex', flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              alert('Successfully logged out ' + username);
              navigation.navigate('Home')}
              }>
              <Text style={{marginRight: 10, color: 'white', fontSize: 18, fontWeight: 'bold'}}>Logout</Text>
              <AntDesign name="logout" size={24} color="white"/>

            </TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={{textAlign: 'center', fontSize: 30, color: 'white'}}>Welcome to your task manager app {JSON.parse(username)}</Text>
                </View>
                <View style={styles.cardContainer}>
                  <TouchableOpacity activeOpacity={0.4} style={{borderWidth: 2, borderColor: '#ffff', borderRadius: 10, marginBottom: 10, padding: 10}}
                  onPress={() => navigation.navigate('CreateTask', {
                      token: token,
                      userId: userId
                    })}>
                    <Text style={{textAlign: 'center', color: 'white'}}>Create a new task</Text>
                  </TouchableOpacity>
                    {tasks && tasks.map((t, index) => {
                        return (
                            <View style={styles.card} key={index}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{flex: 1, maxWidth: ScreenWidth - 125, fontSize: 20, fontWeight: '500', textAlign: 'center', marginTop: 20, width: '100%'}}>{t.name}</Text>
                                <Text numberOfLines={3} ellipsizeMode='tail' style={{flex: 1, fontSize: 14, textAlign: 'left', width: '85%', fontWeight: '400', marginTop: 25, marginBottom: 5}}>Description: {t.description}</Text>
                                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: ScreenWidth}}>
                                    <Text style={{fontSize: 12, fontWeight: '500', textAlign: 'center', marginTop: 20, width: '100%'}}>Start : {moment(t.begin).format("DD/MM/YYYY")}</Text>
                                    <Text style={{fontSize: 12, fontWeight: '500', textAlign: 'center', marginTop: 20, width: '100%'}}>End : {moment(t.end).format("DD/MM/YYYY")}</Text>
                                </View>
                                <View style={styles.managerButtons}>
                                  <TouchableOpacity activeOpacity={.7} style={styles.modifyBtn} onPress={() => modifyPost(t._id, t.name, t.description, t.begin, t.end)}>
                                    <AntDesign style={{marginRight: 10}} name="edit" size={24} color="white" />
                                    <Text style={styles.text}>Modify</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity activeOpacity={.7} style={styles.delButton} onPress={() => deletePost(t._id)}>
                                    <AntDesign style={{marginRight: 10}} name="delete" size={24} color="white" />
                                    <Text style={styles.text}>Delete</Text>
                                  </TouchableOpacity>
                              </View>
                            </View>
                          )
                      })
                      }
                </View>
            </View>
          </View>
          </KeyboardAvoidingView>
          </ScrollView>
          </SafeAreaView>
          </LinearGradient>

      );
    }

const styles = StyleSheet.create({
      background: {
        minHeight: ScreenHeight,
        width: '100%',
        marginBottom: 50
      },
      scrollView: {
        flex: 1,
      },
      container: {
        flex: 1,
        fontFamily: 'Montserrat',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      },
      title: {
        top: '2%',
        margin: 'auto',
        width: '80%',
        padding: 10,
      },
      cardContainer: {
        position: 'relative',
        top: '5%',
        width: '90%',
      },
      card: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        marginTop: 15,
        marginBottom: 30
      },
      managerButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      modifyBtn: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#33cc33',
        borderRadius: 5,
        padding: 20,
        margin: 20,
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
      delButton: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#cc0000',
        borderRadius: 5,
        padding: 20,
        margin: 20,
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
});
    