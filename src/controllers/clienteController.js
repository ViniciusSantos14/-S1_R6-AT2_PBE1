const { clienteModel } = require("../models/clienteModel");

const clienteController = {
  listarClientes: async (req, res) => {
    try {
      const { idCliente } = req.query;

      if (idCliente) {
        if (idCliente.length != 36) {
          return res.status(400).json({ erro: "id do cliente invalido" });
        }

        const cliente = await clienteModel.buscarUm(idCliente);
        return res.status(200).json(cliente);
      }

      const clientes = await clienteModel.buscarTodos();
      res.status(200).json(clientes);

    } catch (error) {
      console.error("Erro ao listar clientes", error);
      res.status(500).json({ Message: "Erro ao buscar cliente" });
    }
  },

  criarCliente: async (req, res) => {
    try {
      const {
        nomeCliente,
        cpfCliente,
        telefoneCliente,
        emailCliente,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cep
      } = req.body;

      if (
        nomeCliente == undefined ||
        cpfCliente == undefined ||
        telefoneCliente == undefined ||
        emailCliente == undefined ||
        logradouro == undefined ||
        numero == undefined ||
        bairro == undefined ||
        cidade == undefined ||
        estado == undefined ||
        cep == undefined
      ) {
        return res.status(400).json({ erro: "Campos obrigatorios não preenchidos!" });
      }

      const result = await clienteModel.buscarPorCPF(cpfCliente);

      if (result.length > 0) {
        return res.status(409).json({ message: "CPF já cadastrado" });
      }

      await clienteModel.inserirCliente(
        nomeCliente,
        cpfCliente,
        telefoneCliente,
        emailCliente,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cep
      );

      res.status(201).json({ message: "Cliente cadastrado com sucesso!" });

    } catch (error) {
      console.error("Erro ao fazer cadastro!", error);
      res.status(500).json({ erro: "Erro no servidor ao fazer novo cadastro!" });
    }
  }
};

module.exports = { clienteController };
