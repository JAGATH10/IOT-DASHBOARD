import React from "react";
import './SoilForecast.css';
import Forecast from "./Forecast";
import Soilmoisture from "./Soilmoisture";
const SoilForecast = () => {
    return (
        <div className="soil-forecast-container">
        <div className="forecast-container"><Forecast/></div>
        <div className="soil-container"><Soilmoisture/></div>
        </div>
    )
}

export default SoilForecast;