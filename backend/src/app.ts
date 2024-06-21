import express from 'express';
const app = express();
import indexRouter  from './routes/indexRouter';
app.use(express.json());
app.use(indexRouter);
export default app;