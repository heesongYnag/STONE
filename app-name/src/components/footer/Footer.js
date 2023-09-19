import React from 'react';
import './Footer.scss';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="https://www.ienrich.co.kr/images/topLogo.png" alt="회사 로고" />
        </div>
        <div className="footer-info">
          <p>광주광역시 북구 오룡동 와이어스 파크 A-810</p>
          <p>Email: miwan@gmail.com</p>
          <p>Phone: 010-0000-0000</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2022-{new Date().getFullYear()} 더함소프트</p>
      </div>
    </div>
  );
}
