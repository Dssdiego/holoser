// Clientes
module.exports.getClientesQuery = "SELECT * FROM sath_cliente";
module.exports.getClientePorCodigo = "SELECT * FROM sath_cliente WHERE codigo = ?";
module.exports.insertClienteQuery = "INSERT INTO sath_cliente (nome, cpf, telefone, dataNascimento, sexo, rua, numero, bairro, cidade, estado) VALUES (?)";

// Produtos
module.exports.getProdutosQuery = "SELECT * FROM sath_produto";

// Atendimentos
module.exports.getAtendimentosQuery = "SELECT * FROM sath_atendimento";

// Relatórios

// Atendimentos
module.exports.getAgendamentosQuery = "SELECT c.nome, c.telefone, c.cidade, c.estado, ca.data_agendamento FROM sath_cliente_atendimento ca,sath_cliente c WHERE ca.codigo_cliente = c.codigo AND ca.hora_atendimento IS NULL OR ca.hora_atendimento = ''";

// Clientes
module.exports.getClientePorLocalQuery = "SELECT cidade, estado, count(*) as qtde FROM sath_cliente GROUP BY cidade, estado ORDER BY cidade ASC";

// Produtos
module.exports.getProdutoPorMarcaQuery = "SELECT marca, count(*) AS qtde FROM sath_produto GROUP BY marca";