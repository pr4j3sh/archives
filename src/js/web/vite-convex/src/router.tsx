import Root from "./pages/root";
import Auth from "./pages/auth";
import { createBrowserRouter } from "react-router-dom";
import Data from "./pages/data";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "auth",
    element: <Auth />,
  },
  {
    path: "data",
    element: <Data />,
  },
]);
