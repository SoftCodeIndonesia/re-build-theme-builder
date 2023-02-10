// const {Component} = require('./index');
module.exports = (sequelize, DataTypes) =>  {
    const Section = sequelize.define (
        "Section",
        
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            created_at: {
                type: DataTypes.BIGINT(30),
                allowNull: false,
            },
            created_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "section",
            timestamps: false,
            updatedAt: false,
        }

    );

    Section.associate = function(models) {
        Section.hasMany(models.Component, {as: 'components',foreignKey: 'section_id'})
    };

    return Section;
}