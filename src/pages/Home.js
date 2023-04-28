import React from 'react';
import './style.css'; // import the CSS file
import trolley128 from './images/trolley128.png';
import labelImage1 from './images/bulk-buy-ad.gif';

function Home() {
  return (
    <div className="container">
      <h1>Welcome to Bulk Buy Purchase</h1>
      <img src={labelImage1} alt="Bulk Buy" className="mainImage" />
    </div>
  );
}

export default Home;