import express from "express";
import {
  nuevoEnlace,
  obtenerEnlace,
  todosEnlaces,
} from "../controllers/enlaceController.js";
import checkAuth from "../middleware/checkAuth.js";
import { validacionEnlace } from "../middleware/validacion.js";

const router = express.Router();

router.post("/", validacionEnlace, checkAuth, nuevoEnlace);

router.get("/", todosEnlaces);
router.get("/:url", obtenerEnlace);

export default router;
