import Observer from "../utils/observer.js";

export default class EventsModel extends Observer {
  constructor() {
    super();
    this._events = [];
  }


  setEvents(tripEvents) {
    this._events = tripEvents.slice();
  }


  getEvents() {
    return this._events;
  }


  updateEvent(updateType, update) {
    const index = this._events.findIndex((tripEvent) => tripEvent.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting trip event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType, update);
  }


  addEvent(updateType, update) {
    this._events = [
      update,
      ...this._events
    ];

    this._notify(updateType, update);
  }


  deleteEvent(updateType, update) {
    const index = this._events.findIndex((tripEvent) => tripEvent.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting trip event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
