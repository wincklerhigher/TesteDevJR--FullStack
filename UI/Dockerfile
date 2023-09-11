# Use uma imagem base do MySQL
FROM mysql:latest

# Defina a senha do usuário root do MySQL
ENV MYSQL_ROOT_PASSWORD="sua_senha_root"

# Defina o nome do banco de dados, se necessário
ENV MYSQL_DATABASE=contatos_empresas

# Exponha a porta do MySQL (geralmente 3306)
EXPOSE 3306

# Comando para iniciar o servidor MySQL
CMD ["mysqld"]