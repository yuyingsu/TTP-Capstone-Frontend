import React, { useEffect, useState } from 'react';

function RegisterSuccess(props) {
  const [time, setTime] = useState(5);
  useEffect(() => {
    setInterval(function() {
      if (time >= 1) {
        setTime(time - 1);
      }
    }, 1000);
    return () => {};
  }, [time]);

  return (
   <div>
      Registration successful! Redirecting to Home in {time}s.
   </div>
  );
}

export default RegisterSuccess;
