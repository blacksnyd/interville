require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'interville',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 8889,
    dialect: "mysql",
    dialectOptions: { decimalNumbers: true },
    define: { underscored: true }
  }
};
