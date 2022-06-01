import express from "express";
import { eliminarArchivo } from "../controllers/archivoController.js";
import { nuevoEnlace, obtenerEnlace } from "../controllers/enlaceController.js";
import checkAuth from "../middleware/checkAuth.js";
import { validacionEnlace } from "../middleware/validacion.js";

const router = express.Router();

router.post("/", validacionEnlace, checkAuth, nuevoEnlace);

router.get("/:url", obtenerEnlace, eliminarArchivo);

export default router;
