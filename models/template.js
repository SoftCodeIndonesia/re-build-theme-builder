
module.exports = (sequelize, DataTypes) =>  {
    const Template = sequelize.define (
        "Template",
        
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            is_archive: {
                type: DataTypes.INTEGER,
            },
            is_downloaded: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            source: {
                type: DataTypes.INTEGER,
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
            tableName: "template",
            timestamps: false,
            updatedAt: false,
        }

    );
    
    Template.associate = function(models) {
        Template.hasMany(models.TemplateComponent, {as: 'components', foreignKey: 'template_id',})
        Template.hasMany(models.MetaTemplate, {as: 'meta_datas', foreignKey: 'template_id',})
        Template.belongsTo(models.User, {foreignKey: 'created_by', as: 'creator'})
    };

    return Template;
}