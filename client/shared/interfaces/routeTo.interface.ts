//in here we set the destination, who this message is intended for (most of the times same as CalledPartyID of CallDetailsInterface)
export interface routeTo {
  id: string;
  name?: string;
}

export const getRouteTo = (id: string, name: string = ""): routeTo => {
  const routeTo: routeTo = {
    id: id,
    name: name,
  };
  return routeTo;
};

export const isRouteTo = (data: unknown): data is routeTo => {
  return (
    (data as routeTo).id !== undefined && (data as routeTo).name !== undefined
  );
};

export const parseRouteTo = (data: unknown): routeTo | null => {
  let dataIF: routeTo | null = null;

  if (data !== null && data !== undefined) {
    if (isRouteTo(data)) {
      /* dataIF = getrouteTo(data.id, data.name); */
      dataIF = data as routeTo;
    }
  }
  return dataIF;
};
