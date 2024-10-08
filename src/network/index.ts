import axios from 'axios';
import { TResponse } from '../types';


export const fetchIPs = async (ip: string) => {
  try {
    return await(await axios.get<TResponse>(`http://ip-api.com/json/${ip}`)).data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error((error as Error).message ?? 'Что-то пошло не так');
  }
}
