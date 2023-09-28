<?php

$servername = "localhost"; // Endereço do servidor MySQL 
$username = "root"; // Nome de usuário do MySQL 
$password = ""; // Senha do MySQL (em branco se não houver senha)
$dbname = "contatos_empresas"; // Nome do banco de dados que se deseja acessar

try {
    // Cria uma conexão com o banco de dados MySQL
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
} catch (PDOException $erro) {
    // Trata erros de conexão com o banco de dados
    echo "Erro de conexão com o banco de dados: " . $erro->getMessage();
}

require_once 'api/usuarios.php';

// Obtêm o método de solicitação HTTP e a URI da solicitação
$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];

// Define um prefixo para as rotas da API
$api_prefix = '/api';

// Separa a URI por '/' para obter partes individuais
$uri_parts = explode('/', $request_uri);

        // Verifica se a URI começa com o prefixo da API
        if (strpos($request_uri, $api_prefix) === 0) {
        $usuarios = new usuarios();

        // Roteamento da API de Usuários
        if ($uri_parts[2] === 'usuarios') {
        // Lida com solicitações GET
        if ($request_method === 'GET') {
        if (count($uri_parts) === 3) {
            // Rota GET para listar todos os usuários
            $usuarios->listUsers();
            } elseif (count($uri_parts) === 4) {
            // Rota GET para obter detalhes de um usuário por ID
            $userId = $uri_parts[3];
            $usuarios->getUserById($userId);
            }
    }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Lidar com a solicitação POST
            $data = json_decode(file_get_contents("php://input"), true);
        
            // Processar os dados conforme necessário
            // Por exemplo: verificar se os campos obrigatórios estão presentes e inserir dados no banco de dados
                    
            // Enviar uma resposta JSON
            header('Content-Type: application/json');
            if ($data) {
                // Os dados foram recebidos e processados com sucesso
                echo json_encode(['message' => 'Dados recebidos e processados com sucesso']);
            } else {
                // Os dados não foram recebidos ou ocorreu um erro no processamento
                echo json_encode(['message' => 'Erro no processamento dos dados']);
            }
        }        
        // Lida com solicitações PUT
        elseif ($request_method === 'PUT') {
            // Rota PUT para atualizar um usuário existente
            $userId = $uri_parts[3];
            $usuarios->updateUser($userId);
        }
        // Lida com solicitações DELETE
        elseif ($request_method === 'DELETE') {
            // Rota DELETE para excluir um usuário
            $userId = $uri_parts[3];
            $usuarios->deleteUser($userId);
        }
    }

    // Roteamento da API de Empresas
}
            
?>
