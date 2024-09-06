import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/Login.css';

const FormLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/v1/login', formData)
      .then(response => {
        console.log('Réponse complète de l\'API:', response.data);

        const token = response.data.data?.token; 
        if (token) {
          localStorage.setItem('authToken', token);
          setMessage('Connexion réussie !');
          setFormData({
            email: '',
            password: '',
          });
          setErrors({});
        } else {
          setMessage('Token non reçu. Vérifiez la réponse de l\'API.');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la connexion:', error);

        if (error.response && error.response.data) {
          setErrors(error.response.data.errors || {});
          setMessage(error.response.data.message || 'Une erreur est survenue lors de la connexion.');
        } else {
          setMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
      });
  };

  return (
    <div className="page-background">
      <div className="container-login">
        <div className="form-login">
          <h1 className='title-login'>Se connecter</h1>
          {message && <p style={{ color: 'red' }}>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group-email">
                <div>
                 <label htmlFor="email">Email</label>
                </div>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="input input-bordered w-full"
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email[0]}</p>}
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="password">Mot de passe</label>
              </div>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className="input input-bordered w-full"
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password[0]}</p>}
            </div>
            <button type="submit" className="btnForm-mt-10-btn-login">Se connecter</button>
            <div>
              <button className="btnForm-mt-10-btn-register">
                <Link to='/register'>Pas encore de compte ? S'enregistrer</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;





