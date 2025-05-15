
import React from 'react';

import Specials from './Specials';
import CenterBanner from './CenterBanner';
import Specialities from './Specialties';
import Centerbg from './centerbg';
import Story from './Story';


const Home = () => {
  return (
    <div className="place-order-page">
      
        <Specials />
      <Centerbg />
      <Specialities /> 
      <CenterBanner />
      <Story/>

    </div>
  );
};

export default Home;
