


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Register from './components/FormRegister';
import Login from './components/FormLogin';
import ListTransactions from './components/ListingTransactions';
import CreateTransactions from './components/FormCreateTransactions';
import EditTransactions from './components/FormEditTransactions';
import ShowTransaction from './components/ShowTransaction';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
     <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transactions" element={<ListTransactions />} />
        <Route path="/add-transactions" element={<CreateTransactions />} />
        <Route path="/transactions/:id" element={<EditTransactions />} />
        <Route path="/show-transaction/:id" element={<ShowTransaction />} />
      </Routes>
     <Footer />
    </Router>
  );
}


export default App;