import TripInfoView from "./view/trip-info.js";
import SiteMenuView from "./view/site-menu.js";
import FiltersView from "./view/filters.js";
import SortView from "./view/sort.js";

import NoEventView from "./view/no-event";
import TripContainerView from "./view/trip-container.js";
import DayView from "./view/day.js";
import DayEventsContainerView from "./view/day-events-container.js";

import EventView from "./view/event.js";
import EditFormView from "./view/edit-form.js";
import {generateEvent} from "./mock/event.js";

import {render, RenderPosition, replace} from "./utils/render.js";
import {veryOldMoment} from "./utils/event.js";

import moment from 'moment';


const EVENT_COUNT = 20;

const tripEventsArray = new Array(EVENT_COUNT).fill(undefined).map(generateEvent)
  .sort((a, b) => a.startMoment.diff(b.startMoment));


const headerTripInfoElement = document.querySelector(`.trip-main`);
const headerTripControls = headerTripInfoElement
  .querySelector(`.trip-main__trip-controls`)
  .querySelectorAll(`h2`);

// Найдем основной контейнер
const mainContainer = document.querySelector(`.trip-events`);


const renderTripEvent = (container, tripEvent) => {
  const eventComponent = new EventView(tripEvent);
  const eventEditComponent = new EditFormView(tripEvent);

  const replaceCardToForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToCard = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });


  render(container, eventComponent, RenderPosition.BEFOREEND);
}


const renderMainContainer = (mainContainerElement, tripEvents) => {
  // Если точек на маршруте нет - рисуем заглушку
  if (tripEvents.length === 0) {
    render(mainContainerElement, new NoEventView(), RenderPosition.BEFOREEND);
    return;
  }
  // Сортировка
  render(mainContainerElement, new SortView(), RenderPosition.BEFOREEND);


  // Контейнер точек маршрута
  render(mainContainerElement, new TripContainerView(), RenderPosition.BEFOREEND);

  const tripContainerElement = mainContainerElement.querySelector(`.trip-days`);


  // Наполняем событиями
  let dayIndex = 1;
  let previousMoment = moment(veryOldMoment);

  let dayEventsContainerElement = null;

  for (let i = 0; i < EVENT_COUNT; i++) {
    const {startMoment} = tripEvents[i];
    const currentMoment = moment(startMoment);
    // const currentDayMilliseconds = getDayMilliseconds(startTime);

    // Вставляем блок очередного дня
    if (!previousMoment.isSame(currentMoment, `day`)) {
      render(tripContainerElement, new DayView(startMoment, dayIndex), RenderPosition.BEFOREEND);

      // Контейнер точек дня
      const days = tripContainerElement.querySelectorAll(`.trip-days__item`);
      const dayElement = days[days.length - 1];
      render(dayElement, new DayEventsContainerView(), RenderPosition.BEFOREEND);

      // Точки дня
      dayEventsContainerElement = dayElement.querySelector(`.trip-events__list`);

      previousMoment = moment(currentMoment);
      dayIndex++;
    }

    renderTripEvent(dayEventsContainerElement, tripEvents[i]);
  }
}

//////////////////////////////////////////////
// Основной блок
//////////////////////////////////////////////

// Информация о маршруте
render(headerTripInfoElement, new TripInfoView(tripEventsArray), RenderPosition.AFTERBEGIN);

// Меню
render(headerTripControls[0], new SiteMenuView(), RenderPosition.AFTEREND);
// Фильтры
render(headerTripControls[1], new FiltersView(), RenderPosition.AFTEREND);

// Основной контейнер с точками маршрута
renderMainContainer(mainContainer, tripEventsArray);
