import Home from "./components/Home";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

function App() {
  let [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  function showAlert(alertObject) {
    setAlert(alertObject);
    setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, 1500);
  }
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-5 h-full ">
      {" "}
      <span>
        <h1 className="font-bold text-5xl text-blue-950 text-center">
          Github{" "}
          <mark className="px-2 text-white bg-indigo-800 rounded">Search</mark>{" "}
        </h1>
      </span>
      <Home alert={alert} showAlert={showAlert} />
    </div>
  );
}

export default App;
