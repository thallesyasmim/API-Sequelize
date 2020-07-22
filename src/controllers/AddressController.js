const Addresses = require('../models').addresses;
const User = require('../models').User;

module.exports = {
    async indexAddress(request, response){
        const { user_id } = request.params;

        const user = await User.findByPk(user_id, {
            include: { association: 'addresses' }
        });

        return response.json(user.addresses); // Trazer user com os address usamos omente "user"
    },

    async storeAddress(request, response){
        const { user_id } = request.params;
        const { zipcode, street, number } = request.body;

        try{
            const user = await User.findByPk(user_id);

            if(!user){
                return response.json({ error: 'User not found' }).status(400);
            }
    
            const address = await Addresses.create({ 
                zipcode, 
                street,
                number,
                user_id
             });

             console.log(user_id)
            
            return response.json(address).status(201);

        } catch(error){
            return response.json({ erro: error });
        }
    }
}