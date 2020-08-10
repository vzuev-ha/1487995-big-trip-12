import {createTripInfoTemplate} from "./view/trip-info.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createMenuTemplate} from "./view/site-menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createEditFormTemplate} from "./view/edit-form.js";

import {createEventsContainerTemplate} from "./view/events-container.js";
import {createDayTemplate} from "./view/day.js";
import {createDayEventsContainerTemplate} from "./view/day-events-container.js";

import {createTripItem1Template} from "./view/trip-items.js";
import {createTripItem2Template} from "./view/trip-items.js";
import {createTripItem3Template} from "./view/trip-items.js";


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


const mainTripContainerElement = document.querySelector(`.trip-events`);

// Сортировка
render(mainTripContainerElement, createSortTemplate(), `beforeend`);

// Форма редактирования
render(mainTripContainerElement, createEditFormTemplate(), `beforeend`);


// Контейнер точек маршрута
render(mainTripContainerElement, createEventsContainerTemplate(), `beforeend`);

// Точки
// День
const mainEventsContainerElement = mainTripContainerElement.querySelector(`.trip-days`);
render(mainEventsContainerElement, createDayTemplate(), `beforeend`);

// Контейнер точек дня
const mainDayElement = mainEventsContainerElement.querySelector(`.trip-days__item`);
render(mainDayElement, createDayEventsContainerTemplate(), `beforeend`);

// Точки дня
const mainDayEventsContainerElement = mainDayElement.querySelector(`.trip-events__list`);
render(mainDayEventsContainerElement, createTripItem1Template(), `beforeend`);
render(mainDayEventsContainerElement, createTripItem2Template(), `beforeend`);
render(mainDayEventsContainerElement, createTripItem3Template(), `beforeend`);
