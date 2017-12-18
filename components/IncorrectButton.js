import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { red, white } from '../utils/colors';

export default function IncorrectButton ({ onPress, text }) {
    return (
        <View style={styles.center}>
            <TouchableOpacity
                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                onPress={onPress}>
                <Text style={styles.submitBtnText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
} 

const styles = StyleSheet.create({
    iosSubmitBtn: {
        backgroundColor: red,
        padding: 25,
        borderRadius: 7,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
    },
    androidSubmitBtn: {
        backgroundColor: red,
        padding: 10,
        paddingLeft: 80,
        paddingRight: 80,
        borderRadius: 4,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 20,
        textAlign: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});