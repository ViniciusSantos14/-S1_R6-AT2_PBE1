const { sql, getConnection } = require("../config/db");

const clienteModel = {

    buscarTodos: async () => {
        try {
            const pool = await getConnection();
            const result = await pool.request().query("SELECT * FROM Clientes;");
            return result.recordset;
        } catch (error) {
            console.error("Erro ao buscar clientes", error);
            throw error;
        }
    },

    buscarUm: async (id_cliente) => {
        try {
            const pool = await getConnection();
            const query = `
                SELECT * FROM Clientes
                WHERE id_cliente = @id_cliente
            `;

            const result = await pool.request()
                .input("id_cliente", sql.UniqueIdentifier, id_cliente)
                .query(query);

            return result.recordset;
        } catch (error) {
            console.error("Erro ao buscar cliente", error);
            throw error;
        }
    },

    buscarPorCPF: async (cpfCliente) => {
        try {
            const pool = await getConnection();
            const query = `
                SELECT * FROM Clientes
                WHERE cpfCliente = @cpfCliente
            `;

            const result = await pool.request()
                .input("cpfCliente", sql.VarChar(14), cpfCliente)
                .query(query);

            return result.recordset;
        } catch (error) {
            console.error("Erro ao buscar CPF", error);
            throw error;
        }
    },

    inserirCliente: async (
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
    ) => {
        try {
            const pool = await getConnection();

            const query = `
                INSERT INTO Clientes
                (nomeCliente, email, telefone, endereco, cpfCliente, logradouro, numero, bairro, cidade, estado, cep)
                VALUES
                (@nomeCliente, @email, @telefone, @endereco, @cpfCliente, @logradouro, @numero, @bairro, @cidade, @estado, @cep)
            `;

            await pool.request()
                .input("nomeCliente", sql.VarChar(100), nomeCliente)
                .input("email", sql.VarChar(100), email)
                .input("telefone", sql.VarChar(20), telefone)
                .input("endereco", sql.VarChar(120), endereco)
                .input("cpfCliente", sql.VarChar(14), cpfCliente)
                .input("logradouro", sql.VarChar(120), logradouro)
                .input("numero", sql.VarChar(10), numero)
                .input("bairro", sql.VarChar(60), bairro)
                .input("cidade", sql.VarChar(60), cidade)
                .input("estado", sql.Char(2), estado)
                .input("cep", sql.VarChar(10), cep)
                .query(query);

        } catch (error) {
            console.error("Erro ao inserir cliente", error);
            throw error;
        }
    }

};

module.exports = { clienteModel };

