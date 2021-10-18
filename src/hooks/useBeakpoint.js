import { useState, useEffect, useMemo } from 'react';

const getBreakpoint = (width,breakpoints) => {
  return Object.keys(breakpoints).reverse().reduce((a,c,i,arr) => {
    if(!a && (i == arr.length - 1 || width > Number(c))){
        a = breakpoints[c]
    } 
    return a
  }, false)
}

const setDefaultWidth = () => {
  if(typeof window !== 'undefined'){
    return window.innerWidth
  }
  return null
}

export default (breakpoints) => {
  const [width, setWidth] = useState(setDefaultWidth())
  const [breakpoint, setBreakPoint] = useState(null)

  useEffect(() => {
    if(window !== undefined){
      const resizeHandler = (e) => { setWidth(window.innerWidth) }  
      window.addEventListener('resize', resizeHandler)    
      return () => { window.removeEventListener('resize', resizeHandler) };
    }
  });

  useEffect(() => {
    window !== undefined && setBreakPoint(getBreakpoint(width,breakpoints))
  }, [width])

  return useMemo (() => breakpoint, [breakpoints])
}