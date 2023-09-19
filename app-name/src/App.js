import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './dx-styles.scss';
import { NavigationProvider } from './contexts/navigation';
import { AuthProvider } from './contexts/auth';
import { useScreenSizeClass } from './utils/media-query';
import AdminContent from './layouts/adminContent';
import MainContent from './layouts/mainContent';
import { AuthContext } from './pages/main';


import ArrayStore from 'devextreme/data/array_store';
import Diagram, {
  Nodes, AutoLayout, ContextToolbox, Toolbox, Group,
} from 'devextreme-react/diagram';


function App() {
  // path에 admin이 있으면 관리자 페이지로 이동
  const location = useLocation();
  if (location.pathname.includes('admin')) {
    return <AdminContent />;
  } else {
    return <MainContent />;
  }
}

function Layout() {
  const screenSizeClass = useScreenSizeClass();
  const location = useLocation();
  const isMain = !location.pathname.includes('admin');

  return (
    <div className={`app ${screenSizeClass} ${isMain ? 'main' : ''}`}>
      <App />
    </div>
  );
}

export default function Root() {
  const [user,setUser] = React.useState(null);

  return (
    <Router>
      <AuthContext.Provider   value ={{user,setUser}}>
        <NavigationProvider>
          <Layout />
        </NavigationProvider>
      </AuthContext.Provider>
    </Router>
  );
}