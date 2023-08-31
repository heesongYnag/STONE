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
} from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/deal",
    element: Deal,
  },
  {
    path: "/sale",
    element: Sale,
  },
  {
    path: "/test2",
    element: Test2,
  },
  {
    path: "/test3",
    element: Test3,
  },
  {
    path: "/test4",
    element: Test4,
  },
  {
    path: "/test5",
    element: Test5,
  },
  {
    path: "/test6",
    element: Test6,
  },
  {
    path: "/test7",
    element: Test7,
  },
  {
    path: "/tasks",
    element: TasksPage,
  },
  {
    path: "/profile",
    element: ProfilePage,
  },
  {
    path: "/home",
    element: HomePage,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
