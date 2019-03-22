// https://reactjs-kr.firebaseapp.com/docs/thinking-in-react.html
// https://codepen.io/gaearon/pen/LzWZvb?editors=1010
import React from 'react';

class FilterableProductTable extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			products: PRODUCTS,
			checked: false,
			search: '',
		};
	}
    
	handleSearch(e) {
		this.setState({
			search: e.target.value, // get search box text
		});
	}
    
	handleChange() {
		this.setState(prev => ({
			checked: !prev.checked // true -> false, vice versa
		}));
	}
    
	render() {
		return (
			<div>
				<SearchBar onSearch={(e) => this.handleSearch(e)} value={this.state.search} onChange={(e) => this.handleChange(e)} />
				<ProductTable search={this.state.search} checked={this.state.checked} products={this.state.products} />
			</div>
		);
	}
}

class SearchBar extends React.Component {
	render() {
		return (
			<div>
				<input type="text" placeholder="Search..." value={this.props.search} onChange={(e) => this.props.onSearch(e)}/> 
				<br/>
				<input type="checkbox" checked={this.props.checked} onChange={(e) => this.props.onChange(e)} />{' '}Only show products in stock
			</div>
		);
	}
}

class ProductTable extends React.Component {    
	render() {
		const products = this.props.products
			.filter(item => item.name.toUpperCase().includes(this.props.search.toUpperCase()))
			.filter(item => {return (this.props.checked) ? item.stocked : true;});
		const rows = [];
		let tempCategory = null;

		products.forEach(item => {
			if(tempCategory != item.category) {
				rows.push(<ProductCategoryRow category={item.category}/>); // category
				tempCategory = item.category;
			}
			rows.push(<ProductRow price={item.price} name={item.name} stocked={item.stocked} />);
		});
        
		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
}

class ProductCategoryRow extends React.Component {
	render() {
		return (
			<tr>
				<th colSpan="2">{this.props.category}</th>
			</tr>
		);
	}
}

class ProductRow extends React.Component {    
	render() {
		const name = (this.props.stocked) ? this.props.name : <span style={{color: 'red'}}>{this.props.name}</span>;

		return (
			<tr>
				<td>{name}</td>
				<td>{this.props.price}</td>
			</tr>
		);
	}
}

export default FilterableProductTable;

// input
const PRODUCTS = [ 
	{category: 'Sporting Goods',
		price: '$49.99',
		stocked: true,
		name: 'Football'},
	{category: 'Sporting Goods',
		price: '$9.99',
		stocked: true,
		name: 'Baseball'},
	{category: 'Sporting Goods',
		price: '$29.99',
		stocked: false,
		name: 'Basketball'},
	{category: 'Electronics',
		price: '$99.99',
		stocked: true,
		name: 'iPod Touch'},
	{category: 'Electronics',
		price: '$399.99',
		stocked: false,
		name: 'iPhone 5'},
	{category: 'Electronics',
		price: '$199.99',
		stocked: true,
		name: 'Nexus 7'}
];