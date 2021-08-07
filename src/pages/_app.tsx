import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import storePersist from "@store";

import Layout from "@components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const { store, persistor } = storePersist();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
