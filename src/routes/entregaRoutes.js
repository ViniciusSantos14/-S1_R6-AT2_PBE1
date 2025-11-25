const express = require("express");
const router = express.Router();
const { entregaController } = require("../controllers/entregaController");

router.get("/entregas", entregaController.listarEntregas);

router.post("/entregas/calcular", entregaController.calcularEntrega);

module.exports = { entregaRoutes: router };
