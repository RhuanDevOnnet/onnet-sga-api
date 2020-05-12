"use strict";

const User = use("App/Models/User");

class AuthController {
  async register({ request,response }) {
    const { permissao, ...data } = request.only([
      "username",
      "email",
      "password",
      "foto",
      "ativo",
      "permissao",
    ]);

  try{

    const user = await User.create(data);

    if (permissao && permissao.length > 0) {
      await user.permissao().attach(permissao);
      await user.load("permissao");
    }

    return response.status(201).json(user);
  }catch(err) {
    return response.status(400).json({ message:  `Ocorreu um erro ${err}`});
  }


 
  }

  async index({ request, response }) {
    
    try{
      const users = await User.all();

      if(!users){
        return response.json({message: "Não foi encontrado nenhum usuario."});
      }
      return response.json(users);
    }catch(err) {
      return response.json({ message: `Ocorreu um erro: ${err}`});
    }


  }

  async show({ request, response, params }) {

    const { id } = params;

    try{
      const user = await User.findOrFail(id);
      
      if(!user){
        return response.status(400).json({ message:  "Não foi encontrado nenhum usuário."});
      }
      
      return response.status(200).json(user);

    }catch(err){
      return response.status(400).json({ message: `Ocorreu um erro : ${err}`});
    }

  }

  async store({ request, response, params, auth }) {
    const data = request.body;
    data.ativo = true;
    const user = await User.create({ ...data });
    return user;
  }

  async update({ request, params, auth, response }) {
    const data = request.body;
    const user = await User.findOrFail(params.id);
    user.merge(data);
    await user.save();
    return user;
  }

  async destroy({ params, request, response }) {
    const user = await User.findOrFail(params.id);
    user.delete();
  }

  async authenticate({ request, auth, response }) {
    const { email, password } = request.all();

    try {
      const token = await auth.attempt(email, password);

      const data = await User.query().where('email', email).where('ativo', true).fetch();
      const user = data.toJSON();

      console.log(user.length);

      if (user.length == 0) {
        console.log("entro aqui");
        return response.status(403).json({ message: "Usuario Inativo"});
      }

      return response.status(200).json({ user: user, token: token });
    } catch (err) {
        console.log(err)
      return response.status(400).json({ message: "Ocorreu um erro: " + err });
    }
  }
}

module.exports = AuthController;
