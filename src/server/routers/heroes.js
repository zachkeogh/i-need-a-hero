import express from 'express';
import { createHash } from 'crypto';
import axios from 'axios';

const router = express.Router();
const urlBase = 'https://gateway.marvel.com/v1/public/characters';

const generateReqParams = () => {
  const timestamp = Date.now().toString(),
    publicKey = process.env.M_PUBLIC,
    privateKey = process.env.M_PRIVATE,
    stringToHash = timestamp + privateKey + publicKey,
    hash = createHash('md5').update( stringToHash ).digest('hex')

    return `&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
}

router.get('/search/:for', (req, res, next) => {
  const searchString = req.params.for;
  if (searchString == ''){
    res.status(409)
    res.send('Empty search parameter')
  }

  const requestUrl = `${urlBase}?nameStartsWith=${searchString}${generateReqParams()}`
  
  axios(requestUrl)
    .then(response => {
      res.send(response.data.data.results)
    })
    .catch(e => {
      console.log(e)
      res.status(500)
      res.send('There was an error')
    })

  
})

router.get('/single/:id', (req, res, next) => {
  const heroId = req.params.id;
  if (heroId == ''){
    res.status(409)
    res.send('Empty search parameter')
  }

  const requestUrl = `${urlBase}/${heroId}?${generateReqParams()}`
  
  axios(requestUrl)
    .then(response => {
      res.send(response.data.data.results)
    })
    .catch(e => {
      console.log(e)
      res.status(500)
      res.send('There was an error')
    })
})

export default router