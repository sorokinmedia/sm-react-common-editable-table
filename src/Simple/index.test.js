import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Alert from './index'


configure({ adapter: new Adapter() })

function setup(customProps, lifeCycle = false) {
	const props = {
		...customProps
	}
	const container = shallow(<Alert {...props} />, { disableLifecycleMethods: lifeCycle })
	return { container, props }
}

describe('d', () => {
	it('should render the component', () => {
		// const { container } = setup()
		// console.log(container);
		// expect(container.exists()).toBe(false)
		expect(1).toEqual(2)
	})
})
