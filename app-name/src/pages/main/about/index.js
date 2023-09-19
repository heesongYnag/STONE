// aboutUs
import './about.scss'
export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-header">
        <h1>회사 소개</h1>
      </div>
      <div className="about-content">
        <div className="about-text">
          <h2>우리 회사는...</h2>
          <p>
            2000년 설립된 (회사명)은 고객의 행복을 추구하는 회사로, 전세계에 특별한 가치를 제공합니다. 우리의 목표는 탁월한 서비스와 제품으로 세계를 바꾸는 것입니다.
          </p>
        </div>
        <div className="about-image">
          <img src="path-to-your-image.jpg" alt="Company building or any representative image" />
        </div>
      </div>
      <div className="about-footer">
        <p>문의사항이 있으시면 연락 주세요!</p>
        <p>Email: example@example.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
    </div>
  );
}