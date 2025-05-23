/* O pool me dá acesso ao banco de dados e é através do model que 
modifico o banco de dados sem ter que modificar manualmente no mysql workbench, ou seja, modifico aqui mesmo.*/

const pool = require("../../config/pool_conexoes");

const login_model ={
    findAll: async() =>{
        try{
            const [resultados] = await pool.query(
                "SELECT ID, EMAIL, SENHA"

            )
            return resultados;
        }catch(error){
            console.log(error);
            return error;
        }
    },
//buscando um usuário pelo e-mail
    findUserEmail: async (camposForm) =>{
        try{
            const [resultados] = await pool.query("SELECT * FROM USUARIOS WHERE EMAIL = ? ",
                [camposForm.email]
            )
            return resultados;
        }catch(error){
            console.log(error);
            return error;
        }
    },

    findId: async(id) =>{
        try{
            const[resultados] = await pool.query("SELECT * FROM USUARIOS WHERE ID = ?",
    [id]);
            return resultados;
        }catch(error){
            console.log(error);
            return error;
        }

    },

    create:async(camposForm) =>{
        try{
            const[resultados] = await pool.query(
                "INSERT INTO USUARIOS SET ?", [camposForm]
            )
            return resultados;
        }catch(error){
            console.log(error);
            return null;
        }
    },

    update: async (camposForm) =>{
        try{
            const[resultados] = await pool.query("UPDATE USUARIOS SET EMAIL = ?, SENHA = ?" +
                "WHERE ID = ?",
                [camposForm.email, camposForm.senha, camposForm.id]
            )
            return resultados;
        } catch(error){
            console.log(error);
            return error;
        }
    },

}


module.exports = login_model