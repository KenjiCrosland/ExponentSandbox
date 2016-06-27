import React, { Component } from 'react';
import {
	StyleSheet,
	PanResponder,
	View,
	Text
} from 'react-native';

var CIRCLE_SIZE = 40;
var CIRCLE_COLOR = 'blue';
var CIRCLE_HIGHLIGHT_COLOR = 'green';

class BaseComponent extends Component {
 _bind(...methods) {
  methods.forEach( (method) => this[method] = this[method].bind(this) );
 }
}

export class PanResponderExample extends BaseComponent {
	constructor(props) {
		super(props);
		this._bind(
			'_highlight', 
			'_unHighlight', 
			'_updatePosition', 
			'_handleStartShouldSetPanResponder',
			'_handleMoveShouldSetPanResponder',
			'_handlePanResponderGrant',
			'_handlePanResponderMove',
			'_handlePanResponderEnd' );
		this.state = {
			numberActiveTouches: 0,
			moveX: 0,
			moveY: 0,
			x0: 0,
			y0: 0,
			dx: 0,
			dy: 0,
			vx: 0,
			vy: 0,
		}

		_panResponder = {};
		_previousLeft = 0;
		_previousTop = 0;
		_circleStyles = {};
		circle = null;

		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
			onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
			onPanResponderGrant: this._handlePanResponderGrant,
			onPanResponderMove: this._handlePanResponderMove,
			onPanResponderRelease: this._handlePanResponderEnd,
			onPanResponderTerminate: this._handlePanResponderEnd,
		});

		this._previousLeft = 20;
		this._previousTop = 84;
		this._circleStyles = {
				left: this._previousLeft,
				top: this._previousTop,
			}
	}

	componentDidMount(){
		this._updatePosition();
	}
	_highlight(){
		this.circle && this.circle.setNativeProps({
			style:{backgroundColor: CIRCLE_HIGHLIGHT_COLOR}
		});
	}

	_unHighlight(){
		this.circle && this.circle.setNativeProps({
			style:{backgroundColor: CIRCLE_COLOR}
		})
	}

	_updatePosition(){
		this.circle && this.circle.setNativeProps({
			style: this._circleStyles
		})
	}

	_handleStartShouldSetPanResponder(e: Object, gestureState: Object) {
		return true;
	}

	_handleMoveShouldSetPanResponder(e: Object, gestureState: Object) {
		return true
	}
	_handlePanResponderGrant(e: Object, gestureState: Object) {
		this._highlight();
	}
	_handlePanResponderMove(e: Object, gestureState: Object) {
		this.setState({
			stateID: gestureState.stateID,
			moveX: gestureState.moveX,
			moveY: gestureState.moveY,
			x0: gestureState.x0,
			y0: gestureState.y0,
			dx: gestureState.dx,
			dy: gestureState.dy,
			vx: gestureState.vx,
			vy: gestureState.vy,
			numberActiveTouches: gestureState.numberActiveTouches
		});

		// Calculate current position using deltas
		this._circleStyles.left = this._previousLeft + gestureState.dx;
		this._circleStyles.top = this._previousTop + gestureState.dy;
		this._updatePosition();
	}
	_handlePanResponderEnd(e: Object, gestureState: Object){
		this.setState({numberActiveTouches: gestureState.numberActiveTouches})
		this._unHighlight();
		this._previousLeft += gestureState.dx;
		this._previousTop += gestureState.dy;
	}
	render() {
		return (
			<View style={styles.container}>
			<View
			ref={(circle) => {
				this.circle = circle;
			}}
			style={styles.circle}
			{...this._panResponder.panHandlers}/>
			<Text>
				{this.state.numberActiveTouches} touches,
				dx: {this.state.dx},
				dy: {this.state.dy},
				vx: {this.state.vx},
				vy: {this.state.vy}
			</Text>

				
			</View>
		)
	}
}

const styles = StyleSheet.create({
	circle: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE /2,
		backgroundColor: CIRCLE_COLOR,
		position: 'absolute',
		left: 0,
		top: 0,
	},
	container: {
		flex: 1,
		paddingTop: 64,
	}
})
