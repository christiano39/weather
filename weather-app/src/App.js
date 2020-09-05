import React, { useState, useEffect } from "react";
import axios from "axios";

import CardContainer from "./components/CardContainer";
import SearchBar from "./components/SearchBar";
import "./App.scss";

function App() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [weathers, setWeathers] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [tempUnit, setTempUnit] = useState("f");

  const onSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const swapTemp = () => {
    tempUnit === "c" ? setTempUnit("f") : setTempUnit("c");
  };

  const addCity = (e) => {
    e.preventDefault();

    if (!searchText) {
      setSearchError("Search cannot be empty");
      return;
    }

    let query = searchText.split(",");
    query.forEach((q, i) => {
      query[i] = q.trim();
    });

    query = query.join(",");
    setSearchError("");

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        const newWeathers = weathers.filter((weather) => {
          return weather.id !== res.data.id;
        });

        if (newWeathers.length !== weathers.length) {
          setSearchError(`${res.data.name} is already added`);
        }

        setWeathers([...newWeathers, res.data]);
        setSearchText("");
      })
      .catch((err) => {
        console.log(err);
        setSearchError("Could not find that location");
      });
  };

  const removeCity = (name) => {
    setWeathers(
      weathers.filter((weather) => {
        return weather.name !== name;
      })
    );
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
    }

    if (
      localStorage.getItem("cityIds") &&
      localStorage.getItem("cityIds") !== ""
    ) {
      const cityIds = localStorage.getItem("cityIds").split(",");

      cityIds.forEach((id) => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.REACT_APP_API_KEY}`
          )
          .then((res) => {
            console.log(res);
            setWeathers((weathers) => [...weathers, res.data]);
          })
          .catch((err) => {
            console.log(err);
          });
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
          res.data.isCurrentLocation = true;
          setWeathers((weathers) => [...weathers, res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [lat, lon]);

  // useEffect(() => {
  //   // const cityIds = weathers.map((weather) => {
  //   //   return weather.id;
  //   // });
  //   //localStorage.setItem("cityIds", `${cityIds.join(",")}`);
  // }, [weathers]);

  return (
    <div className="App">
      <SearchBar
        searchText={searchText}
        onSearchChange={onSearchChange}
        onSubmit={addCity}
        searchError={searchError}
      />
      <CardContainer
        weathers={weathers}
        tempUnit={tempUnit}
        swapTemp={swapTemp}
        removeCity={removeCity}
      />
    </div>
  );
}

export default App;
