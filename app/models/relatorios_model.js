// Model responsável por acessar o banco de dados para relatórios
var pool = require("../../config/pool_conexoes");

const relatorios_model = {
    // Busca todos os relatórios
    findAll: async () => {
        try {
            const [linhas] = await pool.query('SELECT * FROM relatorios')
            return linhas;
        } catch (error) {
            return error;
        }
    },

    // Busca um relatório pelo id
    findId: async (id) => {
        try {
            const [linhas,campos] = await pool.query('SELECT * FROM relatorios WHERE id = ?', [id])
            return linhas;
        } catch (error) {
            return error;
        }
    },

    // Busca uma página de relatórios para paginação
    findPage: async (pagina, total) => {
        try {
            // Garante que o offset nunca seja negativo
            const offset = Math.max(0, (pagina - 1) * total);
            // Busca os relatórios da página desejada
            const [linhas] = await pool.query('SELECT * FROM relatorios LIMIT ?, ?', [offset, total]);
            return linhas;
        } catch (error) {
            return error;
        }  
    },

    // Cria um novo relatório
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

    // Atualiza um relatório existente
    update: async (dadosForm, id) => {
        try {
            const [linhas] = await pool.query('UPDATE relatorios SET ? WHERE id = ?', [dadosForm, id])
            return linhas;
        } catch (error) {
            return error;
        }  
    },

    // Exclui um relatório pelo id
    delete: async (id) => {
        try {
            const [linhas] = await pool.query('DELETE FROM relatorios WHERE id = ?', [id])
            return linhas;
        } catch (error) {
            return error;
        }  
    },

    // Retorna o total de registros da tabela relatorios (para paginação)
    totalReg: async () => {
        try {
            const [linhas] = await pool.query('SELECT COUNT(*) as total FROM relatorios');
            return linhas;
        } catch (error) {
            return error;
        }
    },
};
    
// Exporta o model para ser usado no controller
module.exports = relatorios_model;