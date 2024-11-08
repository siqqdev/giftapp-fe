import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import Layout from "./shared/Layout.tsx";
import PreventZoom from "./shared/PreventZoom.tsx";
import Modal from "react-modal";
import {Provider} from "react-redux";
import {store} from "@/store/store.ts";
import {I18nextProvider} from "react-i18next";
import i18n from "@/i18n.ts";

declare global {
    interface Window {
        Telegram: any
    }
}

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <I18nextProvider i18n={i18n}>
              <Provider store={store}>
                  <PreventZoom />
                  <Layout />
              </Provider>
          </I18nextProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
