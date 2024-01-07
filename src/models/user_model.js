import db from "../database.js";

const UserModel = {
    createUser({full_name, mail, pass, goal}){
        return db.query("INSERT INTO users(full_name, mail, pass, goal) VALUES(?, ?, ?, ?)",
        [full_name, mail, pass, goal]);
    },
    
    getUserByMail(mail){
        return db.query("SELECT mail FROM users WHERE mail = ?", [mail]);
    }
}

export default UserModel;