'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.collection,{
        as: 'collection',
        foreignKey: 'collectionId',
        onDelete: 'CASCADE'
      });
    }
  }
  field.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    collectionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'field',
  });
  return field;
};