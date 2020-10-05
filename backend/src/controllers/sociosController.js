const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response){
        const {id} = request.params;
        const {page = 1} = request.query;

        if(id){
            const socio = await connection('socios')
            .select('*')
            .where('idSocio', '=', id)
            .first();

            return response.json(socio);
        }
        
        const socios = await connection('socios')
        .select('*')
        .where('visivel', '=', '1')
        .orderBy('nome')
        .limit(15)
        .offset((page-1)*15);

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
    },

    async delete(request,response){
        const {id} = request.params;

        if(id){
            await connection('socios')
            .update({visivel: 0})
            .where('idSocio', '=', id);
        }
        return response.status(204).send();
    },

    async update(request,response){
        const data = request.body; 

            await connection('socios')
            .update({
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
            .where({
                idSocio: data.idSocio,
                visivel: 1
            })
        return response.status(204).send();

    }
}