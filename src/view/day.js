import {getDayAsString, getDateISOFormat} from "../utils.js";

export const createDayTemplate = (date, dayIndex) => {
  return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${dayIndex}</span>
                <time class="day__date" datetime="${getDateISOFormat(date)}">${getDayAsString(date).toUpperCase()}</time>
              </div>
     </li>`;
};
