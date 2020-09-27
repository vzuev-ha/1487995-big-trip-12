import EventEditView from "../view/event-edit.js";
import {generateId} from "../mock/event.js";
import {remove, render} from "../utils/render.js";
import {BLANK_EVENT, RenderPosition, UserAction, UpdateType} from "../const.js";


export default class EventNewPresenter {
  constructor(container, changeData) {
    this._eventListContainer = container;
    this._changeData = changeData;

    this._eventEditComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }


  init(callback) {
    this._destroyCallback = callback;

    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new EventEditView(BLANK_EVENT, UserAction.ADD_EVENT);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._eventListContainer, this._eventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }


  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }


  _handleFormSubmit(tripEvent) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        // Пока у нас нет сервера, который бы после сохранения
        // выдывал честный id задачи, нам нужно позаботиться об этом самим
        Object.assign({id: generateId()}, tripEvent)
    );
    this.destroy();
  }


  _handleDeleteClick() {
    this.destroy();
  }


  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
