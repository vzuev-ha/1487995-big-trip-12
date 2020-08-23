import AbstractView from "./abstract.js";

export const createDayEventsContainerTemplate = () => {
  return (
    `<ul class="trip-events__list">
     </ul>`
  );
};


export default class DayEventsContainerView extends AbstractView {
  getTemplate() {
    return createDayEventsContainerTemplate();
  }
}
