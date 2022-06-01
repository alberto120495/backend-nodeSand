import express from "express";
import { subirArchivo } from "../controllers/archivoController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, subirArchivo);

export default router;
