import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import Alert, { SelectComponent } from '../lib';

class App extends Component {

	render() {
		return (
			<div>
				<SelectComponent/>
			</div>
		)
	}
}

App.propTypes = {}
App.defaultProps = {}

render(<App />, document.getElementById('root'));
