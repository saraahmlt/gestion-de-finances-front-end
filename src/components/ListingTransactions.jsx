import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListingTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken'); 
    console.log('Token récupéré:', token); // Confirme que le token est bien récupéré

    if (token) {
      axios.get('http://localhost:8000/api/v1/transactions', {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      })
      .then(response => {
        console.log('Réponse des transactions:', response.data); // Vérifie la réponse
        
        // Traite directement la réponse comme un tableau
        if (Array.isArray(response.data)) {
          setTransactions(response.data);
        } else {
          setError('Les transactions ne sont pas disponibles ou la réponse a un format inattendu.');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des transactions:', error);
        setError('Une erreur est survenue lors de la récupération des transactions.');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setError('Token non trouvé.');
      setLoading(false);
    }
  }, []); 

  return (
    
    <div className="page-background-transactions">
      <div className="container-transactions">
        <h1 className="title-transactions">Historique des Transactions</h1>
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul className="list-transactions">
          {transactions.length > 0 ? (
            transactions.map(transaction => (
             <p  key={transaction.id} className="transaction-item">
                 <div className="transaction-name">{transaction.name}</div>
                <div className="transaction-description">{transaction.description}</div>
                <div className="transaction-amount">{transaction.amount} €</div>
                <div className="transaction-date">{transaction.date}</div>
                <div className="transaction-type">{transaction.type}</div>
              </p>
            ))
          ) : (
            <p>Aucune transaction trouvée.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListingTransactions;











