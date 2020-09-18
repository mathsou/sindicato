const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response){
        const {id} = request.params;

        if(id){
            const socio = await connection('agendamentos')
            .select('*')
            .where('idSocio', '=', id)
            .first();

            return response.json(socio);
        }
        
        const socios = await connection('socios')
        .select('*')
        .orderBy('nome');

        return response.json(socios)
    },


    async create(request, response){
        const data = request.body; 

            await connection('socios').insert({
                matricula: data.matricula,
                socion: data.socion,
                nome: data.nome,
                dtNascimento: data.dtNascimento,
                email: data.email,
                cidade: data.cidade,
                cep: data.cep,
                celular: data.celular,
                telComercial: data.telComercial,
                telResidencial: data.telResidencial,
                localTrab: data.localTrab,
                sexo: data.sexo,

            })

        return response.status(204).send();
    }
}