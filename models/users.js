module.exports = (sequelize, DataTypes) =>  {
    const User = sequelize.define (
        "User",
        
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            rules_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            providerId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            register_at: {
                type: DataTypes.INTEGER(30),
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "users",
            timestamps: false,
            updatedAt: false,
        }

    );

    User.associate = function(models) {
        // User.belongsTo(models.Template, {foreignKey: 'user_id', as: 'template'})
        User.belongsTo(models.Rules, {foreignKey: 'rules_id', as: 'rules'})
    };

    return User;
}