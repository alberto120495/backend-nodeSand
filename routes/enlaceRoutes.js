import express from "express";
import { nuevoEnlace } from "../controllers/enlaceController.js";
import checkAuth from "../middleware/checkAuth.js";
import { validacionEnlace } from "../middleware/validacion.js";

const router = express.Router();

router.post("/", validacionEnlace, checkAuth, nuevoEnlace);

export default router;
