import express from "express";
import {
  subirArchivo,
  descargar,
  eliminarArchivo,
} from "../controllers/archivoController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, subirArchivo);
router.get("/:archivo", descargar, eliminarArchivo);

export default router;
