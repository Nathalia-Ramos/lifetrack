import UserModel from "../models/user_model.js";
import bcrypt from "bcrypt";

const UserController = {
    async createUser(req, res){
        
        try {
            const { full_name, mail, pass, confirm_pass,  goal } = req.body;
    
            if(!full_name || full_name === "") throw { status: 400, message: "O campo 'full_name' é obrigatório e não pode ser vazio." };
            
            if(mail){
                if(!mail || mail === "") throw { status: 400, message: "O campo 'mail' é obrigatório e não pode ser vazio." };  
                
                const mailExistVerify = await UserModel.getUserByMail(mail);
                if(mailExistVerify.length) throw { status: 409, message: "O email já existe em nosso sistema." };
            }

            if(pass){
                if(!pass || pass === "") throw { status: 400, message: "O campo 'pass' é obrigatório e não pode ser vazio." };  
                if(pass.length < 6 ) throw { status: 400, message: "O campo 'pass deve ser maior ou igual a 6" }; 
                if(pass !== confirm_pass ) throw { status: 400, message: "Senha incorreta"};
            }

            const hashedPassword = await bcrypt.hash(pass, 10);

            const userObj = {
                full_name: full_name,
                mail: mail,
                pass: hashedPassword,
                goal: goal,
            }
            
            await UserModel.createUser(userObj);

            return res.status(201).send( "Usuário cadastrado com sucesso." );

        } catch (error) {
            console.error(error);
            return res.status(500).send("Error ao tentar cadastrar.");
        }
    }
}

export default UserController;