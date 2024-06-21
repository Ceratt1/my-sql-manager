import { promises } from 'dns';
import { Request, Response } from 'express';
import connection from '../models/connection';


export class IndexController {



    public static async allDatabases(req: Request, res: Response): Promise<void> {
        try {
            const [databases] = await connection.execute('show databases;');
            
            const [numberDatabases] = await connection.execute('SELECT COUNT(*) AS database_count FROM information_schema.SCHEMATA;');
            const infoDatabases : any = {
                Database : databases,
                NumberData : numberDatabases

            }
            res.status(200).json(infoDatabases);
        } catch (error) {
            console.log(error);
            
            res.status(400).json({message : "erro interno ao se conectar com o banco de dados"});
        }

    };
    



};
