import React, { Component, Fragment } from 'react';
import Clock from './Clock';
import Toggle from './Toggle';
import EssayForm from './EssayForm';
import FlavorForm from './FlavorForm';
import Reservation from './Reservation';
import Calculator from './Calculator';
import FilterableProductTable from './thinking_in_react';
import SassComponent from './SassComponent';
import StyledComponent from './StyledComponent';

class App extends Component {
	render() {
		return (
			<Fragment>
				<SassComponent />
				<StyledComponent />
				<Clock />
				<Toggle />
				<EssayForm />
				<FlavorForm />
				<Reservation />
				<Calculator />
				<FilterableProductTable />
			</Fragment>
		);
	}
}

export default App;
