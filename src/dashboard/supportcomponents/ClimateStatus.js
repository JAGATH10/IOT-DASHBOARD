// import React, { useState, useEffect } from 'react';

// const ClimateStatus = () => {
//   const [climateData, setClimateData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchClimateData = async () => {
//       try {
        // const apiKey = '0c69a0fe017d536bd19e8903453a42fb';
        // const lat = '11.4952';
        // const lon = '77.2764';
        // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`; // Replace 'London' with the desired location or use latitude/longitude

//         const response = await fetch(apiUrl);

//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const data = await response.json();
//         setClimateData(data);
//       } catch (error) {
//         setError('Error fetching climate data');
//         console.error(error);
//       }
//     };
//     fetchClimateData();
    // const interval = setInterval(() => {
    //   fetchClimateData();
    // }, 5 * 60 * 1000); 
//     return () => clearInterval(interval);
//   }, []);
//   console.log(climateData);
//   return (
    // <div>
    //   {error && <p>{error}</p>}
    //   {climateData && (
    //     <div>
    //       <p>Location: {climateData.name}</p>
    //       <p>Climate-Status: {climateData.weather.main}</p>
    //       <p>Temperature: {climateData.main.temp}°F</p>
    //     </div>
    //   )}
    // </div>
//   );
// };

// export default ClimateStatus;
export const ClimateStatus = async () => {
  try {
    const apiKey = '0c69a0fe017d536bd19e8903453a42fb';
        const lat = '11.4952';
        const lon = '77.2764';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`; 
        const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
