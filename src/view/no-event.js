import {createElement} from "../utils.js";

const createNoEventTemplate = () => {
  return `          <p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NoEventView {
  constructor() {
    this._element = createElement(this.getTemplate());
  }

  getTemplate() {
    return createNoEventTemplate();
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
