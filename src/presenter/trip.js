import SortView from "../view/sort.js";

import NoEventView from "../view/no-event";
import TripContainerView from "../view/trip-container.js";
import DayView from "../view/day.js";
import DayEventsContainerView from "../view/day-events-container.js";

import EventPresenter from "./event.js";
import {updateItem} from "../utils/common.js";

import {render, RenderPosition} from "../utils/render.js";
import {
  veryOldMoment,
  SortType,
  SortDirection,
  sortEventsByDefault,
  sortEventsByTimeAsc,
  sortEventsByTimeDesc,
  sortEventsByPriceAsc,
  sortEventsByPriceDesc
} from "../utils/event.js";
import moment from "moment";


export default class TripPresenter {
  constructor() {
    // Найдем основной контейнер
    this._mainContainerElement = document.querySelector(`.trip-events`);
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


  init(tripEvents) {
    this._tripEvents = tripEvents.slice();

    this._renderTrip();
  }


  _handleModeChange() {
    Object
      .values(this._eventPresentersList)
      .forEach((presenter) => presenter.resetView());
  }


  _handleEventChange(updatedEvent) {
    this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    this._eventPresentersList[updatedEvent.id].init(updatedEvent);
  }


  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.EVENT:
        if (this._currentSortType !== sortType) {
          this._currentSortDirection = SortDirection.ASCENDING;
          this._tripEvents.sort(sortEventsByDefault);
        }
        break;
      case SortType.TIME:
        if (this._currentSortType === sortType && this._currentSortDirection === SortDirection.ASCENDING) {
          this._currentSortDirection = SortDirection.DESCENDING;
          this._tripEvents.sort(sortEventsByTimeDesc);
        } else {
          this._currentSortDirection = SortDirection.ASCENDING;
          this._tripEvents.sort(sortEventsByTimeAsc);
        }
        break;
      case SortType.PRICE:
        if (this._currentSortType === sortType && this._currentSortDirection === SortDirection.ASCENDING) {
          this._currentSortDirection = SortDirection.DESCENDING;
          this._tripEvents.sort(sortEventsByPriceDesc);
        } else {
          this._currentSortDirection = SortDirection.ASCENDING;
          this._tripEvents.sort(sortEventsByPriceAsc);
        }
        break;
    }

    this._currentSortType = sortType;
  }


  _handleSortTypeChange(sortType) {
    this._sortEvents(sortType);

    this._clearTaskList();
    this._sortComponent.removeElement();
    this._tripContainerComponent.removeElement();

    this._renderSort(this._currentSortType, this._currentSortDirection);

    if (this._currentSortType === SortType.EVENT) {
      this._renderTripContainerGrouped();
    } else {
      this._renderTripContainerSorted();
    }
  }


  _clearTaskList() {
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

      // Вставляем точку маршрута
      this._renderTripEvent(dayEventsContainerElement, this._tripEvents[i]);
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
    this._tripEvents.forEach((tripEvent) =>
      this._renderTripEvent(dayEventsContainerElement, tripEvent)
    );
  }


  _renderTrip() {
    if (this._tripEvents.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort(this._currentSortType, this._currentSortDirection);
    this._renderTripContainerGrouped();
  }
}
