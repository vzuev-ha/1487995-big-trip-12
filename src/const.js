import moment from 'moment';


export const veryOldMoment = moment(`19800101`, `YYYYMMDD`);


export const BLANK_EVENT = {
  eventType: {
    name: `Flight`,
    value: `flight`,
    preposition: `to`,
    eventOffers: []
  },
  destination: {
    name: ``,
    description: ``,
    photos: []
  },
  startMoment: moment(),
  endMoment: moment(),
  price: ``,
  isFavorite: false
};


export const WorkMode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};


export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};


export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};


export const SortDirection = {
  ASCENDING: `ascending`,
  DESCENDING: `descending`
};
