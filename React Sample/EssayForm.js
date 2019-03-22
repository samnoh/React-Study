import React from 'react';

class EssayForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'Please write an essay about cats',
		};
	}

	handleChange = (e) => {
		const { value } = e.target;

		this.setState({
			value: value,
		});
	}

	handleSubmit = (e) => {
		const value = '';

		alert('Submitted: ' + this.state.value);
		e.preventDefault();

		this.setState({
			value: value,
		});		
	}

	render() {
		const { handleChange, handleSubmit } = this;
		const { value } = this.state;

		return (
			<form onSubmit={handleSubmit}>
				<label>
                    Essay:
					<textarea value={value} onChange={handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

export default EssayForm;