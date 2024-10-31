import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import Layout from "./shared/Layout.tsx";
import PreventZoom from "./shared/PreventZoom.tsx";
import Modal from "react-modal";
import {Provider} from "react-redux";
import {store} from "@/store/store.ts";

declare global {
    interface Window {
        Telegram: any
    }
}

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <PreventZoom />
              <Layout />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
)
