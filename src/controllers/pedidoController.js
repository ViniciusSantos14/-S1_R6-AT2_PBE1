const { pedidoModel } = require("../models/pedidoModel");

const pedidoController = {
  listarPedidos: async (req, res) => {
    try {
      const { idPedido } = req.query;

      if (idPedido) {
        if (idPedido.length != 36) {
          return res.status(400).json({ erro: "id do pedido invalido" });
        }

        const pedido = await pedidoModel.buscarUm(idPedido);
        return res.status(200).json(pedido);
      }

      const pedidos = await pedidoModel.buscarTodos();
      res.status(200).json(pedidos);

    } catch (error) {
      console.error("Erro ao listar pedidos", error);
      res.status(500).json({ Message: "Erro ao buscar pedidos" });
    }
  },

  criarPedido: async (req, res) => {
    try {
      const {
        idCliente,
        dataPedido,
        tipoEntrega,
        distanciaKM,
        pesoKG,
        valorPorKM,
        valorPorKG
      } = req.body;

      if (
        idCliente == undefined ||
        dataPedido == undefined ||
        tipoEntrega == undefined ||
        distanciaKM == undefined ||
        pesoKG == undefined ||
        valorPorKM == undefined ||
        valorPorKG == undefined
      ) {
        return res.status(400).json({ erro: "Campos obrigatorios não preenchidos!" });
      }

      if (idCliente.length != 36) {
        return res.status(400).json({ erro: "id do cliente invalido" });
      }

      await pedidoModel.inserirPedido(
        idCliente,
        dataPedido,
        tipoEntrega,
        distanciaKM,
        pesoKG,
        valorPorKM,
        valorPorKG
      );

      res.status(201).json({ message: "Pedido registrado com sucesso!" });

    } catch (error) {
      console.error("Erro ao fazer cadastro do pedido!", error);
      res.status(500).json({ erro: "Erro no servidor ao fazer novo pedido!" });
    }
  }
};

module.exports = { pedidoController };
