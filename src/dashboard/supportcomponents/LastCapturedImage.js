import { useState, useEffect } from 'react';
import supabase from '../../server';
import ClarifaiResponse from './ClarifaiResponse';
import moment from 'moment';
const LastCapturedImages = () => {
  const [latestImage, setLatestImage] = useState(null);

  useEffect(() => {
    const checkForNewImages = async () => {
      try {
        const { data, error } = await supabase
          .from('image')
          .select('images,created_at')
          .order('created_at', { ascending: false })
          .limit(1);
        if (error) {
          throw error;
        }
        if (data && data.length > 0) {
          const latestEntry = data[0];
          const base64String = latestEntry.images;
          const timestamp = latestEntry.created_at;
          setLatestImage({ base64String, timestamp });
        } else {
          console.log('No new images found.');
        }
      } catch (error) {
        console.error('Error fetching data from Supabase:', error.message);
      }
    };

    checkForNewImages();
    const interval = setInterval(checkForNewImages, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []); 
  const formatDateTime = (dateTimeString) => {
    const formattedDateTime = moment(dateTimeString).format('MMMM Do YYYY, h:mm:ss a');
    return formattedDateTime;
  };
      
  return (
    <div>
      {latestImage && (
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginBottom:"50px"}}>
            <h2>Last Image Captured on :<br></br>{formatDateTime(latestImage.timestamp)}</h2>
            <img src={`data:image/png;base64,${latestImage.base64String}`} alt="Latest" style={{borderRadius:'10px',width:'200px'}} />
            <ClarifaiResponse/>
        </div>
      )}
    </div>
  );
};

export default LastCapturedImages;
