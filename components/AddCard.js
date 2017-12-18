import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { lightgray, white } from '../utils/colors';
import { connect } from 'react-redux';
import SubmitButton from './SubmitButton';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { addDeck } from '../actions';
import { createDeck, saveDecks, addCardToDeck, createNewCard } from '../utils/helpers';

class AddCard extends Component {
    static navigationOptions = () => {
        return {
            title: 'Add Card'
        };
    };

    state = {
        question: '',
        answer: ''
    };

    clearState = () => this.setState(() => ({ question: '', answer: '' }));

    validateFields = () => {
        return typeof this.state.question === 'string' &&
            this.state.question.length > 0 && 
            typeof this.state.answer === 'string' &&
            this.state.answer.length > 0
    }

    createNewCardHandler = () => {
        const card = createNewCard(this.state.question, this.state.answer);
        const { deck } = this.props;
        const updatedDeck = addCardToDeck(card, deck);        

        //update redux
        this.props.dispatch(addDeck(updatedDeck));

        this.clearState();
        
        //update 'DB'
        saveDecks();        

        this.successAlert();        
    };

    successAlert = () => {
        Alert.alert(
            'New Card Added',
            'Your new card was added successfully!',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          );
    };

    displayAlert = () => {
        Alert.alert(
            'Missing information',
            'Neither your card question nor answer can be empty. Please fill both fields before submitting.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          );
    };

    submit = () => {
        this.validateFields() ? this.createNewCardHandler() : this.displayAlert();
    };    

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.textInputBox}
                        value={this.state.question}
                        onChangeText={(question) => this.setState({question})}
                        placeholder='Question'
                        placeholderTextColor={lightgray} 
                    />
                    <TextInput
                        style={styles.textInputBox}
                        value={this.state.answer}
                        onChangeText={(answer) => this.setState({answer})}
                        placeholder='Answer'                    
                        placeholderTextColor={lightgray} 
                    />
                    <SubmitButton onPress={this.submit}/>
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
        padding: 5,
        marginBottom: 45
    }
});

function mapStateToProps (decks, { navigation }) {
    const { deckId } = navigation.state.params;

    return {
        deckId,
        deck: Object.keys(decks)
            .map(deck => decks[deck])
            .find(d => d.title === deckId)
    };
};

export default connect(mapStateToProps)(AddCard);