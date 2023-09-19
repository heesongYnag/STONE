import {
  MainPage,
  aboutPage,
  loginPage,
  signupPage,
  Notice,
  EditNotice,
  Profile
} from "../pages/main";
import { withNavigationWatcher } from "../contexts/navigation";

const routes = [
  {
    path: "/",
    element: MainPage,
    text: "Home",
  },
  {
    path: "/aboutUs",
    element: aboutPage,
    text: "회사소개",
  },
  {
    path: "/notice",
    element: Notice,
    text: "공지사항",
  },
  {
    path: "/notice/edit",
    element: EditNotice,
    text: "",
  },
  {
    path: "/login",
    element: loginPage,
    text: "Login",
  },
  {
    path: "/signup",
    element: signupPage,
    text: "",
  },
  {
    path: "/profile",
    element: Profile,
    text: "",
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});

//  -------
// 또한 로그인 정보 충돌로 인해 발생하는 문제를 해결하기 위해 
// header.js 파일에서 UserPanel 관련 부분을 삭제한다.