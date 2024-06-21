console.clear();
import app from './app';
import dotnev from 'dotenv';
dotnev.config();
app.listen(process.env.PORT, () => console.log('Running on port ' + (process.env.PORT)));
