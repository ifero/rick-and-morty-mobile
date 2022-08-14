import axios from 'axios';
import { QueryClient } from 'react-query';

export const httpClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/graphql',
  timeout: 10000,
});

export const queryClient = new QueryClient();
