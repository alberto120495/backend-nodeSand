import express from "express";
import {
  autenticar,
  registrar,
  comprobarToken,
} from "../controllers/usuarioController.js";
import {
  validacionLogin,
  validacionRegistro,
} from "../middleware/validacion.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Crea un nuevo usuario
router.post("/", validacionRegistro, registrar);
router
  .route("/login")
  .get(checkAuth, comprobarToken)
  .post(validacionLogin, autenticar);

export default router;
