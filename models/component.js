module.exports = (sequelize, DataTypes) =>  {
    const Component = sequelize.define (
        "Component",
        
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            section_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            thumbnail: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            code_path: {
                type: DataTypes.STRING,
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
            tableName: "component",
            timestamps: false,
            updatedAt: false,
        }

    );
    
    Component.associate = function(models) {
        Component.belongsTo(models.Section, {foreignKey: 'section_id', as: 'section'})
    };

    return Component;
}