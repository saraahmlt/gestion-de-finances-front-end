

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/FormRegister';
import Login from './components/FormLogin';
import ListTransactions from './components/ListingTransactions';
import CreateTransactions from './components/FormCreateTransactions';
import EditTransactions from './components/FormEditTransactions';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transactions" element={<ListTransactions />} />
        <Route path="/add-transactions" element={<CreateTransactions />} />
        <Route path="/transactions/:id" element={<EditTransactions />} />

        

      </Routes>
    </Router>
  );
}


export default App;