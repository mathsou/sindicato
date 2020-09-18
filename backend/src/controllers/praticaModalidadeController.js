const connection = require('../database/connection');

module.exports = {
    async index (request, response){
        const praticaModalidades = await connection('praticaModalidades')
        .join('alunos', 'praticaModalidades.alunoId', '=', 'alunos.idAluno')
        .join('pessoas', 'alunos.pessoaId', '=', 'pessoas.idPessoa')
        .join('modalidades', 'praticaModalidades.modalidadeId', '=', 'modalidades.idModalidade')
        .join('descontos', 'praticaModalidades.descontoId', 'descontos.IdDescontos')
        .select([
            'praticaModalidades.idPraticaM',
            'modalidades.idModalidade',
            'modalidades.descricao',
            'modalidades.valor',
            'pessoas.idPessoa',
            'pessoas.nome',
            'pessoas.dataNascimento',
            'pessoas.telefone',
            'pessoas.foto',
            'alunos.idAluno',
            'alunos.dataIngresso',
            'alunos.observacao',
            'alunos.titularId',
            'descontos.idDescontos',
            'descontos.tipo',
            'descontos.desconto',
            'descontos.VP'
        ])

        return response.json(praticaModalidades);
    },
    
    
    async create (request, response){
        const data = request.body;

        await connection('praticaModalidades')
        .insert({
            alunoId: data.alunoId,
            modalidadeId: data.modalidadeId,
            descontoId: data.descontoId
        })

        return response.status(201).send();
    },

    async delete (request, response){
        const data = request.body;

        await connection('praticaModalidades')
        .where('idPraticaM', '=', data.idPraticaM)
        .delete()
    }
}