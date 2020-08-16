import {createTripInfoTemplate} from "./view/trip-info.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createMenuTemplate} from "./view/site-menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createEditFormTemplate} from "./view/edit-form.js";

import {createRouteContainerTemplate} from "./view/route-container.js";
import {createDayTemplate} from "./view/day.js";
import {createDayEventsContainerTemplate} from "./view/day-events-container.js";

import {createEvent1Template} from "./view/event.js";


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
render(mainContainerElement, createEditFormTemplate(), `beforeend`);


// Контейнер точек маршрута
render(mainContainerElement, createRouteContainerTemplate(), `beforeend`);

// Точки
// День
const routeContainerElement = mainContainerElement.querySelector(`.trip-days`);
render(routeContainerElement, createDayTemplate(), `beforeend`);

// Контейнер точек дня
const dayElement = routeContainerElement.querySelector(`.trip-days__item`);
render(dayElement, createDayEventsContainerTemplate(), `beforeend`);

// Точки дня
const dayEventsContainerElement = dayElement.querySelector(`.trip-events__list`);
render(dayEventsContainerElement, createEvent1Template(), `beforeend`);
render(dayEventsContainerElement, createEvent1Template(), `beforeend`);
render(dayEventsContainerElement, createEvent1Template(), `beforeend`);
