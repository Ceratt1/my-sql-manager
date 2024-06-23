import express, { Request, Response, Router } from 'express';
import {IndexController} from '../controllers/indexcontrollers';

const router: Router = express.Router();


router.get('/', IndexController.allDatabases);
router.get('/databases', IndexController.allTables);


export default router