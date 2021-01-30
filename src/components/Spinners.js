import React from 'react';
import { Spinner } from 'reactstrap';

const Spinners = (props) => {
  return (
    <div>
      {props.status === "loading" && <Spinner color="primary" />}
     </div>
  );
}

export default Spinners;
