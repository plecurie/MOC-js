const chai = require('chai');
const should = chai.should();


    describe('Some test', () => {
        it('should fail', () => {
            const a = 'a';
            const b = 'a';

            return a.should.be.eql(b);
         });
    });