const { sql, getConnection } = require("../config/db");

const clienteModel = {

    buscarTodos: async () => {
        try {
            const pool = await getConnection();
            const sqlQuery = "SELECT * FROM Clientes;";
            const result = await pool.request().query(sqlQuery);
            return result.recordset;
        } catch (error) {
            console.error("Erro ao buscar clientes", error);
            throw error;
        }
    },

    buscarUm: async (idCliente) => {
        try {
            const pool = await getConnection();
            const querySQL = `
                SELECT * FROM Clientes 
                WHERE idCliente = @idCliente
            `;

            const result = await pool.request()
                .input("idCliente", sql.UniqueIdentifier, idCliente)
                .query(querySQL);

            return result.recordset;
        } catch (error) {
            console.error("Erro ao buscar cliente", error);
            throw error;
        }
    },

    buscarPorCPF: async (cpfCliente) => {
        try {
            const pool = await getConnection();
            const querySQL = `
                SELECT * FROM Clientes 
                WHERE cpfCliente = @cpfCliente;
            `;

            const result = await pool.request()
                .input("cpfCliente", sql.VarChar(14), cpfCliente)
                .query(querySQL);

            return result.recordset;
        } catch (error) {
            console.error("Erro ao buscar CPF", error);
            throw error;
        }
    },

    inserirCliente: async (nomeCliente, cpfCliente, telefone, email, logradouro, numero, bairro, cidade, estado, cep) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                INSERT INTO Clientes
                (nomeCliente, cpfCliente, telefone, email, logradouro, numero, bairro, cidade, estado, cep)
                VALUES
                (@nomeCliente, @cpfCliente, @telefone, @email, @logradouro, @numero, @bairro, @cidade, @estado, @cep)
            `;

            await pool.request()
                .input("nomeCliente", sql.VarChar(100), nomeCliente)
                .input("cpfCliente", sql.VarChar(14), cpfCliente)       
                .input("telefone", sql.VarChar(20), telefone)
                .input("email", sql.VarChar(100), email)
                .input("logradouro", sql.VarChar(120), logradouro)
                .input("numero", sql.Va)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao inserir cliente", error);
            throw error;
        }
    }

}

module.exports = { clienteModel };
