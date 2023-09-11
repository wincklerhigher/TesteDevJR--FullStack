<?php

// Classe User representa um usuário com informações pessoais.
// Esta classe possui propriedades para armazenar dados como ID, nome, email, telefone, data de nascimento e cidade de nascimento.
// Ela também fornece métodos getters e setters para acessar e modificar essas propriedades.
class User {
    private $id;
    private $nome;
    private $email;
    private $telefone;
    private $dataNascimento;
    private $cidadeNascimento;

    public function __construct($id, $nome, $email, $telefone, $dataNascimento, $cidadeNascimento) {
        // Construtor da classe User, usado para criar uma instância de usuário com seus atributos
        $this->id = $id;
        $this->nome = $nome;
        $this->email = $email;
        $this->telefone = $telefone;
        $this->dataNascimento = $dataNascimento;
        $this->cidadeNascimento = $cidadeNascimento;
    }

    // Métodos getters para cada propriedade
    public function getId() {
        return $this->id;   
    }

    public function getNome() {
        return $this->nome;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getTelefone() {
        return $this->telefone;
    }

    public function getDataNascimento() {
        return $this->dataNascimento;
    }

    public function getCidadeNascimento() {
        return $this->cidadeNascimento;
    }

    // Métodos setters para cada propriedade (se necessário)
    public function setId($id) {
        $this->id = $id;
    }

    public function setNome($nome) {
        $this->nome = $nome;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setTelefone($telefone) {
        $this->telefone = $telefone;
    }

    public function setDataNascimento($dataNascimento) {
        $this->dataNascimento = $dataNascimento;
    }

    public function setCidadeNascimento($cidadeNascimento) {
        $this->cidadeNascimento = $cidadeNascimento;
    }

    // Método estático para buscar todos os usuários
    public static function getAllUsers() {
    // Supondo que tenha uma conexão com o banco de dados
    $conn = new mysqli('localhost', 'root', '', 'contatos_empresas');

    // Verifica a conexão
    if ($conn->connect_error) {
        die("Erro de conexão com o banco de dados: " . $conn->connect_error);
    }

    // Consulta para obter todos os usuários
    $sql = "SELECT * FROM usuario";
    $result = $conn->query($sql);
    $Users = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $Users[] = new User(
                $row['ID'],
                $row['Nome'],
                $row['Email'],
                $row['Telefone'],
                $row['DataNascimento'],
                $row['CidadeNascimento']
            );
        }
    }

    // Fecha a conexão com o banco de dados
    $conn->close();

    return $Users;
}

    public static function removerById($id) {
        // Supondo que tenha uma conexão com o banco de dados
        $conn = new mysqli('localhost', 'root', '', 'contatos_empresas');

        // Verifica a conexão
        if ($conn->connect_error) {
            die("Erro de conexão com o banco de dados: " . $conn->connect_error);
        }

        // Consulta para remover o usuário com base no ID
        $sql = "DELETE FROM usuario WHERE ID = $id";
        $result = $conn->query($sql);

        // Fecha a conexão com o banco de dados
        $conn->close();

        return $result; // Retorna true se a remoção for bem-sucedida, false caso contrário
    }
}

?>