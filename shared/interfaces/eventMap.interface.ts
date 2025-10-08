export interface eventMap {
  eventName: string;
  eventCallback: (...args: unknown[]) => void;
}

export const getEventMap = (
  eventName: string,
  eventCallback: (...args: unknown[]) => void
): eventMap => {
  const eventMap: eventMap = {
    eventName,
    eventCallback,
  };
  return eventMap;
};

export const isEventMap = (data: unknown): data is eventMap => {
  return (
    (data as eventMap).eventCallback !== undefined &&
    (data as eventMap).eventName !== undefined
  );
};

export const parseeventMap = (data: unknown): eventMap | null => {
  let dataIF: eventMap | null = null;

  if (data !== null && data !== undefined) {
    if (isEventMap(data)) {
      /* dataIF = geteventMap(data.eventName, data.eventCallback); */
      dataIF = data as eventMap;
    }
  }
  return dataIF;
};
