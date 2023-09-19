import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '../routes/main-routes';
import { Footer } from '../components';
import MainNav from './mainNav';

export default function Content() {
  const [navHeight, setNavHeight] = useState(0);
	// 네비바의 높이를 가져오기 위한 함수
  useEffect(() => {
    const toolbarElement = document.querySelector('.mainTopNav');
    if (toolbarElement) {
      setNavHeight(toolbarElement.offsetHeight);
    }
  }, []);
  return (
    <>
      <MainNav {... {routes}}/>
      <div className="mainContent" style={{ marginTop : navHeight }}>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={element}
            />
          ))}
          <Route
            path='*'
            element={<Navigate to='/' />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}