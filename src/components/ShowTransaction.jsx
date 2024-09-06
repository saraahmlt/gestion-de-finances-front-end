import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import TransactionChart from './TransactionChart';

const ShowTransaction = () => {
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        axios.get(`http://localhost:8000/api/v1/transactions/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log('Réponse API:', response.data);

            const transactionData = response.data.transaction || response.data;

            
            const amount = parseFloat(transactionData.amount) || 0;

            const totalRevenue = transactionData.type === 'revenu' ? amount : 0;
            const totalExpenses = transactionData.type === 'dépense' ? amount : 0;

            setTransaction({
                ...transactionData,
                totalRevenue,
                totalExpenses
            });
        })
        .catch(error => {
            console.error('Erreur', error);
            setError('Une erreur est survenue lors de la récupération de la transaction.');
        });
    }, [id]);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!transaction) return <p>Chargement...</p>;

    console.log('Transaction:', transaction);

    return (
        <div className="page-background-transaction" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <div className="create-transaction-button">
               <Link to="/transactions">
                 <button>Retour</button>
               </Link>
             </div>
            <div className="card card-compact bg-base-100 w-96 shadow-xl" style={{ marginBottom: '20px' }}>
                <div className="card-body">
                    <h2 className="card-title">{transaction.name}</h2>
                    <p className='text-card-black'>{transaction.description}</p>
                    <p className='text-card'>{transaction.amount} €</p>
                    <p className='text-card'>{transaction.date}</p>
                    <p className='text-card'>{transaction.type}</p>
                </div>
            </div>
            <div className="doughnut-chart-container" style={{ width: '400px', height: '400px' }}>
                <TransactionChart data={{ totalRevenue: transaction.totalRevenue, totalExpenses: transaction.totalExpenses }} />
            </div>
        </div>
    );
};

export default ShowTransaction;



















