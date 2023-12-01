import { handleLogout } from './handleCookie'

const LogoutLink = () => {

  const DoLogout = () => {

    handleLogout();
   window.location.href="/";
   
  };

  return (
    <a onClick={DoLogout} style={{ cursor: 'pointer' }}>
      Logout
    </a>
  );
};

export default LogoutLink;