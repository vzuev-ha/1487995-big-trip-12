import {createElement} from "../utils.js";

const createRouteContainerTemplate = () => {
  return `<ul class="trip-days">
     </ul>`;
};


export default class RouteContainerView {
  constructor() {
    this._element = createElement(this.getTemplate());
  }

  getTemplate() {
    return createRouteContainerTemplate();
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
