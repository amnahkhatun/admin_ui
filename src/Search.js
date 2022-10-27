import React from 'react';
import styled from 'styled-components'

function Search({ getQuery }) {

  return (
    <SearchContainer>
      {console.log(getQuery)}
      <input type="text" value={'ok'} placeholder='Search by name' onChange={(e) => getQuery(e.target.value)} />
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
