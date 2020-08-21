import {getMomentTimeAsString, getMomentISOFormat, getTimeBetween} from "../utils/event.js";
import AbstractView from "./abstract.js";

const createEventTemplate = (tripEvent) => {
  const {eventType, destination, startMoment, endMoment, price} = tripEvent;

  const {
    name: eventName,
    value: eventValue,
    preposition: eventPreposition,
    eventOffers
  } = eventType;

  const {name: destinationName} = destination;

  let offersHTML = eventOffers.map(({offer, price: offerPrice, isSelected}) => {
    const {shortName: offerShortName} = offer;

    return isSelected
      ? `                      <li class="event__offer">
                        <span class="event__offer-title">${offerShortName}</span>
                        &plus;
                        &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
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
                        <time class="event__start-time" datetime="${getMomentISOFormat(startMoment)}">${getMomentTimeAsString(startMoment)}</time>
                        &mdash;
                        <time class="event__end-time" datetime="${getMomentISOFormat(endMoment)}">${getMomentTimeAsString(endMoment)}</time>
                      </p>
                      <p class="event__duration">${getTimeBetween(startMoment, endMoment)}</p>
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


export default class EventView extends AbstractView {
  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;

    // 4. Теперь обработчик - метод класса, а не стрелочная функция.
    // Поэтому при передаче в addEventListener он теряет контекст (this),
    // а с контекстом - доступ к свойствам и методам.
    // Чтобы такого не происходило, нужно насильно
    // привязать обработчик к контексту с помощью bind
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._tripEvent);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    // 3. А внутри абстрактного обработчика вызовем колбэк
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    // Мы могли бы сразу передать callback в addEventListener,
    // но тогда бы для удаления обработчика в будущем,
    // нам нужно было бы производить это снаружи, где-то там,
    // где мы вызывали setClickHandler, что не всегда удобно

    // 1. Поэтому колбэк мы запишем во внутреннее свойство
    this._callback.editClick = callback;
    // 2. В addEventListener передадим абстрактный обработчик
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
