import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '..';
import styles from './profile.module.scss';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCancel = () => {
    // 이전 페이지로 이동
    navigate(-1);
  };

  const handleConfirm = () => {
    // 확인 버튼을 누르면 유저 정보를 업데이트
    console.log('🚀 >>>  user : ', user);

    axios
      .post('http://localhost:3000/user/update', user)
      .then((res) => {
        alert('프로필이 수정되었습니다.');
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  function uploadProfileImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:3000/user/upload', formData).then((res) => {
      if (res.data.success) {
        alert('프로필 이미지 업로드 성공!');
        // 프로필 이미지 업로드 성공하면 프로필 이미지를 보여줌
        console.log(res.data);
        console.log('url : ', res.data.path);
        setUser({ ...user, profile_url: res.data.path });
      } else {
        alert('프로필 이미지 업로드 실패: ' + res.data.message);
      }
    });
  }

  function handleImageDelete() {
    // 사용자에게 이미지 삭제 확인 요청
    const isConfirmed = window.confirm(
      '정말 프로필 이미지를 삭제하시겠습니까?'
    );
    console.log('isConfirmed : ',isConfirmed);
    if (isConfirmed) {
     
      console.log('user.profile_url : ',user.profile_url)
          
      axios
        .post('http://localhost:3000/user/delete-image', { profile_url:user.profile_url })
        .then((res) => {
          if (res.data.success) {
            alert('이미지가 삭제되었습니다.');
            // 클라이언트에서 user의 profile_url 업데이트
            setUser({ ...user, profile_url: '' });
          } else {
            alert('프로필 이미지 삭제 실패: ' + res.data.message);
          }
        })
        .catch((error) => {
          console.error('이미지 삭제 실패! : ', error);
        });
    }


  


  }

  return (
    <div className={'profile-container'}>
      <h2 className={styles.title}>{user.name}님의 프로필</h2>

      {user.profile_url && (
        <div className={'profile-image-container'}>
          <img
            src={`http://localhost:3000/${user.profile_url}`}
            alt="프로필 사진"
            className={['profile-image']}
          />
          <span className={'delete-icon'} onClick={handleImageDelete}>
            이미지삭제
          </span>
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="profileImage" className={styles.label}>
          프로필 사진:
        </label>
        <input
          type="file"
          id="profileImage"
          onChange={uploadProfileImage}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          이메일:
        </label>
        <input
          type="text"
          id="email"
          value={user.email}
          readOnly
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="phone" className={styles.label}>
          핸드폰 번호:
        </label>
        <input
          type="tel"
          id="phone"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="address" className={styles.label}>
          주소:
        </label>
        <input
          type="text"
          id="address"
          value={user.address}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="addressDetail" className={styles.label}>
          상세주소:
        </label>
        <input
          type="text"
          id="addressDetail"
          value={user.address_detail}
          onChange={(e) => setUser({ ...user, address_detail: e.target.value })}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="birth" className={styles.label}>
          생년월일:
        </label>
        <input
          type="date"
          id="birth"
          value={user.birth}
          onChange={(e) => setUser({ ...user, birth: e.target.value })}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="gender" className={styles.label}>
          성별:
        </label>
        <select
          id="gender"
          value={user.gender}
          onChange={(e) => setUser({ ...user, gender: e.target.value })}
          className={styles.input}
        >
          <option value="male">남성</option>
          <option value="female">여성</option>
          <option value="other">기타</option>
        </select>
      </div>

      <div className={styles['button-container']}>
        <button className={styles.button} onClick={handleCancel}>
          취소
        </button>
        <button className={styles.button} onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
}

export default Profile;
