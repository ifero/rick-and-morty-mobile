import React, {
  ComponentType,
  FC,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { render } from '@testing-library/react-native';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'utils/http/httpClient';

const QueryClientWrapper: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export const renderWithHttpClient = (
  component: ReactElement,
  wrapper?: ComponentType<any>,
) => {
  return render(<QueryClientWrapper children={component} />, { wrapper });
};
