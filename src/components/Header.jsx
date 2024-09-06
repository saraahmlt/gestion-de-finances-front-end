import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Header = () => {
    const location = useLocation(); 
    const navigate = useNavigate(); 
  
    const handleLogout = () => {
      localStorage.removeItem('authToken'); 
      navigate('/login'); 
    };
  
   
    if (location.pathname === '/') {
      return (
        <>
          <header>
            <div className="navbar bg-base-100">
              <div className="navbar-start">
                <Link to="/" className="flex items-center">
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="h-12 lg:h-16"
                  />
                </Link>
              </div>
              <div className="navbar-center hidden lg:flex">
                  <p><Link to="/login">Connexion</Link></p>
                  <p><Link to="/register">Inscription</Link></p>
              </div>
            </div>
          </header>
        </>
      );
    }
  
  
    if (location.pathname === '/login' || location.pathname === '/register') {
      return null; 
    }
  
    
    return (
      <>
        <header>
          <div className="navbar bg-base-100">
            <div className="navbar-end">
              <button className="btn" onClick={handleLogout}>Déconnexion</button>
            </div>
          </div>
        </header>
      </>
    );
  };
  
  export default Header;
  