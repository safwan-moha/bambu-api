const expect = require('chai').expect;
const { getPercentage, getAverage } = require('../peopleManager');

describe('getPercentage function testing', () => {
    it('Should return the correct value', done => {
        expect(getPercentage(2, 4)).to.equal(0.5);
        done();
    });
    it('Should handle incorrect value', done => {
        expect(getPercentage()).to.equal(0);
        done();
    });
});

describe('getAverage function testing', () => {
    it('Should return the correct value', done => {
        expect(getAverage([2, 4, 6, 8, 10, 12])).to.equal('7.0');
        done();
    });
    it('Should return the correct value', done => {
        expect(getAverage([2])).to.equal('2.0');
        done();
    });
});