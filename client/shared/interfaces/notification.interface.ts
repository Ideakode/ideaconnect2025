export interface notification {
  type: string;
  data: unknown;
}

export const getNotification = (
  type: string,
  data: unknown = ""
): notification => {
  return {
    type: type,
    data: data,
  } as notification;
};

export const isNotification = (data: unknown): data is notification => {
  return (
    (data as notification).type !== undefined &&
    (data as notification).data !== undefined
  );
};

export const parseNotification = (data: unknown): notification | null => {
  let dataIF: notification | null = null;
  if (data !== null && data !== undefined) {
    if (isNotification(data)) {
      /* dataIF = getnotification(data.notificationType, data.data); */
      dataIF = data as notification;
    }
  }
  return dataIF;
};
