import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useFonts, Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/dev';
import CustomButton from "../../components/buttons";
import CheckBox from 'react-native-check-box'

const HomeScreen = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (task.trim() !== '') {
            setTasks([...tasks, { id: tasks.length + 1, text: task }]);
            setTask('');
        }
    };

    const removeTask = (taskId) => {
        setTasks(tasks.filter((item) => item.id !== taskId));
    };

    const toggleTask = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };


    let [fontsLoaded, fontError] = useFonts({
        Montserrat_700Bold, Montserrat_400Regular,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 10 }}
                placeholder="Enter task"
                value={task}
                onChangeText={(text) => setTask(text)}
            />
            <CustomButton style={styles.addbtn} title="Add Task" onPress={addTask} />
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CheckBox
                                style={{ paddingRight: 10 }}
                                checkBoxColor="#007AFF"
                                isChecked={item.completed}
                                onClick={() => toggleTask(item.id)}
                            />
                            <Text>{item.text}</Text>
                        </View>
                        <CustomButton style={styles.deletebtn} title="Remove" onPress={() => removeTask(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    addbtn: {
        backgroundColor: '#3498db',
    },
    deletebtn: {
        backgroundColor: '#d30000',
    },

});

export default HomeScreen;
