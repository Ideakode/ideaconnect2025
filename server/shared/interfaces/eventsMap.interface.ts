import { eventMap } from "./eventMap.interface.js";

export interface eventsMap {
  events: eventMap[];
}

export const getEventsMap = (events: eventMap[]): eventsMap => {
  const eventsMap: eventsMap = {
    events: events,
  };
  return eventsMap;
};

export const isEventsMap = (data: unknown): data is eventsMap => {
  return (data as eventsMap).events !== undefined;
};

export const parseEventsMap = (data: unknown): eventsMap | null => {
  let dataIF: eventsMap | null = null;

  if (data !== null && data !== undefined) {
    if (isEventsMap(data)) {
      /*  dataIF = geteventsMap(data.events); */
      dataIF = data as eventsMap;
    }
  }
  return dataIF;
};
