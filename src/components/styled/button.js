import styled from "styled-components"

export default styled.button`
  padding: 10px;
  border: 1px solid #fff;
  width: 100%;
  font-family: 'Rubik', sans-serif;
  border-radius: 3px;
  white-space: nowrap;
  ${(props) => props.type === 'border' ? `background-color: transparent; color: #fff; margin-right: 5%;` : 
  props.type === 'no-border' ? `background-color: transparent; color: #fff; margin-right: 5%; border: none;` :
  `background-color: #fff; color: #121212; font-weight: 600;`}
`