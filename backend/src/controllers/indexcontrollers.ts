import { promises } from 'dns';
import { NextFunction, Request, Response } from 'express';
import connection from '../models/connection';


export class IndexController {



    public static async allDatabases(req: Request, res: Response): Promise<any> {
        try {
            const [databases] = await connection.execute('show databases;');
            
            const [numberDatabases] = await connection.execute('SELECT COUNT(*) AS database_count FROM information_schema.SCHEMATA;');

            return res.status(200).json({databases, numberDatabases});
        } catch (error) {
            console.log(error);
            
            res.status(400).json({message : "erro interno ao se conectar com o banco de dados"});
        }

    };
    
    public static async allTables(req: Request, res: Response){
        try {

            const [numberDatabases] = await connection.execute('SELECT COUNT(*) AS database_count FROM information_schema.SCHEMATA;');
            const [databases] = await connection.execute('show databases;');
            console.log(numberDatabases.database_count);
            
            return res.status(200).json({numberDatabases});
        

        } catch (error) {
                console.log(error);
                res.status(400).json({message : "erro interno ao se conectar com o banco de dados"});
                
        }


    };


};
