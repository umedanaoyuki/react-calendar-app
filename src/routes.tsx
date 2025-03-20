import { createBrowserRouter } from "react-router-dom";
import { TopPage } from "./components/pages/TopPage";
import { LoginPage } from "./components/pages/LoginPage";

export const router = createBrowserRouter([
  { path: "/", element: <TopPage /> },
  { path: "/login", element: <LoginPage /> },
]);
