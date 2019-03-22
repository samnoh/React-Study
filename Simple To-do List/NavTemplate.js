import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class NavTemplate extends React.Component{
	constructor() {
		super();
		this.state = {
			list: 'nav-item active',
		};
	}
    
	handleClickLogo(e) {
		e.preventDefault();
		window.location.reload();
	}
    
	render() {
		return (
			<div>
				<div className ="top"></div>
				<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
					<a className="navbar-brand" onClick={this.handleClickLogo} href="">Simple To-Do List</a>
					<ul className="navbar-nav ml-auto">
						<li className={this.state.list}>
							<a className="nav-link" href="">Home</a>
						</li>
					</ul>
				</nav>
			</div>
		);
	}
}

export default NavTemplate;