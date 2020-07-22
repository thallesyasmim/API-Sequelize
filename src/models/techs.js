'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class techs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, { foreignKey: 'tech_id', through: 'user_techs', as: 'users' })
    }
  };
  techs.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'techs',
  });
  return techs;
};