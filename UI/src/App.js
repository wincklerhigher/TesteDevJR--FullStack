// Importações de bibliotecas e módulos
import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Lista from './Pages/Usuario/Lista';
import Formulario from './Pages/Usuario/Formulario';
import FormEmpresa from './Pages/Empresa/FormEmpresa'; 

import './App.css';

// Componente funcional "App"
function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">
          <img src="/logoCS.png" className="App-logo" alt="logo Contato Seguro" />  
        </Link>        
      </div>
      <Switch>
        {/* Define as rotas para a Lista, o Formulário e o Formulário de Empresa */}
        <Route path="/" exact component={Lista} />
        <Route path="/Formulario" component={Formulario} />
        <Route path="/FormEmpresa" component={FormEmpresa} />
      </Switch>
    </Router>
  );
}

export default App;