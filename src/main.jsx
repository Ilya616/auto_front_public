import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store";
import { Provider } from "react-redux";
import { ApolloProvider } from '@apollo/client/react';
import echo from './echo';


import App from "./App.jsx";
import createApolloClient from "./apollo/client.js";

const client = createApolloClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </StrictMode>
);
