// Importações de bibliotecas e módulos
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Switch, Route, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Configuração da URL base para as requisições Axios
axios.defaults.baseURL = 'http://localhost:3000';

// Estilização dos componentes usando styled-components
const ButtonContainer = styled.div`
  padding: 5px 5px;
  background-color: white; 
  color: #000;  
`;

const Main = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center; 
  flex-direction: column; 
  width: 100%;
  height: 100%; 
  gap: 5px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 10px;   
`;

const FiltroPorColuna = styled.label`
  font-size: 14px;  
  font-weight: bold;
  margin: 15px; 
`;  

// Estilo inline para um botão
const estiloInline = {
  backgroundColor: 'black',
  color: 'white',
  padding: '7px',
  borderRadius: '5px',
  textAlign: 'center',
  margin: '0px 120px 0px 0px',
  cursor: 'pointer'
};

// Adiciona espaçamento para todas as colunas
const Th = styled.th`
  padding: 14px;
`;

// Adiciona espaçamento para todas as células de dados
const Td = styled.td`
  padding: 10px;
`;

// Componente funcional "Lista"
function Lista() {
  const [colunaSelecionada, setColunaSelecionada] = useState('nome');
  const [termoBusca, setTermoBusca] = useState('');
  const history = useHistory();

  // Define a variável 'colunas' que lista os nomes das colunas da tabela
  const colunas = ['nome', 'email', 'telefone', 'nascimento', 'cidade'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Faz uma requisição GET para obter a lista de usuários
        const response = await axios.get('http://localhost:3000/api/usuarios');

        if (response && response.data) {
          const usuarios = response.data;

          if (Array.isArray(usuarios)) {
            // Filtra os usuários com base no termo de busca
            const usuariosFiltrados = usuarios.filter((user) => user.nome.includes(termoBusca));
            setDados(usuariosFiltrados);
          } else {
            console.error('Dados do usuário não é uma array');
          }
        } else {
          console.error('Resposta inválida ao listar usuários');
        }
      } catch (error) {
        console.error('Erro ao listar usuários:', error);
        if (error.response) {
          console.error('Status do erro:', error.response.status);
          console.error('Mensagem do erro:', error.response.data);
        }
      }
    };

    fetchData();
  }, [termoBusca]);

  const filtrarDados = () => {
    return dados.filter((item) => {
      return item[colunaSelecionada].toLowerCase().includes(termoBusca.toLowerCase());
    });
  };

  const editar = (index) => {
    const usuario = dados[index];
    history.push(`/Formulario?valor=${usuario.id}`);
  };

  const remover = (index) => {
    const usuario = dados[index];
    if (window.confirm(`Tem certeza de que deseja remover o usuário ${usuario.nome}?`)) {
      // Faz uma requisição DELETE para remover o usuário
      axios.delete(`http://localhost:3000/api/usuarios/remover?id=${usuario.id}`)
        .then((response) => {
          if (response.data.success) {
            alert('Usuário removido com sucesso');
            const novosDados = [...dados];
            novosDados.splice(index, 1);
            setDados(novosDados);
          } else {
            alert('Erro ao remover usuário');
          }
        })
        .catch((error) => {
          console.error('Erro ao remover usuário:', error);
        });
    }
  };

  // Exemplo de usuário criado
  const usuarioExemplo = {
    nome: 'Willian',
    email: 'willian.winckler@hotmail.com',
    telefone: '980106546',
    nascimento: '03/11/1988',
    cidade: 'Porto Alegre',
  };

  // Inicializa o estado "dados" com o usuário de exemplo e um segundo usuário
  const dadosIniciais = [usuarioExemplo,
  {
    nome: 'Josi',
    email: 'josi@hotmail.com',
    telefone: '123456789',
    nascimento: '11/08/1990',
    cidade: 'Porto Alegre',
  }
  ];

  const [dados, setDados] = useState(dadosIniciais);

  // Filtra os dados com base no termo de busca atual
  const dadosFiltrados = filtrarDados();

  return (
    // Renderização da página principal
    <Main>
      <div>                        
        <ButtonContainer>            
          <button style={estiloInline} onClick={() => history.push('/Formulario')}>+</button>
          <FiltroPorColuna htmlFor="coluna">Filtrar por Coluna:</FiltroPorColuna>
          <select
            id="coluna"
            value={colunaSelecionada}
            onChange={(e) => setColunaSelecionada(e.target.value)}
          >
            {colunas.map((coluna) => (
              <option key={coluna} value={coluna}>
                {coluna.charAt(0).toUpperCase() + coluna.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="text"
            id="filtro"
            placeholder="Buscar..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </ButtonContainer>
      </div>            
      <br /><br />
      <div>
        <Table>
          <thead>
            <tr>
              {colunas.map((coluna) => (
                <Th key={coluna}>{coluna.charAt(0).toUpperCase() + coluna.slice(1)}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dadosFiltrados.map((item, index) => (
              <tr key={index}>
                {colunas.map((coluna) => (
                  <Td key={coluna}>{item[coluna]}</Td>                                
                ))}
                <td>
                  <button onClick={() => editar(index)}>Editar</button>                        
                </td>
                <td>
                  <button onClick={() => remover(index)}>Remover</button>
                </td>
              </tr>                        
            ))}
          </tbody>
        </Table>     
      </div>       
    </Main>                        
  );
}

export default Lista;