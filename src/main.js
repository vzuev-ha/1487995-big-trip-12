import {createTripInfoTemplate} from "./view/trip-info.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createMenuTemplate} from "./view/site-menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createEditFormTemplate} from "./view/edit-form.js";

import {createRouteContainerTemplate} from "./view/route-container.js";
import {createDayTemplate} from "./view/day.js";
import {createDayEventsContainerTemplate} from "./view/day-events-container.js";

import {createEventTemplate} from "./view/event.js";
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
render(headerTripInfoElement, createTripInfoTemplate(routeEvents), RenderPosition.AFTERBEGIN);

// Меню
render(headerTripControls[0], createMenuTemplate(), RenderPosition.AFTEREND);
// Фильтры
render(headerTripControls[1], createFiltersTemplate(), RenderPosition.AFTEREND);


const mainContainerElement = document.querySelector(`.trip-events`);

// Сортировка
render(mainContainerElement, createSortTemplate(), RenderPosition.BEFOREEND);

// Форма редактирования
render(mainContainerElement, createEditFormTemplate(routeEvents[0]), RenderPosition.BEFOREEND);


// Контейнер точек маршрута
render(mainContainerElement, createRouteContainerTemplate(), RenderPosition.BEFOREEND);

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
    render(routeContainerElement, createDayTemplate(startMoment, dayIndex), RenderPosition.BEFOREEND);

    // Контейнер точек дня
    const days = routeContainerElement.querySelectorAll(`.trip-days__item`);
    const dayElement = days[days.length - 1];
    render(dayElement, createDayEventsContainerTemplate(), RenderPosition.BEFOREEND);

    // Точки дня
    dayEventsContainerElement = dayElement.querySelector(`.trip-events__list`);

    previousMoment = moment(currentMoment);
    dayIndex++;
  }

  render(dayEventsContainerElement, createEventTemplate(routeEvents[i]), RenderPosition.BEFOREEND);
}
