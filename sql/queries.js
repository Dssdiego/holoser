// Clientes
module.exports.getClientesQuery = "SELECT * FROM sath_cliente";
module.exports.getClientePorCodigo = "SELECT * FROM sath_cliente WHERE codigo = ?";
module.exports.insertClienteQuery = "INSERT INTO sath_cliente (nome, cpf, telefone, dataNascimento, sexo, rua, numero, bairro, cidade, estado) VALUES (?)";
module.exports.editClienteQuery = "UPDATE sath_cliente (nome, cpf, telefone, dataNascimento, sexo, rua, numero, bairro, cidade, estado) VALUES (?)";
module.exports.deleteClienteQuery = "DELETE from sath_cliente WHERE codigo = ?";

// Produtos
module.exports.getProdutosQuery = "SELECT * FROM sath_produto";
module.exports.getProdutoPorCodigo = "SELECT * FROM sath_produto WHERE codigo = ?";
module.exports.insertProdutoQuery = "INSERT INTO sath_produto (nome, marca, preco, validade) VALUES (?)";
module.exports.editProdutoQuery = "UPDATE sath_produto SET nome = ?, marca = ?, preco = ?, validade = ?";
module.exports.deleteProdutoQuery = "DELETE from sath_produto WHERE codigo = ?";

// Atendimentos
module.exports.getAtendimentosQuery = "SELECT * FROM sath_atendimento";

// Relatórios
module.exports.getAgendamentosQuery = "SELECT c.nome, c.telefone, c.cidade, c.estado, ca.data_agendamento FROM sath_cliente_atendimento ca,sath_cliente c WHERE ca.codigo_cliente = c.codigo AND ca.hora_atendimento IS NULL OR ca.hora_atendimento = ''";
module.exports.getHistoricoQuery = "SELECT *, ca.hora_atendimento, c.nome, a.descricao AS servico, a.duracao, ap.quantidade_produto, p.nome AS produto, (p.preco * ap.quantidade_produto) AS custo, a.valor AS receita FROM sath_cliente c, sath_cliente_atendimento ca, sath_atendimento a, sath_atendimento_produto ap, sath_produto p WHERE c.codigo = ca.codigo_cliente AND a.codigo = ca.codigo_atendimento AND ca.hora_atendimento IS NOT NULL AND ap.codigo_atendimento = a.codigo AND p.codigo = ap.codigo_produto;"; 

// Clientes
module.exports.getClientePorLocalQuery = "SELECT cidade, estado, count(*) as qtde FROM sath_cliente GROUP BY cidade, estado ORDER BY cidade ASC";

// Produtos
module.exports.getProdutoPorMarcaQuery = "SELECT marca, count(*) AS qtde FROM sath_produto GROUP BY marca";