import FiltersView from "../view/filter.js";
import {render, replace, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {RenderPosition, FilterType, UpdateType} from "../const.js";


export default class FiltersPresenter {
  constructor(filterContainer, filterModel, eventsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }


  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FiltersView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTEREND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }


  _handleModelEvent() {
    this.init();
  }


  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }


  _getFilters() {
    const tripEvents = this._eventsModel.getEvents();

    return [
      {
        type: FilterType.EVERYTHING,
        name: `EVERYTHING`,
        count: filter[FilterType.EVERYTHING](tripEvents).length
      },
      {
        type: FilterType.FUTURE,
        name: `FUTURE`,
        count: filter[FilterType.FUTURE](tripEvents).length
      },
      {
        type: FilterType.PAST,
        name: `PAST`,
        count: filter[FilterType.PAST](tripEvents).length
      }
    ];
  }
}
