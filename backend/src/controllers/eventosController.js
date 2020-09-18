const connection = require('../database/connection');

module.exports = {
    async index (request, response){
        const eventos = await connection('eventos').select('*');
        return response.json(eventos);
    },
    
    
    async create (request, response){
        const data = request.body;

        await connection('eventos')
        .insert({
            evento: data.evento,
        });

        return response.status(204).send();
    }
}