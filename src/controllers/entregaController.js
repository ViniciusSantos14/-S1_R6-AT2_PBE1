const { entregaModel } = require("../models/entregaModel");
const { pedidoModel } = require("../models/pedidoModel");

const entregaController = {

    listarEntregas: async (req, res) => {
        try {
            const entregas = await entregaModel.buscarTodos();
            res.status(200).json(entregas);
        } catch (error) {
            console.error("erro ao listar entregas:", error);
            res.status(500).json({ error: "erro interno no servidor ao listar entregas" });
        }
    },

    calcularEntrega: async (req, res) => {
        try {
            const idPedido = parseInt(req.params.idPedido);

            if (!idPedido || isNaN(idPedido)) {
                return res.status(400).json({ error: "id do pedido inválido" });
            }

            const pedido = await pedidoModel.buscarUm(idPedido);

            if (!pedido || pedido.length !== 1) {
                return res.status(404).json({ error: "pedido não encontrado" });
            }

            const p = pedido[0];

            const valorDistancia = p.distancia_km * p.valor_km;
            const valorPeso = p.peso_kg * p.valor_kg;
            const valorBase = valorDistancia + valorPeso;

            let acrescimo = 0;
            let desconto = 0;
            let taxaExtra = 0;

            if (p.tipo_entrega === "urgente") {
                acrescimo = valorBase * 0.20;
            }

            let valorFinal = valorBase + acrescimo;

            if (valorFinal > 500) {
                desconto = valorFinal * 0.10;
                valorFinal -= desconto;
            }

            if (p.peso_kg > 50) {
                taxaExtra = 15;
                valorFinal += 15;
            }

            await entregaModel.inserirEntrega(
                idPedido,
                valorDistancia,
                valorPeso,
                acrescimo,
                desconto,
                taxaExtra,
                valorFinal,
                "calculado"
            );

            res.status(201).json({ message: "entrega calculada com sucesso!", valorFinal });

        } catch (error) {
            console.error("erro ao calcular entrega:", error);
            res.status(500).json({ error: "erro interno no servidor ao calcular entrega" });
        }
    },

    deletarEntrega: async (req, res) => {
        try {
            const idEntrega = parseInt(req.params.idEntrega);

            if (!idEntrega || isNaN(idEntrega)) {
                return res.status(400).json({ erro: "id da entrega inválido" });
            }

            const entrega = await entregaModel.buscarUm(idEntrega);

            if (!entrega || entrega.length !== 1) {
                return res.status(404).json({ erro: "entrega não encontrada" });
            }

            await entregaModel.deletarEntrega(idEntrega);

            res.status(200).json({ mensagem: "entrega deletada com sucesso" });

        } catch (error) {
            console.error("erro ao deletar entrega:", error);
            res.status(500).json({ error: "erro interno no servidor ao deletar entrega" });
        }
    }

};

module.exports = { entregaController };

