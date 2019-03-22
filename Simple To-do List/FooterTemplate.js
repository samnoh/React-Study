import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class FooterTemplate extends React.Component{

	render() {
		return (
			<div>
				<footer className="text-right my-3">
					<hr className="mt-5" />
                    	Provided by <a href="#top"><kbd>Sam</kbd></a>
				</footer>
			</div>
		);
	}
}

export default FooterTemplate;