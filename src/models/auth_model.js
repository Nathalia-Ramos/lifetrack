import db from "../database.js";

const AuthModel = {

    getUserByMail(mail){
        return db.query("SELECT * FROM users WHERE mail = ?", [mail]);
    },
};

export default AuthModel;