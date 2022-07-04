
module.exports = (sequelize, dataTypes) => {
    let alias = 'ImageProduct';
    let cols = {
        idImageProduct: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        idProductsFK: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        
        imageProduct:{
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

    const ImageProduct = sequelize.define(alias, cols, config);
    
    return ImageProduct;
}