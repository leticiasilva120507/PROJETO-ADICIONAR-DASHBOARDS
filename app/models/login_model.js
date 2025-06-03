/*
Arquivo: login_model.js

- Responsável por acessar o banco de dados para buscar, criar e atualizar usuários.
- Possui funções para buscar usuário por e-mail, por ID, criar novo usuário e atualizar dados.
- Usado pelo controller e pelo middleware para autenticação e manipulação de usuários.
- Exporta o objeto login_model para ser usado em outros arquivos.
*/

// Model responsável por acessar o banco de dados para usuários/login
const pool = require("../../config/pool_conexoes");

const login_model = {
    // Busca usuário pelo e-mail
    findByEmail: async (email) => {
        try {
            const [linhas] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
            return linhas[0];
        } catch (error) {
            return null;
        }
    },
    //buscando um usuário pelo e-mail
    findUserEmail: async (camposForm) =>{
        try{
            // Remove espaços do e-mail digitado
            const email = camposForm.email.trim();
            // Mostra no terminal o e-mail que será buscado
            console.log("[login_model] E-mail recebido para busca:", email);
            // Busca o usuário no banco ignorando maiúsculas/minúsculas
            const [resultados] = await pool.query("SELECT * FROM USUARIOS WHERE LOWER(EMAIL) = LOWER(?) ",
                [email]
            )
            // Mostra no terminal o resultado da busca
            console.log("[login_model] Resultado da busca:", resultados);
            return resultados; // Retorna o(s) usuário(s) encontrado(s)
        }catch(error){
            console.log(error);
            return error;
        }
    },

    // Busca um usuário pelo ID
    findId: async(id) =>{
        try{
            // Busca o usuário no banco pelo ID
            const[resultados] = await pool.query("SELECT * FROM USUARIOS WHERE ID = ?",
                [id]);
            return resultados; // Retorna o usuário encontrado
        }catch(error){
            console.log(error);
            return error;
        }
    },

    // Cria um novo usuário no banco
    create:async(camposForm) =>{
        try{
            // Insere o novo usuário no banco
            const[resultados] = await pool.query(
                "INSERT INTO USUARIOS SET ?", [camposForm]
            )
            return resultados; // Retorna o resultado da inserção
        }catch(error){
            console.log(error);
            return null;
        }
    },

    // Atualiza um usuário existente no banco
    update: async (camposForm) =>{
        try{
            // Atualiza o e-mail e a senha do usuário pelo ID
            const[resultados] = await pool.query("UPDATE USUARIOS SET EMAIL = ?, SENHA = ?" +
                "WHERE ID = ?",
                [camposForm.email, camposForm.senha, camposForm.id]
            )
            return resultados; // Retorna o resultado da atualização
        } catch(error){
            console.log(error);
            return error;
        }
    },

}


module.exports = login_model