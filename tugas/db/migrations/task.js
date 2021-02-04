const { DataTypes } = require('sequelize');
// eslint-disable-next-line no-unused-vars

function defineTask(orm) {
    return orm.define(
        'task',
        {
            name: DataTypes.STRING,
            isCompleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            attachment: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            addedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            timestamps: false,
            tableName: 'tasks',
        }
    );
}



module.exports = { defineTask };
