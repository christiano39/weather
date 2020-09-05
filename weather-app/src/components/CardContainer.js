import React from "react";

import WeatherCard from "./WeatherCard";

const CardContainer = (props) => {
  const { weathers, tempUnit, swapTemp } = props;

  return (
    <div className="card-container">
      {weathers.map((weather) => {
        return (
          <WeatherCard
            key={weather.name}
            weather={weather}
            tempUnit={tempUnit}
            swapTemp={swapTemp}
          />
        );
      })}
    </div>
  );
};

export default CardContainer;
