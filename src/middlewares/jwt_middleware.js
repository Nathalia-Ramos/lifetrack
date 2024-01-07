import jwt from "jsonwebtoken";
import db from "../../database.js";

const JWT = {
  async authenticateToken(req, res, next) {
    try {
        const authHeader = req.header("Authorization");

        if(!authHeader) throw { status: 401, message: "Header 'Authorization' não enviado." };

        const token = authHeader.split(" ")[1];

        if(!token) throw { status: 401, message: "Token não enviado." };

        const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if(err) throw { status: 401, message: "Token inválido." };
          return decoded;
        });

        const user = await db.query("SELECT * FROM users WHERE  id = ?", [decoded.id]);

        if(!user) throw { status: 401, message: "Token inválido." };

        res.locals.decoded = decoded;

        return next();
    } catch (error) {
      console.log(error);
      return res.status(error.status || 400).send(error.message || "Não foi possível listar clientes.");
    };
  },
}

export default JWT;