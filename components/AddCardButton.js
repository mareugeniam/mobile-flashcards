import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { black, white } from '../utils/colors';

export default function AddCardButton ({ onPress, text, style={}}) {
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
        backgroundColor: white,
        borderColor: black,
        borderWidth: 1,
        padding: 25,
        borderRadius: 7,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
    },
    androidSubmitBtn: {
        backgroundColor: white,
        borderColor: black,
        borderWidth: 1,
        padding: 30,
        paddingLeft: 65,
        paddingRight: 65,
        borderRadius: 4,
        height: 45,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: black,
        fontSize: 20,
        textAlign: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});