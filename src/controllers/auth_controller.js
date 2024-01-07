import JWT_UTILS from "../utils/jwt_utils.js";
import bcrypt from "bcrypt";
import AuthModel from "../models/auth_model.js";

const AuthController = {

    async auth(req, res) {
        try {
            const { mail, pass } = req.body;

            const user = await AuthModel.getUserByMail(mail);

            if(!user) throw { status: 404, message: "Usuário não encontrado."  };

            const findedUser = await AuthModel.getUserByMail(mail, user[0].id);

            if(!findedUser.length) throw { status: 404, message: "Login não encontrado." };

            const passwordVerify = bcrypt.compareSync(pass, findedUser[0].pass);

            if(!passwordVerify) throw { status: 401, message: "Senha incorreta." };

            const userTokenObj = {
                id: findedUser[0].id,
                mail: findedUser[0].mail || ""
            };

            const token = JWT_UTILS.generateValidToken(userTokenObj);

            return res.status(200).send({ token, id: findedUser[0].id });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 400).send(error.message || "Erro ao fazer login." );
        }
    },

};

export default AuthController;