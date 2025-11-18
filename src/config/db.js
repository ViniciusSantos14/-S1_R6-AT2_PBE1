const sql = require("mssql");

const config = {
    user: 'viniciusps_SQLLogin_1',
    password: 'svyn7dylgp',
    server: 'rapidoeSeguroLogistica2015.mssql.somee.com ',
    database: 'RapidoeSeguro',
    options:{
        encrypt: true,
        trustServerCertificate: true
    }
}

async function getConnection(){
    try{

        const pool = await sql.connect(config);
        return pool;


    } catch (error) {
     console.error('Erro na conexão do SQL Server:', error);

    }
}


module.exports = {sql, getConnection};