import EventView from "../view/event.js";
import EditFormView from "../view/edit-form.js";

import {render, RenderPosition, replace} from "../utils/render.js";


export default class EventPresenter {
  constructor(eventsContainer) {
    this._eventsContainer = eventsContainer;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }


  init(tripEvent) {
    this._tripEvent = tripEvent;

    this._eventComponent = new EventView(tripEvent);
    this._eventEditComponent = new EditFormView(tripEvent);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._eventsContainer, this._eventComponent, RenderPosition.BEFOREEND);
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
      this._replaceFormToCard();
    }
  }


  _handleEditClick() {
    this._replaceCardToForm();
  }


  _handleFormSubmit() {
    this._replaceFormToCard();
  }
}
