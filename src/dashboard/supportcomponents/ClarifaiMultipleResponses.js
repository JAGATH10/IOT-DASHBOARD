import React, { useState, useEffect } from 'react';
import supabase from '../../server';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from 'moment'
const ClarifaiApiKey = 'a4d30b8a2b5e4a8c9d6e142109c6958d';

// const Clarifairesponse = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [clarifaiResponses, setClarifaiResponses] = useState({});
//   const USER_ID = 'clarifai';
//   const APP_ID = 'main';
//   const MODEL_ID = 'general-image-recognition';
//   const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';

//   useEffect(() => {
//     const fetchData = async () => {
//       const analyzeImage = async (base64Data, apikey) => {
//         try {
//             const blob = dataURItoBlob(base64Data);
      
//             if (!blob) {
//               console.error('Invalid Blob');
//               return null;
//             }
      
//             const raw = JSON.stringify({
//               "user_app_id": {
//                 "user_id": USER_ID,
//                 "app_id": APP_ID
//               },
//               "inputs": [
//                 {
//                   "data": {
//                     "image": {
//                       "base64": base64Data 
//                     }
//                   }
//                 }
//               ]
//             });
      
//             const requestOptions = {
//               method: 'POST',
//               headers: {
//                 'Accept': 'application/json',
//                 'Authorization': 'Bearer ' + apikey,
//                 'Content-Type': 'application/json' 
//               },
//               body: raw
//             };
      
//             const response = await fetch(
//               `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
//               requestOptions
//             );
      
//             const clarifaiResponse = await response.json();
            
//             if (
//               clarifaiResponse &&
//               clarifaiResponse.outputs &&
//               clarifaiResponse.outputs.length > 0 &&
//               clarifaiResponse.outputs[0].data &&
//               clarifaiResponse.outputs[0].data.concepts
//             ) {
//               const concepts = clarifaiResponse.outputs[0].data.concepts;
//               const filtered = concepts.filter(
//                 (concept) => concept.name === 'animal' || concept.name === 'people' 
//               );
      
//               return filtered;
//             }
//           } catch (error) {
//             console.error('Error analyzing image:', error);
//             return null;
//           }
//       };

//       const dataURItoBlob = (base64Data) => {
//         try {
//             const byteString = atob(base64Data);
//             const ab = new ArrayBuffer(byteString.length);
//             const ia = new Uint8Array(ab);
//             for (let i = 0; i < byteString.length; i++) {
//               ia[i] = byteString.charCodeAt(i);
//             }
//             return new Blob([ab], { type: 'image/png' });
//           } catch (error) {
//             console.error('Error creating Blob from Base64 data:', error);
//             return null;
//           }
//       };

//       try {
//         const { data, error } = await supabase
//           .from('image')
//           .select('images,created_at')
//           .order('created_at', { ascending: false })
//           .range(0, 9); // Fetch all except the latest value

//         if (error) {
//           throw error;
//         }

//         if (data) {
//           setData(data.slice(0, -1)); // Exclude the latest value
//           setError(null);

//           const responses = {};
//           for (const item of data.slice(0, -1)) {
//             const clarifaiResponse = await analyzeImage(item.images, ClarifaiApiKey);
//             responses[item.id] = clarifaiResponse;
//           }
//           setClarifaiResponses(responses);
//         }
//       } catch (error) {
//         setError('Error fetching data from Supabase.');
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 2
//   };
//   const formatDateTime = (dateTimeString) => {
//     const formattedDateTime = moment(dateTimeString).format('MMMM Do YYYY, h:mm:ss a');
//     return formattedDateTime;
//   };
//   return (
//     <div >  
//       {error && <p>{error}</p>}
//       <Slider {...settings}>
//         {data.map((item) => (
//           <div key={item.id} >
//             <img src={`data:image/png;base64,${item.images}`} alt={`value ${item.id}`} style={{width:"150px",borderRadius:"10px",marginLeft:"25px"}}/>
//             {clarifaiResponses[item.id] && (
//               <div>
//                 {clarifaiResponses[item.id].map((concept) => (
//                   <div key={concept.id}>
//                     <p>Name: {concept.name}</p>
//                     <p>Value: {concept.value}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//             <p>{formatDateTime(item.created_at)}</p>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Clarifairesponse;
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
            user_app_id: {
              user_id: USER_ID,
              app_id: APP_ID,
            },
            inputs: [
              {
                data: {
                  image: {
                    base64: base64Data,
                  },
                },
              },
            ],
          });

          const requestOptions = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + apikey,
              'Content-Type': 'application/json',
            },
            body: raw,
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
            const filtered = concepts.filter(
              (concept) => concept.name === 'animal' || concept.name === 'people'
            );

            return filtered;
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
        const { data, error } = await supabase
          .from('image')
          .select('images,created_at')
          .order('created_at', { ascending: false })
          .range(0, 9); // Fetch all except the latest value

        if (error) {
          throw error;
        }

        if (data) {
          setData(data.slice(0, -1)); // Exclude the latest value
          setError(null);

          const responses = {};
          for (const item of data.slice(0, -1)) {
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2
  };
  const formatDateTime = (dateTimeString) => {
    const formattedDateTime = moment(dateTimeString).format('MMMM Do YYYY, h:mm:ss a');
    return formattedDateTime;
  };
  return (
    <div >  
      {error && <p>{error}</p>}
      <Slider {...settings}>
        {data.map((item) => (
          <div key={item.id} >
            <img src={`data:image/png;base64,${item.images}`} alt={`value ${item.id}`} style={{width:"150px",borderRadius:"10px",marginLeft:"25px"}}/>
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
            <p>{formatDateTime(item.created_at)}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Clarifairesponse;
