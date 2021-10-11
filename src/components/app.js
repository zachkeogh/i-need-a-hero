import React, { useState } from "react"
import styled from 'styled-components'
import response from '../../heroes-response'
import Hero from './hero'
import AudioButton from './audioButton'
import testSearchResults from '../../sample-search'

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

const StyledFormHolder = styled.div`
  margin: 5em auto 3em;
  max-width: 500px;
`

const StyledFormPrompt = styled.p`
  text-align: center;
  font-family: 'Rubik', sans-serif;

`

const StyledForm = styled.form`
  display: flex;
  box-shadow: #000 -6px 6px 0px;
`

const StyledTextInput = styled.input`
  width: 100%;
  padding: 10px;
  background: #1e1e1e;
  border: 1px solid #fff;
  border-right: none;
  color: #fff;
  font-family: 'Rubik',sans-serif;
  font-weight: 300;
  letter-spacing: 0.2px;
  &:focus-visible {
    outline: none;
  }
`

const StyledSubmit = styled.input`
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  padding: 0 18px;
  background-color: rgb(177 64 64);
  border: none;
  color: #fff;
  border: 1px solid rgb(177 64 64);
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
    <HeroSearch />
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

const HeroSearch = () => {
  const [searchString,setSearchString] = useState('')
  const handleSubmit = (e) => {
    console.log('do a search')
    e.preventDefault()
    e.stopPropagation()
  }

  const handleChange = (e) => {
    setSearchString(e.target.value)
  }

  return <>
    <StyledFormHolder>
      <StyledFormPrompt>Search for a hero:</StyledFormPrompt>
      <StyledForm action='#' onSubmit={handleSubmit}>
        <StyledTextInput type='text' onChange={handleChange} value={searchString} />
        <StyledSubmit type='submit' />
      </StyledForm>
    </StyledFormHolder>
    <SearchResults />
  </>
}

const filteredSearchResults = testSearchResults.data.results;

const StyledSearchResults = styled.div`
  max-width: 500;
  margin: 0 auto;
  
  & * {
    font-family: 'Rubik', sans-serif;  
  }
`

const StyledResultsHero = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-bottom: 1px solid #3a3a3a;
`
const StyledResultsImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 3px;
  margin: 0 10px 0 0;
  overflow: hidden;

  & > img{
    max-width: 100%;
  }
`

const SearchResults = () => {

  return <StyledSearchResults>
    <p>results</p>
    <div>{
      filteredSearchResults.map(c => <ResultsHero key={c.id} heroData={c} />)
    }</div>
    </StyledSearchResults>
}

const ResultsHero = ({ heroData: {name, thumbnail: {path, extension} } }) => {
  
  return <StyledResultsHero>
      <StyledResultsImg>
        <img src={`${path}.${extension}`} />
      </StyledResultsImg>
      <p>{name}</p>
  </StyledResultsHero>
}