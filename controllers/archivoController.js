import multer from "multer";
import shortid from "shortid";
import fs from "fs";
import Enlace from "../models/Enlace.js";

const subirArchivo = async (req, res) => {
  const configuracionMulter = {
    limits: {
      fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024,
    },
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads/");
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length
        );
        cb(null, `${shortid.generate()}${extension}`);
      },
    }),
  };

  const upload = multer(configuracionMulter).single("archivo");
  upload(req, res, async (error) => {
    console.log(req.file);

    if (!error) {
      return res.json({
        archivo: req.file.filename,
      });
    } else {
      console.log(error);
    }
  });
};
const eliminarArchivo = async (req, res) => {
  try {
    fs.unlinkSync(`uploads/${req.archivo}`);
  } catch (error) {
    console.log(error);
  }
};

const descargar = async (req, res, next) => {
  //Obtiene el enlace
  const { archivo } = req.params;
  const enlace = await Enlace.findOne({ nombre: archivo });

  console.log(enlace);

  res.download(`uploads/${archivo}`);

  //Eliminar el archivo y entrada
  const { descargas, nombre } = enlace;
  //Descargas igual a 1 Eliminar entrada y archivo
  if (descargas === 1) {
    req.archivo = nombre;
    await Enlace.findOneAndRemove(enlace.id);
    next();
  } else {
    //Descargas mayores a 1 restar 1 a descargas
    enlace.descargas--;
    await enlace.save();
  }
};

export { subirArchivo, eliminarArchivo, descargar };
