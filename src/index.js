import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";
// import {dbstore} from 'data/dbstore'
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    
     
      <React.Fragment>
        <BrowserRouter>
        <Provider store={store}>
        <App />
        </Provider>
        </BrowserRouter>
      </React.Fragment>
      
  
);

serviceWorker.unregister()
