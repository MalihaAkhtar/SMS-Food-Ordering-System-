import React from "react";
import { Link, useLocation } from "react-router-dom";
import Herobg from "../assets/Hero-img.jpg";

const PageHero = () => {
  const location = useLocation();

  const formatTitle = (slug) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getTitleFromPath = (path) => {
    const parts = path.split('/');
    const last = parts[parts.length - 1];

    switch (last) {
      case '':
        return 'Home';
      default:
        return formatTitle(last);
    }
  };

  const title = getTitleFromPath(location.pathname);

  return (
    <div
      style={{
        position: 'relative',
        height: '430px',
        backgroundImage: `url(${Herobg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        }}
      />
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', zIndex: 1, marginTop: '40px' }}>
        {title}
      </h1>
      <p style={{ color: '#eee', fontSize: '1rem', marginTop: '0', marginBottom: '0', zIndex: 1 }}>
        <Link to="/" style={{ color: '#eee', textDecoration: 'none' }}>Home</Link> / {title}
      </p>
    </div>
  );
};

export default PageHero;
