import express from "express";
import { registrar } from "../controllers/usuarioController.js";
import { validacionRegistro } from "../middleware/validacion.js";

const router = express.Router();

//Crea un nuevo usuario
router.post("/", validacionRegistro, registrar);

export default router;
