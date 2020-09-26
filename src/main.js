import TripInfoView from "./view/trip-info.js";
import SiteMenuView from "./view/site-menu.js";
import FiltersView from "./view/filters.js";
import TripPresenter from "./presenter/trip.js";
import EventsModel from "./model/events.js";

import {generateEvent} from "./mock/event.js";
import {render} from "./utils/render.js";
import {RenderPosition} from "./const.js";


const EVENT_COUNT = 20;

const tripEventsArray = new Array(EVENT_COUNT).fill(undefined).map(generateEvent)
  .sort((a, b) => a.startMoment.diff(b.startMoment));

const eventsModel = new EventsModel();
eventsModel.setEvents(tripEventsArray);


const headerTripInfoElement = document.querySelector(`.trip-main`);
const headerTripControls = headerTripInfoElement
  .querySelector(`.trip-main__trip-controls`)
  .querySelectorAll(`h2`);


// Информация о маршруте
render(headerTripInfoElement, new TripInfoView(tripEventsArray), RenderPosition.AFTERBEGIN);

// Меню
render(headerTripControls[0], new SiteMenuView(), RenderPosition.AFTEREND);
// Фильтры
render(headerTripControls[1], new FiltersView(), RenderPosition.AFTEREND);

// Основной контейнер с точками маршрута
const tripPresenter = new TripPresenter(eventsModel);

tripPresenter.init();
