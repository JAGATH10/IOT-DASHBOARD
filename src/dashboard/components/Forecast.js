import React, { useState, useEffect } from "react";
import LiveDateTime from "../supportcomponents/LiveTimeDate";
import { ClimateStatus } from "../supportcomponents/ClimateStatus";
import './Forecast.css'
import './SoilForecast.css'
const Forecast = () => {
    const [climateData, setClimateData] = useState(null);
    useEffect(() => {
        const getClimateData = async () => {
            const data = await ClimateStatus();
            setClimateData(data);
        };
        getClimateData();
        const interval = setInterval(() => {
            getClimateData();
        }, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const getBackgroundClass = (weather) => {
        if (!weather) return 'default-background'; 
        switch (weather.toLowerCase()) {
            case 'clouds':
                return 'sunny-background';
            case 'rain':
                return 'rainy-background';
            case 'snow':
                return 'snowing-background';   
            default:
                return 'default-background';
        }
    };

    return (
        <div className={`forecast-value-container ${getBackgroundClass(climateData?.weather[0]?.main)}`}>
            <h3>Welcome Jagath</h3>
            <LiveDateTime />
            <div>
                {climateData && (
                    <div>
                        <p>Location: {climateData.name}</p>
                        <p>Climate-Status: {climateData.weather[0].main}</p>
                        <p>Temperature: {climateData.main.temp}°F</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Forecast;
