import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import InAndOutRecord from './InAndOutRecord';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';

class MainPage extends Component {
	render(){
		return(
			<Router>
			<div style={{height: '100%'}}>
				<Route exact path="/App" component={App}/>
				<Route exact path="/Record" component={InAndOutRecord}/>
			</div>
			</Router>
		);
	}
}

ReactDOM.render(<MainPage />, document.getElementById('root'));
registerServiceWorker();
