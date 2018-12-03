import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Input } from 'sm-react-common-uikit';

const defaultComponent = props => <Input {...props} />;

const defaultRenderer = value => value;

export SelectComponent from './SelectComponent';

export default class EditableTable extends Component {
	static propTypes = {
		// array of field descriptors: { placeholder, name, value, component }
		fields: PropTypes.array.isRequired,
		// will receive (name, value) as its arguments
		onChange: PropTypes.func.isRequired
	};

	constructor() {
		super();
		this.state = {
			activeField: null,
			fields: []
		};
	}

	componentDidMount() {
		if (this.props.fields.length > 0) {
			// eslint-disable-next-line react/no-did-mount-set-state
			this.setState({ fields: this.props.fields })
		}
	}

	onChange = (name, value) => {
		this.props.onChange(name, value);
	};

	onBlur = () => {
		this.setState({ activeField: null });
	};

	setActive = (activeField) => {
		this.setState({ activeField })
	}

	isActive = field => field === this.state.activeField;

	handleChange = (name, value, index) => {
		const newFielsd = [...this.state.fields]
		newFielsd[index].value = value
		this.props.onChange(name, value)
		this.setState({ fields: newFielsd })
	}

	render() {
		// eslint-disable-next-line prefer-destructuring
		const { isEditable } = this.props;
		const { activeField } = this.state;
		const onBlur = this.onBlur;
		const inputProps = { autoFocus: 'autofocus', onBlur };
		return (
			<table className="table table-striped table-bordered detail-view sf-editable-table">
				<tbody>
					{this.state.fields.map(({
						name, title, value, constant, component, renderer
					}, index) => {
						// eslint-disable-next-line no-param-reassign
						component = component || defaultComponent;
						// eslint-disable-next-line no-param-reassign
						renderer = renderer || defaultRenderer;

						return (
							<tr key={name}>
								<th width="30%">{title}</th>
								<td
									onClick={() => name === activeField ? null : this.setActive(name)}
									width="70%"
								>
									{this.isActive(name) && !constant && isEditable ?
										component({
											value,
											inputProps,
											// eslint-disable-next-line no-shadow
											onChange: (value) => {
												this.handleChange(name, value, index)
											}
										}) : renderer(value)}
								</td>
							</tr>)
					})}
				</tbody>
			</table>)
	}
}
