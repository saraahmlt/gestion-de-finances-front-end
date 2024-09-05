import React, { useState } from 'react';
import axios from 'axios';

const FormCreateTransactions = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('revenu');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('Token non trouvé.');
      return;
    }

    setLoading(true);
    axios.post('http://localhost:8000/api/v1/transactions', {
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
      setSuccess('Transaction créée avec succès.');
      setName('');
      setType('revenu');
      setAmount('');
      setDate('');
      setDescription('');
    })
    .catch(error => {
      console.error('Erreur lors de la création de la transaction:', error);
      setError('Une erreur est survenue lors de la création de la transaction.');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="page-background-create-transaction">
      <div className="container-create-transaction">
        <h1 className="title-create-transaction">Créer une Transaction</h1>
        {loading && <p>Chargement...</p>}
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
          <button type="submit">Créer</button>
        </form>
      </div>
    </div>
  );
};

export default FormCreateTransactions;