import AbstractView from "./abstract.js";
import {SortType, SortDirection} from "../const.js";


const createSortTemplate = (paramSortType, paramSortDirection) => {

  const filterItemsString = Object.entries(SortType).map(([, sortValue]) => {
    const sortCaption = sortValue.charAt(0).toUpperCase() + sortValue.slice(1);
    const isChecked = (sortValue === paramSortType)
      ? `checked`
      : ``;

    const sortDirectionClass = (paramSortDirection === SortDirection.DESCENDING)
      ? `trip-sort__btn--by-decrease`
      : ``;

    const isDirectionIconHidden = (sortValue !== paramSortType)
      ? `trip-sort__direction-icon__hidden`
      : ``;

    const sortDirectionIcon = (paramSortType === SortType.EVENT)
      ? ``
      : `                <svg class="trip-sort__direction-icon ${isDirectionIconHidden}" width="8" height="10" viewBox="0 0 8 10">
                  <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                </svg>
`;

    return `            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-${sortValue}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortValue}" ${isChecked}>
              <label class="trip-sort__btn ${sortDirectionClass}" for="sort-${sortValue}" data-sort-type="${sortValue}">
                ${sortCaption}
                ${sortDirectionIcon}
              </label>
            </div>

`;
  }).join(``);


  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <span class="trip-sort__item  trip-sort__item--day">${(paramSortType === SortType.EVENT) ? `Day` : ``}
            </span>

            ${filterItemsString}

            <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
          </form>`;
};


export default class SortView extends AbstractView {
  constructor(currentSortType, currentSortDirection) {
    super();

    this._currentSortType = currentSortType;
    this._currentSortDirection = currentSortDirection;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType, this._currentSortDirection);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
