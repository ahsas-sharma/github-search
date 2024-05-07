import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import UserDetail from "./components/UserDetail/UserDetail.jsx";
import "./index.css";
import GithubState from "./contexts/Github/GithubState.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/:username",
    element: <UserDetail />,
    // errorElement: <ErrorPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <GithubState>
    <RouterProvider router={router} />
  </GithubState>
);
