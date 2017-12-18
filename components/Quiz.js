import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { white, green, red, gray, black } from '../utils/colors';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import CorrectButton from './CorrectButton';
import IncorrectButton from './IncorrectButton';
import { Ionicons } from '@expo/vector-icons';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications';
import RestartQuizButton from './RestartQuizButton';
import BackToDeckButton from './BackToDeckButton';

class Quiz extends Component {
    static navigationOptions = () => {
        return {
            title: 'Quiz'
        };
    };

    state = {
        cardFlip: false,
        cardSide: 'Answer',
        cardKey: 0,
        correctAnswers: 0,
        showScore: false
    };

    correctAnswerHandler = () => {
        this.setState((state) => ({
            correctAnswers: state.correctAnswers + 1
        }));
        this.quizHandler();       
    };

    incorrectAnswerHandler = () => {
        this.quizHandler();
    };

    quizHandler = () => {
        const { cardKey } = this.state;
        const numberOfCards = this.props.deck.questions.length;

        cardKey === numberOfCards-1 ? this.scoreHandler() : this.nextQuestion();
    };

    nextQuestion = () => {
        this.setState((state) => ({
            cardKey: state.cardKey + 1,
            cardSide: 'Answer',
            cardFlip: false
        }));
    };    

    scoreHandler = () => {
        this.setState({ showScore: true });

        //Reset local notification
        clearLocalNotification()
        .then(setLocalNotification());
    };

    flipCard = () => {
        let nextCardSide = this.state.cardFlip ? 'Answer' : 'Question';
        this.setState((state) => ({
            cardFlip: !state.cardFlip,
            cardSide: nextCardSide
        }));
    };

    restartQuiz = () => this.props.navigation.navigate(
        'Quiz',
        { deck: this.props.deck }
    );

    backToDeck = () => this.props.navigation.navigate(
        'Deck',
        { deckId: this.props.deck.title }
    );

    render() {
        const { deck } = this.props;
        const { cardKey, showScore, correctAnswers } = this.state;
        let card = deck.questions[cardKey];
        const total = deck.questions.length;
        const incorrectAnswers = total-correctAnswers;
        const score = (100*correctAnswers)/total;

        if (card === undefined) {
            return (
                <View style={styles.infoBox}>
                    <Ionicons name={Platform.OS === 'ios' ? 'ios-sad-outline' : 'md-sad'} size={50} color={gray}/>
                    <Text style={styles.infoText}>
                        There are no cards in this deck yet. To start a quiz you need to have cards on your deck.
                    </Text>
                </View>
            );
        }

        if (showScore) {
            return (
                <View style={styles.container}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>You scored:</Text>
                        <Text style={styles.score}>{score} %</Text>
                        <Text style={styles.incorrectAnswersText}>
                            {incorrectAnswers} question{incorrectAnswers !== 1 && "s"} answered incorrectly
                        </Text>
                    </View>
                    <View style={styles.buttonsBox}>
                        <RestartQuizButton onPress={this.restartQuiz} text="Restart Quiz" style={{marginBottom: 10}}/>
                        <BackToDeckButton onPress={this.backToDeck} text="Back to Deck" />
                    </View>                     
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <Text style={styles.pagerText}>{cardKey+1} / {deck.questions.length}</Text>
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.textDisplay}>
                        {this.state.cardFlip ? card.answer : card.question}
                    </Text>
                    <TextButton onPress={this.flipCard} text={this.state.cardSide}/>                                      
                </View>
                <View style={styles.buttonsBox}>
                    <CorrectButton text="Correct" style={{marginBottom: 10}} onPress={this.correctAnswerHandler}/>
                    <IncorrectButton text="Incorrect" onPress={this.incorrectAnswerHandler}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    pagerText: {
        fontSize: 20,
        margin: 10
    },
    textDisplay: {
        fontSize: 45,
        textAlign: 'center'
    },
    buttonsBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'    
    },
    infoText: {
        color: gray,
        fontSize: 18,
        textAlign: 'center'
    },
    infoBox: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    incorrectAnswersText: {
        color: red,
        fontSize: 18,
        textAlign: 'center'
    },
    score: {
        color: black,
        fontSize: 60,
        fontWeight: 'bold',
        margin: 5
    }
});

function mapStateToProps (state, { navigation }) {
    const { deck } = navigation.state.params;

    return {
        deck
    };
};

export default connect(mapStateToProps)(Quiz);