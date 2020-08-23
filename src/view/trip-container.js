import AbstractView from "./abstract.js";

const createTripContainerTemplate = () => {
  return `<ul class="trip-days">
     </ul>`;
};


export default class TripContainerView extends AbstractView {
  getTemplate() {
    return createTripContainerTemplate();
  }
}
