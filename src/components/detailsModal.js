import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components'
import useRequest from '../hooks/useRequest';


const StyledModalContainer = styled.div`

`

const StyledModal = styled.div`
    position: absolute;
    background: #101010;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 0;
    height: 80%;
    border-radius: 6px;
    border: 1px solid #fff;
    transition: top 0.2s ease-in-out;
    transform: translateY(12%);
    box-shadow: rgb(177 64 64) -6px 6px 0px;
    max-height: 80vh;
    display: flex;

    & ul{
      padding-left: 20px;
    }
`

const CloseButton = styled.button`
    font-family: Rubik;
    font-size: 13px;
    font-weight: 400;
    border-radius: 50%;
    border: none;
    padding: 6px 10px 8px;
    line-height: 1;
    display: flex;
    position: absolute;
    right: 10px;
    top: 10px;
    background: rgb(177 64 64);
    color: #fff;
    align-items: center;
    justify-content: center;
}
`

const StyledHeroDetails = styled.div`
  & * {
    font-family: 'Rubik', sans-serif;
    color: #fff;
  }
  padding: 2em;
  max-height: 100%;
  overflow: auto;
  &::-webkit-scrollbar{
    background-color: #101010;
  }
`

const HeroName = styled.p`
  margin: 0 0 0.5em;
  font-weight: 700;
  font-size: 2em;
`

const HeroImg = styled.div`
  max-height: 66%;
  overflow: hidden;

  & img{
    max-width: 100%;
  }
`

const DetailsColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const DetailsColumn = styled.div`
  max-width: 48%;
  min-width: 48%;
`

const ListHeader = styled.p`
  font-weight: 600;
  margin: 0;
`

export default ({ open, closeModal}) => {

  return <StyledModalContainer>
    { open && <Modal heroId={open} closeModal={closeModal} /> }
  </StyledModalContainer>
}

const Modal = ({ heroId, closeModal }) => {
  // const modalRef = useRef()
  const [heroDetailsState, getHeroDetails] = useRequest('/heroes/single/')

  useEffect(() => {
    !heroDetailsState && heroDetailsState !== 'loading' && getHeroDetails(heroId)
    const outsideClickHandler = (e) => {
      !e.target.closest('#modal') && closeModal()
    }
    document.addEventListener('click', outsideClickHandler)
    return () => {
      document.removeEventListener('click', outsideClickHandler)
    };
  });

  return <StyledModal id='modal'>
      <CloseButton onClick={closeModal} >x</CloseButton>
      {
        !heroDetailsState || heroDetailsState === 'loading' ? <p>Loading...</p> :
        <HeroDetails heroDetails={heroDetailsState[0]}></HeroDetails>
      }
    </StyledModal>
}

const HeroDetails = ({ heroDetails, heroDetails : { name, description, series, stories, thumbnail: { path, extension } }}) => {
  console.log(heroDetails)
  return <StyledHeroDetails>
    <HeroName>{ name }</HeroName>
    <DetailsColumnContainer>
      <DetailsColumn>
        <HeroImg>
          <img src={`${path}.${extension}`}/>
        </HeroImg>
        <p>{description}</p>
      </DetailsColumn>
      <DetailsColumn>
        <Series series={series} />
        <Stories stories ={stories} />
      </DetailsColumn>
    </DetailsColumnContainer>
  </StyledHeroDetails>
}

const DetailsList = ({items}) => <ul>{
  items.map(c => <li>{c.name}</li>)
}</ul>

const Series = ({series}) => series.items.length > 0 && 
  <>
    <ListHeader>Series</ListHeader>
    <DetailsList items={series.items} />
  </>

const Stories = ({stories}) => stories.items.length > 0 && 
<>
  <ListHeader>Stories</ListHeader>
  <DetailsList items={stories.items} />
</>