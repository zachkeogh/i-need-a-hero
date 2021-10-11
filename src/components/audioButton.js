import React, { useRef,useEffect } from "react";
import styled from "styled-components";

const StyledAudioButton = styled.button`
  padding: 10px;
  border: 1px solid #fff;
  width: 100%;
  font-family: 'Rubik', sans-serif;
  border-radius: 3px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  max-width: max-content;
  font-weight: 600;
`

export default () => {
  const playingRef = useRef(false)
  const audioRef = useRef(null)
  const streamRef = useRef(null)
  const clickHandler = () => {
    if (typeof window !== undefined && audioRef.current && streamRef.current) {
      if(!playingRef.current){
        console.log('changed')
        audioRef.current.play();
        playingRef.current = true;
      } else {
        audioRef.current.pause();
        playingRef.current = false;
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

  return <StyledAudioButton onClick={clickHandler}>Enable Sound</StyledAudioButton>
}