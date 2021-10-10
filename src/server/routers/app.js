import express from 'express';
import React from "react";
import ReactDOMServer from 'react-dom/server';
import App from '../../components/app.js'

const router = express.Router();
router.use(express.static('dist/app'))

const renderedApp = ReactDOMServer.renderToString(<App />)

router.get('/', (_, res) => {
  res.send(`<html>
    <head>
      <title>I need a hero</title>
    </head>
    <body>
      <div id='app'>${renderedApp}</div>
      <script src='/main.js'></script>
    </body>
  </html>`)
})

export default router