import mysql from 'mysql2/promise';
import { Pool } from 'mysql2/promise';

const connection: Pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
});




export default connection;

