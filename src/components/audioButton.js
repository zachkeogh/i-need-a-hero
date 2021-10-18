import React, { useState,useRef,useEffect } from "react";
import StyledButton from './styled/button'



export default () => {
  const [playing,setPlaying] = useState(null)
  const playingRef = useRef(false)
  const audioRef = useRef(null)
  const streamRef = useRef(null)
  const clickHandler = () => {
    if (typeof window !== undefined && audioRef.current && streamRef.current) {
      if(!playingRef.current){
        console.log('changed')
        audioRef.current.play();
        playingRef.current = true;
        setPlaying(true)
      } else {
        audioRef.current.pause();
        playingRef.current = false;
        setPlaying(false)
      }
    }
  }

  useEffect(() => {
    if (typeof window !== undefined){
      if(!audioRef.current){
        audioRef.current = new Audio('https://ia800207.us.archive.org/4/items/BonnieTylerINeedAHeroLyrics1/Bonnie%20Tyler%20-%20I%20Need%20a%20Hero%20%28Lyrics%29%20%281%29.mp3');
        streamRef.current = audioRef.current.captureStream()
      }
    }
  })

  return <StyledButton onClick={clickHandler}>{
    playing === null ? 'Enable Sound':
    playing ? 'Pause Song' : 'Resume Song'
  }</StyledButton>
}