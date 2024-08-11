import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import FindCustomer from './components/FindCustomer';
import CustomerForm from './components/CustomerForm';
import OrderList from './components/OrderList';
import FindOrder from './components/FindOrder';
import OrderForm from './components/OrderForm';
import ProductList from './components/ProductList';
import FindProduct from './components/FindProduct';
import ProductForm from './components/ProductForm';
import NotFound from './components/NotFound';


function App(){
  return (
    <div className="app-container">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/customers' element={<CustomerList/>}/>
        <Route path='/find-customer' element={<FindCustomer/>}/>
        <Route path='/add-customer' element={<CustomerForm />}/>
        <Route path='/orders' element={<OrderList/>}/>
        <Route path='/find-order' element={<FindOrder/>}/> 
        <Route path='/add-order' element={<OrderForm/>}/>
        <Route path='/products' element={<ProductList/>}/>
        <Route path='/find-product' element={<FindProduct/>}/>
        <Route path='/add-product' element={<ProductForm/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App