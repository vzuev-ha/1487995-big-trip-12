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
}
