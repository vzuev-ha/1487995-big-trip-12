// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getTimeAsString = (date) => {
  return date.toLocaleString(`en-US`, {hour12: false, hour: `2-digit`, minute: `2-digit`});
};

export const getDayAsString = (date) => {
  return date.toLocaleString(`en-US`, {day: `numeric`, month: `short`});
}

export const getDateISOFormat = (date) => {
  return date.toISOString();
}

export const getTimeBetween = (startDate, endDate) => {
  const gap = endDate.getTime() - startDate.getTime();

  const d = Math.floor(gap / 1000 / 60 / 60 / 24);
  const h = Math.floor((gap / 1000 / 60 / 60) % 24);
  const m = Math.floor((gap / 1000 / 60) % 60);

  let gapString = ``;

  if (d > 0) {
    gapString += d > 9
      ? d
      : `0` + d;
    gapString += `D `;
  }
  if (h > 0) {
    gapString += h > 9
      ? h
      : `0` + h;
    gapString += `H `;
  }
  if (m > 0) {
    gapString += m > 9
      ? m
      : `0` + m;
    gapString += `M`;
  }

  return gapString;
}
