import React, { useRef,useState,useEffect } from "react";
import styled from "styled-components";

const StyledHero = styled.div`
  border: 1px solid #fff;
  max-width: 18%;
  min-width: 18%;
  ${(props) => props.type === 'empty' ? 'background-color: #12121240; justify-content: center; align-items: center; display: flex; flex-direction: column' : 
  'background-color: #121212; box-shadow: -6px 6px 0px #b14040;' };
  border-radius: 3px;
`
const StyledImgContainer = styled.div`
  overflow: hidden;
  height: ${(props) =>  props.imgWidth ? props.imgWidth + 'px' : 'auto' };
  & > img {
    max-width: 100%;
  }
`

const HeroDetails = styled.div`
padding: 1em;
`
const HeroName = styled.p`
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  margin-top: 0;
`

const HeroDescription = styled.p`
  font-family: 'Rubik', sans-serif;
  font-weight: 300;
`

const HeroButtonHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledHeroButton = styled.button`
  padding: 10px;
  border: 1px solid #fff;
  width: 100%;
  font-family: 'Rubik', sans-serif;
  border-radius: 3px;
  ${(props) => props.type === 'remove' ? `background-color: transparent; color: #fff; margin-right: 5%;` : 
  `background-color: #fff; color: #121212; font-weight: 600;`}
`
const AddIcon = styled.button`
  border: 1px solid rgb(255, 255, 255);
  padding: 10px 12px;
  font-family: Rubik, sans-serif;
  border-radius: 50%;
  line-height: 1;
  background: transparent;
  color: #fff;
  font-weight: 900;
`

const HeroImage = ({thumbnail: {path, extension}}) => {
  const cardRef = useRef(null)
  const [cardWidth, setCardWidth] = useState(false);
  const getImgWidth = () => {
    return typeof window !== undefined && cardRef.current ? setCardWidth(cardRef.current.clientWidth) : false;
  }

  useEffect(() => {
    console.log(cardRef.current.clientWidth)
    getImgWidth()
  })

  return <StyledImgContainer imgWidth={cardWidth} ref={cardRef}>
    <img src={`${path}.${extension}`} />
  </StyledImgContainer>
}

const RemoveHeroButton = ({removeFromTeam}) => {

  return <StyledHeroButton type={'remove'} onClick={removeFromTeam} >Remove</StyledHeroButton>
}

const HeroDetailsButton = () => {

  return <StyledHeroButton type={'details'}>Details</StyledHeroButton>
}


export default ({ heroData: { id, name, description, thumbnail} = {}, remove }) => {
  const removeFromTeam = () => {
    remove(id)
  }

  return name != 'empty' ? <StyledHero>
    <HeroImage thumbnail={thumbnail} />
    <HeroDetails>
      <HeroName>{name}</HeroName>
      <HeroDescription>{description}</HeroDescription>
      <HeroButtonHolder>
        <RemoveHeroButton removeFromTeam={removeFromTeam} />
        <HeroDetailsButton />
      </HeroButtonHolder>
    </HeroDetails>
  </StyledHero> : 
  <StyledHero type='empty'>
    <AddIcon>+</AddIcon>
    <HeroDescription>Add a hero</HeroDescription>
  </StyledHero>
}