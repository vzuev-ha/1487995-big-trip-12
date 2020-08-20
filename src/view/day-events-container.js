import {createElement} from "../utils.js";

export const createDayEventsContainerTemplate = () => {
  return (
    `<ul class="trip-events__list">
     </ul>`
  );
};


export default class DayEventsContainerView {
  constructor() {
    this._element = createElement(this.getTemplate());
  }

  getTemplate() {
    return createDayEventsContainerTemplate();
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
