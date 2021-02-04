const { DataTypes } = require('sequelize');

function defineWorker(orm){
    return orm.define(
        'worker',
        {
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            alamat:{
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email:{
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            telp:{
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            bio:{
                type: DataTypes.STRING(255),
                allowNull: false,
            }
        },
        {
            timestamps: false,
            tableName: 'workers',
        }
    )
}

function defineTask(orm) {
    return orm.define(
      'task',
      {
        job: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        done: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        }
      },
      {
        timestamps: false,
        tableName: 'tasks',
      }
    );
  }

module.exports = {
    defineWorker,
    defineTask,
  };