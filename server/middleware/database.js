import {Sequelize} from 'sequelize';
import {sync as globSync} from 'glob';
import config from '../../config'

console.log(config)
const {host, db, port, username, password, databaseName} = config;

export const sequelize = new Sequelize(databaseName, username, password, {
  host: host, // 数据库地址
  dialect: db, // 指定连接的数据库类型,
  logging: false,
  port,
  dialectOptions: {
    charset: "utf8",
    // collate: "utf8mb4_unicode_ci",
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  pool: {
    max: 50, // 连接池中最大连接数量
    min: 0, // 连接池中最小连接数量
    idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    acquire: 10000,
    evict: 10000,
    handleDisconnects: true
  },
  define: {
    timestamps: false,
    underscored: true,
    charset: 'utf8mb4',
    dialectOptions: {
      collate: "utf8mb4_unicode_ci",
    }
  }

});

globSync('../model/**/*.js', {cwd: __dirname})
  .map(require)
  .forEach(model => model(sequelize));

export const database = app => sequelize

