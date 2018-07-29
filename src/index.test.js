import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import EditableTable from './index'

configure({ adapter: new Adapter() })
const spy = jest.fn()

function setup(customProps, lifeCycle = false) {
	const props = {
		onChange: spy,
		fields: [{
			name: 'name',
			title: 'title',
			value: 'value',
			constant: false
		}],
		...customProps
	}
	EditableTable.prototype.setActive = jest.fn()
	const container = shallow(<EditableTable {...props} />, { disableLifecycleMethods: lifeCycle })
	return { container, props }
}

describe('EditableTable component', () => {

	it('should render the component', () => {
		const { container } = setup()
		expect(container.exists()).toBe(true)
	})

	it('should have specified first tag and class', () => {
		const { container } = setup()
		expect(container.first().type()).toEqual('table')
		expect(container.first().props().className).toEqual('table table-striped table-bordered detail-view sf-editable-table')
	})
	it('should have tbody tag inside table', () => {
		const { container } = setup()
		console.log(container.debug())
		expect(container.find('table tbody').exists()).toEqual(true)
	})

	it('should have specified table structure', () => {
		const { container } = setup()
		expect(container.find('table tbody tr').first().exists()).toEqual(true)
		expect(container.find('table tbody tr').first().find('th').exists()).toEqual(true)
		expect(container.find('table tbody tr').first().find('th').text()).toEqual('title')

		const instance = container.instance()
		jest.spyOn(instance, 'setActive')
		container.find('table tbody tr').first().find('td').simulate('click')
		expect(instance.setActive).toHaveBeenCalled()
	})

	it('should call setstate inside cDm', () => {
		const { container, props } = setup()
		expect(container.state('fields')).toEqual(props.fields)
	})
	it('should call renderer', () => {
		const { container } = setup({
			fields: [{
				name: 'name',
				title: 'title',
				value: 'value',
				constant: true
			}]
		})
		container.setState({ activeField: 'name' })
		container.update()
		expect(container.find('tr td').last().text()).toEqual('value')
	})

	it('should call component', () => {
		const { container } = setup()
		container.setState({ activeField: 'name' })
		container.update()
		expect(container.find('tr td').last().find('t').exists()).toEqual(true)
		const instance = container.instance()
		const change = jest.spyOn(instance, 'handleChange').mockImplementation(() => true)
		container.find('tr td').last().find('t').simulate('change')
		container.update()
		instance.forceUpdate()
		expect(change).toHaveBeenCalled()
	})

	it('should call handleChange within component', () => {
		const { container } = setup()
		container.setState({ activeField: 'name' })
		container.update()
		const instance = container.instance()
		const change = jest.spyOn(instance, 'handleChange').mockImplementation(() => true)
		container.find('tr td').last().find('t').simulate('change')
		container.update()
		instance.forceUpdate()
		expect(change).toHaveBeenCalled()
	})
})

