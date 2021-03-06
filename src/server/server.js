require('dotenv').config()
import express from 'express';
const port = process.env.PORT;
import router from './routers/app.js';
import heroRouter from './routers/heroes.js'

const app = express()
app.use('/', router);
app.use('/heroes', heroRouter);


app.listen(port, () => {
  console.log(`listening on port: ${port}`)
});