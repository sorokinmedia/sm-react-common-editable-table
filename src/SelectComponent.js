import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SelectComponent extends Component {
	static propTypes = {
		inputProps: PropTypes.object,
		onChange: PropTypes.func,
		timeZone: PropTypes.object,
		value: PropTypes.string,
	};

	onChange = (event) => {
		this.props.onChange(event.target.value);
		this.props.inputProps.onBlur();
	};

	render() {
		const { inputProps, value, options } = this.props;

		return (
			<select
				className="form-control"
				onChange={this.onChange}
				{...inputProps}
				value={value}
			>
				{options.map(option => (
					<option
						value={option.name}
						key={option.name}
					>
						{option.name}
					</option>))}
			</select>)
	}
}

