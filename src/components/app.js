import React, { useState } from "react"
import styled from 'styled-components'
import response from '../../heroes-response'
import Hero from './hero'
import AudioButton from './audioButton'

const App = styled.div`
  min-height: 100vh;
  color: #fff;
  background-color: #1e1e1e;
  opacity: 1;
  background-image:  radial-gradient(#a15a5a 0.45px, transparent 0.45px), radial-gradient(#a15a5a 0.45px, #1e1e1e 0.45px);
  background-size: 18px 18px;
  background-position: 0 0,9px 9px;
`

const Title = styled.h1`
  text-align: center;
  font-family: 'Rubik', sans-serif;
  font-weight: 900;
  text-transform: Uppercase;
  line-height: 1.5em;
  padding-top: 2em;
  margin-bottom: 4em;
`

const BigInnerTitle = styled.span`
  font-size: 2.5em;
  letter-spacing: 5px;
`

const StyledTeam = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  max-width: 96%;
  margin: 0 auto;
`

const testTeam = response.data.results.filter((c,i) => c.description !== "" && !c.thumbnail.path.includes('image_not_available'))

export default () => {
  const [team, updateTeam] = useState(testTeam);
  const removeHero = (heroId) => {
    updateTeam(team.filter(c => c.id != heroId))
  }


  return <App>
    <Title>
      I need a<br />
      <BigInnerTitle>Hero</BigInnerTitle>
    </Title>
    <Team 
      team={team}
      removeHero={removeHero}
    />
    <AudioButton />
  </App>
}

const Team = ({ team, removeHero }) => {
  const addEmptyCards = (team) => {
    if (team.length == 5){
      return team
    } else {
      team.push({ name: 'empty' })
      return addEmptyCards(team)
    }
  }

  // console.log('Before Add Empty Cards', team)

  // console.log('After Add Empty Cards', addEmptyCards(team))

  return <StyledTeam>{
    addEmptyCards(team).map((c,i) => {
      return c.name !== 'empty' ? <Hero key={c.name} heroData={c} remove={removeHero} /> : <Hero key={i} heroData={c} />
    }) 
  }</StyledTeam>
}