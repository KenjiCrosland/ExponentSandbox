import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

export class CompletionButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			completed: this.props.completed
		}
	}

	render(){
		return(<View style={[styles.base, this.state.completed && styles.completed]} />);
	}
}

var styles = StyleSheet.create({
	base: {
		backgroundColor: '#CCCCCC',
		borderRadius: 100,
		height: 40,
		width: 40,
		margin: 3,
		justifyContent: 'center'
	},
	completed: {
		backgroundColor: '#33CC33'
	}
})

// var CompletionButton = React.createClass({
//   getInitialState: function () {
//     return {
//         completed: this.props.completed || false
//      };
//   },
// 	render: function() {
// 		var completionChange = this.props.onHabitCompletion;
// 		var habitId = this.props.habit._id;
// 		var toggleCheck = this.toggleCheck;
// 		return (
// 			<li>
// 			<label>
// 			<input type="checkbox" 
// 				checked={this.state.checked}
// 				onChange={function(e){
// 					toggleCheck(e);
// 					completionChange(habitId, e.target.checked);
// 				}}
// 				/>
// 			</label>
// 			</li>
// 		)
// 	},
// 	toggleCheck: function(e){
// 		this.setState({checked: e.target.checked});
// 	}
// });