import {createElement, getMomentMonthDayAsString, getMomentISOFormat} from "../utils.js";

const createDayTemplate = (startMoment, dayIndex) => {
  return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${dayIndex}</span>
                <time class="day__date" datetime="${getMomentISOFormat(startMoment)}">${getMomentMonthDayAsString(startMoment).toUpperCase()}</time>
              </div>
     </li>`;
};


export default class DayView {
  constructor(startMoment, dayIndex) {
    this._startMoment = startMoment;
    this._dayIndex = dayIndex;
    this._element = createElement(this.getTemplate());
  }

  getTemplate() {
    return createDayTemplate(this._startMoment, this._dayIndex);
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
