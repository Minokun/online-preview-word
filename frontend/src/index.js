import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import InAndOutRecord from './InAndOutRecord';
import registerServiceWorker from './registerServiceWorker';
//import {BrowserRouter as Router, Route, Link } from 'react-router-dom';

// class MainPage extends Component {
// 	render(){
// 		return(
// 			<Router>
// 			<div>
// 				<ul>
// 					<li><Link to="/App">主页</Link></li>
// 					<li><Link to="InAndOutRecord">出入登记</Link></li>
// 				</ul>
// 				<hr/>
// 				<Route exact path="/App" component={App}/>
// 				<Route exact path="/InAndOutRecord" component={InAndOutRecord}/>
// 			</div>
// 			</Router>
// 		);
// 	}
// }

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
