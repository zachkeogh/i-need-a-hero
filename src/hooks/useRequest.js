import React, { useState,useEffect, useMemo } from 'react';


export default (url) => {
  const [requestState, setRequestState] = useState(false)
  const [param, setParam] = useState('')

  const makeRequest = (searchParam) => {
    setParam(searchParam);
    setRequestState('loading');
  }

  const doRequest = () => {
    fetch(new Request(url + param))
      .then(response => {
        if(response.status === 200){
          return response.json()
        }
      })
      .then(body => {
        // console.log(body)
        setRequestState(body)
      })
      .catch(e => {
        console.log(e)
        setRequestState('failed')
      })
      .finally(() => {
        setParam('')
      })
  }

  useEffect(()=>{
    requestState == 'loading' &&
    doRequest()
  })

  return useMemo(() => [requestState, makeRequest], [requestState])
}