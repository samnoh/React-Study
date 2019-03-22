import React from 'react';

const CheckBox = (props) => {
	return (
		<input type="checkbox" onClick={props.handleCheck} checked={props.isChecked} value={props.index} />
	);
};

export default CheckBox;