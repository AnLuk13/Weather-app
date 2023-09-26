import { useState } from "react";
import "./Content.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";

function Content() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=005566f5427f4734936217300aca5730`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(data);
      });
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
          onKeyDown={searchLocation}
        />
      </div>
      <div className="top">
        <div className="location">
          {data.name ? (
            data.name
          ) : (
            <h1
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: "3rem",
              }}
            >
              No city
            </h1>
          )}
        </div>
        <div className="city">{data.sys ? data.sys.country : null}</div>
        <div className="temp">{data.main ? data.main.temp + "°F" : null}</div>
        <div className="description position-relative">
          {data.weather ? data.weather[0].main : null}
        </div>
      </div>
      <div className="bottom">
        {data.wind && data.main ? null : <p className="bold">No info</p>}
        <div className="feels">
          <p className="bold">
            {data.main ? data.main.feels_like + "°F" : null}
          </p>
          <p>{data.main ? "Feels like" : null}</p>
        </div>
        <div className="humidity">
          <p className="bold">{data.main ? data.main.humidity + "%" : null}</p>
          <p>{data.main ? "Humidity" : null}</p>
        </div>
        <div className="wind">
          <p className="bold">{data.wind ? data.wind.speed + "MPH" : null}</p>
          <p>{data.wind ? "Wind" : null}</p>
        </div>
      </div>
    </div>
  );
}

export default Content;
