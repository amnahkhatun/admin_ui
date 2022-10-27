import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrash, FaEdit } from 'react-icons/fa'
import Search from './Search';


function DetailsTable() {

  const [data, setData] = useState([])

  const getData = async () => {
    const data = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    const resp = await data.json();
    setData(resp)
    console.log(resp)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
      <Search />
      <table>
        <thead>
          <tr>
            <th>

            </th>
            <th>
              Name
            </th>
            <th>
              Email
            </th>
            <th>
              Role
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>
                <FaEdit />
                <FaTrash/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}

const Container = styled.div`
.th{
  background-color:red;
}
`
export default DetailsTable;