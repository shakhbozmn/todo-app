import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import CheckBox from 'react-native-check-box';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
import CustomButton from '../../components/buttons';

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

    const toggleTaskInText = (taskId) => {
        toggleTask(taskId);
    };

    const renderTaskItem = ({ item }) => {
        const swipeoutBtns = [
            {
                text: 'Remove',
                backgroundColor: '#d30000',
                onPress: () => removeTask(item.id),
            },
        ];

        return (
            <Swipeout style={{
                backgroundColor: '#fff',
                marginBottom: 10,
                justifyContent: 'center',
            }}
                scroll={false}
                right={swipeoutBtns}
                autoClose={true}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CheckBox
                            style={{ paddingRight: 10 }}
                            checkBoxColor="#007AFF"
                            isChecked={item.completed}
                            onClick={() => toggleTask(item.id)}
                        />
                        <TouchableOpacity onPress={() => toggleTaskInText(item.id)}>
                            <Text>{item.text}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Swipeout>
        );
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 8,
                    borderRadius: 10,
                }}
                placeholder="Enter task"
                value={task}
                onChangeText={(text) => setTask(text)}
            />
            <CustomButton
                style={styles.addbtn}
                title="Add Task"
                onPress={addTask}
            />
            <View style={{ flex: 1, marginTop: 20, }}>
                <FlatList
                    scrollEnabled={false}
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderTaskItem}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    addbtn: {
        backgroundColor: '#3498db',
    },
});

export default HomeScreen;
