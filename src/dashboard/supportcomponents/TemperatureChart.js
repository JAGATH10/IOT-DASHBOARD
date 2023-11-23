import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale, PointElement, LineElement,Chart } from 'chart.js';
import supabase from '../../server';

const TemperatureChart = () => {
  const [temperatureValues, setTemperatureValues] = useState([]);
  const [createdAtValues, setCreatedAtValues] = useState([]);

  // Import and register the necessary Chart.js elements and scales
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        const { data, error } = await supabase
          .from('smartagriculture')
          .select('temperature, created_at')
          .order('created_at', { ascending: false }) 
          .limit(15);

        if (error) {
          console.error('Error fetching temperature data:', error);
          return;
        }

        const temperatureData = data.map((temperature) => {
          return {
            temperature: temperature.temperature,
            createdAt: temperature.created_at,
          };
        });

        setTemperatureValues(temperatureData.map((temperature) => temperature.temperature)); 
        setCreatedAtValues(temperatureData.map((temperature) => temperature.createdAt));
      } catch (error) {
        console.error('Error fetching temperature data:', error);
      }
    };

    fetchTemperatureData();

    const intervalId = setInterval(fetchTemperatureData, 10000);

    return () => clearInterval(intervalId); 
  }, []);

  const labels = createdAtValues.map((createdAt) => {
    const date = new Date(createdAt);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; 
  });

  const dataOptions = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature',
        data: temperatureValues,
        fill: false,
        borderColor: '#D12703', // Set the desired chart color
        borderWidth: 3,
      },
    ],
    scales: {
      x: {
        type: 'category', // Set x-axis type to 'category' for time-based data
      },
      y: {
        type: 'linear',
      },
    },
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <center>
        <h2>Temperature Chart</h2>
        <div style={{ width: '50vw' }}>
          <Line data={dataOptions} /> 
        </div>
      </center>
    </div>
  );
};

export default TemperatureChart;
