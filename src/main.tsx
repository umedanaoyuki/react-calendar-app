import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/output.css";
import "./styles/destyle.css";
import { TopPage } from "./components/pages/TopPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TopPage />
  </StrictMode>
);
