import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrash, FaEdit } from 'react-icons/fa'
import Search from './Search';


function DetailsTable() {

  const [data, setData] = useState([])
  const [query, setQuery] = useState('')
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const getData = async () => {
    const data = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    const resp = await data.json();
    setData(resp)
    console.log(resp)
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

  const deleteItem = (id) => {
    const updatedItems = data.filter((item) => item.id !== id)
    setData(updatedItems)
  }

  return (
    <Container>
      <section>
        <input type="text" value={query} placeholder='Search by name' onChange={(e) => setQuery(e.target.value)} />
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
          {data.filter((data) => {
            console.log(data, 'ki')
            if (data.name.toLowerCase().includes(query)) {
              return data
            }
          }).map((item) => (
            <tr key={item.id}>
              <td>
                <input type="checkbox" />
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
          ))
          }
        </tbody>
      </table>
    </Container>
  )
}




const Container = styled.div`
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
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
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

// if (!root) return 0;
// let diameter = 0;
// height(root);
// return diameter;

// function height(node) {//4,2,3,1
//   if (!node) return 0; //0,0,0,0,0,0

//   const leftHeight = height(node.left);//2,4,null,null,null,2
//   const rightHeight = height(node.right);//null,5,null,3,null,1
//   diameter = Math.max(diameter, leftHeight + rightHeight)//0,0,2,2,3
//   return Math.max(leftHeight, rightHeight) + 1 //1,1,2,1,3;
// }