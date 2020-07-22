const { Op } = require('sequelize'); 
const User = require('../models').User;

module.exports = {
    async showReport(request, response){
        const users = await User.findAll({
            attributes: ['name','email'],
            where: {
                email: {
                    [Op.like]: '%@rocketseat.com.br'
                } 
            },
            include: [
                {       // Endereços
                    association: 'addresses', 
                    attributes: ['street', 'zipcode', 'number'],
                    where: { 
                        street: 'Rua Igarapé da Missão' 
                    } 
                }, 
                {         // Tecnologias
                    association: 'techs',
                    attributes: ['name'],
                    required: false,
                    where: { 
                        name: {
                            [Op.like]: 'React%'
                        } 
                    },
                     through: { attributes: [] }
                }
            ]
        })

        return response.json(users);
    }
}