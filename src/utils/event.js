import moment from 'moment';
import {SortDirection} from "../const.js";


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


export const isDatesOfMomentsEqual = (momentA, momentB) => {
  if (momentA === null && momentB === null) {
    return true;
  }

  return momentA.isSame(momentB, `day`);
};


export const isMomentInTheFuture = (momentA) => {
  return momentA.isAfter(moment());
};


export const isMomentInThePast = (momentA) => {
  return momentA.isBefore(moment());
};


export const sortEventsByDefault = (eventA, eventB) => {
  return eventA.startMoment.diff(eventB.startMoment);
};

export const sortEventsByTime = (sortDirection) => (eventA, eventB) => {
  const a = moment(eventA.endMoment).diff(eventA.startMoment);
  const b = moment(eventB.endMoment).diff(eventB.startMoment);

  if (sortDirection === SortDirection.ASCENDING) {
    return a - b;
  }

  return b - a;
};

export const sortEventsByPrice = (sortDirection) => (eventA, eventB) => {
  if (sortDirection === SortDirection.ASCENDING) {
    return eventA.price - eventB.price;
  }

  return eventB.price - eventA.price;
};
