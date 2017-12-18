import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { black, white } from '../utils/colors';

export default function SubmitButton ({ onPress }) {
    return (
        <View style={styles.center}>
            <TouchableOpacity
                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                onPress={onPress}>
                <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
} 

const styles = StyleSheet.create({    
    iosSubmitBtn: {
        backgroundColor: black,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    androidSubmitBtn: {
        backgroundColor: black,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 4,
        height: 45,
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