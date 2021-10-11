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
      <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0;">
      <div id='app'>${renderedApp}</div>
      <script src='/main.js'></script>
    </body>
  </html>`)
})

export default router