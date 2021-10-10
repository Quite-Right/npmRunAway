import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:8080/',
  timeout: 2000,
};

export const instance: AxiosInstance = axios.create(config);

export const logEvent = (
  eventName: string,
  payload: Record<string, any>,
): Promise<any> => {
  return axios.post('/events', {
    eventName,
    payload,
  });
};
