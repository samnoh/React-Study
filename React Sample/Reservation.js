import React from 'react';

class Reservation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isGoing: true,
			numberOfGuests: 2,
		};
	}
    
	handleInputChange(e) {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
        
		this.setState({
			[name]: value, // [name] will be isGoing or numberOfGuests
		});
	}
    
	render() {
		return (
			<div>
				<form>
					<label>
                    Are you going:
						<input
							name="isGoing"
							type="checkbox"
							checked={this.state.isGoing}
							onChange={(e) => this.handleInputChange(e)} />
					</label>
					<br />
					<label>
                    Number of guests: 
						<input
							name="numberOfGuests"
							type="number"
							value={this.state.numberOfGuests}
							onChange={(e) => this.handleInputChange(e)} />
					</label>
				</form>
				<p>
					{this.state.numberOfGuests} people are {(!this.state.isGoing) && 'not'} going
				</p>
			</div>
		);
	}
}

export default Reservation;