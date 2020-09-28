import TripInfoView from "./view/trip-info.js";
import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import NewEventButtonView from "./view/new-event-button.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";

import {generateEvent} from "./mock/event.js";
import {render, remove} from "./utils/render.js";
import {RenderPosition, MenuItem, UpdateType, FilterType} from "./const.js";


const EVENT_COUNT = 20;

const tripEventsArray = new Array(EVENT_COUNT).fill(undefined).map(generateEvent)
  .sort((a, b) => a.startMoment.diff(b.startMoment));

const eventsModel = new EventsModel();
eventsModel.setEvents(tripEventsArray);

const filterModel = new FilterModel();


const headerTripHeaderElement = document.querySelector(`.trip-main`);
const headerTripControls = headerTripHeaderElement
  .querySelector(`.trip-main__trip-controls`)
  .querySelectorAll(`h2`);

const siteMenuComponent = new SiteMenuView();
const newEventButtonComponent = new NewEventButtonView();


// Информация о маршруте
render(headerTripHeaderElement, new TripInfoView(tripEventsArray), RenderPosition.AFTERBEGIN);

// Меню
render(headerTripControls[0], siteMenuComponent, RenderPosition.AFTEREND);
siteMenuComponent.setMenuItem(MenuItem.TABLE_MENU_ITEM);

// Фильтры
const filterPresenter = new FilterPresenter(headerTripControls[1], filterModel, eventsModel);
// Кнопка добавления новой точки
render(headerTripHeaderElement, newEventButtonComponent, RenderPosition.BEFOREEND);

// Основной контейнер с точками маршрута
const tripPresenter = new TripPresenter(eventsModel, filterModel);


const handleEventNewFormClose = () => {
  newEventButtonComponent.getElement().disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TABLE_MENU_ITEM);
};


let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE_MENU_ITEM:
      // Показать список точек
      tripPresenter.init();
      siteMenuComponent.setMenuItem(MenuItem.TABLE_MENU_ITEM);

      // Скрыть статистику
      remove(statisticsComponent);
      break;
    case MenuItem.STATS_MENU_ITEM:
      // Скрыть список точек
      tripPresenter.destroy();

      // Показать статистику
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(document.querySelector(`.page-body__page-main`)
        .querySelector(`.page-body__container`), statisticsComponent, RenderPosition.BEFOREEND);
      siteMenuComponent.setMenuItem(MenuItem.STATS_MENU_ITEM);
      break;
  }
};
siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);


const handleNewEventButtonClick = () => {
  // Скрыть статистику
  remove(statisticsComponent);

  // Показать список точек
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();

  // Показать форму добавления новой задачи
  tripPresenter.createEvent(handleEventNewFormClose);

  // Убрать выделение с ADD NEW TASK после сохранения
  newEventButtonComponent.getElement().disabled = true;
  siteMenuComponent.setMenuItem(MenuItem.NONE_MENU_ITEM);
};
newEventButtonComponent.setNewEventButtonClickHandler(handleNewEventButtonClick);


filterPresenter.init();
tripPresenter.init();
