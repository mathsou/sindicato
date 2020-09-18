const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response){
        const {id} = request.params;

        if(id){
            const pessoa = await connection('pessoas')
            .select('*')
            .where('idPessoa', '=', id)
            .first();

            const aluno = await connection('alunos')
            .select('*')
            .where('pessoaId', '=', id)
            .first();

            const instrutor = await connection('instrutores')
            .select('*')
            .where('pessoasId', '=', id)
            .first();

            return response.json(pessoa, aluno, instrutor);
        }
        
        const alunos = await connection('pessoas')
        .join('alunos', 'alunos.pessoaId', '=', 'pessoas.idPessoa')
        .select('*')
        .orderBy('nome');

        const instrutores = await connection('pessoas')
        .join('instrutores', 'instrutores.pessoasId', '=', 'pessoas.idPessoa')
        .select('*')
        .orderBy('nome');

        return response.json([alunos, instrutores])
    },


    async create(request, response){
        const data = request.body;

        const dataObj = new Date();
        const dataAtual = String(dataObj.getFullYear()) + "-" + String(dataObj.getMonth()+1) + "-" + String(dataObj.getDate());
        
        if(data.pessoaId == null){
            var idPessoa = Math.floor(Math.random()*100000);
            await connection('pessoas').insert({
                idPessoa: idPessoa,
                nome: data.nome,
                dataNascimento: data.dataNascimento,
                telefone: data.telefone,
                foto: data.foto
            })
        }
        else{
            var idPessoa = data.pessoaId;
        }
        
        if(data.tipoUser == "a"){
            await connection('alunos').insert({
                dataIngresso: dataAtual,
                observacao: data.observacao,
                pessoaId: idPessoa,
                titularId: data.titularId
            })
        }
        else if(data.tipoUser == "i"){
            await connection('instrutores').insert({
                dataInicio: dataAtual,
                pessoasId: idPessoa
            })
        }

        return response.json(idPessoa);
    }
}