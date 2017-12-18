import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { red } from '../utils/colors';

export default function TextButton ({ text, onPress, style = {}}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.textBtn, style]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    textBtn: {
        textAlign: 'center',
        color: red,
        fontSize: 20      
    },
});