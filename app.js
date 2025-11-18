const express = require("express");
const app = express();
const {clienteRoutes} = require("./src/routes/clienteRoutes");
const {entregaRoutes} = require("./src/routes/produtoRoutes");
const {pedidoRoutes} = require("./src/routes/pedidosRoutes")

const PORT = 8081;

app.use(express.json());

app.use('/', clienteRoutes);
app.use('/', entregaRoutes);
app.use('/', pedidoRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http:localhost:${PORT}`);
});