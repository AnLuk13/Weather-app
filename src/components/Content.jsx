import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Content.css";

function Content({ handleRouteData, locationGet }) {
  const [data, setData] = useState({});
  // const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${locationGet}&appid=d9376f1d378c8c6becba5b2b6b855b57`;

  useEffect(() => {
    if (locationGet !== "") {
      axios.get(url).then((response) => {
        setData(response.data);
        handleRouteData(response.data);
      });
    }
  }, [locationGet]);

  const generateTextContent = () => {
    if (data.city && data.list) {
      const textContent = `Location: ${data.city.name}, ${
        data.city.country
      }\nTemperature: ${(data.list[0].main.temp - 212).toFixed(2)}°F for ${
        data.list[0].dt_txt
      }`;
      return textContent;
    }
    return "";
  };

  const handleDownload = () => {
    const textContent = generateTextContent();
    if (textContent) {
      const blob = new Blob([textContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "current-weather.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="wheather-container">
      <div className="top">
        <div className="location">
          {data.city ? data.city.name : <h1>No city</h1>}
        </div>
        <div className="city">{data.city ? data.city.country : null}</div>
        <div className="temp">
          {data.list ? (data.list[0].main.temp - 212).toFixed(2) + "°F" : null}
        </div>
        <div className="description position-relative">
          {data.list ? data.list[0].weather[0].description : null}
        </div>
      </div>
      <div className="currentData">
        {data.list ? null : <p className="bold">No info</p>}
        <div className="feels">
          <p className="bold">
            {data.list
              ? (data.list[0].main.feels_like - 212).toFixed(2) + "°F"
              : null}
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
      <div className="download-box">
        {data.list ? (
          <button className="donwload-button" onClick={handleDownload}>
            Download Weather
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Content;
