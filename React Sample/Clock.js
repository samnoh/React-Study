import React from 'react';

// https://reactjs-kr.firebaseapp.com/docs/state-and-lifecycle.html
class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
		};
	}
    
	// Life Cycle Methods
	componentDidMount() { // working after DOM rendering
		this.timerID = setInterval( // this.timerID; 시각적 출력에 사용되지 않는 것을 저장해야 하는 경우 클래스에 수동으로 필드를 추가할 수 있습니다
			() => this.tick(), // call tick() every 1 second
			1000
		);
	}
    
	componentWillUnmount() { // working when DOM removes Clock
		clearInterval(this.timerID); // you have to stop the timer if Clock disappears from DOM
	}
    
	tick() {
		this.setState({ // 비동기 업데이트
			date: new Date(),
		});
	}
    
	render() {
		return (
			<h2>
                It is {this.state.date.toLocaleTimeString()}.
			</h2>
		);
	}
}

export default Clock;