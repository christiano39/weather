import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    if (lat && lon) {
      axios
        .get(
          `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [lat, lon]);

  return (
    <div className="App">
      <p>
        {lat}, {lon}
      </p>
    </div>
  );
}

export default App;
