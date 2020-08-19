import TripInfoView from "./view/trip-info.js";
import SiteMenuView from "./view/site-menu.js";
import FiltersView from "./view/filters.js";
import SortView from "./view/sort.js";

import RouteContainerView from "./view/route-container.js";
import DayView from "./view/day.js";
import DayEventsContainerView from "./view/day-events-container.js";

import EventView from "./view/event.js";
import EditFormView from "./view/edit-form.js";
import {generateEvent} from "./mock/event.js";

import {render, RenderPosition, veryOldMoment} from "./utils.js";

import moment from 'moment';


const EVENT_COUNT = 20;

const routeEvents = new Array(EVENT_COUNT).fill(undefined).map(generateEvent)
  .sort((a, b) => a.startMoment.diff(b.startMoment));


const headerTripInfoElement = document.querySelector(`.trip-main`);
const headerTripControls = headerTripInfoElement
  .querySelector(`.trip-main__trip-controls`)
  .querySelectorAll(`h2`);

// Информация о маршруте
render(headerTripInfoElement, new TripInfoView(routeEvents).getElement(), RenderPosition.AFTERBEGIN);

// Меню
render(headerTripControls[0], new SiteMenuView().getElement(), RenderPosition.AFTEREND);
// Фильтры
render(headerTripControls[1], new FiltersView().getElement(), RenderPosition.AFTEREND);


const mainContainerElement = document.querySelector(`.trip-events`);

// Сортировка
render(mainContainerElement, new SortView().getElement(), RenderPosition.BEFOREEND);

// Форма редактирования
render(mainContainerElement, new EditFormView(routeEvents[0]).getElement(), RenderPosition.BEFOREEND);


// Контейнер точек маршрута
render(mainContainerElement, new RouteContainerView().getElement(), RenderPosition.BEFOREEND);

const routeContainerElement = mainContainerElement.querySelector(`.trip-days`);


// Наполняем событиями
let dayIndex = 1;
let previousMoment = moment(veryOldMoment);

let dayEventsContainerElement = null;

for (let i = 1; i < EVENT_COUNT; i++) {
  const {startMoment} = routeEvents[i];
  const currentMoment = moment(startMoment);
  // const currentDayMilliseconds = getDayMilliseconds(startTime);

  // Вставляем блок очередного дня
  if (!previousMoment.isSame(currentMoment, `day`)) {
    render(routeContainerElement, new DayView(startMoment, dayIndex).getElement(), RenderPosition.BEFOREEND);

    // Контейнер точек дня
    const days = routeContainerElement.querySelectorAll(`.trip-days__item`);
    const dayElement = days[days.length - 1];
    render(dayElement, new DayEventsContainerView().getElement(), RenderPosition.BEFOREEND);

    // Точки дня
    dayEventsContainerElement = dayElement.querySelector(`.trip-events__list`);

    previousMoment = moment(currentMoment);
    dayIndex++;
  }

  render(dayEventsContainerElement, new EventView(routeEvents[i]).getElement(), RenderPosition.BEFOREEND);
}
