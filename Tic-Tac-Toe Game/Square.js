import React, { Component } from 'react';

function Square(props)  {
	const style = {
		color: (props.winner) ? 'blue' : 'black',
		fontWeight: (props.jump) ? 'bold' :'normal'
	};

	return (
		<button style={style} className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

export default Square;