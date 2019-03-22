import React from 'react';

const ColorChange = (props) => {
	return (
		<input type="checkbox" onClick={props.handleCheck} checked={props.isChecked} value={props.index} />
	);
};

export default ColorChange;