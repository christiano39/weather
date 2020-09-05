import React, { useState, useEffect } from "react";
import axios from "axios";

import CardContainer from "./components/CardContainer";
import "./App.css";

function App() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

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
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
          console.log(res);
          setCurrentLocation(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [lat, lon]);

  return (
    <div className="App">
      <CardContainer currentLocation={currentLocation} />
    </div>
  );
}

export default App;
