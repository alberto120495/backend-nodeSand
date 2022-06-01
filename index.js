import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import enlaceRoutes from "./routes/enlaceRoutes.js";
import enlaceRoutes from "./routes/archivoRoutes.js";

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();

const port = process.env.PORT || 4000;

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/enlaces", enlaceRoutes);
app.use("/api/archivo", archivoRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
