const { clienteModel } = require("../models/clienteModel");

const clienteController = {

  listarClientes: async (req, res) => {
    try {
      const { id_cliente } = req.query;

      if (id_cliente) {
        if (isNaN(id_cliente)) {
          return res.status(400).json({ erro: "ID inválido" });
        }

        const cliente = await clienteModel.buscarUm(parseInt(id_cliente));
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
  },

  atualizarCliente: async (req, res) => {
    try {
      const id_cliente = parseInt(req.params.id_cliente);
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

      if (!id_cliente || isNaN(id_cliente)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      const clienteExistente = await clienteModel.buscarUm(id_cliente);
      if (!clienteExistente || clienteExistente.length === 0) {
        return res.status(404).json({ erro: "Cliente não encontrado!" });
      }

      await clienteModel.atualizarCliente(
        id_cliente,
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

      res.status(200).json({ mensagem: "Cliente atualizado com sucesso!" });

    } catch (error) {
      console.error("Erro ao atualizar cliente", error);
      res.status(500).json({ erro: "Erro no servidor ao atualizar cliente!" });
    }
  },

  deletarCliente: async (req, res) => {
    try {
      const id_cliente = parseInt(req.params.id_cliente);

      if (!id_cliente || isNaN(id_cliente)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      const clienteExistente = await clienteModel.buscarUm(id_cliente);
      if (!clienteExistente || clienteExistente.length === 0) {
        return res.status(404).json({ erro: "Cliente não encontrado!" });
      }

      await clienteModel.deletarCliente(id_cliente);
      res.status(200).json({ mensagem: "Cliente deletado com sucesso!" });

    } catch (error) {
      console.error("Erro ao deletar cliente", error);
      res.status(500).json({ erro: "Erro no servidor ao deletar cliente!" });
    }
  }

};

module.exports = { clienteController };
