import Battery1 from 'assets/icons/battery1.svg';
import Battery2 from 'assets/icons/battery2.svg';
import Battery3 from 'assets/icons/battery3.svg';
import Battery4 from 'assets/icons/battery4.svg';
import Battery5 from 'assets/icons/battery5.svg';

export const getScoreIcon = (score: number) => {
  if (score >= 0 && score < 21) {
    return Battery1;
  } else if (score > 20 && score < 41) {
    return Battery2;
  } else if (score > 40 && score < 61) {
    return Battery3;
  } else if (score > 60 && score < 81) {
    return Battery4;
  }
  return Battery5;
};
