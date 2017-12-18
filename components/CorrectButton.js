import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { green, white } from '../utils/colors';

export default function CorrectButton ({ onPress, text, style={}}) {
    return (
        <View style={[styles.center, style]}>
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
        backgroundColor: green,
        padding: 25,
        borderRadius: 7,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
    },
    androidSubmitBtn: {
        backgroundColor: green,
        padding: 10,
        paddingLeft: 87,
        paddingRight: 87,
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