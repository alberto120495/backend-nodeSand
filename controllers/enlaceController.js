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

const todosEnlaces = async (req, res, next) => {
  try {
    const enlaces = await Enlace.find({}).select("url -_id");
    res.json({ enlaces });
  } catch (error) {
    console.log(error);
  }
};

//Retorna si el enlace tiene password o no
const tienePassword = async (req, res, next) => {
  const { url } = req.params;

  const enlace = await Enlace.findOne({ url });

  if (!enlace) {
    return res.status(404).json({ msg: "Enlace no encontrado" });
  }

  if (enlace.password) {
    return res.json({
      password: true,
      enlace: enlace.url,
      archivo: enlace.nombre,
    });
  }

  next();
};

const verificarPassword = async (req, res, next) => {
  const { url } = req.params;
  const { password } = req.body;

  const enlace = await Enlace.findOne({ url });
  if (bcrypt.compareSync(password, enlace.password)) {
    next();
  } else {
    res.status(401).json({ msg: "Password incorrecto" });
  }
};

const obtenerEnlace = async (req, res, next) => {
  const { url } = req.params;

  const enlace = await Enlace.findOne({ url });

  if (!enlace) {
    return res.status(404).json({ msg: "Enlace no encontrado" });
  }

  res.json({ archivo: enlace.nombre, password: false });

  next();
};

export {
  nuevoEnlace,
  obtenerEnlace,
  todosEnlaces,
  tienePassword,
  verificarPassword,
};
