import hasTransition from '../../src/lib/hasTransition';

describe('hasTransition', () => {
  it('should return true if a fiber lane is a transition lane', () => {
    const lane1 = 8;
    const lane2 = 22;
    expect(hasTransition(lane1)).toBe(true);
    expect(hasTransition(lane2)).toBe(true);
  });

  it('should return false if a fiber lane is not a transition lane', () => {
    const lane1 = 1;
    const lane2 = 100;
    expect(hasTransition(lane1)).toBe(false);
    expect(hasTransition(lane2)).toBe(false);
  });
});
