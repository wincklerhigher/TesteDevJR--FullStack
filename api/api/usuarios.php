<?php

// Configura os cabeçalhos de resposta para permitir solicitações de qualquer origem (CORS)
// e especifica os métodos HTTP permitidos.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

require_once './classes/dbclasses.php';

class usuarios {

    public function listUsers() {
        try {
            // Recupera todos os usuários usando o método getAllUsers na class User 
            $users = User::getAllUsers();
    
            if ($users) {
                $userArray = array(); // Cria um array para armazenar os usuários
    
                // Itere sobre os usuários e adiciona as propriedades ao array
                foreach ($users as $user) {
                    $userArray[] = array(
                        'id' => $user->getId(),
                        'nome' => $user->getNome(),
                        'email' => $user->getEmail(),
                        'telefone' => $user->getTelefone(),
                        'dataNascimento' => $user->getDataNascimento(),
                        'cidadeNascimento' => $user->getCidadeNascimento()
                    );
                }
    
                // Se houver usuários, retorna um JSON com sucesso e dados
                echo json_encode(['success' => true, 'data' => $userArray]);
            } else {
                // Se não houver usuários, retorna um JSON com erro
                echo json_encode(['success' => false, 'message' => 'Nenhum usuário encontrado']);
            }
        } catch (Exception $e) {
            // Trata exceções, se ocorrerem
            echo json_encode(['success' => false, 'message' => 'Erro ao listar usuários: ' . $e->getMessage()]);
        }
    }    

    public function createUser() {
        $data = json_decode(file_get_contents("php://input"), true);

        // Certifica se os dados necessários estão presentes
        if (
            isset($data['nome']) &&
            isset($data['email']) &&
            isset($data['telefone']) &&
            isset($data['dataNascimento']) &&
            isset($data['cidadeNascimento'])
        ) {
            try {
                // Cria um novo usuário com os dados fornecidos
                $user = new User(
                    null, // O ID pode ser definido como nulo ou deixado em branco para que o banco de dados o gere automaticamente
                    $data['nome'],
                    $data['email'],
                    $data['telefone'],
                    $data['dataNascimento'],
                    $data['cidadeNascimento']
                );

                // Insere o novo usuário no banco de dados
                $result = $user->save(); // Suponha que o método "save" seja responsável por inserir o usuário

                if ($result) {
                    // Se a inserção for bem-sucedida, retorna um JSON com sucesso
                    echo json_encode(['success' => true, 'message' => 'Usuário criado com sucesso']);
                } else {
                    // Se a inserção falhar, retorna um JSON com erro
                    echo json_encode(['success' => false, 'message' => 'Erro ao criar usuário']);
                }
            } catch (Exception $e) {
                // Trata exceções, se ocorrerem
                echo json_encode(['success' => false, 'message' => 'Erro ao criar usuário: ' . $e->getMessage()]);
            }
        } else {
            // Lida com o caso em que os dados necessários não estão presentes
            echo json_encode(['success' => false, 'message' => 'Dados incompletos']);
        }
    }

    public function removeUser($userId) {
        // Realiza a lógica de remoção (exclui o usuário com o ID fornecido)
        try {
            $result = User::removerById($userId); // Suponha que o método "removerById" seja responsável por remover o usuário

            if ($result) {
                // Se a remoção for bem-sucedida, retorna um JSON com sucesso
                echo json_encode(['success' => true, 'message' => 'Usuário removido com sucesso']);
            } else {
                // Se a remoção falhar, retorna um JSON com erro
                echo json_encode(['success' => false, 'message' => 'Erro ao remover usuário']);
            }
        } catch (Exception $e) {
            // Trata exceções, se ocorrerem
            echo json_encode(['success' => false, 'message' => 'Erro ao remover usuário: ' . $e->getMessage()]);
        }
    }
}

// Cria um objeto usuarios
$usuarios = new usuarios();

// Obtêm o método de solicitação HTTP
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Roteamento de solicitações
if ($requestMethod === 'GET') {
    // Verifica se 'acao' está definido na URL
    if (isset($_GET['acao'])) {
        if ($_GET['acao'] === 'lista') {            
            $usuarios->listUsers();
        } else {
            // Ação inválida
            echo json_encode(['success' => false, 'message' => 'Ação inválida']);
        }
    } else {
        // Ação não especificada na URL
        echo json_encode(['success' => false, 'message' => 'Ação não especificada']);
    }
} elseif ($requestMethod === 'POST') {
    // Rota para criar um novo usuário
    if ($_GET['acao'] === 'criar') {
        $usuarios->createUser();
    }
} elseif ($requestMethod === 'DELETE') {
    // Verifique se 'id' está definido na URL
    if (isset($_GET['id'])) {   
        $userId = $_GET['id'];
        $usuarios->removeUser($userId);
    } else {
        // ID não especificado na URL
        echo json_encode(['success' => false, 'message' => 'ID do usuário não especificado']);
    }
} else {
    // Método de solicitação não suportado
    http_response_code(405); // Método não permitido
    echo json_encode(['success' => false, 'message' => 'Método de solicitação não suportado']);
}

// var_dump para depuração
var_dump($usuarios);

?>