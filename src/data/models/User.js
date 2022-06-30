const { DataTypes } = require("sequelize/types");

module.exports = (sequelize,dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        fullname:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        addres:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        birthday:{
            type: DataTypes.DATEONLY,
        },
        user:{
            type: DataTypes.STRING(45),
            allowNull: false,
            unique:true,
        },
        key:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        userImage:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        // createdAt:{
        //     type:DataTypes.DATEONLY,
        // },
        // updatedAt:{
        //     type:DataTypes.DATEONLY,
        // },
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const User = sequelize.define(alias, cols, config);
    
    return User;
}