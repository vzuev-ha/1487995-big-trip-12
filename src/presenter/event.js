import EventView from "../view/event.js";
import EditFormView from "../view/edit-form.js";
import {WorkMode, RenderPosition, UserAction, UpdateType} from "../const.js";

import {render, replace, remove} from "../utils/render.js";


export default class EventPresenter {
  constructor(eventsContainer, changeData, changeMode) {
    this._eventsContainer = eventsContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = WorkMode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleCancelEditClick = this._handleCancelEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }


  init(tripEvent) {
    this._tripEvent = tripEvent;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(tripEvent);
    this._eventEditComponent = new EditFormView(tripEvent);

    this._eventComponent.setEditClickHandler(this._handleEditClick);

    this._eventEditComponent.setCancelEditClickHandler(this._handleCancelEditClick);
    this._eventEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventsContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === WorkMode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === WorkMode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }


  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }


  resetView() {
    if (this._mode !== WorkMode.DEFAULT) {
      this._replaceFormToCard();
    }
  }


  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = WorkMode.EDITING;
  }


  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = WorkMode.DEFAULT;
  }


  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._tripEvent);
      this._replaceFormToCard();
    }
  }


  _handleEditClick() {
    this._replaceCardToForm();
  }


  _handleCancelEditClick() {
    this._eventEditComponent.reset(this._tripEvent);
    this._replaceFormToCard();
  }


  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_EVENT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._tripEvent,
            {
              isFavorite: !this._tripEvent.isFavorite
            }
        )
    );
  }


  _handleFormSubmit(updatedEvent) {
    // Проверяем, поменялись ли в точке данные, которые попадают под фильтрацию,
    // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление
    const isMinorUpdate = false;
    //   !isDatesEqual(this._task.dueDate, updatedEvent.dueDate) ||
    //   isTaskRepeating(this._task.repeating) !== isTaskRepeating(update.repeating);

    this._changeData(
        UserAction.UPDATE_EVENT,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        updatedEvent
    );
    this._replaceFormToCard();
  }


  _handleDeleteClick(tripEvent) {
    this._changeData(
        UserAction.DELETE_EVENT,
        UpdateType.MINOR,
        tripEvent
    );
  }
}
