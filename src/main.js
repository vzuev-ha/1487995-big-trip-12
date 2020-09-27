import TripInfoView from "./view/trip-info.js";
import SiteMenuView from "./view/site-menu.js";
import NewEventButtonView from "./view/new-event-button.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";

import {generateEvent} from "./mock/event.js";
import {render} from "./utils/render.js";
import {RenderPosition} from "./const.js";


const EVENT_COUNT = 20;

const tripEventsArray = new Array(EVENT_COUNT).fill(undefined).map(generateEvent)
  .sort((a, b) => a.startMoment.diff(b.startMoment));

const eventsModel = new EventsModel();
eventsModel.setEvents(tripEventsArray);

const filterModel = new FilterModel();


const headerTripHeaderElement = document.querySelector(`.trip-main`);
const headerTripControls = headerTripHeaderElement
  .querySelector(`.trip-main__trip-controls`)
  .querySelectorAll(`h2`);


// Информация о маршруте
render(headerTripHeaderElement, new TripInfoView(tripEventsArray), RenderPosition.AFTERBEGIN);

// Меню
render(headerTripControls[0], new SiteMenuView(), RenderPosition.AFTEREND);
// Фильтры
const filterPresenter = new FilterPresenter(headerTripControls[1], filterModel, eventsModel);
// Кнопка добавления новой точки
render(headerTripHeaderElement, new NewEventButtonView(), RenderPosition.BEFOREEND);

// Основной контейнер с точками маршрута
const tripPresenter = new TripPresenter(eventsModel, filterModel);

filterPresenter.init();
tripPresenter.init();


document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
