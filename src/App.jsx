import Home from "./components/Home";
import UserDetail from "./components/UserDetail/UserDetail.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";

function App() {
  // let [alert, setAlert] = useState({
  //   type: "",
  //   message: "",
  // });

  //update the message after 1.5sec change back to empty string
  // function showAlert(alertObj) {
  //   setAlert(alertObj);
  //   setTimeout(() => {
  //     setAlert({ type: "", message: "" });
  //   }, 1500);
  // }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:username",
      element: <UserDetail />,
    },
  ]);
  return (
    <>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-5 h-full ">
        {" "}
        <span>
          <h1 className="font-bold text-5xl text-blue-950 text-center">
            Github{" "}
            <mark className="px-2 text-white bg-indigo-800 rounded">
              Search
            </mark>{" "}
          </h1>
        </span>
        <RouterProvider router={router} />
      </div>
    </>
  );
}
export default App;
