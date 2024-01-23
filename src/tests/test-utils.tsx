import React, {FC, ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RecoilRoot} from 'recoil';

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders: FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <QueryClientProvider client={testQueryClient}>
      <RecoilRoot>{children}</RecoilRoot>
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react';
export {customRender as render};
