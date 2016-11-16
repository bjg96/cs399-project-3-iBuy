/**
 * Created by Brandon Garling on 10/30/2016.
 */
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, Header, Icon, Title, Content, H3, Input, InputGroup, List, ListItem} from 'native-base';
import { connect } from 'react-redux';
import Actions from '../Store/Actions';
import Picker from '../Components/Picker';
import Selectors from '../Store/Selectors';

const Item = Picker.Item;

const availableColors = {
    "Red" : "crimson",
    "Orange" : "darkorange",
    "Yellow" : "gold",
    "Green": "forestgreen",
    "Blue" : "royalblue",
    "Purple": "rebeccapurple",
    "Black": "black",
    "Gray": "slategray",
    "White": "white",
    "Brown": "saddlebrown",
    "Pink": "hotpink"
};

class GroupSettingsScene extends Component {
    constructor(props) {
        super(props);
    }
    onGoBack() {
        this.props.navigator.pop();
    }
    onInputChange(field, event) {
        let group = this.props.groups[this.props.route.groupId];
        group[field] = event.nativeEvent.text;
        this.props.dispatch(Actions.updateGroup(group));
    }
    onSelectionChange(field, newValue) {
        let group = this.props.groups[this.props.route.groupId];
        group[field] = newValue;
        this.props.dispatch(Actions.updateGroup(group));
    }
    render() {

        let group = this.props.groups[this.props.route.groupId];

        let userRows = [];
        for (let i = 0; i < group.UserIds.length; i++) {
            let user = this.props.users[group.UserIds[i]];
            userRows.push(
                <ListItem key={i}>
                    <View style={{flex: 1, flexDirection: 'row' }}>
                        <Text style={{flex: 1, textAlignVertical: 'center'}}>{user.FirstName} {user.LastName}</Text>
                        <Text style={{flex: 1, textAlignVertical: 'center'}}>{user.Email}</Text>
                        <Icon name="md-trash"/>
                    </View>
                </ListItem>
            );
        }

        let colorOptions = [];
        for (let id in availableColors) {
            colorOptions.push(
                <Item label={id} value={availableColors[id]} key={id} />
            );
        }

        return (
            <Container>
                <Header>
                    <Button transparent onPressOut={this.onGoBack.bind(this)}>
                        <Icon name='md-arrow-back' />
                    </Button>

                    <Title>Group Settings</Title>
                </Header>

                <Content style={styles.mainContent}>
                    <View>
                        <H3 style={styles.H3}>Settings</H3>
                        <List>
                            <ListItem>
                                <InputGroup>
                                    <Input inlineLabel label="NAME" value={group.Name} onChange={this.onInputChange.bind(this, 'Name')} />
                                </InputGroup>
                            </ListItem>
                            <ListItem>
                                <Picker label="COLOR" value={group.Color} onChange={this.onSelectionChange.bind(this, "Color")}>
                                    {colorOptions}
                                </Picker>
                            </ListItem>
                        </List>
                    </View>
                    <View>
                        <H3 style={styles.H3}>Users</H3>
                        {userRows.length == 0 ? <Text style={{marginLeft: 40, marginBottom: 20}}>No users exist in this group</Text> :
                            <List style={{padding: 10}}>
                                <ListItem>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Text style={{flex: 1, color: 'black'}}>Name</Text>
                                        <Text style={{flex: 1, color: 'black'}}>Email</Text>
                                    </View>
                                </ListItem>
                                {userRows}
                            </List>
                        }
                        <List>
                            <ListItem>
                                <InputGroup>
                                    <Input inlineLabel label="INVITE" placeholder="email@example.com" onChange={this.onInputChange.bind(this, 'Name')} />
                                </InputGroup>
                            </ListItem>
                            <ListItem>
                                <Button style={{flex: 0.3}} block>Invite</Button>
                            </ListItem>
                        </List>
                    </View>
                </Content>
            </Container>
        )
    }
}

// Set up proptypes
GroupSettingsScene.propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    memberships: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    mainContent: {
        // margin: 10
    },
    H3: {
        padding: 10,
        margin: 10
    },
    inlineInputView: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    }
});

const mapStateToProps = function (store) {
    return {
        groups: Selectors.getGroups(store),
        memberships: Selectors.getMemberships(store),
        users: Selectors.getUsers(store)
    };
};

export default connect(mapStateToProps)(GroupSettingsScene);