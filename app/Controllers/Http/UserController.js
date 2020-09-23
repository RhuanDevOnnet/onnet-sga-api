'use strict'

const User = use('App/Models/User');

class UserController {

    async show({ request, response, auth, params }) {
        const { id } = params;

        try {
            const user = await User.query().where('id', id).with('permissao').fetch();

            if (!user) {
                return response.status(400).json({ message: "Não foi encontrado nenhum usuario com esse id " });
            }

            return response.status(200).json(user);
        } catch (err) {
            return response.status(400).json({ message: "Ocorreu um erro: " + err });
        }
    }

    async changePassword({ request, params, response, auth }) {
        const { id } = params;
        const { password } = request.body;

        if (id != auth.user.id) {
            return response.status(403).json({ message: "Acesso negado ! " });
        }

        try {
            const user = await User.findOrFail(id);

            if (!user) {
                return response.status(400).json({ message: "Não foi encontrado nenhum usuario com esse Id " });
            }

            user.password = password;
            await user.save();
            return response.status(200).json({ message: "Senha atualizada com sucesso !" });
        } catch (err) {
            return response.status(400).json({ message: "Ocorreu um erro: ", err: err });
        }
    }

    async replaceAll({ request, response, params }) {
        const newData = request.body
        const { id } = params;

        let user = await User.findOrFail(id);
        await user.load('permissao')
        let userObject = user.toJSON();
        let permissions = userObject.permissao;

        const isMaster = permissions.filter((permissao) => {
            return permissao.nome == 'MASTER';
        })

        if (isMaster.length > 0) {
            user.merge(newData);
            await user.save();
            return response.status(200).json(user);
        } else {
            return response.status(403).json({ message: "Acesso negado !" });
        }

    }

    async forgetPassword() {
        //Todo after configured email sender
    }

    async changePermission({ request, response, auth, params }) {
        const { permissions } = request.only(['permissions']);
        const { id } = params;

        try {
            const user = await User.findOrFail(id);

            if (!user) {
                return response.status(400).json({ message: "Usuário não encontrado" });
            }

            if (permissions.length >= 0) {
                await user.permissao().sync(permissions);
                await user.load('permissao');
            }

            return response.status(200).json(user);
        } catch (err) {
            return response.status(400).json({ message: "Ocorreu um erro : ", err: err });
        }


    }
}

module.exports = UserController;