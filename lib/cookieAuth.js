import {getCookie} from './cookie';

const checkAuth = () => {
    const isLoggedIn = getCookie('isLoggedIn');

    // If the cookie exists, redirect to the login page
    if (!isLoggedIn || isLoggedIn == "false") {
        window.location.href = '/';
    }
};

export default checkAuth;