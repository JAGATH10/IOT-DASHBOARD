import React, { useState, useEffect } from "react";
import supabase from '../../server';

const Soilmoisturevalue = () => {
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSoilMoisture = async () => {
      try {
        const { data, error } = await supabase
          .from('smartagriculture')
          .select('soil')
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setSoilMoisture(data[0].soil);
        }
      } catch (error) {
        setError('Error fetching data from Supabase.');
        console.error(error);
      }
    };

    fetchSoilMoisture();
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      {soilMoisture && <span>{soilMoisture}</span>}
      <span>%</span>
    </>
  );
};

export default Soilmoisturevalue;
