import {getRandomInteger, getTimeAsString, getDayAsString, getTimeBetween} from "../utils";

export const createEventTemplate = (routeEvent) => {
  const {eventType, destination, startTime, endTime, price, isFavorite} = routeEvent;

  const {
    name: eventName,
    value: eventValue,
    preposition: eventPreposition,
    eventOffers
  } = eventType;

  const {name: destinationName} = destination;

  let offersHTML = eventOffers.map(({name, price, isSelected}) => {
      return isSelected
        ? `                      <li class="event__offer">
                        <span class="event__offer-title">${name}</span>
                        &plus;
                        &euro;&nbsp;<span class="event__offer-price">${price}</span>
                       </li>`
        : ``;
    }
  ).join(``);

  if (offersHTML.toString().length) {
    offersHTML = `                    <h4 class="visually-hidden">Offers:</h4>
                    <ul class="event__selected-offers">
                      ${offersHTML}
                    </ul>`;
  }


  return `<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="./img/icons/${eventValue}.png" alt="Event type icon">
                    </div>
                    <h3 class="event__title">${eventName} ${eventPreposition} ${destinationName}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="2019-03-18T10:30">${getTimeAsString(startTime)}</time>
                        &mdash;
                        <time class="event__end-time" datetime="2019-03-18T11:00">${getTimeAsString(endTime)}</time>
                      </p>
                      <p class="event__duration">${getTimeBetween(startTime, endTime)}</p>
                    </div>

                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">${price}</span>
                    </p>

                    ${offersHTML}

                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </div>
                </li>`;
};
