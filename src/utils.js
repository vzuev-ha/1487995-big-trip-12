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

export  const getDateSlashedFormat = (date) => {
  const y = date.getFullYear().toString().slice(2).padStart(2, `0`);
  const m = (date.getMonth() + 1).toString().padStart(2, `0`);
  const d = date.toLocaleString(`en-US`, {day: `2-digit`});
  const h = date.getHours().toString().padStart(2, `0`);
  const min = date.getMinutes().toString().padStart(2, `0`);

  return `${y}/${m}/${d} ${h}:${min}`;
}

export const getTimeBetween = (startDate, endDate) => {
  const gap = endDate.getTime() - startDate.getTime();

  const d = Math.floor(gap / 1000 / 60 / 60 / 24);
  const h = Math.floor((gap / 1000 / 60 / 60) % 24);
  const m = Math.floor((gap / 1000 / 60) % 60);

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
