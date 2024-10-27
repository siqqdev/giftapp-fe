import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import Layout from "./shared/Layout.tsx";
import PreventZoom from "./shared/PreventZoom.tsx";

declare global {
    interface Window {
        Telegram: any
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <PreventZoom />
          <Layout />
      </BrowserRouter>
  </React.StrictMode>,
)
