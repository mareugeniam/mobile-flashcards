import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { gray, white } from '../utils/colors';
import AddCardButton from './AddCardButton';
import QuizButton from './QuizButton';

class Deck extends Component {    
    static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params;

        return {
            title: deckId
        };
    };

    addCard = () => this.props.navigation.navigate(
        'AddCard',
        { deckId: this.props.deckId }
    );

    startQuiz = () => this.props.navigation.navigate(
        'Quiz',
        { deck: this.props.deck }
    );

    render() {
        const { deckId, deck } = this.props;
        
        return (
            <View style={styles.container}>
                <View style={styles.deckInfoBox}>
                    <Text style={styles.deckTitle}>{deckId}</Text>
                    <Text style={styles.deckSubtitle}>{deck.questions.length} card{deck.questions.length !== 1 && "s"}</Text>
                </View>
                <View style={styles.buttonsBox}>
                    <AddCardButton onPress={this.addCard} text="Add Card" style={{marginBottom: 10}}/>
                    <QuizButton onPress={this.startQuiz} text="Start Quiz" />
                </View>
            </View>
        );
    }    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: white
    },
    deckTitle: {
        fontSize: 45
    },
    deckSubtitle: {
        color: gray,
        fontSize: 25
    },
    deckInfoBox: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20      
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

export default connect(mapStateToProps)(Deck);