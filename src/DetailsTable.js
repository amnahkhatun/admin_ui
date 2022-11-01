import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrash, FaEdit } from 'react-icons/fa'
import Search from './Search';
import paginate from './utils';


function DetailsTable() {

  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [followers, setFollowers] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [deletedItems, setDeletedItems] = useState([]);


  const getData = async () => {
    const data = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    const resp = await data.json();
    setData(paginate(resp))
    setLoading(false)
  }

  const editItem = (id) => {
    const specificItem = data.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (loading) return
    setFollowers(data[page])
  }, [loading, page])

  const deleteItem = (id) => {
    const updatedItems = data.filter((item) => item.id !== id)
    setData(updatedItems)
  }

  const deleteMultipleItems = () => {

  }

  return (
    <Container>
      {console.log({followers})}
      <section>
        <input className="searchInput" type="text" value={query} placeholder='Search by name' onChange={(e) => setQuery(e.target.value)} />
      </section>

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
            {followers.filter((data) => {
              if (data?.name.toLowerCase().includes(query) || data?.email.toLowerCase().includes(query) || data?.role.toLowerCase().includes(query)) {
                return data
              }
            }).map((item) => (
              <tr key={item.id}>
                <td>
                  <input type="checkbox" onChange={() => setDeletedItems(deletedItems.push(item.id))} />
                </td>
                <td>
                  {isEditing ? <input
                    type='text'
                    placeholder='e.g. amnah'
                    value={item.name}
                    onChange={(e) => setName(e.target.value)}
                  /> : item.name}
                </td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <FaEdit />
                  <FaTrash onClick={() => deleteItem(item.id)} />
                </td>
              </tr>
            ))}

          
        </tbody>
      </table>
      {/* <Paginate data={data} /> */}
    </Container>
  )
}




const Container = styled.div`
.searchInput{
  margin:1%;
  padding:1%;
  width:80%;
}
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: .5em 0 .75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: .35em;
}

table th,
table td {
  padding: .625em;
  text-align: center;
}

table th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  .searchInput{
  margin:1%;
  padding:1%;
  width:13rem;
}
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }
  
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}
`
export default DetailsTable;
