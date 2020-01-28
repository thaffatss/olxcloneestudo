import Cookies from 'js-cookie'; //importo a biblioteca js-cookie.

// Uma função que verifica se usuário está logado retornando true ou false.
export const isLogged = () => {
    let token = Cookies.get('token'); // pega lá nos Cookies o token.
    return (token) ? true : false; // faz uma verificação se existe ou não o token.
}

// Responsavel por fazer login.
export const doLogin = (token, rememberPassword = false) => {
    if(rememberPassword) {
        Cookies.set('token', token, { expires:999 });
    } else {
        Cookies.set('token', token);
    }
}

// Responsavel por fazer Logout.
export const doLogout = () => {
    Cookies.remove('token');
}