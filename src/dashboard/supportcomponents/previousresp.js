import React, { useState, useEffect } from 'react';
import supabase from '../../server';
import Navbar from '../components/Navbar';

const ClarifaiApiKey = 'a4d30b8a2b5e4a8c9d6e142109c6958d';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [clarifaiResponses, setClarifaiResponses] = useState({});
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  const MODEL_ID = 'general-image-recognition';
  const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('image').select('*');

        if (error) {
          throw error;
        }

        if (data) {
          setData(data);
          setError(null);

          const responses = {};
          for (const item of data) {
            const clarifaiResponse = await analyzeImage(item.images, ClarifaiApiKey);
            responses[item.id] = clarifaiResponse;
          }
          setClarifaiResponses(responses);
        }
      } catch (error) {
        setError('Error fetching data from Supabase.');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const analyzeImage = async (base64Data, apikey) => {
    try {
      const blob = dataURItoBlob(base64Data);

      if (!blob) {
        console.error('Invalid Blob');
        return null;
      }

      const raw = JSON.stringify({
        "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
        },
        "inputs": [
          {
            "data": {
              "image": {
                "base64": base64Data // Use base64 data directly
              }
            }
          }
        ]
      });

      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + apikey,
          'Content-Type': 'application/json' // Add this header for JSON data
        },
        body: raw
      };

      const response = await fetch(
        `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
        requestOptions
      );

      const clarifaiResponse = await response.json();
      return clarifaiResponse;
    } catch (error) {
      console.error('Error analyzing image:', error);
      return null;
    }
  };

  const dataURItoBlob = (base64Data) => {
    try {
      const byteString = atob(base64Data);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: 'image/png' });
    } catch (error) {
      console.error('Error creating Blob from Base64 data:', error);
      return null;
    }
  };

  return (
    <div>
      <Navbar/>
    <div>
      {error && <p>{error}</p>}
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <img src={`data:image/png;base64,${item.images}`} alt={`Image ${item.id}`} />
            {clarifaiResponses[item.id] && (
                <div>
                  <p>Clarifai Response:</p>
                  {clarifaiResponses[item.id].outputs.map((output) => (
                    <div key={output.id}>
                      {/* Check if the response structure matches */}
                      {output.data && output.data.concepts && Array.isArray(output.data.concepts) && (
                        output.data.concepts.map((concept) => (
                          <div key={concept.id}>
                            <p>Name: {concept.name}</p>
                            <p>Value: {concept.value}</p>
                          </div>
                        ))
                      )}
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
