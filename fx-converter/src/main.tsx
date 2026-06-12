import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import HistoryPage from "./pages/HistoryPage.tsx";
import ComparePage from "./pages/ComparePage.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import LogPage from "./pages/LogPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HistoryPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="log" element={<LogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
