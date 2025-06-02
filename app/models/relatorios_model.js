var pool = require("../../config/pool_conexoes");

const relatorios_model = {
    findAll: async () => {
        try {
            const [linhas] = await pool.query('SELECT * FROM relatorios')
            return linhas;
        } catch (error) {
            return error;
        }
    },

    findId: async (id) => {
        try {
            const [linhas,campos] = await pool.query('SELECT * FROM relatorios id = ?',[id] )
            return linhas;
        } catch (error) {
            return error;
        }
    },

    create: async (dadosForm) => {
        try {
            const [linhas, campos] = await pool.query('INSERT INTO relatorios SET ?', [dadosForm])
            console.log(linhas);
            console.log(campos);
            return linhas;
        } catch (error) {
            console.log(error);
            return null;
        }  
    },

    update: async (dadosForm, id) => {
        try {
            const [linhas] = await pool.query('UPDATE relatorios SET ? WHERE id = ?', [dadosForm, id])
            return linhas;
        } catch (error) {
            return error;
        }  
    },

    delete: async (id) => {
        try {
            const [linhas] = await pool.query('DELETE FROM relatorios WHERE id = ?', [id])
            return linhas;
        } catch (error) {
            return error;
        }  
    },

  
};
    

module.exports = relatorios_model;