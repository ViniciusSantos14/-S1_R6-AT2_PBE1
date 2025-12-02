const { sql, getConnection } = require("../config/db");

const entregaModel = {
    buscarTodos: async () => {
        try {
            const pool = await getConnection();
            const querySQL = "SELECT * FROM Entregas;";
            const result = await pool.request().query(querySQL);
            return result.recordset;
        } catch (error) {
            console.error("Erro ao buscar entregas", error);
            throw error;
        }
    },

    buscarUm: async (idEntrega) => {
        try {
            const pool = await getConnection();
            const querySQL = "SELECT * FROM Entregas WHERE idEntrega = @idEntrega";
            const result = await pool.request()
                .input("idEntrega", sql.Int, idEntrega)
                .query(querySQL);
            return result.recordset;
        } catch (error) {
            console.error("Erro ao buscar entrega", error);
            throw error;
        }
    },

    buscarPorPedido: async (idPedido) => {
        try {
            const pool = await getConnection();
            const querySQL = "SELECT * FROM Entregas WHERE idPedido = @idPedido";
            const result = await pool.request()
                .input("idPedido", sql.Int, idPedido)
                .query(querySQL);
            return result.recordset;
        } catch (error) {
            console.error("Erro ao buscar entrega por pedido", error);
            throw error;
        }
    },

    inserirEntrega: async (
        idPedido,
        valorDistancia,
        valorPeso,
        acrescimo,
        desconto,
        taxaExtra,
        valorFinal,
        statusEntrega
    ) => {
        try {
            const pool = await getConnection();
            const querySQL = `
                INSERT INTO Entregas
                (idPedido, valorDistancia, valorPeso, acrescimo, desconto, taxaExtra, valorFinal, statusEntrega)
                VALUES
                (@idPedido, @valorDistancia, @valorPeso, @acrescimo, @desconto, @taxaExtra, @valorFinal, @statusEntrega)
            `;
            await pool.request()
                .input("idPedido", sql.Int, idPedido)
                .input("valorDistancia", sql.Decimal(10,2), valorDistancia)
                .input("valorPeso", sql.Decimal(10,2), valorPeso)
                .input("acrescimo", sql.Decimal(10,2), acrescimo)
                .input("desconto", sql.Decimal(10,2), desconto)
                .input("taxaExtra", sql.Decimal(10,2), taxaExtra)
                .input("valorFinal", sql.Decimal(10,2), valorFinal)
                .input("statusEntrega", sql.VarChar(20), statusEntrega)
                .query(querySQL);
        } catch (error) {
            console.error("Erro ao inserir entrega", error);
            throw error;
        }
    }
};

module.exports = { entregaModel };
