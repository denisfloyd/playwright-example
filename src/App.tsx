import {ErrorBoundary} from 'react-error-boundary';
import {RecoilRoot} from 'recoil';
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import RouterProvider from '@/router/routes';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // showing error message
      alert(`${error} -> ${query}`);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      // showing error message
      alert(
        `${error} -> ${JSON.stringify(mutation)}, ${JSON.stringify(_variables)}, ${JSON.stringify(
          _context
        )}`
      );
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RouterProvider />
        </RecoilRoot>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
