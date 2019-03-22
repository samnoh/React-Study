import React from 'react';

class Toggle extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			isToggleOn: true,
		};
	}
    
	handleClick() {
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}
    
	render() {
		return ( // This syntax ensures `this` is bound within handleClick
			<button onClick={(e) => this.handleClick(e)}> 
				{this.state.isToggleOn ? 'ON' : 'OFF'}
			</button>
		);
	}
}

export default Toggle;