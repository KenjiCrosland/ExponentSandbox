import React, { Component } from 'react';
import {
	StyleSheet,
	ListView,
	View,
	Text
} from 'react-native';
import {HabitListItem} from './HabitListItem'

class BaseComponent extends Component {
 _bind(...methods) {
  methods.forEach( (method) => this[method] = this[method].bind(this) );
 }
}

export class HabitScreen extends BaseComponent {
	constructor(props) {
		super(props);
		this._bind('_renderRow', '_refreshData', '_renderHeader', '_renderFooter');
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		this.state = {
			dataSource: ds.cloneWithRows([])
		}
	}

	componentDidMount(){
		this._refreshData();
	}

	_refreshData(){

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(data.habits)
		})

	}

	_renderRow(rowData){
		return <HabitListItem habit={rowData}/>;
	}

	_renderHeader(){
		return(
			<View style={styles.sectionDivider}>
			<Text style={styles.headingText}>
			HabitPoints!
			</Text>
			</View>
		)
	}

	_renderFooter(){
		return(
			<View style={styles.sectionDivider}>
			<Text>
				Copyright by me!
			</Text>
			</View>
		)
	}

	render(){
		return(
		<ListView
		dataSource={this.state.dataSource}
		renderRow={this._renderRow}
		renderHeader={this._renderHeader}
		renderFooter={this._renderFooter}
		/>
		)

	}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 24
  },
  list: {
    flex: 1,
    flexDirection: 'row'
  },
  listContent: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flex: 1,
    fontSize: 24,
    padding: 42,
    borderWidth: 1,
    borderColor: '#DDDDDD'
  },
  sectionDivider: {
    padding: 8,
    backgroundColor: '#EEEEEE',
    alignItems: 'center'
  },
  headingText: {
    flex: 1,
    fontSize: 24,
    alignSelf: 'center'
  }
});



var data = {
	habits:[{"_id":"574f9962221dcc0439baefde","startDate":"2016-06-02T02:26:42.347Z","name":"Drink a glass of water","bonusInterval":"day","pointValue":1,"bonusFrequency":6,"__v":3,"intervals":[{"intervalStart":"2016-06-01T07:00:00.000Z","intervalEnd":"2016-06-02T06:59:59.999Z","allComplete":false,"_id":"574f9967221dcc0439baefdf","completions":[{"pointValue":1,"_id":"574f9967221dcc0439baefe0"},{"pointValue":1,"_id":"574f9968221dcc0439baefe1"},{"pointValue":1,"_id":"574f9968221dcc0439baefe2"}]}]},{"_id":"574f9985221dcc0439baefe3","startDate":"2016-06-02T02:27:17.068Z","name":"5 minute meditation","bonusInterval":"day","pointValue":1,"bonusFrequency":3,"__v":2,"intervals":[{"intervalStart":"2016-06-05T07:00:00.000Z","intervalEnd":"2016-06-06T06:59:59.999Z","allComplete":false,"_id":"57548b2c221dcc0439baefea","completions":[{"pointValue":1,"_id":"57548b2c221dcc0439baefeb"},{"pointValue":1,"_id":"57548b33221dcc0439baefec"}]}]},{"_id":"57548e79221dcc0439baeff0","startDate":"2016-06-05T20:41:29.131Z","name":"Work on Habit Points","bonusInterval":"week","pointValue":4,"bonusFrequency":5,"__v":0,"intervals":[]}]
}