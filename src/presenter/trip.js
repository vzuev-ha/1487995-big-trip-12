import SortView from "../view/sort.js";

import NoEventView from "../view/no-event";
import TripContainerView from "../view/trip-container.js";
import DayView from "../view/day.js";
import DayEventsContainerView from "../view/day-events-container.js";

import EventPresenter from "./event.js";

import {render, RenderPosition} from "../utils/render.js";
import {
  veryOldMoment,
  SortType,
  SortDirection,
  sortEventsByDefault,
  sortEventsByTime,
  sortEventsByPrice
} from "../utils/event.js";
import moment from "moment";


export default class TripPresenter {
  constructor(eventsModel) {
    this._eventsModel = eventsModel;

    // Найдем основной контейнер
    this._mainContainerElement = document.querySelector(`.trip-events`);
    this._prevSortType = SortType.EVENT;
    this._currentSortType = SortType.EVENT;
    this._currentSortDirection = SortDirection.ASCENDING;
    this._eventPresentersList = {};

    this._sortComponent = null; // Будем пересоздавать его при рендеринге, а тут застолбим свойство класса
    this._tripContainerComponent = new TripContainerView();
    this._noEventsComponent = new NoEventView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }


  init() {
    this._renderTrip();
  }


  _getEvents() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._eventsModel.getEvents().slice().sort(sortEventsByTime(this._currentSortDirection));
      case SortType.PRICE:
        return this._eventsModel.getEvents().slice().sort(sortEventsByPrice(this._currentSortDirection));
    }

    // case SortType.EVENT:
    return this._eventsModel.getEvents().slice().sort(sortEventsByDefault);
  }


  _handleModeChange() {
    Object
      .values(this._eventPresentersList)
      .forEach((presenter) => presenter.resetView());
  }


  _handleEventChange(updatedEvent) {
    // Здесь будем вызывать обновление модели
    this._eventPresentersList[updatedEvent.id].init(updatedEvent);
  }


  _toggleSortDirection() {
    if (this._currentSortType === this._prevSortType && this._currentSortDirection === SortDirection.ASCENDING) {
      this._currentSortDirection = SortDirection.DESCENDING;
    } else {
      // Здесь же отработает условие первого клика по новой сортировке:
      //   if (this._currentSortType !== sortType)
      this._currentSortDirection = SortDirection.ASCENDING;
    }

    this._prevSortType = this._currentSortType;
  }


  _handleSortTypeChange(sortType) {
    // this._sortEvents(sortType);
    this._currentSortType = sortType;
    this._toggleSortDirection();

    this._clearEventPresentersList();
    this._sortComponent.getElement().remove();
    this._sortComponent.removeElement();
    this._tripContainerComponent.getElement().remove();
    this._tripContainerComponent.removeElement();

    this._renderSort(this._currentSortType, this._currentSortDirection);

    if (this._currentSortType === SortType.EVENT) {
      this._renderTripContainerGrouped();
    } else {
      this._renderTripContainerSorted();
    }
  }


  _clearEventPresentersList() {
    Object
      .values(this._eventPresentersList)
      .forEach((presenter) => presenter.destroy());
    this._eventPresentersList = {};
  }


  _renderSort(sortType, sortDirection) {
    this._sortComponent = new SortView(sortType, sortDirection);
    render(this._mainContainerElement, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }


  _renderNoEvents() {
    render(this._mainContainerElement, this._noEventsComponent, RenderPosition.BEFOREEND);
  }


  _renderTripEvent(container, tripEvent) {
    const eventPresenter = new EventPresenter(container, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(tripEvent);
    this._eventPresentersList[tripEvent.id] = eventPresenter;
  }


  _renderTripContainerGrouped() {
    render(this._mainContainerElement, this._tripContainerComponent, RenderPosition.BEFOREEND);

    // Это уже не нужно искать, так как _tripContainerComponent содержит единственный элемент без детей
    // Но мы оставим строчку на память, чтобы не путаться потом при анализе кода, куда делись .trip-days
    // const tripContainerElement = this._mainContainerElement.querySelector(`.trip-days`);

    const tripEvents = this._getEvents();

    // Наполняем событиями
    let dayIndex = 1;
    let previousMoment = moment(veryOldMoment);

    let dayEventsContainerElement = null;

    // Перебираем точки маршрута, группируя их по дням
    for (let i = 0; i < tripEvents.length; i++) {
      const {startMoment} = tripEvents[i];
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

      // Вставляем точку маршрута
      this._renderTripEvent(dayEventsContainerElement, tripEvents[i]);
    }
  }


  _renderTripContainerSorted() {
    render(this._mainContainerElement, this._tripContainerComponent, RenderPosition.BEFOREEND);

    // Вставляем блок дня - единственный, так как при сортировке нет группировки
    render(this._tripContainerComponent, new DayView(null, null), RenderPosition.BEFOREEND);

    // Контейнер точек дня
    const days = this._tripContainerComponent.getElement().querySelectorAll(`.trip-days__item`);
    const dayElement = days[days.length - 1];
    render(dayElement, new DayEventsContainerView(), RenderPosition.BEFOREEND);

    // Сюда будем вставлять точки
    const dayEventsContainerElement = dayElement.querySelector(`.trip-events__list`);

    // Перебираем точки маршрута, складывая в один контейнер дня
    this._getEvents().forEach((tripEvent) =>
      this._renderTripEvent(dayEventsContainerElement, tripEvent)
    );
  }


  _renderTrip() {
    if (this._getEvents().length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort(this._currentSortType, this._currentSortDirection);
    this._renderTripContainerGrouped();
  }
}
