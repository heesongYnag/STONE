import {
  HomePage,
  TasksPage,
  ProfilePage,
  Deal,
  Sale,
  Test2,
  Test3,
  Test4,
  Test5, 
  Test6,
  Test7,  
  Test8,  
  Test9,  
  Test10,   
  Test11,   
} from "../pages/admin";
import { withNavigationWatcher } from "../contexts/navigation";

const routes = [
  {
    path: "/admin/deal",
    element: Deal,
  },
  {
    path: "/admin/sale",
    element: Sale,
  },
  {
    path: "/admin/test2",
    element: Test2,
  },
  {
      path: "/admin/",
      element: HomePage,
    },
  //   path: "/test4",
  //   element: Test4,
  // },
  // {
  //   path: "/test5",
  //   element: Test5,
  // },
  // {
  //   path: "/test6",
  //   element: Test6,
  // },
  // {
  //   path: "/test7",
  //   element: Test7,
  // },
  // {
  //   path: "/test8",
  //   element: Test8,
  // },
  // {
  //   path: "/test9",
  //   element: Test9,
  // },
  // {
  //   path: "/test10",
  //   element: Test10,
  // },
  // {
  //   path: "/test11",
  //   element: Test11,
  // },
  // {
  //   path: "/tasks",
  //   element: TasksPage,
  // },
  // {
  //   path: "/profile",
  //   element: ProfilePage,
  // },
  // {
  //   path: "/home",
  //   element: HomePage,
  // },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
