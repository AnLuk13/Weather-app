import { useState } from "react";
import "./App.css";
import Content from "./components/Content";
import Details from "./components/Details";
import Error from "./components/Error";
import RouterLayout from "./components/RouterLayout";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const handleRouteData = (data) => {
    setData(data);
  };

  const handleLocation = (location) => {
    setLocation(location);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<RouterLayout handleLocation={handleLocation} />}
      >
        <Route
          path="/"
          element={
            <Content handleRouteData={handleRouteData} locationGet={location} />
          }
        />
        <Route path="/details" element={<Details data={data} />} />
        <Route path="*" element={<Error />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>;
    </div>
  );
}

export default App;
