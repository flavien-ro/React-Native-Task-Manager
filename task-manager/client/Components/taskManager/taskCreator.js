import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

let ScreenHeight = Dimensions.get("window").height + 100;


export default function CreateTask({ route, navigation }) {
    const [dateBegin, setDateBegin] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date(dateBegin.getTime() + 86400000))
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const { token, userId } = route.params;

    const createTask = () => {
      var dateToReplace = new Date(dateEnd);
        if (dateBegin > dateEnd) {
          dateToReplace = new Date(dateBegin.getTime() + 86400000);
        }
        const formatBegin = moment(dateBegin).format("YYYY-MM-DD")
        const formatEnd = moment(dateToReplace).format("YYYY-MM-DD")

      var data = JSON.stringify({"name": title,"description": description, "owner": JSON.parse(userId), "begin": formatBegin,
      "end": formatEnd});

      var config = {
        method: 'post',
        url: 'https://react-native-task-manager.herokuapp.com/api/task/add-tasks',
        headers: { 
          'auth-token': JSON.parse(token), 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        if (response.data.res) {
          alert(response.data.res);
          navigation.navigate('TaskManager')
        } else {
          alert(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    const changeStart = (event, selectedDate) => {
      const currentDate = selectedDate || dateBegin;
      if (Platform.OS !== 'ios') {
          setShow(!show);
      }
      setDateBegin(currentDate);
    };

    const changeEnd = (event, selectedDate) => {
      if (Platform.OS !== 'ios') {
        setShowEnd(!showEnd);
      }
      const currentDate = selectedDate || dateEnd;
      setDateEnd(currentDate);
    };

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
                <View style={styles.container}>
                    <TouchableOpacity style={styles.goBack} onPress={() => navigation.navigate('TaskManager')}>
                        <Ionicons style={{marginRight: 10}} name="return-down-back" size={24} color="white" />
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}> Return to task manager </Text>
                    </TouchableOpacity>
                    <Text style={{top: '6%', color: 'white', fontSize: 30}}>Create your task :</Text>
                    <View style={styles.taskCreator}>
                        <Text style={{textAlign: 'left', marginBottom: 20}}>Title :</Text>
                        <View style={styles.input}>
                            <TextInput
                                name="email"
                                value={title}
                                onChangeText={(title) => setTitle(title)}
                                placeholder={'Title of the task'}
                                autoCapitalize='none'
                                clearButtonMode='while-editing'
                                style={styles.txtInput}
                            />
                        </View>
                        <Text style={{textAlign: 'left', marginBottom: 20}}>Description :</Text>
                        <View style={styles.input}>
                            <TextInput
                                name="email"
                                value={description}
                                onChangeText={(description) => setDescription(description)}
                                placeholder={'description of the task'}
                                autoCapitalize='none'
                                clearButtonMode='while-editing'
                                multiline
                                style={styles.txtInput}
                            />
                        </View>
                        <Text style={{textAlign: 'left', marginBottom: 20}}>Start :</Text>
                        {Platform.OS !== 'ios' &&
                            <Button onPress={() => setShow(true)} title="Pick starting date" />
                        }
                        {Platform.OS === "ios" &&
                            <DateTimePicker 
                            value={dateBegin}
                            dateFormat="day month year"
                            mode='date'
                            display='default'
                            onChange={changeStart} />
                        }
                        {show && 
                          <DateTimePicker 
                            value={dateBegin}
                            dateFormat="day month year"
                            mode='date'
                            display='default'
                            onChange={changeStart} />
                        }
                        {Platform.OS !== 'ios' &&
                            <Text style={{marginTop: 20}}>The starting date is : {moment(dateBegin).format("DD/MM/YYYY")}</Text>
                        }
                        <Text style={{textAlign: 'left', marginBottom: 20, marginTop: 20}}>End :</Text>
                        {Platform.OS !== 'ios' &&
                            <Button onPress={() => setShowEnd(true)} title="Pick ending date" />
                        }
                        {Platform.OS === "ios" &&
                            <DateTimePicker 
                            minimumDate={new Date(dateBegin.getTime() + 86400000)}
                            value={dateEnd}
                            dateFormat="day month year"
                            mode='date'
                            display='default'
                            onChange={changeEnd} />
                        }
                        {Platform.OS !== 'ios' &&
                            <Text style={{marginTop: 20}}>The ending date is : {dateBegin > dateEnd ? moment(new Date(dateBegin.getTime() + 86400000)).format("DD/MM/YYYY") : moment(dateEnd).format("DD/MM/YYYY")}</Text>
                        }
                        {showEnd &&
                            <DateTimePicker 
                            minimumDate={new Date(dateBegin.getTime() + 86400000)}
                            value={dateEnd}
                            dateFormat="day month year"
                            mode='date'
                            display='default'
                            onChange={changeEnd} />
                        }
                        <View style={styles.buttonSection}>
                          <TouchableOpacity onPress={() => createTask()}>
                              <Text style={{color: 'white', textAlign: 'center', fontSize: 18, paddingBottom: 10, paddingTop: 10}} >Create Task</Text>
                          </TouchableOpacity>
                        </View>
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
        marginBottom: 100
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
      taskCreator: {
          top: '10%',
          width: '90%',
          padding: 20,
          minHeight: 50,
          backgroundColor: 'white',
      },
      txtInput: {
        borderWidth: 1,
        borderColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
      },
      buttonSection: {
        backgroundColor: '#3b5998',
        marginVertical: 50,
        borderRadius: 25,
      },
      goBack: {
        top: '2%',
        left: -60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25
      },
});
    