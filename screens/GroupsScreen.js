import React from "react";
import {Image, Text, TouchableOpacity, View, ListView} from "react-native";
import firebase from 'react-native-firebase';
import styles from '../components/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const trophyImage = require('../assets/images/world-cup.png');

export default class GroupsScreen extends React.Component {

    state = {groups: null};

    componentDidMount() {
        this.fetchData();
    }

    buildGroups(data) {
        console.log("buildGroups");
        if (data !== null) {
            // console.log(data);
            // let groups = [];
            // Object.keys(data).map(function (key, index) {
            //     groups.push({key: index, name: key, image: trophyImage});
            // });

            this.setState({groups: ds.cloneWithRows(data)});
        }
    }

    fetchData() {
        console.log("fetchData");
        let that = this;
        let user = firebase.auth().currentUser;
        let db = firebase.database().ref("users/" + user.uid + "/memberOf");
        db.once('value', function (snapshot) {
            that.buildGroups(snapshot.val());
        })
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.leftHeaderContainer}>
                        <Text style={styles.logoText}>Golaso</Text>
                    </View>
                    <View style={styles.rightHeaderContainer}>
                        <MaterialIcon name="search" color='#fff' size={23} style={{padding:5}} />
                        <MaterialIcon name="person" color='#fff' size={23} style={{padding:5}}
                                      onPress={() => this.props.navigation.navigate("Profile")}/>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.linksRow}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => {
                            this.props.navigation.navigate("NewGroup")
                        }}>
                            <Text style={styles.linkText}>New Group</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} onPress={() => {
                            this.props.navigation.navigate("NewGroup");
                        }}>
                            <Text style={styles.linkText}>Join Group</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.groups &&
                        <View style={{ marginTop: 5 }}>
                            <ListView
                                initialListSize={5}
                                enableEmptySections={true}
                                dataSource={this.state.groups}
                                renderRow={(group) => {return this.renderGroupRow(group)}}/>
                        </View>
                    }
                    </View>
            </View>
        )
    }

    renderGroupRow(group) {
        return (
            <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate("Game")}>
                <View style={styles.listItemContainer}>
                    <View style={styles.iconContainer}>
                        <Image source={trophyImage} style={styles.initStyle} resizeMode='contain'/>
                    </View>
                    <View style={styles.contactDetailsContainer}>
                        <View style={styles.contactDetailsContainerWrap}>
                            <View style={styles.contactNameContainer}>
                                <Text style={{fontWeight: '600'}}>{group}</Text>
                                <View style={styles.dateContainer}>
                                    <Text style={{fontWeight: '400', color: '#666', fontSize: 12}}>Leader is Dor with 40 pts</Text>
                                </View>
                            </View>
                            <View style={styles.callIconContainer}>
                                <Icon name="chevron-right" color='#000' size={23} style={{padding: 5}}/>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )

    }
}

