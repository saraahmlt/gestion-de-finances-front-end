import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Register.css';

const FormRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = process.env.REACT_APP_API_URL; 

    axios.post(`${apiUrl}/api/v1/register`, formData)
      .then(response => {
        setMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        setFormData({
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        });
        setErrors({});

        navigate('/login'); 
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setErrors(error.response.data.errors);
          setMessage(error.response.data.message || 'Une erreur est survenue lors de l\'inscription.');
        } else {
          setMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
      });
  };

  return (
    <div className="page-background-register">
      <div className="container-register">
        <div className="form-register">
          <h1 className="title-register">S’enregistrer</h1>
          {message && <p style={{ color: 'red' }}>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div>
                <label htmlFor="name">Nom</label>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-input-bordered-w-full-register"
              />
              {errors.name && <p style={{ color: 'red' }}>{errors.name[0]}</p>}
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="email">Email</label>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-input-bordered-w-full-register"
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email[0]}</p>}
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="password">Mot de passe</label>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-input-bordered-w-full-register"
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password[0]}</p>}
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="password_confirmation">Confirmer le mot de passe</label>
              </div>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="input-input-bordered-w-full-register"
              />
            </div>
            <button type="submit" className="btnForm-mt-10-btn-registerr">S’enregistrer</button>
            <div>
              <button className="btnForm-mt-10-btn-loginn">
                <Link to="/login">Vous avez déjà un compte ? Se connecter</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;


