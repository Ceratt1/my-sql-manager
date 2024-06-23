import mysql from 'mysql2/promise';
import { Pool } from 'mysql2/promise';
import { IndexController } from '../controllers/indexcontrollers';



let connection: Pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: ''
});







export default connection;


