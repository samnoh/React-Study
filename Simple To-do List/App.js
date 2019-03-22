import React from 'react';
import NavTemplate from './NavTemplate';
import ToDoListTemplate from './ToDoListTemplate';
import FooterTemplate from './FooterTemplate';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<NavTemplate/>
				
				<div className="container">
					<ToDoListTemplate> </ToDoListTemplate> <FooterTemplate />
				</div>
			</div>
		);
	}
}

export default App;
