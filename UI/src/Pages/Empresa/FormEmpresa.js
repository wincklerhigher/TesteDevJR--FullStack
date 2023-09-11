// Importações de bibliotecas e módulos
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const FormButton = styled.button`
  font-weight: 770;
  background-color: blue;
  color: #eee;
  border: 2px solid #009bff;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 3s ease;
  cursor: pointer;

  &:hover {
    background-color: navy;
  }
`;

// Componente principal do FormEmpresa
const FormEmpresa = () => {
  const [empresaData, setEmpresaData] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
    userId: '', // Chave estrangeira vinculando a empresa ao usuário
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faz uma solicitação POST à sua API para criar uma empresa
      const response = await axios.post('/api/empresa', empresaData);

      // Lida com a resposta da API, por exemplo, mostrar uma mensagem de sucesso
      console.log('Resposta da API:', response.data);

      // Limpar os campos do formulário após o envio bem-sucedido
      setEmpresaData({
        nome: '',
        cnpj: '',
        endereco: '',
        userId: '', // Redefine a chave estrangeira
      });
    } catch (error) {
      // Lida com erros de solicitação, por exemplo, mostrar uma mensagem de erro
      console.error('Erro ao enviar dados para a API:', error);
    }
  };

  return (
    // Renderização do FormEmpresa com os campos e botões correspondentes
    <FormContainer>
      <FormTitle>Formulário de Empresa</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormLabel>Nome da Empresa:</FormLabel>
        <FormInput
          type="text"
          name="nome"
          value={empresaData.nome}
          onChange={(e) =>
            setEmpresaData({ ...empresaData, nome: e.target.value })
          }
          required
        />
        <FormLabel>CNPJ:</FormLabel>
        <FormInput
          type="text"
          name="cnpj"
          value={empresaData.cnpj}
          onChange={(e) =>
            setEmpresaData({ ...empresaData, cnpj: e.target.value })
          }
          required
        />
        <FormLabel>Endereço:</FormLabel>
        <FormInput
          type="text"
          name="endereco"
          value={empresaData.endereco}
          onChange={(e) =>
            setEmpresaData({ ...empresaData, endereco: e.target.value })
          }
          required
        />
        {/* Campo oculto para a chave estrangeira userId */}
        <input
          type="hidden"
          name="userId"
          value={empresaData.userId}
          onChange={(e) =>
            setEmpresaData({ ...empresaData, userId: e.target.value })
          }
        />
        <FormButton type="submit">Inserir Empresa</FormButton>
      </Form>
    </FormContainer>
  );
};

export default FormEmpresa;