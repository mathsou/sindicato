const connection = require('../database/connection');

module.exports = {
    async index (request, response){
        const {id} = request.params;

        if(id){

        }

        const modalidades = await connection('modalidades').select('*')

        return response.json(modalidades);

    },
    
    async create (request, response){
        const data = request.body;

        const dataObj = new Date();
        const dataAtual = String(dataObj.getFullYear()) + "-" + String(dataObj.getMonth()+1) + "-" + String(dataObj.getDate());

        await connection('modalidades')
        .insert({
            descricao: data.descricao,
            valor: data.valor,
            dataCadastro: dataAtual,
            dataAtualizacao: dataAtual
        })

        return response.status(201).send()
    },

    async modify (request, response){
        const data = request.body;

        const dataObj = new Date();
        const dataAtual = String(dataObj.getFullYear()) + "-" + String(dataObj.getMonth()+1) + "-" + String(dataObj.getDate());

        await connection('modalidades')
        .where('idModalidade', data.idModalidade)
        .update({
            descricao: data.descricao,
            valor: data.valor,
            dataAtualizacao: dataAtual
        })

        return response.status(201).send()
    }
}