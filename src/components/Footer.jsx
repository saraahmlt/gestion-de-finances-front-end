import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div>
            <footer className="footer bg-base-200 text-base-content p-10 footer-top">
                <Link to="/" className="flex items-center">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="h-12 lg:h-16"
                    />
                </Link>
                <div className="navbar-center hidden lg:flex">
                        <p><Link to="/transactions">Transactions</Link></p>

                </div>
            </footer>
            <footer className="footer footer-center bg-base-300 text-base-content p-4 footer-bottom">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;