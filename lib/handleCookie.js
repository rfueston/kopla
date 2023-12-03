import {setCookie, removeCookie} from './cookie';

export const handleLogin = () => {
    setCookie('isLoggedIn', 'true', {path: '/'});
    // Add any other login logic you may need
};

export const handleLogout = () => {
    removeCookie('isLoggedIn');
    // Add any other logout logic you may need
};

// You can keep the other functions if needed (getCookie, etc.)