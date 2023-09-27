import { useState } from "react";
import "./Content.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";

function Content() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=005566f5427f4734936217300aca5730`;

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
          {data.city ? (
            data.city.name
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
        <div className="city">{data.city ? data.city.country : null}</div>
        <div className="temp">
          {data.list ? data.list[0].main.temp + "°F" : null}
        </div>
        <div className="description position-relative">
          {data.list ? data.list[0].weather[0].description : null}
        </div>
      </div>
      <div className="currentData">
        {data.list ? null : <p className="bold">No info</p>}
        <div className="feels">
          <p className="bold">
            {data.list ? data.list[0].main.feels_like + "°F" : null}
          </p>
          <p>{data.list ? "Feels like" : null}</p>
        </div>
        <div className="humidity">
          <p className="bold">
            {data.list ? data.list[0].main.humidity + "%" : null}
          </p>
          <p>{data.list ? "Humidity" : null}</p>
        </div>
        <div className="wind">
          <p className="bold">
            {data.list ? data.list[0].wind.speed + "MPH" : null}
          </p>
          <p>{data.list ? "Wind" : null}</p>
        </div>
      </div>
      <div className="cards">
        {data.list
          ? (() => {
              const groupedData = {};

              data.list.forEach((dataItem) => {
                const dateTime = dataItem.dt_txt.split(" ");
                const date = dateTime[0].split("-");
                const itemDate = new Date(date[0], date[1] - 1, date[2]);
                const currentDate = new Date();
                const dayDiff = Math.floor(
                  (itemDate - currentDate) / (1000 * 60 * 60 * 24)
                );

                if (!groupedData[dayDiff]) {
                  groupedData[dayDiff] = [];
                }

                groupedData[dayDiff].push(
                  <div className="card">
                    {`For ${dateTime[0]}, time: ${dateTime[1]} the estimated temperature is - ${dataItem.main.temp}°F`}
                  </div>
                );
              });

              const sortedKeys = Object.keys(groupedData).sort((a, b) => {
                if (a === "-1") return -1;
                if (b === "-1") return 1;
                return a - b;
              });

              return sortedKeys.map((dayDiff) => (
                <div className="group">
                  <h2>
                    {dayDiff === "-1"
                      ? "Current"
                      : dayDiff === "0"
                      ? "Tomorrow"
                      : dayDiff === "1"
                      ? "In two days"
                      : `+${dayDiff} days`}
                  </h2>
                  {groupedData[dayDiff]}
                </div>
              ));
            })()
          : null}
      </div>
    </div>
  );
}

export default Content;
