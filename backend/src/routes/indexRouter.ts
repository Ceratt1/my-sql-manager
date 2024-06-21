import express, { Request, Response, Router } from 'express';
import {IndexController} from '../controllers/indexcontrollers';
const router: Router = express.Router();


router.get('/', IndexController.allDatabases);


export default router