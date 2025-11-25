const { sql, getConnection } = require("../config/db");

const pedidoModel = {
    buscarTodos: async () => {
        try {
            const pool = await getConnection();

            const sqlQuery = "SELECT * FROM Pedidos;";

            const result = await pool.request().query(sqlQuery);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar pedidos", error);
            throw error;
        }
    },

    buscarUm: async (idPedido) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                SELECT * FROM Pedidos WHERE idPedido = @idPedido
            `;

            const result = await pool.request()
                .input("idPedido", sql.UniqueIdentifier, idPedido)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar pedido", error);
            throw error;
        }
    },

    inserirPedido: async (
        idCliente,
        dataPedido,
        tipoEntrega,
        distanciaKM,
        pesoKG,
        valorPorKM,
        valorPorKG
    ) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                INSERT INTO Pedidos
                (idCliente, dataPedido, tipoEntrega, distanciaKM, pesoKG, valorPorKM, valorPorKG)
                VALUES
                (@idCliente, @dataPedido, @tipoEntrega, @distanciaKM, @pesoKG, @valorPorKM, @valorPorKG)
            `;

            await pool.request()
                .input("idCliente", sql.UniqueIdentifier, idCliente)
                .input("dataPedido", sql.Date, dataPedido)
                .input("tipoEntrega", sql.VarChar(10), tipoEntrega)
                .input("distanciaKM", sql.Decimal(10,2), distanciaKM)
                .input("pesoKG", sql.Decimal(10,2), pesoKG)
                .input("valorPorKM", sql.Decimal(10,2), valorPorKM)
                .input("valorPorKG", sql.Decimal(10,2), valorPorKG)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao inserir pedido", error);
            throw error;
        }
    }
};

module.exports = { pedidoModel };
