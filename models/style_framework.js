module.exports = (sequelize, DataTypes) =>  {
    const StyleFramework = sequelize.define (
        "StyleFramework",
        
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
            url: {
                type: DataTypes.TEXT,
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
            tableName: "style_framework",
            timestamps: false,
            updatedAt: false,
        }

    );

    StyleFramework.associate = function(models) {
        StyleFramework.hasMany(models.MetaData, {as: 'metas', foreignKey: 'framework_id',})
    };

    return StyleFramework;
}