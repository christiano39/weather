import React from "react";

import WeatherCard from "./WeatherCard";

const CardContainer = (props) => {
  const { weathers, tempUnit, swapTemp, removeCity } = props;

  return (
    <div className="card-container">
      {weathers.map((weather) => {
        return (
          <WeatherCard
            key={weather.id}
            weather={weather}
            tempUnit={tempUnit}
            swapTemp={swapTemp}
            removeCity={removeCity}
          />
        );
      })}
    </div>
  );
};

export default CardContainer;
