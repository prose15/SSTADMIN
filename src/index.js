import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import  { ContextProvider } from "Context/ContextProvider";
import { Provider } from "react-redux";
// import {dbstore} from 'data/dbstore'
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(  
      <React.Fragment>
        <BrowserRouter>
        <Provider store={store} >
          <ContextProvider>
          <App />
          </ContextProvider>
        </Provider>
        </BrowserRouter>
      </React.Fragment>
);

serviceWorker.unregister()
