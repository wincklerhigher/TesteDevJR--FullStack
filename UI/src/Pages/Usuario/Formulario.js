// Importações de bibliotecas e módulos
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';

// Configuração da URL base para as requisições Axios
axios.defaults.baseURL = 'http://localhost:3000';

// Estilização dos componentes usando styled-components
const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const FormTitle = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const FormButton = styled.button`
  font-weight: 600;
  background-color: navy;
  color: #fff;
  border: 2px solid #009bff;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 1s ease;
  cursor: pointer;
  margin-top: 8px;  

  &:hover {
    background-color: blue;
  }
`;

// Componente principal do formulário
const Formulario = () => {
  // Estados para armazenar dados do usuário e controle de edição
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [city, setCity] = useState('');
  const [modoEdicao, setModoEdicao] = useState(true);
  const [userId, setUserId] = useState(null);
  const history = useHistory();

  // Obtém a localização e parâmetros da URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userIdParam = params.get('valor');

  // Efeito colateral para carregar dados do usuário se o ID estiver presente
  useEffect(() => {
    if (userIdParam) {
      // Está no modo de edição, carrega os dados do usuário pelo ID
      axios
        .get(`http://localhost:3000/api/usuarios/${userIdParam}`)
        .then((response) => {
          if (response && response.data) {
            const usuario = response.data;
            setName(usuario.nome);
            setEmail(usuario.email);
            setPhone(usuario.telefone);
            setBirthdate(usuario.nascimento);
            setCity(usuario.cidade);
            setModoEdicao(true);
            setUserId(userIdParam);
          } else {
            console.error('Resposta inválida ao carregar usuário');
          }
        })
        .catch((error) => {
          console.error('Erro ao carregar usuário:', error);
          if (error.response) {
            console.error('Status do erro:', error.response.status);
            console.error('Mensagem do erro:', error.response.data);
          }
        });
    }
  }, [userIdParam]);

  // Função para lidar com a submissão do formulário para inserir um novo usuário
  const handleInserir = async (e) => {
    e.preventDefault();

    // Cria um objeto com os dados do usuário
    const userData = {
      nome: name,
      email: email,
      telefone: phone,
      nascimento: birthdate,
      cidade: city,
    };

    try {
      // Envia uma requisição POST para criar um novo usuário
      const response = await axios.post(
        'http://localhost:3000/api/usuarios',
        userData
      );
      console.log('Novo usuário criado com sucesso:', response.data);

      // Limpa os campos do formulário após o envio bem-sucedido
      setName('');
      setEmail('');
      setPhone('');
      setBirthdate('');
      setCity('');

      // Redireciona de volta para a lista de usuários
      history.push('/lista'); 
    } catch (error) {
      // Tratamento de erros da requisição
      if (error.response) {
        console.error('Erro de resposta da API:', error.response.data);
        console.error('Código de status:', error.response.status);
      } else if (error.request) {
        console.error('Erro de solicitação:', error.request);
      } else {
        console.error('Erro desconhecido:', error.message);
      }
    }
  };

  // Função para lidar com a submissão do formulário para atualizar um usuário existente
  const handleAtualizar = async (e) => {
    e.preventDefault();

    // Cria um objeto com os dados do usuário
    const userData = {
      nome: name,
      email: email,
      telefone: phone,
      nascimento: birthdate,
      cidade: city,
    };

    try {
      // Envia uma requisição PUT para atualizar o usuário pelo ID
      const response = await axios.put(
        `http://localhost:3000/api/usuarios/${userId}`,
        userData
      );
      console.log('Usuário atualizado com sucesso:', response.data);

      // Limpa os campos do formulário após o envio bem-sucedido
      setName('');
      setEmail('');
      setPhone('');
      setBirthdate('');
      setCity('');

      // Redireciona de volta para a lista
      history.push('/lista'); 
    } catch (error) {
      // Tratamento de erros da requisição
      if (error.response) {
        console.error('Erro de resposta da API:', error.response.data);
        console.error('Código de status:', error.response.status);
      } else if (error.request) {
        console.error('Erro de solicitação:', error.request);
      } else {
        console.error('Erro desconhecido:', error.message);
      }
    }
  };

  return (
    // Renderização do formulário com os campos e botões correspondentes
    <FormContainer>
      <FormTitle>Formulário de Usuário</FormTitle>
      <Form onSubmit={modoEdicao ? handleAtualizar : handleInserir}>
        <FormLabel>Nome:</FormLabel>
        <FormInput          
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required // Obriga a inserção de uma string
        />
        <FormLabel>E-mail:</FormLabel>
        <FormInput        
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
       <FormLabel>Telefone:</FormLabel>
       <FormInput
          type="tel"  
          value={phone}
          onChange={(e) => {
          const inputPhone = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos 
          const truncatedPhone = inputPhone.slice(0, 9); // Limita a inserção de apenas 9 caracteres
          setPhone(truncatedPhone);
          }}
          maxLength={9}        
        />
        <FormLabel>Data de Nascimento:</FormLabel>
        <FormInput
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <FormLabel>Cidade de Nascimento:</FormLabel>
        <FormInput
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <FormButton type="submit">
            Salvar 
          </FormButton>                   
          {modoEdicao && (
            <FormButton type="button" onClick={() => history.push('/')}>
              Cancelar
            </FormButton>
          )}
        </div>
      </Form>
    </FormContainer>
  );
};

export default Formulario;