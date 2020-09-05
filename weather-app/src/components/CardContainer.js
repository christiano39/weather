import React from "react";

import WeatherCard from "./WeatherCard";

const CardContainer = (props) => {
  const { currentLocation } = props;

  return (
    <div className="card-container">
      <WeatherCard weather={currentLocation} />
    </div>
  );
};

export default CardContainer;
