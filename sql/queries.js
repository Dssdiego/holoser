// Clientes
module.exports.getClientesQuery = "SELECT * FROM sath_cliente";
module.exports.insertClienteQuery = "INSERT INTO sath_cliente (nome, cpf, telefone, dataNascimento, sexo, rua, numero, bairro, cidade, estado) VALUES (?)";

// Produtos
module.exports.getProdutosQuery = "SELECT * FROM sath_produto";

// Atendimentos
module.exports.getAtendimentosQuery = "SELECT * FROM sath_atendimento";