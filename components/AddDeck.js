import React, { Component } from 'react';
import { View, Text, TextInput , Alert,
    StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { white, lightgray } from '../utils/colors';
import { connect } from 'react-redux';
import SubmitButton from './SubmitButton';
import { saveDecks, createDeck } from '../utils/helpers';
import { addDeck } from '../actions/index';

class AddDeck extends Component {
    state = {
        title: ''
    }

    goToDeckDetail = (deckId) => this.props.navigation.navigate(
        'Deck',
        { deckId: deckId }
    );

    validateField = () => {
        return typeof this.state.title === 'string' &&
            this.state.title.length > 0
    }

    clearState = () => this.setState(() => ({ title: '' }));

    createDeckHandler = (title) => {
        const deck = createDeck(title);
        
        //update redux
        this.props.dispatch(addDeck(deck));
        
        this.clearState();
        
        //update 'DB'
        saveDecks();
        
        //go to decks view
        this.goToDeckDetail(deck.title);
    };

    displayAlert = () => {
        Alert.alert(
            'Missing information',
            'Your deck title can´t be empty, please enter a title before submitting.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          );
    };

    submit = () => {
        const { title } = this.state;        
        this.validateField() ? this.createDeckHandler(title) : this.displayAlert();
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.textDisplay}>What is the title of your new deck?</Text>
                    <TextInput
                        style={styles.textInputBox}
                        value={this.state.title}
                        onChangeText={(title) => this.setState({title})}
                        placeholder='Deck Title'                    
                        placeholderTextColor={lightgray} 
                    />                    
                    <SubmitButton onPress={this.submit} />
                    <KeyboardSpacer />           
                </View>               
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: white
    },
    textInputBox: {
        alignSelf: 'stretch',
        borderWidth: 1.5,
        borderRadius: 4,
        height: 45,
        marginTop: 40,
        marginBottom: 40,
        padding: 5
    },
    textDisplay: {
        fontSize: 45,
        textAlign: 'center',
        marginTop: 30
    }
});

export default connect()(AddDeck);