import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import SearchIcon from "@material-ui/icons/Search";

function RegisterSuccess(props) {
  const [time, setTime] = useState(5);
  useEffect(() => {
    setInterval(function(){
        if(time>=1)
        {
            setTime(time-1);
        }
    },1000);
    return () => {
    };
    }, [time]);

  return (
   <div>
       Register success! Redirect to Home page in {time} s.
   </div>
  );
}

export default RegisterSuccess;
