import React from 'react';
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import Quote from './pages/Quote';
import Register from './pages/Register';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path = '/register' exact element = {<Register />} />
          <Route path = '/login' exact element = {<Login />} />  
          <Route path = '/quote' exact element = {localStorage.getItem('token')?<Quote/>:<Register/>} />         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
