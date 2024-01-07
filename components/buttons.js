import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useFonts, Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/dev';

const CustomButton = ({ onPress, title, style }) => {
    let [fontsLoaded, fontError] = useFonts({
        Montserrat_700Bold, Montserrat_400Regular,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Montserrat_400Regular",
    },
});

export default CustomButton;
