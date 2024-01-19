
export type CommonResponseType<T> = {
  status: number;
  message: string;
  result: T;
};