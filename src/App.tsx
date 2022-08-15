import { FC } from 'react';
import { QueryClientProvider } from 'react-query';
import Router from 'navigation/Router';
import { queryClient } from 'utils/http/httpClient';

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
