module.exports = (sequelize, DataTypes) =>  {
    const MetaTemplate = sequelize.define (
        "MetaTemplate",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            meta_data_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            template_id: {
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
            },
            created_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "meta_template",
            timestamps: false,
            updatedAt: false,
        }

    );

    MetaTemplate.associate = function(models) {
        // TemplateComponent.belongsTo(models.Template, {foreignKey: 'user_id', as: 'template'})
        MetaTemplate.belongsTo(models.MetaData, {foreignKey: 'meta_data_id', as: 'meta_data'})
    };

    return MetaTemplate;
}