const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response){
        const {id} = request.params;
        const {pesquisa} = request.query;

        if(id){
            const socio = await connection('socios')
            .select('*')
            .where('idSocio', '=', id)
            .first();

            return response.json(socio);
        }

        else if(pesquisa){
            const socios = await connection('socios')
            .select('*')
            .where('visivel', '=', '1')
            .andWhere(function(){
                this.where('matricula', 'like', `%${pesquisa}%`)
                .orWhere('nome', 'like', `%${pesquisa}%`)
            })

            return response.json(socios);
        }
        
        const socios = await connection('socios')
        .select('*')
        .where('visivel', '=', '1')
        .orderBy('nome');

        return response.json(socios)
    },


    async create(request, response){
        const data = request.body; 

            await connection('socios').insert({
                matricula: data.matricula,
                socion: data.socion,
                nome: data.nome.toUpperCase(),
                dtNascimento: data.dtNascimento,
                email: data.email.toLowerCase(),
                cidade: data.cidade.toUpperCase(),
                cep: data.cep,
                celular: data.celular,
                telComercial: data.telComercial,
                telResidencial: data.telResidencial,
                localTrab: data.localTrab.toUpperCase(),
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