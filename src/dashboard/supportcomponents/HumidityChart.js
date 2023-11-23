import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale,Chart,PointElement,LineElement } from 'chart.js';
import supabase from '../../server';

const HumidityChart = () => {
  const [humidityValues, sethumidityValues] = useState([]);
  const [createdAtValues, setCreatedAtValues] = useState([]);

  // Import and register the 'category' and 'linear' scale types
  Chart.register(CategoryScale, LinearScale,PointElement,LineElement);

  useEffect(() => {
    const fetchHumidityData = async () => {
      try {
        const { data, error } = await supabase
          .from('smartagriculture')
          .select('humidity, created_at')
          .order('created_at', {ascending:false})
          .limit(15);

        if (error) {
          console.error('Error fetching soil', error);
          return;
        }

        const HumidityData = data.map((humidity) => {
          return {
            humidity: humidity.humidity,
            createdAt: humidity.created_at
          };
        });

        sethumidityValues(HumidityData.map((humidity) => humidity.humidity));
        setCreatedAtValues(HumidityData.map((humidity) => humidity.createdAt));
      } catch (error) {
        console.error('Error fetching soil moisture data:', error);
      }
    };

    fetchHumidityData();

    const intervalId = setInterval(fetchHumidityData, 10000); // Update chart every second

    return () => clearInterval(intervalId); // Clear interval when component is unmounted
  }, []);

  const labels = createdAtValues.map((createdAt) => {
    const date = new Date(createdAt);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  });

  const dataOptions = {
    labels: labels,
    datasets: [
      {
        label: 'Humidity',
        data: humidityValues,
        fill: false,
        borderColor: '#D12703',
        borderWidth: 3,
      },
    ],
    scales: {
      x: {
        type: 'category',
      },
      y: {
        type: 'linear',
      },
    },
  };

  return (
    <div style={{marginTop:"50px"}}>
     <center>   
    <h2>Humidity Chart</h2>
    <div style={{width:"50vw"}}>
      <Line data={dataOptions} />
    </div>
    </center>
    </div>
  );
};

export default HumidityChart;
