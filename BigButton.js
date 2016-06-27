import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export class BigButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pressing: false
		}
		this._onPressIn = this._onPressIn.bind(this);
		this._onPressOut = this._onPressOut.bind(this);
		this._onLongPress = this._onLongPress.bind(this);
	}

	_onPressIn(){
		this.setState({pressing:true});
	}

	_onPressOut(){
		this.setState({pressing:false, longpress:false});
	}
	_onLongPress(){
		this.setState({longpress: true})
	}
	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight
					onPress={this._onPressIn}
					onPressOut={this._onPressOut}
					onLongPress={this._onLongPress}
					style={styles.touchable}>
					<View style={styles.button}>
						<Text style={styles.welcome}>
							{this.state.pressing ? 'EEK!' : 'PUSH ME'}
							{this.state.longpress ? ' EEEEEK!' : ''}
						</Text>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: '#FFFFFF'
	},
	touchable: {
		borderRadius: 100
	},
	button: {
		backgroundColor: '#FF0000',
		borderRadius: 100,
		height: 200,
		width: 200,
		justifyContent: 'center'
	}
})