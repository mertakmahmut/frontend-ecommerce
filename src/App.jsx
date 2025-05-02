import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shops from './pages/Shops';
import Card from './pages/Card';
import Shipping from './pages/Shipping';
import Details from './pages/Details';
import Login from './pages/Login';
import Register from './pages/Register';
import { get_category } from './store/reducers/homeReducer';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import CategoryShop from './pages/CategoryShop';
import SearchProducts from './pages/SearchProducts';

function App() {

  const dispatch = useDispatch() // useDispatch() => Şunu Yap! anlamına gelir.

  useEffect(() => { // useEffect sayfa render edildiğinde bir kere çalışır
    dispatch(get_category()) // get_category apisiyle backendden kategorileri çeker. Bu aşamadan sonra diğer componentlara gidip 
  }, [])

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Home/>} />
      <Route path='/login' element= {<Login/>} />
      <Route path='/register' element= {<Register/>} />
      <Route path='/shops' element= {<Shops/>} />
      <Route path='/cart' element= {<Card/>} />
      <Route path='/shipping' element= {<Shipping/>} />
      <Route path='/products?' element= {<CategoryShop/>} />
      <Route path='/products/search?' element= {<SearchProducts/>} />
      <Route path='/product/details/:slug' element= {<Details/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
