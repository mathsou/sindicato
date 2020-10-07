const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response){
        const {id} = request.params;
        const idAgend = parseInt(id);
        
        if(id){
            const agendamentos = await connection('agendamentos')
            .join('socios', 'agendamentos.socioId', '=', 'socios.idSocio')
            .join('eventos', 'agendamentos.eventoId', '=', 'eventos.idEvento')
            .select([
                'agendamentos.*',
                'socios.matricula',
                'socios.nome',
                'eventos.evento'
            ])
            .where({'idAgend': idAgend})
            .first()
            
            return response.json(agendamentos);
        }
        
        const agendamentos = await connection('agendamentos')
        .join('socios', 'agendamentos.socioId', '=', 'socios.idSocio')
        .select([
            'agendamentos.*',
            'socios.nome'
        ]);


        return response.json(agendamentos)
    },


    async create(request, response){
        const data = request.body; 

            await connection('agendamentos').insert({
                socioId: data.socioId,
                data: data.data,
                salao: data.salao,
                observacao: data.observacao,
                valorTotal: data.valorTotal,
                valorSinal: data.valorSinal,
                valorRestante: data.valorRestante,
                eventoId: data.eventoId
               

            })

        return response.status(204).send();
    },

    async delete(request, response){
        const {id} = request.params;
        if(id){
            
            await connection('agendamentos')
            .where('idAgend', '=', id)
            .delete();
            
            return response.status(204).send();
        }
    },

    async update(request,response){
        const data = request.body; 

            await connection('agendamentos')
            .update({
                socioId: data.socioId,
                data: data.data,
                salao: data.salao,
                observacao: data.observacao,
                valorTotal: data.valorTotal,
                valorSinal: data.valorSinal,
                valorRestante: data.valorRestante,
                eventoId: data.eventoId,
                
            })
            .where({
                idAgend: data.idAgend
            })
        return response.status(204).send();

    }
}