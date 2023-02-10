module.exports = (sequelize, DataTypes) =>  {
    const TemplateComponent = sequelize.define (
        "TemplateComponent",
        
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            template_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            component_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            index: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.BIGINT(30),
                allowNull: false,
                defaultValue: 0,
            },
            created_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "template_component",
            timestamps: false,
            updatedAt: false,
        }

    );
    
    TemplateComponent.associate = function(models) {
        // TemplateComponent.belongsTo(models.Template, {foreignKey: 'user_id', as: 'template'})
        TemplateComponent.belongsTo(models.Component, {foreignKey: 'component_id', as: 'component'})
    };

    return TemplateComponent;
}