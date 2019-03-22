import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
	renderSquare(i, winner, jump) {
		return (
			<Square 
				jump={jump}
				winner={winner} // 누군가 이겼을 때 무엇 때문에 이겼는지 세 개의 사각형을 하이라이트하세요.
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		const board = []; // 하드 코딩한 것들 대신 사각형을 두 개의 루프를 사용하여 Board를 다시 작성하세요.
		const winner = (this.props.winner) ? this.props.winner : [];
		const jump = this.props.jump; // 움직임 리스트의 선택된 아이템을 볼드 처리하세요.
        
		for(let i = 0; i < 9; i += 3) { 
			board.push(
				<div key={i} className="board-row">
					{this.renderSquare(i, winner.indexOf(i) > -1, i === jump)} 
					{this.renderSquare(i + 1, winner.indexOf(i + 1) > -1, i + 1 === jump)}
					{this.renderSquare(i + 2, winner.indexOf(i + 2) > -1, i + 2 === jump)}
				</div>
			);
		}
        
		return (
			<div>
				{board}
			</div>
		);
	}
}

export default Board;