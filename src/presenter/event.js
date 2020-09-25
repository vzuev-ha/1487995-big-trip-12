import EventView from "../view/event.js";
import EditFormView from "../view/edit-form.js";

import {render, RenderPosition, replace, remove} from "../utils/render.js";


export default class EventPresenter {
  constructor(eventsContainer, changeData) {
    this._eventsContainer = eventsContainer;
    this._changeData = changeData;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleCancelEditClick = this._handleCancelEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
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

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventsContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._eventsContainer.contains(prevEventComponent.getElement())) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._eventsContainer.contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }


  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }


  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }


  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
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
        Object.assign(
            {},
            this._tripEvent,
            {
              isFavorite: !this._tripEvent.isFavorite
            }
        )
    );
  }


  _handleFormSubmit(tripEvent) {
    this._changeData(tripEvent);
    this._replaceFormToCard();
  }
}
