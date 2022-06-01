import jwt from "jsonwebtoken";

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const usuario = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = usuario;
      return next();
    } catch (error) {
      console.log(`(╯°□°）╯︵ ┻━┻ |>ERROR: ${error}`);
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }
  next();
};
export default checkAuth;
