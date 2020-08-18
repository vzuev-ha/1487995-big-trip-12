import moment from 'moment';


const eventToFilterMap = {
  all: (routeEvents) => routeEvents.slice().length,
  future: (routeEvents) => routeEvents
    .filter((routeEvent) => routeEvent.startTime > moment()).length,
  past: (routeEvents) => routeEvents
    .filter((routeEvent) => routeEvent.startTime < moment()).length
};
