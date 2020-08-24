import {getMomentMonthDayAsString, getMomentISOFormat} from "../utils/event.js";
import AbstractView from "./abstract.js";

const createDayTemplate = (startMoment, dayIndex) => {
  const dayIndexString = (dayIndex !== null)
    ? `<span class="day__counter">${dayIndex}</span>`
    : ``;

  const dateString = (startMoment !== null)
    ? `<time class="day__date" datetime="${getMomentISOFormat(startMoment)}">${getMomentMonthDayAsString(startMoment).toUpperCase()}</time>`
    : ``;

  return `<li class="trip-days__item  day">
              <div class="day__info">
                ${dayIndexString}
                ${dateString}
              </div>
     </li>`;
};


export default class DayView extends AbstractView {
  constructor(startMoment, dayIndex) {
    super();
    this._startMoment = startMoment;
    this._dayIndex = dayIndex;
  }

  getTemplate() {
    return createDayTemplate(this._startMoment, this._dayIndex);
  }
}
