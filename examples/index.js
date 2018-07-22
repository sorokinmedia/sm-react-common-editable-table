import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import Alert from '../lib';

class App extends Component {

	render() {
		return (
			<div>
				<Alert showAlert="Error" />
			</div>
		)
	}
}

App.propTypes = {}
App.defaultProps = {}

render(<App />, document.getElementById('root'));
