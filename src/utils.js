import moment from 'moment';


// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getMomentTimeAsString = (inputMoment) => {
  return moment(inputMoment).format(`HH:mm`);
};

export const getMomentMonthDayAsString = (inputMoment) => {
  return moment(inputMoment).format(`MMM DD`);
}

export const getMomentDayAsString = (inputMoment) => {
  return moment(inputMoment).format(`DD`);
}

export const getMomentISOFormat = (inputMoment) => {
  return moment(inputMoment).toISOString();
}

export  const getMomentSlashedFormat = (inputMoment) => {
  return moment(inputMoment).format(`YY/MM/DD HH:mm`);
}


export const getTimeBetween = (startMoment, endMoment) => {
  const d = moment(endMoment).diff(startMoment, `days`);
  const h = moment(endMoment).diff(startMoment, `hours`) % 24;
  const m = moment(endMoment).diff(startMoment, `minutes`) % 60;

  let gapString = ``;

  if (d > 0) {
    gapString += d.toString().padStart(2, `0`) + `D `;
  }
  if (h > 0) {
    gapString += h.toString().padStart(2, `0`) + `H `;
  }
  if (m > 0) {
    gapString += m.toString().padStart(2, `0`) + `M `;
  }

  return gapString;
}
