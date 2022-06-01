import Enlace from "../models/Enlace.js";
import shortid from "shortid";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

const nuevoEnlace = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const { nombre_original } = req.body;

  const enlace = new Enlace();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate();
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
      msg: `Enlace creado correctamente: ${enlace.url}`,
    });
  } catch (error) {
    console.log(`(╯°□°）╯︵ ┻━┻ |>ERROR: ${error}`);
  }
};

export { nuevoEnlace };
