import {getDateSlashedFormat} from "../utils.js";


export const createEditFormTemplate = (routeEvent) => {
  const {eventType, destination, startTime, endTime, price} = routeEvent;

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
    offersHTML = `            <section class="event__details">
              <section class="event__section  event__section--offers">
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


  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
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
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateSlashedFormat(startTime)}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateSlashedFormat(endTime)}">
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
            </header>

            ${detailsHTML}

<!--            <section class="event__details">-->
<!--              <section class="event__section  event__section&#45;&#45;offers">-->
<!--                <h3 class="event__section-title  event__section-title&#45;&#45;offers">Offers</h3>-->

<!--                <div class="event__available-offers">-->



<!--                </div>-->
<!--              </section>-->

<!--              <section class="event__section  event__section&#45;&#45;destination">-->
<!--                <h3 class="event__section-title  event__section-title&#45;&#45;destination">Destination</h3>-->
<!--                <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>-->

<!--                <div class="event__photos-container">-->
<!--                  <div class="event__photos-tape">-->
<!--                    <img class="event__photo" src="./img/photos/1.jpg" alt="Event photo">-->
<!--                    <img class="event__photo" src="./img/photos/2.jpg" alt="Event photo">-->
<!--                    <img class="event__photo" src="./img/photos/3.jpg" alt="Event photo">-->
<!--                    <img class="event__photo" src="./img/photos/4.jpg" alt="Event photo">-->
<!--                    <img class="event__photo" src="./img/photos/5.jpg" alt="Event photo">-->
<!--                  </div>-->
<!--                </div>-->
<!--              </section>-->
<!--            </section>-->
          </form>`;
};
