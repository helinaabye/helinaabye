require('dotenv').config();
const { Pool } = require('pg');
let pool =  null;

if (process.env.NODE_ENV) {
    const isProduction = process.env.NODE_ENV === 'production';

    if (!isProduction && !process.env.DB_DATABASE) 
        throw Error('development DB_DATABASE is undefined!');
    if (isProduction && !process.env.DATABASE_URL) 
        throw Error('production DATABASE_URL is undefined!');

    const connectionString = `postgresql://` + 
        `${process.env.DB_USER}:${process.env.DB_PASSWORD}@` + 
        `${process.env.DB_HOST}:${process.env.DB_PORT}/` + 
        `${process.env.DB_DATABASE}`;
    pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
    });
} else {
    console.log("Frontend development mode...");
    pool = {query:(x,y) => y(null, {rowCount:0, rows:[]})}
}

module.exports = { pool };