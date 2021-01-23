const {Sequelize, DataTypes} = require('sequelize');
const {
  username, password, database, host, dialect
} = process.env.NODE_ENV === 'production' ? require('../db/init/config/config.json').production : require('../db/init/config/config.json').development
console.log(`Use evelpment "${process.env.NODE_ENV}"`)
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});

(async function testConnect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}());


//配置数据库模型
const UsersTable = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updateTime: {
    type: DataTypes.DATE,
    allowNull:false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

const ProjectTable = sequelize.define('todo_project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  projectTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updateTime: {
    type: DataTypes.DATE,
    allowNull:false
  },
  value: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',//Completed Processing
    allowNull:false
  }
}, {
  freezeTableName: true,
  timestamps: false
});



module.exports = {
  sequelize,
  UsersTable,
  ProjectTable
}