import express from 'express';
const port = process.env.PORT ??= 3000;
import router from './routers/app.js';

const app = express()
app.use('/', router);


app.listen(port, () => {
  console.log(`listening on port: ${port}`)
});