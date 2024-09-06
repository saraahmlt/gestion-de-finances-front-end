import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/ListingTransactions.css';


const ListingTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  
    useEffect(() => {
      const token = localStorage.getItem('authToken'); 
      console.log('Token récupéré:', token); 
  
      if (token) {
        axios.get('http://localhost:8000/api/v1/transactions', {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        })
        .then(response => {
          console.log('Réponse des transactions:', response.data); 
          
          
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
  
    
    const handleDelete = (id) => {
      const token = localStorage.getItem('authToken'); 
  
      if (token) {
        axios.delete(`http://localhost:8000/api/v1/transactions/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then(response => {
          setSuccess('Transaction supprimée avec succès.');
          setTransactions(transactions.filter(transaction => transaction.id !== id));
        })
        .catch(error => {
          console.error('Erreur lors de la suppression de la transaction:', error);
          setError('Une erreur est survenue lors de la suppression de la transaction.');
        });
      } else {
        setError('Token non trouvé.');
      }
    };

  return (
     
    <div className="page-background-transactions">
      <div className="container-transactions">
        <h1 className="title-transactions">Historique des Transactions</h1>
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="create-transaction-button">
          <Link to="/add-transactions">
            <button>Ajouter une Transaction</button>
          </Link>
        </div>

        

        <ul className="list-transactions">
          {transactions.length > 0 ? (
            transactions.map(transaction => (
             <p  key={transaction.id} className="transaction-item">
                 <Link to={`/show-transaction/${transaction.id}`}>
  <button className="btn">Voir</button>
</Link>

                 <div className="transaction-name">{transaction.name}</div>
                <div className="transaction-description">{transaction.description}</div>
                <div className="transaction-amount">{transaction.amount} €</div>
                <div className="transaction-date">{transaction.date}</div>
                <div className="transaction-type">{transaction.type}</div>
                <div className="edit-transaction-button">
                  <Link to={`/transactions/${transaction.id}`}>
                    <button>Modifier </button>
                  </Link>
                </div>

                <div className="delete-transaction-button">
                  <button onClick={() => handleDelete(transaction.id)}>Supprimer</button>
                </div>

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











