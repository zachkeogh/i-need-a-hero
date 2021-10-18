import React, { useState } from "react"
import styled from 'styled-components'
import Hero from './hero'
import AudioButton from './audioButton'
import { HeroSearch } from './search'
import useBreakpoint from '../hooks/useBeakpoint'
import StyledButton from './styled/button'
import DetailsModal from './detailsModal'

const App = styled.div`
  min-height: 100vh;
  color: #fff;
  background-color: #1e1e1e;
  opacity: 1;
  background-image:  radial-gradient(#a15a5a 0.45px, transparent 0.45px), radial-gradient(#a15a5a 0.45px, #1e1e1e 0.45px);
  background-size: 18px 18px;
  background-position: 0 0,9px 9px;

  .modal-open &{
    min-width: 100vw;
  }

`

const Title = styled.h1`
  text-align: center;
  font-family: 'Rubik', sans-serif;
  font-weight: 900;
  text-transform: Uppercase;
  line-height: 1.5em;
  padding-top: 2em;
  margin-bottom: 2em;

  @media (max-width: 1150px){
    padding-top: 1em;
  }
`

const BigInnerTitle = styled.span`
  font-size: 2.5em;
  letter-spacing: 5px;
`

const StyledTeam = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 96%;
  margin: 0 auto;
`

const TeamRow = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 4em;
`

const TeamButtons = styled.div`
  max-width: 350px;
  margin: 0 auto;
  padding-bottom: 3em;
  display: flex;
`

const MarvelAttribution = styled.div`
  background-color: rgb(177, 64, 64);
  width: 100%;
  padding: 12px 0;
  position: sticky;

  & a{
    font-family: 'Rubik', sans-serif;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    display: block;
  }
`
const ModalOverlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: #00000070;
`

export default () => {
  const [team, updateTeam] = useState([]);
  const breakpoint = useBreakpoint({ 1400: 5, 1150: 4, 775: 3, 490: 2, 0: 1 });
  const [modalOpen, setModalOpen] = useState(false);

  const removeHero = (heroId) => {
    updateTeam(team.filter(c => c.id != heroId))
  }
  const addHero = (hero) => {
    const updatedTeam = team.filter(c => c.name !== 'empty')
    updatedTeam.push(hero)
    updateTeam(updatedTeam)
  }
  const clearTeam = () => {
    updateTeam([])
  }

  const teamWithPadding = (team) => {
    if(team.length === 0){
      return Array.from(Array(breakpoint), _ => ({ name: 'empty' }))
    }
    const teamArray = Array.from(team)
    if (team.length % breakpoint == 0){
      return Array.from(team)
    } else {
      teamArray.push({ name: 'empty' })
      return teamWithPadding(teamArray)
    }
  }

  const groupByBreakpoint = (team) => {
    return team.reduce((a,c,i) => {
      if(i % breakpoint == 0){
        a.push([c])
      } else {
        a[a.length - 1].push(c)
      }
      return a
    },[])
  }

  const showModal= (heroId) => {
    setModalOpen(heroId)
    document.getElementsByTagName('body')[0].classList.add('modal-open')
  }

  const closeModal = () => {
    setModalOpen(false)
    document.getElementsByTagName('body')[0].classList.remove('modal-open')
  }

  const inTeam = (hero) => team.filter(c => c.id === hero.id).length > 0

  return <>
    {modalOpen && <ModalOverlay />}
    <App>
    <Title>
      I need a<br />
      <BigInnerTitle>Hero</BigInnerTitle>
    </Title>
    <HeroSearch addHero={addHero} inTeam={inTeam} showModal={showModal} />
    { !breakpoint ? <p>loading...</p> : <Team 
      team={groupByBreakpoint(teamWithPadding(team))}
      removeHero={removeHero}
      cardsPerRow={breakpoint}
      showModal={showModal}
    />
    }
    
    <TeamButtons>
      <StyledButton onClick={clearTeam} type={'border'}>Clear Team</StyledButton> 
      <AudioButton />
    </TeamButtons>
  </App>
  <Attribution />
  <DetailsModal open={ modalOpen } closeModal={closeModal}/>
  </>
}

const Team = ({ team, removeHero, cardsPerRow, showModal }) => {
  return <StyledTeam>{
     team.map((teamRow,rowNumber) => <TeamRow key={`team_row_${rowNumber}`}>{
      teamRow.map((c,i) => {
        return c.name !== 'empty' ? <Hero key={c.name} heroData={c} remove={removeHero} widthBasis={cardsPerRow} showModal={showModal} /> : <Hero key={i} heroData={c} widthBasis={cardsPerRow} />
      })
     }</TeamRow>)
  }</StyledTeam>
}

const Attribution = () => <MarvelAttribution>
  <a href='http://marvel.com' >Data provided by Marvel. © 2021 MARVEL</a>
</MarvelAttribution>

