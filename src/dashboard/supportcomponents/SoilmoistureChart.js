import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale,Chart,PointElement,LineElement } from 'chart.js';
import supabase from '../../server';

const SoilMoistureChart = () => {
  const [soilMoistureValues, setSoilMoistureValues] = useState([]);
  const [createdAtValues, setCreatedAtValues] = useState([]);

  // Import and register the 'category' and 'linear' scale types
  Chart.register(CategoryScale, LinearScale,PointElement,LineElement);

  useEffect(() => {
    const fetchSoilMoistureData = async () => {
      try {
        const { data, error } = await supabase
          .from('smartagriculture')
          .select('soil, created_at')
          .order('created_at', {ascending:false})
          .limit(15);

        if (error) {
          console.error('Error fetching soil', error);
          return;
        }

        const soilMoistureData = data.map((soilMoisture) => {
          return {
            soilMoisture: soilMoisture.soil,
            createdAt: soilMoisture.created_at
          };
        });

        setSoilMoistureValues(soilMoistureData.map((soilMoisture) => soilMoisture.soilMoisture));
        setCreatedAtValues(soilMoistureData.map((soilMoisture) => soilMoisture.createdAt));
      } catch (error) {
        console.error('Error fetching soil moisture data:', error);
      }
    };

    fetchSoilMoistureData();

    const intervalId = setInterval(fetchSoilMoistureData, 10000); // Update chart every second

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
        label: 'Soil Moisture',
        data: soilMoistureValues,
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
    <h2>Soil Moisture Chart</h2>
    <div style={{width:"50vw"}}>
      <Line data={dataOptions} />
    </div>
    </center>
    </div>
  );
};

export default SoilMoistureChart;
