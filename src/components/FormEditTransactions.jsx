import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FormEditTransaction = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [transaction, setTransaction] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('revenu');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('Token non trouvé.');
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:8000/api/v1/transactions/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      const data = response.data;
      setTransaction(data);
      setName(data.name);
      setType(data.type);
      setAmount(data.amount);
      setDate(data.date);
      setDescription(data.description || '');
    })
    .catch(error => {
      console.error('Erreur lors de la récupération de la transaction:', error);
      setError('Une erreur est survenue lors de la récupération de la transaction.');
    })
    .finally(() => {
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('Token non trouvé.');
      return;
    }

    setLoading(true);
    axios.put(`http://localhost:8000/api/v1/transactions/${id}`, {
      name,
      type,
      amount,
      date,
      description,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      setSuccess('Transaction modifiée avec succès.');
      navigate('/transactions'); 
    })
    .catch(error => {
      console.error('Erreur lors de la modification de la transaction:', error);
      setError('Une erreur est survenue lors de la modification de la transaction.');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  if (loading) return <p>Chargement...</p>;

  if (!transaction) return <p>Transaction non trouvée.</p>;

  return (
    <div className="page-background-edit-transaction">
      <div className="container-edit-transaction">
        <h1 className="title-edit-transaction">Modifier la Transaction</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Nom:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
          </div>
          <div>
            <label>
              Type:
              <select value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="revenu">Revenu</option>
                <option value="dépense">Dépense</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Montant:
              <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </label>
          </div>
          <div>
            <label>
              Date:
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
          </div>
          <button type="submit">Modifier</button>
        </form>
      </div>
    </div>
  );
};

export default FormEditTransaction;
