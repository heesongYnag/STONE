import React, { useContext } from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import { useNavigate } from 'react-router';
import Button from 'devextreme-react/button';
import './mainTopNav.scss';
import { AuthContext } from '../../pages/main';

function TopNavBar({ routes }) {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
 // console.log('🚀 ~ file: index.js:14 ~ TopNavBar ~ user:', user);
  return (
    <Toolbar className="mainTopNav">
      <Item location="before" locateInMenu="never">
        <img
          src="https://www.ienrich.co.kr/images/topLogo.png" // 로고 이미지 경로
          alt="Company Logo"
          className="company-logo"
          onClick={() => navigate('/')} // 로고 클릭 시 홈페이지로 이동
        />
      </Item>
      {routes.map((navItem, index) => (
        <Item key={index} location="center" locateInMenu="auto">
          {navItem.items ? (
            // DropDown 형식의 메뉴
            <div>
              {navItem.text}
              <div>
                {navItem.items.map((subItem, subIndex) =>
                  subItem.text ? (
                    <Button
                      key={subIndex}
                      text={subItem.text}
                      onClick={() => navigate(subItem.path)}
                    />
                  ) : null
                )}
              </div>
            </div>
          ) : // 일반적인 메뉴
          navItem.text ? (
            <Button
              text={navItem.text}
              onClick={() => navigate(navItem.path)}
            />
          ) : null}
        </Item>
      ))}
      <Item location="after" locateInMenu="never">
        {user?.rank <= 10 ? (
          <>
            <Button 
               text={`${user?.name}  님`} 
                className="btn" 
                onClick={() => navigate('/profile')}
                />

            <Button
              text="관리자"
              className="admin-btn"
              onClick={() => navigate('/admin')}
            />
          </>
        ) : null}
      </Item>
    </Toolbar>
  );
}

export default TopNavBar;
