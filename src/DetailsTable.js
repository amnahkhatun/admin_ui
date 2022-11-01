import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa'
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
    const specificItem = followers.find((item) => item.id === id);
    setIsEditing(!isEditing);
    setEditID(id);
    // setName(specificItem.name);
    console.log({ id }, specificItem.name)
    if (name && isEditing) {
      setFollowers(
        followers.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      // setName('');
      // setEditID(null);
      // setIsEditing(false);
      // showAlert(true, 'success', 'value changed');
    }
  };

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (loading) return
    setFollowers(data[page])
  }, [loading, page])

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1
      }
      return prevPage
    })
  }
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0
      }
      return nextPage
    })
  }

  const deleteItem = (id) => {
    const updatedItems = data.filter((item) => item.id !== id)
    setData(updatedItems)
  }
  const handlePage = (page) => {
    setPage(page)
  }

  return (
    <Container>
      <section>
        <input className="searchInput" type="text" value={query} placeholder='Search by name' onChange={(e) => setQuery(e.target.value)} />
      </section>
      <h1>{loading ? 'loading...' : ''}</h1>
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
                {editID === item.id && isEditing ? <input
                  type='text'
                  placeholder='e.g. amnah'
                  value={item.name}
                  onChange={(e) => setName(e.target.value)}
                /> : item.name}
              </td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>
                {isEditing ? <FaSave /> :
                  <FaEdit onClick={() => editItem(item.id)} />}
                <FaTrash onClick={() => deleteItem(item.id)} />
              </td>
            </tr>
          ))}


        </tbody>
      </table>
      {!loading && <div className="page-container">
        <button className='prev-btn' onClick={prevPage}>
          prev
        </button>
        {data.map((item, index) => {
          return <button key={index} className={`page-btn ${index === page ? 'active-btn' : null}`} onClick={() => handlePage(index)}>
            {index + 1}
          </button>
        })}
        <button className='next-btn' onClick={nextPage}>
          next
        </button>
      </div>}
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
.page-btn{
  width: 2rem;
  height: 2rem;
  background: hsl(205, 90%, 76%);
  border-color: transparent;
  border-radius: 5px;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.3s linear;
}
.btn-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.prev-btn,
.next-btn {
  background: transparent;
  border-color: transparent;
  font-weight: bold;
  text-transform: capitalize;
  margin: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}
.active-btn {
  background: hsl(205, 86%, 17%);
  color: #fff;;
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
@media screen and (min-width: 775px) {
  .btn-container {
    margin: 0 auto;
    max-width: 700px;
  }
}
`
export default DetailsTable;
