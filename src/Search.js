import React from 'react';
import styled from 'styled-components'

function Search() {
  const [query, setQuery] = React.useState('')

  return (
    <SearchContainer>
      <input type="text" value={query} placeholder='Search by name' />
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  padding:3%;
  .input{
    width:90%;
    margin:3%;
    background-color:grey;
  }
`

export default Search
