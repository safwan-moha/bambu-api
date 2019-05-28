const { getPercentage } = require('../peopleManager');

describe('getPercentage function testing', () => {
    it('Should return the correct value', () => {
        expect(getPercentage(2, 4)).toBe(0.5);
    })
    it('Should handle incorrect value', () => {
        expect(getPercentage()).toBe(0);
    });
});
