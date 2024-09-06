import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../style/Header.css';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const isHomePage = location.pathname === '/';
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <header>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <Link to="/" className="flex items-center">
                        <img
                            src="/images/Design sans titre (1).svg"
                            alt="Logo"
                            className="h-12 lg:h-16"
                        />
                    </Link>
                </div>

                <div className={`navbar-center ${isHomePage ? 'show' : 'hide'}`}>
                    {isHomePage ? (
                        <>
                            <p><Link to="/login">Connexion</Link></p>
                            <p><Link to="/register">Inscription</Link></p>
                        </>
                    ) : null}
                </div>

                {isHomePage && (
                    <div className="navbar-end">
                        <button className="menu-toggle" onClick={toggleMenu}>
                            ☰
                        </button>
                        <div className={`dropdown-menu ${isMenuOpen ? 'active' : ''}`}>
                            <Link to="/login" onClick={toggleMenu}>Connexion</Link>
                            <Link to="/register" onClick={toggleMenu}>Inscription</Link>
                        </div>
                    </div>
                )}

                {!isAuthPage && !isHomePage && (
                    <div className="navbar-end">
                        <button className="btn" onClick={handleLogout}>Déconnexion</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;










  