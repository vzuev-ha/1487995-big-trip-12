import AbstractView from "./abstract.js";

export const createNewEventButtonTemplate = () => {
  return (
    `          <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};


export default class NewEventButtonView extends AbstractView {
  constructor() {
    super();

    this._newEventButtonClickHandler = this._newEventButtonClickHandler.bind(this);
  }


  getTemplate() {
    return createNewEventButtonTemplate();
  }


  _newEventButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.newEventButtonClick(evt.target.value);
  }


  setNewEventButtonClickHandler(callback) {
    this._callback.newEventButtonClick = callback;
    this.getElement().addEventListener(`click`, this._newEventButtonClickHandler);
  }
}
