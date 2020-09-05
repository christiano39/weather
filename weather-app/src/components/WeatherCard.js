import React, { useState } from "react";
import { k_to_c, k_to_f, mpsToMph } from "../helpers/conversions";

import { Card, CardContent } from "@material-ui/core";

const WeatherCard = (props) => {
  const { weather, tempUnit, swapTemp } = props;

  if (!weather) {
    return (
      <Card className="weather-card">
        <h2>Loading...</h2>
      </Card>
    );
  }

  return (
    <Card className="weather-card">
      <CardContent>
        {weather.name}, {weather.sys.country}
      </CardContent>
      <CardContent>{weather.weather[0].main}</CardContent>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].main}
      />
      {tempUnit === "f" ? (
        <CardContent>
          {k_to_f(weather.main.temp)} <span className="f temp-unit">°F</span> |{" "}
          <span onClick={swapTemp} className="c temp-unit clickable">
            °C
          </span>
        </CardContent>
      ) : (
        <CardContent>
          {k_to_c(weather.main.temp)}{" "}
          <span onClick={swapTemp} className="f temp-unit clickable">
            °F
          </span>{" "}
          |{" "}
          <span onClick={swapTemp} className="c temp-unit">
            °C
          </span>
        </CardContent>
      )}
      {tempUnit === "f" ? (
        <CardContent>
          Wind: {mpsToMph(weather.wind.speed)} mph{" "}
          <i
            className="fas fa-arrow-up"
            style={{ transform: `rotate(${weather.wind.deg}deg)` }}
          ></i>
        </CardContent>
      ) : (
        <CardContent>
          Wind: {Math.round(weather.wind.speed)} m/s{" "}
          <i
            className="fas fa-arrow-up"
            style={{ transform: `rotate(${weather.wind.deg}deg)` }}
          ></i>
        </CardContent>
      )}
      <CardContent>
        Feels like{" "}
        {tempUnit === "f"
          ? `${k_to_f(weather.main.feels_like)} °F`
          : `${k_to_c(weather.main.feels_like)} °C`}
      </CardContent>
      <CardContent>
        High:{" "}
        {tempUnit === "f"
          ? `${k_to_f(weather.main.temp_max)} °F`
          : `${k_to_c(weather.main.temp_max)} °C`}{" "}
        Low:{" "}
        {tempUnit === "f"
          ? `${k_to_f(weather.main.temp_min)} °F`
          : `${k_to_c(weather.main.temp_min)} °C`}
      </CardContent>
      <CardContent>Humidity: {weather.main.humidity}%</CardContent>
    </Card>
  );
};

export default WeatherCard;
