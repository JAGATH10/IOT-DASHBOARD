import React, { useState, useEffect } from 'react';

const LiveDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); 

    return () => clearInterval(interval);
  }, []); 

  const formattedDateTime = dateTime.toLocaleString(); // Customize date/time format if needed

  return (
    <div>
      <p>{formattedDateTime}</p>
    </div>
  );
};

export default LiveDateTime;
