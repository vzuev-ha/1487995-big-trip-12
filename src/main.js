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

import {getDayMilliseconds} from "./utils.js";


const EVENT_COUNT = 20;

const routeEvents = new Array(EVENT_COUNT).fill().map(generateEvent)
  .sort((a, b) => {
    return a.startTime.getTime() - b.startTime.getTime();
  });


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const headerTripInfoElement = document.querySelector(`.trip-main`);
const headerTripControls = headerTripInfoElement
  .querySelector(`.trip-main__trip-controls`)
  .querySelectorAll(`h2`);

// Информация о маршруте
render(headerTripInfoElement, createTripInfoTemplate(), `afterbegin`);

// Меню
render(headerTripControls[0], createMenuTemplate(), `afterend`);
// Фильтры
render(headerTripControls[1], createFiltersTemplate(), `afterend`);


const mainContainerElement = document.querySelector(`.trip-events`);

// Сортировка
render(mainContainerElement, createSortTemplate(), `beforeend`);

// Форма редактирования
render(mainContainerElement, createEditFormTemplate(routeEvents[0]), `beforeend`);


// Контейнер точек маршрута
render(mainContainerElement, createRouteContainerTemplate(), `beforeend`);

const routeContainerElement = mainContainerElement.querySelector(`.trip-days`);


// Наполняем событиями
let dayIndex = 1;
let previousDateMilliseconds = 0;

let dayEventsContainerElement = null;

for (let i = 1; i < EVENT_COUNT; i++) {
  const {startTime} = routeEvents[i];
  const currentDayMilliseconds = getDayMilliseconds(startTime);

  // Вставляем блок очередного дня
  if (previousDateMilliseconds !== currentDayMilliseconds) {
    render(routeContainerElement, createDayTemplate(startTime, dayIndex), `beforeend`);

    // Контейнер точек дня
    const days = routeContainerElement.querySelectorAll(`.trip-days__item`);
    const dayElement = days[days.length - 1];
    render(dayElement, createDayEventsContainerTemplate(), `beforeend`);

    // Точки дня
    dayEventsContainerElement = dayElement.querySelector(`.trip-events__list`);

    previousDateMilliseconds = currentDayMilliseconds;
    dayIndex++;
  }

  render(dayEventsContainerElement, createEventTemplate(routeEvents[i]), `beforeend`);
}
