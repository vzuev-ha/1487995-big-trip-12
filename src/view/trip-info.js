import {createElement, getMomentMonthDayAsString, getMomentDayAsString} from "../utils.js";


const createTripInfoTemplate = (routeEvents) => {
  let destinationString = ``;
  let datesString = ``;

  if (routeEvents.length > 0) {
    const firstDestination = routeEvents[0].destination.name;
    const lastDestination = routeEvents[routeEvents.length - 1].destination.name;

    const middleDestination = routeEvents.length === 3
      ? routeEvents[1].destination.name
      : `...`;

    destinationString = `              <h1 class="trip-info__title">${firstDestination} &mdash; ${middleDestination} &mdash; ${lastDestination}</h1>`;

    const firstMoment = routeEvents[0].startMoment;
    const lastMoment = routeEvents[routeEvents.length - 1].startMoment;

    const start = getMomentMonthDayAsString(firstMoment);

    const end = lastMoment.isSame(firstMoment, `month`)
      ? getMomentMonthDayAsString(lastMoment)
      : getMomentDayAsString(lastMoment);

    datesString = `              <p class="trip-info__dates">${start}&nbsp;&mdash;&nbsp;${end}</p>`;
  }

  let totalPrice = 0;
  // Посчитаем полную стоимость поездки
  for (const routeEvent of routeEvents) {
    const {eventType, price: eventPrice} = routeEvent;

    let subTotal = 0;

    for (const offer of eventType.eventOffers) {
      const {price: offerPrice, isSelected} = offer;

      if (isSelected) {
        subTotal += parseInt(offerPrice, 10);
      }
    }

    totalPrice += parseInt(eventPrice, 10) + subTotal;
  }


  const tripInfoString = destinationString || datesString
    ? `            <div class="trip-info__main">
              ${destinationString}

              ${datesString}
            </div>`
    : ``;

  return `          <section class="trip-main__trip-info  trip-info">
            ${tripInfoString}

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
            </p>
          </section>`;
};


export default class TripInfoView {
  constructor(routeEvents) {
    this._routeEvents = routeEvents;
    this._element = createElement(this.getTemplate());
    // console.log(this.getTemplate());
    // console.log(this._element);
  }

  getTemplate() {
    return createTripInfoTemplate(this._routeEvents);
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
