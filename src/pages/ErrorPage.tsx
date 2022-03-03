import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';


const ErrorPage: FC = (props) => {
  // navigation
  const navigate = useNavigate();

  return (
    <div className="card errorWrapper">
      <h1>Error... 404!</h1>
      <h2>The page does not exists.</h2>
      <button onClick={() => navigate('/')}>Click here to go back home page</button>
    </div> 
  );

}

export default ErrorPage;
