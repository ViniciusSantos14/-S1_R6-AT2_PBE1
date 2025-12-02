const { clienteModel } = require("../models/clienteModel");

const clienteController = {

  listarClientes: async (req, res) => {
    try {
      const { id_cliente } = req.query;

      if (id_cliente) {
        if (id_cliente.length !== 36) {
          return res.status(400).json({ erro: "ID inválido" });
        }

        const cliente = await clienteModel.buscarUm(id_cliente);
        return res.status(200).json(cliente);
      }

      const clientes = await clienteModel.buscarTodos();
      res.status(200).json(clientes);

    } catch (error) {
      console.error("Erro ao listar clientes", error);
      res.status(500).json({ erro: "Erro ao buscar clientes" });
    }
  },

  criarCliente: async (req, res) => {
    try {
      const {
        nomeCliente,
        email,
        telefone,
        endereco,
        cpfCliente,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cep
      } = req.body;

      if (
        !nomeCliente || !email || !telefone || !endereco || !cpfCliente ||
        !logradouro || !numero || !bairro || !cidade || !estado || !cep
      ) {
        return res.status(400).json({ erro: "Campos obrigatórios não preenchidos!" });
      }

      const existeCPF = await clienteModel.buscarPorCPF(cpfCliente);

      if (existeCPF.length > 0) {
        return res.status(409).json({ erro: "CPF já cadastrado!" });
      }

      await clienteModel.inserirCliente(
        nomeCliente,
        email,
        telefone,
        endereco,
        cpfCliente,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cep
      );

      res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!" });

    } catch (error) {
      console.error("Erro ao cadastrar cliente", error);
      res.status(500).json({ erro: "Erro no servidor ao cadastrar cliente!" });
    }
  }

};

module.exports = { clienteController };
