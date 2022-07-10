
module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        idUser: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        fullname:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        addres:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        email:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        birthday:{
            type: dataTypes.DATEONLY,
        },
        user:{
            type: dataTypes.STRING(45),
            allowNull: false,
            unique:true,
        },
        key:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        userImage:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        createdAt:{
            type:dataTypes.DATEONLY,
        },
        updatedAt:{
            type:dataTypes.DATEONLY,
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: false
    };

    const User = sequelize.define(alias, cols, config); 

    User.associate = function (models) {
      User.hasMany(models.Avatar, {
        as: "userAvatar",
        foreignKey: "idUserFK",
        timestamps: true,
      }); 
      User.hasMany(models.Basket, {
        as: "userBasket",
        foreignKey: "idUserFK",
        timestamps: true,
      }); 
      User.belongsTo(models.UserType, {
        as: "usersType", // nombre de la relacion
        foreignKey: "idUserTypeFK", // nombre de la FK 
      });
    
    }
    return User;
}