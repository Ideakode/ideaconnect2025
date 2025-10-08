export interface total {
  total: string;
}

export const getTotal = (total: string): total => {
  const totalConnectedStrangersInterface: total = {
    total: total,
  };
  return totalConnectedStrangersInterface;
};

export const isTotal = (data: unknown): data is total => {
  return (data as total).total !== undefined;
};

export const parseTotal = (data: unknown): total | null => {
  let dataIF: total | null = null;

  if (data !== null && data !== undefined) {
    if (isTotal(data)) {
      /* dataIF = gettotal(data.total); */
      dataIF = data as total;
    }
  }
  return dataIF;
};
