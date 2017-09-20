
import {
	CHAR_MAPPINGS,
	apply_font,
} from '.'

describe('unicode magic', function() {
	const DEMO_STRING_01a = 'The 23.890 quick brown foxes say: I ❤ 🐓!'
	const DEMO_STRING_01b = DEMO_STRING_01a.toUpperCase()

	describe('change_font()', function() {
		CHAR_MAPPINGS.forEach(m => {
			describe(`font "${m.id}"`, function() {
				it('should work', () => {
					console.log(apply_font(m.id, DEMO_STRING_01a))
					console.log(apply_font(m.id, DEMO_STRING_01b))
				})
			})
		})
	})
})
