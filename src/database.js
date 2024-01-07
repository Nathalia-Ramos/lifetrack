import mysql from 'mysql2/promise';
import env from 'dotenv';

env.config();

const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
});    

await connection.connect((err) => {
    if(err) return console.error("Banco não conectado.");
    console.log("Banco de dados conectado com sucesso!");
});

const db = {
    query: async (sql, arr) => {
        try {
            const [ rows ] = await connection.query(sql, [...arr]);
            return rows;
        } catch (error) {
            console.log("Erro na consulta SQL.");
            throw { status: 500, message: "error in sql query" };
        };
    },
};

export default db;
