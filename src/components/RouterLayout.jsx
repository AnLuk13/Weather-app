import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import "./RouterLayout.css";

function RouterLayout({ handleLocation }) {
  const [location, setLocation] = useState("");

  const searchPrimaryLocation = (event) => {
    if (event.key === "Enter") {
      handleLocation(location);
    }
  };

  return (
    <div className="main-container">
      <div className="search-box">
        <input
          className="search"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter a city..."
          type="text"
          onKeyDown={searchPrimaryLocation}
        />
      </div>
      <div className="nav-bar">
        <NavLink className="link" to="/">
          Current
        </NavLink>
        <NavLink className="link" to="details">
          More details
        </NavLink>
      </div>

      <Outlet></Outlet>
    </div>
  );
}

export default RouterLayout;
