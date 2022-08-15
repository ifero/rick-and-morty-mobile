import axios from 'axios';
import { QueryClient } from 'react-query';

export const BASE_URL = 'https://rickandmortyapi.com/graphql';

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const queryClient = new QueryClient();
