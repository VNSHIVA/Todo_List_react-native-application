import React,{useState} from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard } from 'react-native';
import Task from './comps/tass';

export default function App() {

  const [task, setTask]= useState();
  const [taskItems, setTaskItems] = useState([]);

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  }
  
  const handleAddTask = () => {
    // console.log(task);
    Keyboard.dismiss();
    setTaskItems([...taskItems,task])
    setTask(null);
  }

  return (
    <View style={styles.container}>
          {/* Tasks */}
        <View style={styles.tasksWrapper}>
         <Text style={styles.sectionTitle}>Today's Tasks</Text>

          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {
              taskItems.map((item, index) => {
                return ( 
                  index < 5 ?  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity> 
                : 
                 alert(
                   "You've reached the max limit of Tasks! "
                 )
                 
                )
              }) 
            }
          </View>

          {/* Write a task */}
          <KeyboardAvoidingView 
            behavior={Platform.OS === "android" ? "padding" : "height"}
            style={styles.writeTaskWrapper}
          >
            <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
              <TouchableOpacity onPress={() => handleAddTask()}>
                <View style={styles.addWrapper}>
                  <Text style={styles.addText}>+</Text>
                </View>
              </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper:{
      paddingTop: 80,
      paddingHorizontal: 20,
  },
  sectionTitle: {
     fontSize: 24,
     fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position:'fixed',
    // bottom: -500,
    width: '100%',
    height: "100%",
    flexDirection: 'row',
    justifyContent: 'space-around',
    // margin: 18,
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth:1,
    width:250,
  },
  addWrapper: {
    width:60,
    height:60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    alignItems:'center'
  },
  addText: {},
});
