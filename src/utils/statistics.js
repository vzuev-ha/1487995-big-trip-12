import moment from 'moment';


export const countPriceByEvents = (tripEvents, eventTypeArray) => {
  let totalPrice = 0;

  for (const tripEvent of tripEvents) {
    const {eventType, price: eventPrice} = tripEvent;

    if (eventTypeArray.indexOf(eventType.value) !== -1 || eventTypeArray.length === 0) {
      totalPrice += parseInt(eventPrice, 10);
    }
  }

  return totalPrice;
};


export const countUseOfTransport = (tripEvents, eventTypeArray) => {
  return tripEvents.reduce((counter, tripEvent) => {
    const {eventType} = tripEvent;

    if (eventTypeArray.indexOf(eventType.value) !== -1 || eventTypeArray.length === 0) {
      return counter + 1;
    }

    return counter;
  }, 0);
};

export const countTimeSpendByType = (tripEvents, eventTypeArray) => {
  const minutesCount = tripEvents.reduce((counter, tripEvent) => {
    const {eventType, startMoment, endMoment} = tripEvent;

    if (eventTypeArray.indexOf(eventType.value) !== -1 || eventTypeArray.length === 0) {
      return counter + moment(endMoment).diff(startMoment, `minutes`);
    }

    return counter;
  }, 0);

  return minutesCount % 60;
};
