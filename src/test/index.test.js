import myModule from './index'
import * as dependency from './dep'

describe('myModule', () => {
	it('should e', () => {
		expect(1).toEqual(2)
	})
	it('calls the dependency with double the input', () => {
		dependency.default = jest.fn() // Mutate the default export

		myModule(2)

		expect(dependency.default).toBeCalledWith(4) // Assert against the default
	})
})
