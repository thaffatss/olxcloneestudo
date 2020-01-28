import Cookies from 'js-cookie';
import qs from 'qs';


const BASEAPI = 'http://alunos.b7web.com.br:501';

// Requisição via POST start.
const apiFetchPost = async (endpoint, body) => {
    
    // Essa verificação faz com que caso tenha um token
    // Já mande para requisição.
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
    
    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    
    return json;
}
// Requisição via POST End.

// Requisição via GET Start.
const apiFetchGet = async (endpoint, body = []) => {
    
    // Essa verificação faz com que caso tenha um token
    // Já mande para requisição.
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
    
    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`); // Cria um templateString
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    
    return json;
}
// Requisição via GET End.

const OlxAPI = {

    login:async (email, password) => {
        // Fazer consulta ao WS
        const json = await apiFetchPost(
            '/user/signin',
            {email, password}
        );
        return json;
    },

    register:async (name, email, password, stateLoc) => {
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state:stateLoc}
        );
        return json;
    },
    
    getStates:async () => {
      const json = await apiFetchGet(
          '/states'
      );
      return json.states;
    },

    getCategories:async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    },
    
    getAds:async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },

    getAd:async (id, other = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            {id, other}
        );
        return json;
    }
};

export default () => OlxAPI;