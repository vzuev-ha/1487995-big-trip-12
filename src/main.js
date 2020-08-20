import TripInfoView from "./view/trip-info.js";
import SiteMenuView from "./view/site-menu.js";
import FiltersView from "./view/filters.js";
import SortView from "./view/sort.js";

import NoEventView from "./view/no-event";
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


const renderRouteEvent =(container, routeEvent) => {
  const eventComponent = new EventView(routeEvent);
  const eventEditComponent = new EditFormView(routeEvent);

  const replaceCardToForm = () => {
    container.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToCard = () => {
    container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });


  render(container, eventComponent.getElement(), RenderPosition.BEFOREEND);
}


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


// Найдем основной контейнер
const mainContainerElement = document.querySelector(`.trip-events`);


if (routeEvents.length === 0) {
  render(mainContainerElement, new NoEventView().getElement(), RenderPosition.BEFOREEND);
} else {
  // Сортировка
  render(mainContainerElement, new SortView().getElement(), RenderPosition.BEFOREEND);


  // Контейнер точек маршрута
  render(mainContainerElement, new RouteContainerView().getElement(), RenderPosition.BEFOREEND);

  const routeContainerElement = mainContainerElement.querySelector(`.trip-days`);


  // Наполняем событиями
  let dayIndex = 1;
  let previousMoment = moment(veryOldMoment);

  let dayEventsContainerElement = null;

  for (let i = 0; i < EVENT_COUNT; i++) {
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

    renderRouteEvent(dayEventsContainerElement, routeEvents[i]);
  }
}
