import { check } from "express-validator";

const validacionRegistro = [
  check("nombre", "El Nombre es Obligatorio").not().isEmpty(),
  check("email", "Agrega un email valido").isEmail(),
  check("password", "El password debe tener minimo 6 caracteres").isLength({
    min: 6,
  }),
];

const validacionLogin = [
  check("email", "Agrega un email valido").isEmail(),
  check("password", "El password es obligatorio").not().isEmpty(),
];

const validacionEnlace = [
  check("nombre", "Sube un archivo").not().isEmpty(),
  check("nombre_original", "Sube un archivo").not().isEmpty(),
];

export { validacionRegistro, validacionLogin, validacionEnlace };
