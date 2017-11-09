import { generate_uuid } from '.'


describe('generate_uuid()', function() {

	it('should return correct uuids', function() {
		for(let i = 0; i < 10; ++i) {
			const uuid = generate_uuid()
			console.log(uuid)
			expect(uuid).to.be.a.string
			expect(uuid).to.have.lengthOf(24)
			expect(uuid.startsWith(('uu1'))).to.be.true
		}
	})
})
