import React, { useRef,useState,useEffect } from "react";
import styled from "styled-components";
import AddIcon from './styled/icon'
import StyledButton from './styled/button'

const StyledHero = styled.div`
  border: 1px solid #fff;
  ${(props) => `max-width: ${(100 / props.widthBasis) - 2}%;min-width: ${(100 / props.widthBasis) - 2}%;` };

  ${(props) => props.type === 'empty' ? 'background-color: #12121240; justify-content: center; align-items: center; display: flex; flex-direction: column; min-height: 400px;' : 
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
  font-size: 0.85em;
  line-height: 1.4;
`

const HeroButtonHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

  return <StyledButton type={'border'} onClick={removeFromTeam} >Remove</StyledButton>
}

const HeroDetailsButton = ({ showModal }) => {

  return <StyledButton type={'details'} onClick={showModal}>Details</StyledButton>
}


export default ({ heroData: { id, name, description, thumbnail} = {}, remove, widthBasis, showModal }) => {
  const removeFromTeam = () => {
    remove(id)
  }

  const showDetails = () => {
    showModal(id)
  }

  return name != 'empty' ? <StyledHero widthBasis={widthBasis}>
    <HeroImage thumbnail={thumbnail} />
    <HeroDetails>
      <HeroName>{name}</HeroName>
      <HeroDescription>{description}</HeroDescription>
      <HeroButtonHolder>
        <RemoveHeroButton removeFromTeam={removeFromTeam} />
        <HeroDetailsButton showModal={showDetails} />
      </HeroButtonHolder>
    </HeroDetails>
  </StyledHero> : 
  <StyledHero type='empty' widthBasis={widthBasis}>
    <AddIcon>+</AddIcon>
    <HeroDescription>Add a hero</HeroDescription>
  </StyledHero>
}