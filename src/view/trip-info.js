import {getMomentMonthDayAsString, getMomentDayAsString} from "../utils/event.js";
import AbstractView from "./abstract.js";


const createTripInfoTemplate = (tripEvents) => {
  let destinationString = ``;
  let datesString = ``;

  if (tripEvents.length > 0) {
    const firstDestination = tripEvents[0].destination.name;
    const lastDestination = tripEvents[tripEvents.length - 1].destination.name;

    const middleDestination = tripEvents.length === 3
      ? tripEvents[1].destination.name
      : `...`;

    destinationString = `              <h1 class="trip-info__title">${firstDestination} &mdash; ${middleDestination} &mdash; ${lastDestination}</h1>`;

    const firstMoment = tripEvents[0].startMoment;
    const lastMoment = tripEvents[tripEvents.length - 1].startMoment;

    const start = getMomentMonthDayAsString(firstMoment);

    const end = lastMoment.isSame(firstMoment, `month`)
      ? getMomentMonthDayAsString(lastMoment)
      : getMomentDayAsString(lastMoment);

    datesString = `              <p class="trip-info__dates">${start}&nbsp;&mdash;&nbsp;${end}</p>`;
  }

  let totalPrice = 0;
  // Посчитаем полную стоимость поездки
  for (const tripEvent of tripEvents) {
    const {eventType, price: eventPrice} = tripEvent;

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


export default class TripInfoView extends AbstractView{
  constructor(tripEvents) {
    super();
    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripEvents);
  }
}
