import Enlace from "../models/Enlace.js";
import shortid from "shortid";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

const nuevoEnlace = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { nombre_original, nombre } = req.body;

  const enlace = new Enlace();
  enlace.url = shortid.generate();
  enlace.nombre = nombre;
  enlace.nombre_original = nombre_original;

  if (req.usuario) {
    const { password, descargas } = req.body;

    if (descargas) {
      enlace.descargas = descargas;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }
    enlace.autor = req.usuario.id;
  }

  try {
    await enlace.save();
    res.json({
      msg: enlace.url,
    });
  } catch (error) {
    console.log(`(╯°□°）╯︵ ┻━┻ |>ERROR: ${error}`);
  }
};

const obtenerEnlace = async (req, res, next) => {
  const { url } = req.params;

  const enlace = await Enlace.findOne({ url });

  if (!enlace) {
    return res.status(404).json({ msg: "Enlace no encontrado" });
  }

  res.json({ archivo: enlace.nombre });

  const { descargas, nombre } = enlace;
  //Descargas igual a 1 Eliminar entrada y archivo
  if (descargas === 1) {
    req.archivo = nombre;
    await Enlace.findOneAndRemove({ url });
    next();
  } else {
    //Descargas mayores a 1 restar 1 a descargas
    enlace.descargas--;
    await enlace.save();
  }
};

export { nuevoEnlace, obtenerEnlace };
