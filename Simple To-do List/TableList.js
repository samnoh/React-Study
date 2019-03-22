import React from 'react';
import CheckBox  from './CheckBox';

const TableList = (props) => {
	return (
		<tr className={'d-flex ' + props.color}>
			<td className='col-sm-1 text-center'><CheckBox handleCheck={props.handleCheck} isChecked={props.isChecked} index={props.index}/></td>
			<td className='col-sm-8 spacer'>{props.text}</td>
			<td className='col-sm-2 text-center'>{props.time}</td>
			<td className='col-sm-1 text-center'><button onClick={props.handleColor} value={props.index}></button></td>
		</tr>
	);
};

export default TableList;