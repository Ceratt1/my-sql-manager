import { promises } from 'dns';
import { NextFunction, Request, Response } from 'express';
import connection from '../models/connection';
import { RowDataPacket } from 'mysql2'; 


interface DatabaseCount {
    database_count: number;
}










export class IndexController {

    private static databaseList: Array<string> = [];


    public static async allDatabases(req: Request, res: Response): Promise<any> {
        try {
            const [databases] = await connection.execute<RowDataPacket[]>('show databases;');

            IndexController.databaseList = databases.map(db => db.Database);
            
            const result: Array<string> = databases.map(db => db.Database);
            
            const [numberDatabase]= await connection.execute('SELECT COUNT(*) AS database_count FROM information_schema.SCHEMATA;');

            return res.status(200).json({result, numberDatabase});
        } catch (error) {
            console.log(error);
            
            res.status(500).json({message : "erro interno ao se conectar com o banco de dados"});
        }

    };
    
    public static async allTables(req: Request, res: Response): Promise<any> {
        const query: string = "SELECT table_name FROM information_schema.tables WHERE table_schema = ?";

        try {
            const numData : number = parseInt(req.params.id)
            
            if (!IndexController.databaseList.length) {
                const [databases] = await connection.execute<RowDataPacket[]>('show databases;');
                IndexController.databaseList = databases.map(db => db.Database); 
            }

            if (numData > IndexController.databaseList.length) {
                return res.status(404).json({message : "database not found"})
            }
            
            const [result] = await connection.execute<RowDataPacket[]>(query, [IndexController.databaseList[numData]]);
            
            return res.status(200).json(result);

        } catch (error) {
                console.log(error);
                res.status(500).json({message : "erro interno ao se conectar com o banco de dados"});    
        }


    };

    public static async allElements(req: Request, res: Response): Promise<any> {
        const dbName : string = req.params.db;
        const tableName : string = req.params.table;
        const query : string = "SELECT * FROM " + dbName + "." + tableName;
        try {
            const [result] = await connection.execute<RowDataPacket[]>(query);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({message : "erro interno ao se conectar com o banco de dados"});
        }
    }




};
