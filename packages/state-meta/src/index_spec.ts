import {
	State,

	factory,
} from '.'

describe('🤕 ❤️  Meta logic', function() {

	describe('🆕  initial state', function() {

		it('should have correct defaults and a unique uuid', function() {
			const state = factory()
			expect(state).to.deep.equal({
				//uuid: 'unknown',
				name: 'anonymous',
				email: null,
				allow_telemetry: true,
			})
		})
	})
})
