import React from 'react';

class FlavorForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'coconut',
		};
	}
    
	handleSubmit(e) {
		alert('Your favorite flavor is: ' + this.state.value);
		e.preventDefault();
	}
    
	handleChange(e) {
		this.setState({
			value: e.target.value
		});
	}
    
	render() {
		return (
			<form onSubmit={(e) => this.handleSubmit(e)}>
				<label>
                    Pick your favorite La Croix flavor:
					<select value={this.state.value} onChange={(e) => this.handleChange(e)}>
						<option value="grapefruit">Grapefruit</option>
						<option value="lime">Lime</option>
						<option value="coconut">Coconut</option>
						<option value="mango">Mango</option>
					</select>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

export default FlavorForm;