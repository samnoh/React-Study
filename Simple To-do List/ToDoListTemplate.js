import React from 'react';
// import CheckBox  from './CheckBox';
import TableList from './TableList';
import 'bootstrap/dist/css/bootstrap.css';

class ToDoListTemplate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			undo_buffer: [],
			finish: [],
			text: '',
			color: ['table-default', 'text-primary', 'text-danger', 'table-success', 'table-danger', 'table-warning', 'table-info'],
			todo_count: 0,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleCheckAll = this.handleCheckAll.bind(this);
		this.handleColor = this.handleColor.bind(this);
		this.handleUndo = this.handleUndo.bind(this);
		this.handleEmpty = this.handleEmpty.bind(this);
	}

	handleChange(e) {
		this.setState({ 
			text: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.state.text.length) return;

		let temp_count = this.state.todo_count + 1;
		let new_item = {
			isChecked: false, // checkbox
			original_text: this.state.text,
			text: this.state.text,
			index: Date.now(),
			start_time: this.getTimeNow(),
			time: this.getTimeNow(),
			color: 'table-default', // default color
		};

		this.setState(state => ({
			items: state.items.concat(new_item), // first top, last bottom
			todo_count: temp_count,
			text: ''
		}));
	}

	// https://medium.com/@tariqul.islam.rony/multiple-checkbox-handling-by-react-js-84b1d49a46c6
	handleCheckAll(e) {
		const items = this.state.items;
		
		items.map( item => {
			item.isChecked = e.target.checked;

			if(e.target.checked) {
				item.text = <span className='text-secondary'><del>{item.text}</del></span>; 
				item.time = this.getTimeNow(); // show when ticked
				item.color = 'bg-light'; // gray
			}
			else {
				item.text = item.original_text;
				item.time = item.start_time; // back to start time
				item.color = this.state.color[0]; // default color			
			}
		});

		const count = (e.target.checked) ? 0 : items.length;

		this.setState(state => ({
			items: items,
			todo_count: count,
		}));
	}

	handleCheck(e) {
		let items = this.state.items, temp_count = this.state.todo_count;
		items.map( item => {
			if(item.index == e.target.value) {
				item.isChecked = e.target.checked;

				if(item.isChecked) { // ticked
					temp_count -= 1;
					item.text = <span className='text-secondary'><del>{item.text}</del></span>; 
					item.time = this.getTimeNow(); // show when ticked
					item.color = 'bg-light'; // gray
				}
				else { // unticked
					item.text = item.original_text;
					temp_count ++;
					item.time = item.start_time; // back to start time
					item.color = this.state.color[0]; // default color
				}
			}
		});

		this.setState(state => ({
			items: items,
			todo_count: temp_count,
		}));
	}

	handleColor(e) {
		const items = this.state.items;
		
		items.map( item => {
			if(item.index == e.target.value && !item.isChecked) { // if unticked, you can change colors
				item.color = this.state.color[(this.state.color.indexOf(item.color) + 1) % this.state.color.length]; // change color
			}
		});

		this.setState(state => ({
			items: items,
		}));
	}

	handleClear() {
		if(this.state.items.length == 0) return;
		
		let new_item = [], finsih = this.state.finish, buffer = [], undo_buffer = this.state.undo_buffer;
		document.getElementById('checkAll').checked = false;

		this.state.items.map( (item, index) => {
			if(!item.isChecked) {  // unticked
				new_item.push(item);
			}
			else { // ticked
				finsih.push(item);
				buffer.push(item);
				item.isChecked = false;
			}
		});

		undo_buffer.push(buffer);

		this.setState(state =>({
			items: new_item,
			finish: finsih,
			undo_buffer: undo_buffer,
		}));
	}

	handleUndo() {
		let items = this.state.items, buffer = this.state.undo_buffer, finish = this.state.finish, count = this.state.todo_count;
		if (buffer.length == 0) return;
		buffer.pop().map( (e) => {
			finish.pop();
			e.text = e.original_text;
			e.color = 'table-default';
			e.time = e.start_time;
			items.push(e);
			count += 1;
		});

		items.sort( (a, b) => {
			return a.index - b.index;
		});

		this.setState(state => ({
			items: items,
			finish: finish,
			undo_buffer: buffer,
			todo_count: count
		}));
	}

	handleEmpty() {
		const finish = [], buffer = [];

		this.setState(state => ({
			finish: finish,
			undo_buffer: buffer,
		}));
	}

	getTimeNow() {
		let today = new Date(), hour = today.getHours().toString(), minute = today.getMinutes().toString(), day = today.getDate().toString(), month = (today.getMonth() + 1).toString();
		let date_arr = [hour, minute, day, month];
		
		for(let i = 0; i < date_arr.length; i ++) {
			if(date_arr[i].length == 1) {
				date_arr[i] = '0' + date_arr[i];
			}
		}

		return <span className='text-secondary'>{date_arr[0]}:{date_arr[1]} {date_arr[2]}/{date_arr[3]}</span>;
	}

	render(){
    	return (
    		<div>
				<div className='jumbotron jumbotron-fluid mt-3'>
					<h1 className='text-center display-4'>{(this.state.todo_count > 1) ? this.state.todo_count + ' things' : (this.state.todo_count == 1) ? this.state.todo_count + ' thing' : 'Nothing'} to do</h1>
    			</div>
				<form className='sticky-top' onSubmit={this.handleSubmit}>
					<div className="input-group mt-4 mb-4">
						<input autoFocus className="form-control" onChange={this.handleChange} placeholder="What is your today's to-do?" aria-describedby="basic-addon2" type="text"  value={this.state.text} />
						<div className="input-group-append">
							<button className="btn btn-success" type="submit">Add</button>
						</div>
					</div>
				</form>
				<table className="table table-bordered">
    				<thead className="thead-dark">
    					<tr className='d-flex'>
    						<th className='col-sm-1 text-center'><input id="checkAll" onChange={this.handleCheckAll} type="checkbox"/></th>
    						<th className='col-sm-8 text-center'>To-Do</th>
							<th className='col-sm-2 text-center'>Time</th>
							<th className='col-sm-1 text-center'>Tag</th>
    					</tr>
    				</thead>
    				<tbody>
						{this.state.items.map( item => (
							<TableList handleCheck={this.handleCheck} handleColor={this.handleColor} {...item}/>
						))}
					</tbody>
    			</table>
    			<div className="row mt-3">
    				<div className="col">
    					<button type="button" className="btn btn-secondary float-right" onClick={this.handleClear}>
							Clear
						</button>
						<button type="button" className="btn btn-outline-success float-right mr-2" onClick={this.handleUndo}>
							Undo
						</button>
					</div>
    			</div>
				<div className="row justify-content-end">
					<div className="col-sm-4">
						<div className="card border-dark mt-5">
							<div className="card-header">
								<span className="h5">
									Log 
								</span> 
								({this.state.finish.length})
								<button type="button" className="btn btn-outline-danger btn-sm float-right" onClick={this.handleEmpty}>
									Empty
								</button>
							</div>
							<div className="card-body mt-2">
								<ul className="list-inline">
									{this.state.finish.map( (item) => (
										<li className="list-inline-item">{item.original_text}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
    		</div>
    	);
	}
}

export default ToDoListTemplate;
