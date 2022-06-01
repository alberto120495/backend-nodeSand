import multer from "multer";
import shortid from "shortid";
import fs from "fs";

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

export { subirArchivo, eliminarArchivo };
