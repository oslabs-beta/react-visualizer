const setTransitionColor = (laneNum: number) => {
  switch (laneNum) {
    case 6:
      return '#99e2b4';
    case 7:
      return '#88d4dB';
    case 8:
      return '#9ff7cb';
    case 9:
      return '#67b99a';
    case 10:
      return '#56ab91';
    case 11:
      return '#469d89';
    case 12:
      return '#358f80';
    case 13:
      return '#248277';
    case 14:
      return '#14746f';
    case 15:
      return '#036666';
    case 16:
      return '#40916c';
    case 17:
      return '#25a244';
    case 18:
      return '#208b3a';
    case 19:
      return '#1a7431';
    case 20:
      return '#155d27';
    case 21:
      return '#10451d';
    case 22:
      return '#2d6a4f';

    default:
      return '#2d6a4f';
  }
};

export default setTransitionColor;
