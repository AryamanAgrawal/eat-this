import React from "react";
import App from "./App";
import { createRoot } from 'react-dom/client';
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>,
);