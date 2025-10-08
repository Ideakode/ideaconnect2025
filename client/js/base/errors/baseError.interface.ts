export interface baseErrorInterface {
  name: string;
  message: string;
  method: string;
}

export const getBaseErrorInterface = (
  name: string,
  message: string = "",
  method: string = ""
): baseErrorInterface => {
  const baseError: baseErrorInterface = {
    name,
    message,
    method,
  };
  return baseError;
};
