import React, { Component } from 'react';
import {
	StyleSheet,
	ListView,
	View,
	Text
} from 'react-native';
import { BookItem } from './BookItem';

var API_KEY = '73b19491b83909c7e07016f4bb4644f9:2:60667290';
var QUERY_TYPE = 'hardcover-fiction';
var API_STEM = 'http://api.nytimes.com/svc/books/v3/lists'
var ENDPOINT = `${API_STEM}/${QUERY_TYPE}?response-format=json&api-key=${API_KEY}`;

class BaseComponent extends Component {
 _bind(...methods) {
  methods.forEach( (method) => this[method] = this[method].bind(this) );
 }
}

export class BookList extends BaseComponent {
	constructor(props){
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
		fetch(ENDPOINT)
		.then((response) => response.json())
		.then((rjson) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(rjson.results.books)
			})
		})
	}

	_renderRow(rowData){
		return <BookItem 
		coverURL={rowData.book_image}
		title={rowData.title}
		author={rowData.author}/>;
	}
	_renderHeader(){
		return(
			<View style={styles.sectionDivider}>
			<Text style={styles.headingText}>
			Bestsellers in Hardcover Fiction
			</Text>
			</View>
		)
	}

	_renderFooter(){
		return(
			<View style={styles.sectionDivider}>
			<Text>
				Data from the New York Times Best Seller List
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