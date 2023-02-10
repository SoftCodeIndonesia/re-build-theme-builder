module.exports = (sequelize, DataTypes) =>  {
    const Rules = sequelize.define (
        "Rules",
        
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
            tableName: "rules",
            timestamps: false,
            updatedAt: false,
        }

    );

    Rules.associate = function(models) {
        // User.belongsTo(models.Template, {foreignKey: 'user_id', as: 'template'})
        Rules.belongsTo(models.User, {foreignKey: 'created_by', as: 'creator'})
    };

    return Rules;
}