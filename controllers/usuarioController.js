import Usuario from "../models/Usuario.js";
import { validationResult } from "express-validator";
import generarJWT from "../helpers/generarJWT.js";
import jwt from "jsonwebtoken";

const registrar = async (req, res) => {
  //Mensajes error de express-validator
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json({
      msg: "Usuario creado Correctamente",
    });
  } catch (error) {
    console.log(`(╯°□°）╯︵ ┻━┻ |>ERROR: ${error}`);
  }
};

const autenticar = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  //Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("Usuario no existe");
    return res.status(404).json({
      msg: error.message,
    });
  }

  //Comprobar su password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      token: generarJWT(usuario._id, usuario.nombre, usuario.email),
    });
  } else {
    const error = new Error("El password es Incorrecto");
    return res.status(403).json({
      msg: error.message,
    });
  }
};

const comprobarToken = async (req, res) => {
  res.json({ usuario: req.usuario });
};

export { registrar, autenticar, comprobarToken };
