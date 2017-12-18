import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { gray, lightgray, white } from '../utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getDecks } from '../utils/helpers';
import { AppLoading } from 'expo';

class Decks extends Component {
    state = {
        ready: false
    };

    componentDidMount() {
        this.props.dispatch(getDecks())
        .then(() => this.setState({ ready: true }));
    };
    
    renderItem = ({ item }) => {
        const { title } = item;
        return (
            <TouchableOpacity  key={title} onPress={() => this.props.navigation.navigate(
                'Deck',
                { 
                    deckId: title
                }
            )}>
                <View style={styles.container}>
                    <Text style={styles.deckTitle}>{title}</Text>
                    <Text style={styles.deckSubtitle}>{item.questions.length} card{item.questions.length !== 1 && "s"}</Text>
                </View>
            </TouchableOpacity>
            
        );
    };

    renderSeparator = () => {
        return <View style={styles.listSeparator}/>
    };

    render () {        
        const { decks } = this.props;
        const { ready } = this.state;

        if (ready === false) {
            return <AppLoading />
        }

        if (Object.keys(decks).length === 0) {
            return(
                <View style={styles.container}>
                    <MaterialCommunityIcons name='cards-variant' size={30} color={gray}/>
                    <Text style={styles.infoText}>The decks you create appear here.</Text>
                </View>
            ) 
        }

        return (
            <FlatList
                style={{backgroundColor: white}}
                data={decks}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.renderSeparator}
                keyExtractor={item => item.title}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 40
    },
    listSeparator: {
        height: 1,
        alignSelf: 'stretch',
        backgroundColor: lightgray
    },
    deckTitle: {
        fontSize: 30
    },
    deckSubtitle: {
        color: gray,
        fontSize: 18
    },
    infoText: {
        color: gray,
        fontSize: 18,
        textAlign: 'center'
    }
});

function mapStateToProps (decks) {
    return {
        decks: Object.keys(decks).map(deck => decks[deck])
    };
};

export default connect(mapStateToProps)(Decks);