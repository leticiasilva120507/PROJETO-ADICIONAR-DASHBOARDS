const pool = require("../../config/pool_conexoes");
const login_model ={
    findAll: async() =>{
        try{
            const [resultados] = await pool.query(

            )
            return resultados;
        }catch(error){
            console.log(error);
            return error;
        }
    },

    findEmail: async (camposForm) =>{
        try{
            const [resultados] = await pool.query("SELECT * FROM usuario WHERE email =? ",
                [camposForm.email, camposForm.email]
            )
            return resultados;
        }catch(error){
            console.log(error);
            return error;
        }
    },

    findId: async(id) =>{
        try{
            const[resultados] = await pool.query("")
            return resultados;
        }catch(error){
            console.log(error);
            return error;
        }

    },

    create:async(camposForm) =>{
        try{
            const[resultados] = await pool.query(
                "insert into usuario set?", [camposForm]
            )
            return resultados;
        }catch(error){
            console.log(error);
            return null;
        }
    },

    update: async (camposForm) =>{
        try{
            const[resultados] = await pool.query("UPDATE usuario SET email =?, senha =?"+
                "WHERE id =?",
                [camposForm.email, camposForm.camposForm.senha]
            )
            return resultados;
        } catch(error){
            console.log(error);
            return error;
        }
    },

}


module.exports = login_model