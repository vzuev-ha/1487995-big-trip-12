import SortView from "../view/sort.js";

import NoEventView from "../view/no-event";
import TripContainerView from "../view/trip-container.js";
import DayView from "../view/day.js";
import DayEventsContainerView from "../view/day-events-container.js";

import EventView from "../view/event.js";
import EditFormView from "../view/edit-form.js";

import {render, RenderPosition, replace} from "../utils/render.js";
import {veryOldMoment} from "../utils/event.js";
import moment from "moment";


export default class TripPresenter {
  constructor() {
    // Найдем основной контейнер
    this._mainContainerElement = document.querySelector(`.trip-events`);


    this._sortComponent = new SortView();
    this._tripContainerComponent = new TripContainerView();
    this._noEventsComponent = new NoEventView();
  }


  init(tripEvents) {
    this._tripEvents = tripEvents.slice();

    this._renderTrip();
  }


  _renderSort() {
    render(this._mainContainerElement, this._sortComponent, RenderPosition.BEFOREEND);
  }


  _renderNoEvents() {
    render(this._mainContainerElement, this._noEventsComponent, RenderPosition.BEFOREEND);
  }


  _renderTripEvent(container, tripEvent) {
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


  _renderTripContainer() {
    render(this._mainContainerElement, this._tripContainerComponent, RenderPosition.BEFOREEND);

    // Это уже не нужно искать, так как _tripContainerComponent содержит единственный элемент без детей
    // Но мы оставим строчку на память, чтобы не путаться потом при анализе кода, куда делись .trip-days
    // const tripContainerElement = this._mainContainerElement.querySelector(`.trip-days`);


    // Наполняем событиями
    let dayIndex = 1;
    let previousMoment = moment(veryOldMoment);

    let dayEventsContainerElement = null;

    // Перебираем точки маршрута, группируя их по дням
    for (let i = 0; i < this._tripEvents.length; i++) {
      const {startMoment} = this._tripEvents[i];
      const currentMoment = moment(startMoment);

      // Вставляем блок очередного дня
      if (!previousMoment.isSame(currentMoment, `day`)) {
        render(this._tripContainerComponent, new DayView(startMoment, dayIndex), RenderPosition.BEFOREEND);

        // Контейнер точек дня
        const days = this._tripContainerComponent.getElement().querySelectorAll(`.trip-days__item`);
        const dayElement = days[days.length - 1];
        render(dayElement, new DayEventsContainerView(), RenderPosition.BEFOREEND);

        // Сюда будем вставлять точки
        dayEventsContainerElement = dayElement.querySelector(`.trip-events__list`);

        previousMoment = moment(currentMoment);
        dayIndex++;
      }

      this._renderTripEvent(dayEventsContainerElement, this._tripEvents[i]);
    }
  }


  _renderTrip() {
    if (this._tripEvents.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderTripContainer();
  }
}
