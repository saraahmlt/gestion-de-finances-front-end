import React from 'react';
import ListingTransactions from '../components/ListingTransactions'
import '../style/ListingTransactions.css';


const ListTransactions = () => {
    return (
        <div className="page-background-transactions">
            <ListingTransactions />
        </div>
    );
};

export default ListTransactions;