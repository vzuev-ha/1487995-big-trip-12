import {getDayAsString} from "../utils.js";
import moment from "moment";

export const createTripInfoTemplate = (routeEvents) => {
  const firstDestination = routeEvents[0].destination.name;
  const lastDestination = routeEvents[routeEvents.length - 1].destination.name;

  const middleDestination = routeEvents.length === 3
    ? routeEvents[1].destination.name
    : `...`;

  const firstDate = routeEvents[0].startTime;
  const lastDate = routeEvents[routeEvents.length - 1].startTime;

  const start = getDayAsString(firstDate);

  const end = moment(lastDate).isSame(moment(firstDate), `month`)
    ? lastDate.getDate().toString().padStart(2, `0`)
    : getDayAsString(lastDate);


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

  return `          <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${firstDestination} &mdash; ${middleDestination} &mdash; ${lastDestination}</h1>

              <p class="trip-info__dates">${start}&nbsp;&mdash;&nbsp;${end}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
            </p>
          </section>`;
};
