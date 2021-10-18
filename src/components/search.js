import React, { useState, useEffect } from "react"
import styled from 'styled-components'
import useRequest from '../hooks/useRequest'
import StyledButton from './styled/button'

const StyledFormHolder = styled.div`
  margin: 3em auto 3em;
  max-width: 500px;

  @media (max-width: 500px){
    max-width: 96vw
  }
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
const StyledSearchResults = styled.div`
  max-width: 500;
  margin: 0 auto 4em;
  background: #101010;
  padding: 1em;
  box-sizing: border-box;
  margin-top: -3em;
  position: absolute;
  left: 0;
  right: 0;

  & > div {
    max-height: 500px;
    overflow: auto;
  }

  & > div::-webkit-scrollbar{
    background-color: transparent;
  }
  
  & * {
    font-family: 'Rubik', sans-serif;  
  }

  @media (max-width: 600px){
    & > div {
      max-height: 50vh;
    }
  }
`

const StyledResultsHero = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-bottom: 1px solid #3a3a3a;
  align-items: center;

  @media (max-width: 330px){
    flex-wrap: wrap;
  }
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

const Loading = styled.p`
  text-align:center;
  font-family: 'Rubik', sans-serif;
`

const SearchDetailsButton = styled.button`
  padding: 10px;
  border: 1px solid #fff;
  width: 100%;
  font-family: 'Rubik', sans-serif;
  border-radius: 3px;
  ${(props) => props.type === 'remove' ? `background-color: transparent; color: #fff; margin-right: 5%;` : 
  `background-color: #fff; color: #121212; font-weight: 600;`}
  `

const ResultsHeroButtons = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  align-items: center;

  @media (max-width: 330px){
    margin-left: 0;
  }
`
const ResultsLabel = styled.p`
  margin: 0.4em 0;
  font-size: 0.8em;
  font-weight: 600;
`

const StyledName = styled.p`
  @media (max-width: 330px){
    width: calc(100% - 60px);
  }
`

export const HeroSearch = ({ addHero, inTeam, showModal }) => {
  const [open, setOpen] = useState(false);
  const [searchString, setSearchString] = useState('')
  const [searchState, searchForHeroes] = useRequest('/heroes/search/')

  const handleSubmit = (e) => {
    setOpen(true);
    searchString && searchString != searchForHeroes(searchString)
    e.preventDefault()
    e.stopPropagation()
  }

  const handleChange = (e) => {
    setSearchString(e.target.value)
  }

  useEffect(() => {
    const handleClick = (e) => { !e.target.closest('#results') && setOpen(false) }
    open && document.addEventListener('click', handleClick);
    return () => { document.removeEventListener('click', handleClick) }
  })

  return <>
    <StyledFormHolder>
      <StyledFormPrompt>Search for a hero:</StyledFormPrompt>
      <StyledForm action='#' onSubmit={handleSubmit}>
        <StyledTextInput type='text' onChange={handleChange} value={searchString} />
        <StyledSubmit type='submit' />
      </StyledForm>
    </StyledFormHolder>
    { 
      !searchState ? null :
      searchState === 'loading' ? <Loading>Loading....</Loading> : 
      open && <SearchResults searchResults={searchState} addHero={addHero} inTeam={inTeam} showModal={showModal} /> 
    }
  </>
}

const SearchResults = ({ searchResults, addHero, inTeam, showModal}) => {

  return !searchResults ? null : 
  <StyledSearchResults id={'results'}>
    <ResultsLabel>Results:</ResultsLabel>
    <div>{
      searchResults === 'failed' ? <p>There was an error</p> :
      searchResults.length === 0 ? <p>No heroes found</p> : 
      searchResults.map(c => <ResultsHero key={c.id} heroData={c} addHero={addHero} inTeam={inTeam} showModal={showModal} /> )
    }</div>
    </StyledSearchResults>
}

const ResultsHero = ({ heroData, addHero, inTeam, showModal }) => {
  const {id, name, thumbnail, thumbnail: {path, extension} } = heroData
  const addToTeam = () => addHero({...{id,name,thumbnail}})
  const showDetails = () => {
    showModal(heroData.id)
  }

  return <StyledResultsHero>
      <StyledResultsImg>
        <img src={`${path}.${extension}`} />
      </StyledResultsImg>
      <StyledName>{name}</StyledName>
      <ResultsHeroButtons>
        <StyledButton type={'no-border'} onClick={ showDetails }>Details</StyledButton>
        {!inTeam(heroData) && <StyledButton type={'border'} onClick={addToTeam}>Add to team</StyledButton>}
      </ResultsHeroButtons>
  </StyledResultsHero>
}