import React from 'react';
import { connect } from 'react-redux';
import { addList, changeValue, deleteLast, changeColor } from './actions'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
    }

    onChange(e) {
        const { value } = e.target
        this.props.changeValue(value);
    }

    onSubmit(e) {
        const { value } = this.props
        e.preventDefault();
        if (value !== '') {
            this.props.addList(value);
            this.props.changeValue('');
        }
    }

    onClick(e) {
        this.props.deleteLast();
    }

    onColorChange(e) {
        this.props.changeColor();
    }

    render() {
        const { value, lists, color } = this.props

        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onChange} placeholder="Enter..." type="text" value={value} name="list" />
                    <br />
                    <input type="submit" value="Add" />
                </form>
                <button onClick={this.onClick}>Delete Last</button>
                <button onClick={this.onColorChange}>Color</button>
                <div style={color}>
                    <ul>
                        {lists.map(item => (
                            <li>{item}</li>
                        ))}
                    </ul>
                    {lists.length === 0 && <p>No Item</p>}
                </div>
            </React.Fragment >
        );
    }
}

const mapStateToProps = state => ({
    value: state.add.value,
    lists: state.add.lists,
    color: state.add.color,
})

const mapDispatchToProps = (dispatch) => {
    return {
        changeValue: (value) => dispatch(changeValue(value)),
        addList: (list) => dispatch(addList(list)),
        deleteLast: () => dispatch(deleteLast()),
        changeColor: () => dispatch(changeColor()),
    };
}

List = connect(mapStateToProps, mapDispatchToProps)(List);

export default List;