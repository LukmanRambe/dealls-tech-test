import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import { NextPageWithLayout } from '../ts/types/NextPageWithLayout';

type AppPropsWith = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppPropsWith) => {
  const get = Component.getLayout || ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      {get(<Component {...pageProps} />)}
    </QueryClientProvider>
  );
};

export default MyApp;
