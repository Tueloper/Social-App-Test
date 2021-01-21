const { expect } = require('chai');
const { client } = require('../services/cache');

describe('Test Redis Connection', () => {
	it('Should return entered value', (done) => {
		client.set('redisKey', 'The redis value');
		client.get('redisKey', (err, reply) => {
			expect(reply).to.be.eql('The redis value');
		});
		done();
	});
});
