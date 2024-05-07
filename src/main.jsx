import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import GithubState from "./contexts/Github/GithubState.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GithubState>
    <App />
  </GithubState>
);
