import AbstractView from "./abstract.js";

export const createNewEventButtonTemplate = () => {
  return (
    `          <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};


export default class NewEventButtonView extends AbstractView {
  getTemplate() {
    return createNewEventButtonTemplate();
  }
}
