import setTransitionColor from '../../src/lib/setTransitionColor';

describe('setTransitionColor', () => {
  const laneColors = {
    6: '#99e2b4',
    7: '#88d4dB',
    8: '#9ff7cb',
    9: '#67b99a',
    10: '#56ab91',
    11: '#469d89',
    12: '#358f80',
    13: '#248277',
    14: '#14746f',
    15: '#036666',
    16: '#40916c',
    17: '#25a244',
    18: '#208b3a',
    19: '#1a7431',
    20: '#155d27',
    21: '#10451d',
    22: '#2d6a4f',
    default: '#2d6a4f',
  };

  it('should return the correct hex color value', () => {
    expect(setTransitionColor(8)).toEqual(laneColors[8]);
    expect(setTransitionColor(20)).toEqual(laneColors[20]);
  });
});
