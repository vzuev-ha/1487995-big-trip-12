import moment from 'moment';


export const veryOldMoment = moment(`19800101`, `YYYYMMDD`);

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const SortDirection = {
  ASCENDING: `ascending`,
  DESCENDING: `descending`
};


export const getMomentTimeAsString = (inputMoment) => {
  return moment(inputMoment).format(`HH:mm`);
};

export const getMomentMonthDayAsString = (inputMoment) => {
  return moment(inputMoment).format(`MMM DD`);
};

export const getMomentDayAsString = (inputMoment) => {
  return moment(inputMoment).format(`DD`);
};

export const getMomentISOFormat = (inputMoment) => {
  return moment(inputMoment).toISOString();
};

export const getMomentSlashedFormat = (inputMoment) => {
  return moment(inputMoment).format(`YY/MM/DD HH:mm`);
};


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
};


export const sortEventsByDefault = (eventA, eventB) => {
  return eventA.startMoment.diff(eventB.startMoment);
};

export const sortEventsByTimeAsc = (eventA, eventB) => {
  const a = moment(eventA.endMoment).diff(eventA.startMoment);
  const b = moment(eventB.endMoment).diff(eventB.startMoment);

  return a - b;
};

export const sortEventsByTimeDesc = (eventA, eventB) => {
  const a = moment(eventA.endMoment).diff(eventA.startMoment);
  const b = moment(eventB.endMoment).diff(eventB.startMoment);

  return b - a;
};

export const sortEventsByPriceAsc = (eventA, eventB) => {
  return eventA.price - eventB.price;
};

export const sortEventsByPriceDesc = (eventA, eventB) => {
  return eventB.price - eventA.price;
};
