import {FilterType} from "../const.js";
import {isMomentInTheFuture, isMomentInThePast} from "./event.js";

export const filter = {
  [FilterType.EVERYTHING]: (events) => events.slice(),
  [FilterType.FUTURE]: (events) => events.filter((tripEvent) => isMomentInTheFuture(tripEvent.startMoment)),
  [FilterType.PAST]: (events) => events.filter((tripEvent) => isMomentInThePast(tripEvent.endMoment))
};
