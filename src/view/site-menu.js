import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

const createSiteMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn"
                 id="menu-item-${MenuItem.TABLE.toLowerCase()}" href="#">Table</a>
              <a class="trip-tabs__btn"
                 id="menu-item-${MenuItem.STATS.toLowerCase()}" href="#">Stats</a>
            </nav>`;
};


export default class SiteMenuView extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }


  getTemplate() {
    return createSiteMenuTemplate();
  }


  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.value);
  }


  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }


  setMenuItem(newItem) {
    if (newItem === null) {
      return;
    }

    const items = this.getElement().querySelectorAll(`.trip-tabs__btn`);

    items.forEach((item) => {
      if (item.id === `menu-item-${newItem.toLowerCase()}`) {
        item.classList.add(`trip-tabs__btn--active`);
      } else {
        item.classList.remove(`trip-tabs__btn--active`);
      }
    });
  }
}
