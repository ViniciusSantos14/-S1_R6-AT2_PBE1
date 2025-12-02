const express = require("express");
const router = express.Router();
const { clienteController } = require("../controllers/clienteController");


router.get("/clientes", clienteController.listarClientes);

router.post("/clientes", clienteController.criarCliente);


router.put("/:id_cliente", clienteController.atualizarCliente);
router.delete("/:id_cliente", clienteController.deletarCliente);


module.exports = { clienteRoutes: router };
