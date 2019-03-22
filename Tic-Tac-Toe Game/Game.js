import React, { Component } from 'react';
import Board from './Board';

// https://reactjs-kr.firebaseapp.com/tutorial/tutorial.html#what-were-building

function calculateWinner(squares) {
	const lines = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];// every possible sets of winner
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return [a, b, c];
		}
	}
    
	return null;
}

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			xIsNext: true,
			stepNumber: 0,
			jump: -1,
		};
	}
    
	handleClick(index) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[index]) {
			return;
		}

		squares[index] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			xIsNext: !this.state.xIsNext,
			stepNumber: history.length,
			jump: -1, // reset
		});
	}
    
	jumpTo(i) {
		const history = this.state.history.slice(0, i + 1);
		const current = history[i];
		const last = i > 1 && history[i -1].squares.slice();
		const squares = current.squares.slice();
        
		let lastStepIdx = -1;  
		for (let i = 0; i < squares.length; i++) {
			if (squares[i] != last[i]) {
				lastStepIdx = i;
				break;
			}
		}
        
		this.setState({
			stepNumber: i,
			xIsNext: (i % 2) === 0,
			jump: lastStepIdx
		});
	}
    
	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		// 움직임 리스트에서 (col, row) 형태에 각 움직임 위치를 표시하세요.
		let idx = null;
		const moves = history.map((step, move) => {
			if (move != 0) { 
				const last = history[move -1].squares;
				for (let i = 0; i < last.length; i ++) {
					if (step.squares[i] != last[i]) {
						idx = i;
						break;
					}
				}
			}
			const position = idx && [Math.floor(idx / 3) + 1, idx % 3 + 1];
			const desc_text = move ? 'Go to move to (' + position.toString() + ')': 'Go to game start';
			
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>
						{(move!== 0) ? (move % 2 !== 0 ? 'X: ' : 'O: ') : ''} {desc_text} 
					</button>
				</li>
			);
		});

		let status;
		if (winner) { 
			status = 'Winner: ' + (this.state.xIsNext ? 'O' : 'X');
		} 
		else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}
        
		return (
			<div className="game">
				<div className="game-board">
					<Board
						jump={this.state.jump}
						winner={winner}
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

export default Game;