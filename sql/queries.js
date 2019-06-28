// Clientes
module.exports.getClientesQuery = "SELECT * FROM sath_cliente";
module.exports.getClientePorCodigo = "SELECT * FROM sath_cliente WHERE codigo = ?";
module.exports.insertClienteQuery = "INSERT INTO sath_cliente (nome, cpf, telefone, dataNascimento, sexo, rua, numero, bairro, cidade, estado) VALUES (?)";

// Produtos
module.exports.getProdutosQuery = "SELECT * FROM sath_produto";

// Atendimentos
module.exports.getAtendimentosQuery = "SELECT * FROM sath_atendimento";

// Relatórios
module.exports.getClientePorLocalQuery = "SELECT cidade, estado, count(*) as qtde FROM sath_cliente GROUP BY cidade, estado ORDER BY cidade ASC";
module.exports.getProdutoPorMarcaQuery = "SELECT marca, count(*) AS qtde FROM sath_produto GROUP BY marca";