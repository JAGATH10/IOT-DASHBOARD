
import React, { useState, useEffect } from 'react';
import supabase from '../../server';
const ClarifaiApiKey = 'a4d30b8a2b5e4a8c9d6e142109c6958d';
const Clarifairesponse = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [clarifaiResponses, setClarifaiResponses] = useState({});
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  const MODEL_ID = 'general-image-recognition';
  const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';
  useEffect(() => {
    const fetchData = async () => {
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
              
              if (
                clarifaiResponse &&
                clarifaiResponse.outputs &&
                clarifaiResponse.outputs.length > 0 &&
                clarifaiResponse.outputs[0].data &&
                clarifaiResponse.outputs[0].data.concepts
              ) {
                const concepts = clarifaiResponse.outputs[0].data.concepts;
        
                // Filter concepts for 'animal' and 'person'
                const filtered = concepts.filter(
                  (concept) => concept.name === 'animal' || concept.name === 'people' 
                );
        
                return filtered; // Return only filtered concepts
              }
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
      try {
        const { data, error } = await supabase.from('image')
        .select('images,created_at')
        .order('created_at', { ascending: false })
        .limit(1);

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
  

  return (
    <div>
      {error && <p>{error}</p>}
      <div>
        {data.map((item) => (
          <div key={item.id}>
            {clarifaiResponses[item.id] && (
              <div>
                {clarifaiResponses[item.id].map((concept) => (
                  <div key={concept.id}>
                    <p>Name: {concept.name}</p>
                    <p>Value: {concept.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clarifairesponse;
