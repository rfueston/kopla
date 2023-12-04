import {removeCookie, setCookie} from './cookie';

export const handleLogin = () => {
    setCookie('isLoggedIn', 'true', {path: '/'});
};

export const handleLogout = () => {
    removeCookie('isLoggedIn');
};