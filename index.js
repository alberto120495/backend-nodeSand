import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import enlaceRoutes from "./routes/enlaceRoutes.js";
import archivoRoutes from "./routes/archivoRoutes.js";

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();

//Configuracion de CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      //Puede consultar la API
      callback(null, true);
    } else {
      //No puede consultar la API
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));

const port = process.env.PORT || 4000;

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/enlaces", enlaceRoutes);
app.use("/api/archivos", archivoRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
