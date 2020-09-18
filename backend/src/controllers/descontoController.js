const connection = require('../database/connection');

module.exports = {
    async index (request, response){
        const descontos = await connection('descontos').select('*');
        return response.json(descontos);
    },
    
    
    async create (request, response){
        const data = request.body;

        await connection('descontos')
        .insert({
            tipo: data.tipo,
            desconto: data.desconto,
            VP: data.VP
        });

        return response.status(201).send();
    }
}