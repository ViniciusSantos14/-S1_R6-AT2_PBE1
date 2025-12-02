const express = require("express");
const app = express();

const { clienteRoutes } = require("./src/routes/clienteRoutes");
const { entregaRoutes } = require("./src/routes/entregaRoutes");
const { pedidoRoutes } = require("./src/routes/pedidoRoutes");

const PORT = 8081;

app.use(express.json());

app.use("/clientes", clienteRoutes);
app.use("/entregas", entregaRoutes);
app.use("/pedidos", pedidoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
