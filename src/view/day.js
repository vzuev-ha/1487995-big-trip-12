import {getMomentMonthDayAsString, getMomentISOFormat} from "../utils.js";

export const createDayTemplate = (startMoment, dayIndex) => {
  return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${dayIndex}</span>
                <time class="day__date" datetime="${getMomentISOFormat(startMoment)}">${getMomentMonthDayAsString(startMoment).toUpperCase()}</time>
              </div>
     </li>`;
};
