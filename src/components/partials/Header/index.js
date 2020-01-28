import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderArea } from './styled';

import { isLogged, doLogout } from '../../../helpers/AuthHandler';

const Header = () => {

    // Salva na variável logged true se o usuário está logado e false caso não esteja.
    let logged = isLogged();

    // ** Função encarregada de fazer logout. ** //
    const handleLogout = () => {
        
        // Usa função que remove o token do Cookies, deslogando o usuário.
        doLogout();

        // Redireciona para raiz do sistema.
        window.location.href = '/';
    }

    return (
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <span className="logo-1">B</span>
                        <span className="logo-2">H</span>
                        <span className="logo-3">N</span>
                    </Link>
                </div>

                <nav>
                <ul>
                    {logged &&
                        <>
                            <li>
                                <Link to="/my-account">Minha Conta</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Sair</button>
                            </li>
                        </>
                    }
                    {!logged &&
                        <>
                            <li>
                                <Link to="/signin">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Cadastrar</Link>
                            </li>
                            <li>
                                <Link to="/signin" className="button">Poste um anúncio</Link>
                            </li>
                        </>
                    }
                </ul>
            </nav>

            </div>
        </HeaderArea>
    );
}

export default Header;