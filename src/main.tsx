import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app/App.tsx";
import "./styles/index.css";

// Gère la redirection depuis 404.html
const params = new URLSearchParams(window.location.search);
const route = params.get("route");
if (route) {
  window.history.replaceState(null, "", route);
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/Mockupforsapapplication">
    <Routes>
      <Route path="/" element={<App forceStep="idle" />} />
      <Route path="/step2" element={<App forceStep="extracting" />} />
      <Route path="/step3" element={<App forceStep="editing" />} />
      <Route path="/step4" element={<App forceStep="done" />} />
    </Routes>
  </BrowserRouter>
);