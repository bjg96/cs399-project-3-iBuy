/**
 * Created by Brandon Garling on 10/30/2016.
 */
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, Header, Icon, Title } from 'native-base';

export default class AboutScene extends Component {
    constructor(props) {
        super(props);
    }
    onGoBack() {
        this.props.navigator.pop();
    }
    render() {
        return (
            <Container>
                <Header>
                    <Button transparent onPressOut={this.onGoBack.bind(this)}>
                        <Icon name='md-arrow-back' />
                    </Button>

                    <Title>About</Title>
                </Header>

                <View style={styles.mainView}>
                    <Text>
                        GroupBuy lets you manage your grocery list between groups of people easily and efficiently!
                    </Text>
                    <Text>
                        Created by: Harrison Lambeth and Brandon Garling
                    </Text>
                </View>
            </Container>
        )
    }
}

// Set up proptypes
AboutScene.propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20
    }
});
