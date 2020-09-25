import {getMomentSlashedFormat} from "../utils/event.js";
import AbstractView from "./abstract.js";
import moment from 'moment';


const BLANK_EVENT = {
  eventType: {
    name: `Flignt`,
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


const createEditFormTemplate = (data) => {
  const {eventType, destination, startMoment, endMoment, price, isFavorite} = data;

  const {
    name: eventName,
    value: eventValue,
    preposition: eventPreposition,
    eventOffers
  } = eventType;

  const {name: destinationName, description, photos} = destination;


  let offersHTML = eventOffers.map(({offer, price: offerPrice, isSelected}) => {
    const {fullName: offerFullName, value: offerValue} = offer;

    return `                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden"
                           id="event-offer-${offerValue}-1"
                           type="checkbox"
                           name="event-offer-${offerValue}"
                           ${isSelected ? `checked` : ``}
                    >
                    <label class="event__offer-label" for="event-offer-${offerValue}-1">
                      <span class="event__offer-title">${offerFullName}</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
                    </label>
                  </div>`;
  }
  ).join(``);

  if (offersHTML.toString().length) {
    offersHTML = `              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                ${offersHTML}
                </div>
              </section>`;
  }


  // Если есть фотографии - сгенерируем для них HTML
  let photosHTML = photos.map((photoSrc) => {
    return `                    <img class="event__photo" src="${photoSrc}" alt="Event photo">`;
  }
  ).join(``);

  // Если хоть одна фотография была - можно генерировать обертку
  if (photosHTML.toString().length) {
    photosHTML = `                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${photosHTML}
                  </div>
                </div>`;
  }

  let descriptionHTML = ``;
  // Если есть текстовое описание - сгенерируем блок для него
  if (description.toString().length) {
    descriptionHTML = `                <p class="event__destination-description">${description}</p>`;
  }

  // Если есть описание или фотографии - выводим блок описания
  if (descriptionHTML.toString().length || photosHTML.toString().length) {
    descriptionHTML = `              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                ${descriptionHTML}

                ${photosHTML}
              </section>`;
  }


  // И, наконец, если есть блок с описанием или блок с допами - формируем конечный блок
  let detailsHTML = ``;
  if (descriptionHTML.toString().length || offersHTML.toString().length) {
    detailsHTML = `            <section class="event__details">
              ${offersHTML}

              ${descriptionHTML}
            </section>`;
  }


  return `                <li class="trip-events__item">
          <form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="./img/icons/${eventValue}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>

                    <div class="event__type-item">
                      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                      <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                      <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                      <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                      <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                      <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                      <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                      <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                    </div>
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>

                    <div class="event__type-item">
                      <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                      <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                      <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                      <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${eventName} ${eventPreposition}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
                <datalist id="destination-list-1">
                  <option value="Amsterdam"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                  <option value="Saint Petersburg"></option>
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getMomentSlashedFormat(startMoment)}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getMomentSlashedFormat(endMoment)}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>

              <input id="event-favorite-1"
                     class="event__favorite-checkbox  visually-hidden"
                     type="checkbox"
                     name="event-favorite"
                     ${isFavorite ? `checked` : ``}>
              <label class="event__favorite-btn" for="event-favorite-1">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </label>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>

            ${detailsHTML}
          </form>
        </li>`;
};


export default class EditFormView extends AbstractView {
  constructor(tripEvent = BLANK_EVENT) {
    super();
    this._data = EditFormView.parseTaskToData(tripEvent);

    // 4. Теперь обработчик - метод класса, а не стрелочная функция.
    // Поэтому при передаче в addEventListener он теряет контекст (this),
    // а с контекстом - доступ к свойствам и методам.
    // Чтобы такого не происходило, нужно насильно
    // привязать обработчик к контексту с помощью bind
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._cancelEditClickHandler = this._cancelEditClickHandler.bind(this);
  }


  getTemplate() {
    return createEditFormTemplate(this._data);
  }


  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null; // Чтобы окончательно "убить" ссылку на prevElement
  }


  _formSubmitHandler(evt) {
    evt.preventDefault();
    // 3. А внутри абстрактного обработчика вызовем колбэк
    this._callback.formSubmit(EditFormView.parseDataToTask(this._data));
  }


  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }


  _cancelEditClickHandler(evt) {
    evt.preventDefault();
    // 3. А внутри абстрактного обработчика вызовем колбэк
    this._callback.cancelEditClick();
  }


  setFormSubmitHandler(callback) {
    // Мы могли бы сразу передать callback в addEventListener,
    // но тогда бы для удаления обработчика в будущем,
    // нам нужно было бы производить это снаружи, где-то там,
    // где мы вызывали setClickHandler, что не всегда удобно

    // 1. Поэтому колбэк мы запишем во внутреннее свойство
    this._callback.formSubmit = callback;
    // 2. В addEventListener передадим абстрактный обработчик
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }


  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }


  setCancelEditClickHandler(callback) {
    // Мы могли бы сразу передать callback в addEventListener,
    // но тогда бы для удаления обработчика в будущем,
    // нам нужно было бы производить это снаружи, где-то там,
    // где мы вызывали setClickHandler, что не всегда удобно

    // 1. Поэтому колбэк мы запишем во внутреннее свойство
    this._callback.cancelEditClick = callback;
    // 2. В addEventListener передадим абстрактный обработчик
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._cancelEditClickHandler);
  }


  static parseTaskToData(tripEvent) {
    // Пока нам это не нужно, но вдруг Избранное не будет атрибутом точки маршрута? Пока пусть будет.
    return Object.assign(
        {},
        tripEvent // ,
        // {
        //   isFavorite: tripEvent.isFavorite !== null
        // }
    );
  }


  static parseDataToTask(data) {
    data = Object.assign({}, data);

    // Пока нам это не нужно, но вдруг Избранное не будет атрибутом точки маршрута? Пока пусть будет.
    // delete data.isFavorite;

    return data;
  }
}
