'use strict'

const Cidade = use('App/Models/Cidade');

class CidadeController {
 
  async index ({ request, response, view }) {
    try{
      const cidades = await Cidade.all();
      return response.status(200).json(cidades);
    }catch(err){
      return response.status(400).json({ message: `Ocorreu o seguinte erro: ${err}`  });
    }
  }

  async store ({ request, response, auth}) {
    const {nome, cnl, eot } = request.body;
    
    try{
      const newCidade = await Cidade.create({
        nome: nome,
        cnl: cnl,
        eot: eot,
        usuario_criacao: auth.user.username
      });

      return response.status(201).json(newCidade);
    }catch(err){
      return response.status(400).json({ message: `Ocorreu o seguinte erro : ${err}`});
    }
  }

  async show ({ params, request, response, view }) {
    const { id } = params;

    try{
      const cidade = await Cidade.findOrFail(id);

      if(!cidade){
        return response.status(400).json({ message : "Não há nenhuma cidade cadastrada com esse id "});
      }

      return response.status(200).json(cidade);
    }catch(err){
      return response.status(400).json({ message : `Ocorreu o seguinte erro: ${err}`});
    }

  }

  async update ({ params, request, response }) {
    const { id } = params;
    const data = request.body

    try{
     
      const cidade = await Cidade.findOrFail(id);

      if(!cidade){
        return response.status(400).json({ message: 'Não foi encontrado essa cidade na base de dados'});
      }

      cidade.merge(data)
      await cidade.save();
      return response().status(200).json(cidade);
      
    }catch(err){
      return response().status(400).json({ message : `Ocorreu o seguinte erro: ${err}`});
    }

  }

  async destroy ({ params, request, response }) {
    const { id } = params;
    
    try{
      const cidade = await Cidade.findOrFail(id);

      if(!cidade){
        return response.status(400).json({ message: 'Não foi encontrado essa cidade na base de dados '});
      }

      cidade.delete();
      return response().status(200).json({ message: 'Exclusão da cidade foi bem sucedida '});
    }catch(err){
      return response().status(400).json({ message: `Ocorreu o seguinte erro: ${err}`});
    }
  }
}

module.exports = CidadeController
