const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response){
        const {id} = request.params;

        if(id){
            const agendamentos = await connection('agendamento')
            .select('*')
            .where('idAgend', '=', id)
            .first();
            
            return response.json(agendamentos);
        }
        
        const socios = await connection('socios')
        .select('*')
        .orderBy('nome');

        return response.json(socios)
    },


    async create(request, response){
        const data = request.body; 

            await connection('socios').insert({
                socioId: data.socioId,
                dataHoraInicial: data.dataHoraInicial,
                dataHoraFinal: data.dataHoraFinal,
                observacao: data.observacao,
                valor: data.valor,
                eventoId: data.eventoId,
               

            })

        return response.status(204).send();
    }
}