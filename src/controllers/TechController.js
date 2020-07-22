const Techs = require('../models').techs;
const User = require('../models').User;

module.exports = {
    async indexTechs(request, response){
        const { user_id } = request.params;

        const user = await User.findByPk(user_id, {
            include: { 
                association: 'techs',
                attributes: ['name'], // Quais atributos que queremos que ele traga da tabela de Tecnologias
                through: { attributes: ['user_id', 'tech_id'] } // Quais atributos que queremos que ele traga da tabela de associativa
            }
        });

        return response.json(user);
    },

    async storeTechs(request, response){
        const { user_id } = request.params;
        const { name } = request.body;

        const user = await User.findByPk(user_id);

        if(!user){
            return response.json({ error: 'User not found'}).status(400);
        }

        const [ tech, created ] = await Techs.findOrCreate({ where: { name } });

        await user.addTechs(tech);

        return response.json(tech);
    },

    async destroyTechs(request, response){
        const { user_id } = request.params;
        const { name } = request.body;

        const user = await User.findByPk(user_id);

        if(!user){
            return response.json({ error: 'User not found'}).status(400);
        }

        const tech = await Techs.findOne({ where: { name } });

        await user.removeTechs(tech);

        return response.json();
    }
}